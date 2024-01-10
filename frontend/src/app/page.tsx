import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { ModeToggle } from '@/components/ModeToggle';

export default function Home() {
    return (
        <MaxWidthWrapper>
            <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                <div className="text-4xl font-bold tracking-normal sm:text-6xl">
                    <h1>Whisper in the Shadows</h1>
                    <h1 className="text-blue-500">
                        Your Words, Your Secrets, Your Anonymity
                    </h1>
                </div>
            </div>
        </MaxWidthWrapper>
    );
}
