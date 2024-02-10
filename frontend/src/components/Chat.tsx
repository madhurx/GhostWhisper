'use client';

import Image from 'next/image';
import MessageBox from './MessageBox';
import { SendHorizontalIcon } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_ENDPOINT = process.env.SOCKET_ENDPOINT || '';

interface TypeMessage {
    message: string;
    sendBy: string;
}

interface MessageData {
    message: string;
    userId: string;
}

const Chat = ({ chatId, userName }: { chatId: string; userName: string }) => {
    const socket = useMemo(
        () =>
            io(SOCKET_ENDPOINT, {
                transports: ['websocket', 'polling', 'flashsocket'],
                withCredentials: true,
            }),
        [],
    );

    const [inputText, setInputText] = useState<string>('');
    const [receivedMsg, setReceivedMsg] = useState<string>('');
    const [allMessages, setAllMessages] = useState<TypeMessage[]>([]);
    const [roomName, setRoomName] = useState<string>(chatId.toString());
    const [sendBy, setSendBy] = useState<string>();

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const handleInviteClick = () => {
        const origin = window.location.origin;
        const inviteURL = origin + '/anonChat/go?chatId=' + chatId;
        navigator.clipboard.writeText(inviteURL);
    };

    const handleSendMsg = (
        e:
            | React.KeyboardEvent<HTMLTextAreaElement>
            | React.MouseEvent<HTMLButtonElement>,
    ) => {
        e.preventDefault();
        e.stopPropagation();
        socket.emit('message', {
            message: inputText,
            room: roomName,
            userId: userName,
        });

        setInputText('');
    };

    useEffect(() => {
        const handleReceiveMessage = (data: MessageData) => {
            const { message, userId } = data;
            const sendByUser = userId === userName ? 'self' : userId;
            setSendBy(sendByUser);
            setReceivedMsg(message);
            setAllMessages((data) => [
                ...data,
                { message, sendBy: sendByUser },
            ]);
        };

        socket.on('welcome', (welcomeMsg) => {
            setAllMessages((data) => [
                ...data,
                { message: welcomeMsg, sendBy: 'system' },
            ]);
        });

        socket.on('receiveMessage', (data) => {
            handleReceiveMessage(data);
        });

        socket.emit('join-room', { roomName, userName });

        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
        });
    }, [allMessages]);

    return (
        <div className="px-2 h-full">
            <div className="flex flex-col h-full">
                {/* Header Row */}
                <div className="flex w-full py-1 cursor-default z-50 rounded-xl">
                    <div className="flex px-2">
                        <div className="h-full items-center flex">
                            <Image
                                src={'/group-icon.png'}
                                width={45}
                                height={45}
                                alt="anonChatIndexImg"
                                quality={100}
                                loading="lazy"
                                className="rounded-full"
                            />
                        </div>
                        <div className="flex flex-col mx-3 justify-center">
                            <div>
                                <h1 className="text-base">GROUP NAME</h1>
                            </div>
                            <div>
                                <p className="text-xs">Member Count</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row ms-auto items-center px-2">
                        <div className="items-center flex">
                            <div
                                className="left-3 relative flex flex-nowrap hover:cursor-pointer"
                                onClick={() => {
                                    return handleInviteClick();
                                }}
                            >
                                <button className="text-sm mx-1">
                                    + Invite
                                    <span className="hidden md:inline">
                                        {' '}
                                        Ghosts
                                    </span>
                                </button>
                            </div>

                            <div className="-z-20 left-4 relative border border-neutral-500 rounded-full">
                                <Image
                                    src={'/pfp/pfp-4.jfif'}
                                    width={30}
                                    height={30}
                                    alt="anonChatIndexImg"
                                    quality={100}
                                    loading="lazy"
                                    className="rounded-full"
                                />
                            </div>
                            <div className="-z-10 left-2 relative border border-neutral-500 rounded-full">
                                <Image
                                    src={'/pfp/pfp-6.jfif'}
                                    width={30}
                                    height={30}
                                    alt="anonChatIndexImg"
                                    quality={100}
                                    loading="lazy"
                                    className="rounded-full"
                                />
                            </div>
                            <div className="-z-0 relative">
                                <div className="rounded-full border border-dashed  border-gray-500 bg-neutral-50 dark:bg-neutral-950 w-8 h-8 items-center flex justify-center">
                                    <h1 className="text-sm">+6</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Chat Row */}
                <div className="grid w-full py-1 h-full overflow-hidden text-sm">
                    <div className="grid grid-rows-10 grid-cols-1 rounded-3xl bg-cover bg-[url('/chat-bg-light.png')] dark:bg-[url('/chat-bg-dark.png')] bg-scroll px-2">
                        <div className="row-span-9 overflow-hidden relative justify-center px-1">
                            <div className="overflow-y-scroll scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-full absolute w-full flex flex-col">
                                {allMessages.map((data, id) => (
                                    <MessageBox
                                        sendBy={data.sendBy}
                                        firstMsg={true}
                                        message={data.message}
                                        key={String(id)}
                                    />
                                ))}
                                <div ref={messagesEndRef} id="msgEnd" />
                            </div>
                        </div>

                        <div className="row-span-1 w-full rounded-3xl px-1 mt-auto mb-px">
                            <div className="w-full flex">
                                <textarea
                                    className="dark:bg-neutral-800 bg-neutral-100 border appearance-none rounded-3xl py-2 px-4 dark:text-white leading-tight focus:outline-none w-full h-full text-wrap overflow-x-hidden overflow-y-scroll scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                                    rows={1}
                                    onChange={(e) => {
                                        setInputText(e.target.value);
                                    }}
                                    value={inputText}
                                    onKeyDown={(e) => {
                                        e.key === 'Enter'
                                            ? inputText.trim() !== ''
                                                ? handleSendMsg(e)
                                                : null
                                            : null;
                                    }}
                                />

                                <button
                                    type="submit"
                                    className="justify-end text-blue-300 dark:text-blue-900 hover:scale-110 font-extrabold"
                                    onClick={handleSendMsg}
                                >
                                    <SendHorizontalIcon size={32} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
