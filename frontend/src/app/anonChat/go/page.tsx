'use client';

import { redirect, useSearchParams } from 'next/navigation';
import Chat from '../../../components/Chat';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import CryptoJS from 'crypto-js';

const CRYPTO_KEY = process.env.CRYPTO_KEY || '';

const page = () => {
    const searchParams = useSearchParams();
    const chatId = searchParams.get('chatId') || '';
    const userId = searchParams.get('userId') || undefined;

    if (userId === '' || !userId || userId === undefined) {
        redirect(`/anonChat?chatId=${chatId}`);
    }

    const decryptedBytes = AES.decrypt(decodeURIComponent(userId), CRYPTO_KEY);
    const userName = decryptedBytes.toString(Utf8);

    return (
        <MaxWidthWrapper>
            <div className="py-2 mx-auto my-2 md:grid md:grid-flow-col flex max-w-full border rounded-lg h-[calc(100vh-5rem)] md:auto-cols-fr">
                <div className="col-span-1 hidden md:block">buttons</div>
                <div className="col-span-2 hidden md:block">user</div>
                <div className="md:col-span-6 w-full grid grid-flow-row">
                    <Chat chatId={chatId} userName={userName} />
                </div>
                <div className="col-span-2 hidden md:block">
                    <button>ABC</button>
                </div>
            </div>
        </MaxWidthWrapper>
    );
};

export default page;

// https://dribbble.com/shots/20298059-Messenger-UI
