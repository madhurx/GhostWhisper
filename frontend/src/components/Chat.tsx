'use client';
import Image from 'next/image';
import MessageBox from './MessageBox';
import { SendHorizontalIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface TypeMessage {
    message: string;
    sendBy: string;
    // Add other properties if needed
}

const Chat = () => {
    
    const [inputText, setInputText] = useState<string>('');
    const [receivedMsg, setReceivedMsg] = useState<string>('');
    const [allMessages, setAllMessages] = useState<TypeMessage[]>([]);
    const [roomName, setRoomName] = useState<string>('ABC');
    const [sendBy, setSendBy] = useState<string>();

    const handleInviteClick = (): void => {
        navigator.clipboard.writeText('pathname');
    };

    const SOCKET_ENDPOINT = process.env.SOCKET_ENDPOINT || '';
    const [socket, setSocket] = useState<any>(null);

    const handleSendMsg = (e: any) => {
        console.log(inputText);
        socket.emit('message', {
            message: inputText,
            room: roomName,
            userId: socket.id,
        });
    };

    useEffect(() => {
        const socket = io(SOCKET_ENDPOINT, {
            transports: ['websocket', 'polling', 'flashsocket'],
        });
        setSocket(socket);

        socket.on('welcome', (s) => {
            console.log(s);
        });

        socket.on('receive-message', (data) => {
            const { message, userId } = data;
            const sendByUser = userId === socket.id ? "self":"other"
            setSendBy(userId === socket.id ? 'self' : 'other');
            console.log("sendbyid" , userId)
            console.log("sendby" , sendBy)
            setReceivedMsg(message);
            setAllMessages((data) => [...data, { message, sendBy:sendByUser }]);
            console.log(message, userId);
            // console.log(data.message);
        });

        socket.emit('join-room', roomName);
        console.log("sendby" , sendBy)


        return () => {
            socket.close();
        };
    }, []);

    return (
        <div className="px-2 h-full">
            <div className="flex flex-col h-full">
                {/* Header Row */}
                <div className="flex w-full py-1 cursor-default -z-50 rounded-xl">
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
                            <div className="left-3 relative flex flex-nowrap">
                                <h1
                                    className="text-sm mx-1 cursor-pointer"
                                    onClick={handleInviteClick}
                                >
                                    + Invite
                                    <span className="hidden md:inline">
                                        {' '}
                                        Ghosts
                                    </span>
                                </h1>
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
                                {/* <MessageBox sendBy="self" firstMsg={false} />
                                <MessageBox sendBy="self" firstMsg={false} />
                                <MessageBox sendBy="other" firstMsg={true} />
                                <MessageBox sendBy="self" firstMsg={true} />
                                <MessageBox sendBy="other" firstMsg={true} />
                                <MessageBox sendBy="other" firstMsg={false} />
                                <MessageBox sendBy="self" firstMsg={true} /> */}
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
