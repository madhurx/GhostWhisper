'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AES from 'crypto-js/aes';
import encBase64 from 'crypto-js/enc-base64';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const CRYPTO_KEY = process.env.CRYPTO_KEY || '';
const page = () => {
    const [userName, setUserName] = useState<string>('');

    const handleEnterChat = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ): void => {
        e.preventDefault();
        const encryptName = AES.encrypt(
            userName,
            CRYPTO_KEY,
        ).ciphertext.toString(encBase64);

        const encryptURL = AES.encrypt(
            Math.floor(100000 + Math.random() * 900000).toString(),
            CRYPTO_KEY,
        ).ciphertext.toString(encBase64);

        console.log(encryptName);
    };

    return (
        <MaxWidthWrapper>
            <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl max-h-screen">
                <div className="flex flex-col lg:flex-row w-full h-full items-center justify-center">
                    <div className="w-3/4 md:w-1/2 items-center justify-center">
                        <div className="relative h-full drop-shadow-2xl flex flex-col">
                            <Image
                                src={'/anonChatIndex.png'}
                                width={100}
                                height={100}
                                alt="anonChatIndexImg"
                                quality={100}
                                objectFit="contain"
                                loading="lazy"
                                layout="responsive"
                            />
                        </div>
                    </div>
                    <div className="w-3/4 md:w-1/2 items-center justify-center flex flex-col py-5">
                        <div className="w-full px-10">
                            <form>
                                <div className=" grid w-full max-w-sm gap-2.5">
                                    <Label htmlFor="name">Display Name</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        placeholder="Enter display name"
                                        className="text-center"
                                        maxLength={20}
                                        value={userName}
                                        onChange={(e) => {
                                            setUserName(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            e.key === 'Enter'
                                                ? userName.trim() !== ''
                                                    ? handleEnterChat
                                                    : null
                                                : null;
                                        }}
                                    />
                                    {/* <Link href={'/anonChat/go'} className=""> */}
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        onClick={(e) => {
                                            return userName.trim() !== ''
                                                ? handleEnterChat(e)
                                                : null;
                                        }}
                                    >
                                        Join
                                    </Button>
                                    {/* </Link> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    );
};

export default page;
