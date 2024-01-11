import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function Home() {
    return (
        <MaxWidthWrapper>
            <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                <div className="text-5xl font-bold tracking-normal sm:text-5xl">
                    <h1>Whisper in the Shadows</h1>
                    <h1 className="text-blue-500">
                        Your Words, Your Secrets,
                        <span className="hidden md:inline">
                            <br />
                        </span>
                        <span className="md:hidden"> </span>
                        Your Anonymity
                    </h1>
                </div>
            </div>
        </MaxWidthWrapper>
    );
}
