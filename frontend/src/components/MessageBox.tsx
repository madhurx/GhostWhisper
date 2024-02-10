'use client';

import Image from 'next/image';

const MessageBox = ({
    sendBy,
    firstMsg,
    message,
}: {
    sendBy: string;
    firstMsg: boolean;
    message: string;
}) => {
    if (sendBy === 'self') {
        return (
            <div className="max-w-[65%] flex items-start my-1 ms-auto">
                <div className="mx-2 justify-start flex flex-col">
                    <div
                        className={`rounded-3xl p-2 dark:bg-blue-900 bg-blue-300 border ${
                            firstMsg ? ' rounded-tr-none' : ''
                        }`}
                    >
                        <p className="text-justify">{message}</p>
                    </div>
                </div>
            </div>
        );
    } else if (sendBy === 'system') {
        return (
            <div className="max-w-[65%] flex items-center my-1 mx-auto">
                <div className="mx-2 justify-center flex flex-col">
                    <div
                        className={`rounded-md p-2 dark:bg-neutral-800 bg-neutral-100 border py-px`}
                    >
                        <p className="text-justify">{message}</p>
                    </div>
                </div>
            </div>
        );
    } else if (sendBy) {
        return (
            <div className="max-w-[65%] flex items-start my-1 me-auto">
                <div className="h-full items-start flex">
                    {firstMsg ? (
                        <Image
                            src={'/group-icon.png'}
                            width={40}
                            height={40}
                            alt="pfpImg"
                            quality={100}
                            loading="lazy"
                            className="rounded-full border"
                        />
                    ) : (
                        <Image
                            src={'/group-icon.png'}
                            width={90}
                            height={90}
                            alt="pfpImg"
                            quality={100}
                            loading="lazy"
                            className="rounded-full border opacity-0"
                        />
                    )}
                </div>
                <div className="mx-2 justify-start flex flex-col">
                    <div
                        className={`rounded-3xl py-1 px-2 dark:bg-neutral-800 bg-neutral-100 border ${
                            firstMsg ? ' rounded-ss-none' : ''
                        }`}
                    >
                        {firstMsg ? (
                            <div className="text-green-600">
                                <h1>{sendBy}</h1>
                            </div>
                        ) : null}
                        <p className="text-justify">{message}</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default MessageBox;
