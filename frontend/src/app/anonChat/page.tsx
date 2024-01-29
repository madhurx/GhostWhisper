'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const page = () => {
    const [userName, setUserName] = useState<string>('');

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
                                                    ? null
                                                    : null
                                                : null;
                                        }}
                                    />
                                    <Link href={'/anonChat/go'} className="">
                                        <Button
                                            type="submit"
                                            className="w-full"
                                        >
                                            Join
                                        </Button>
                                    </Link>
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
