import Chat from '@/components/Chat';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const page = () => {
    return (
        <MaxWidthWrapper>
            <div className="py-4 mx-auto my-6 md:grid md:grid-flow-col flex max-w-full border rounded-lg h-[calc(100vh-8rem)] md:auto-cols-fr">
                <div className="col-span-1 hidden md:block">buttons</div>
                <div className="col-span-3 hidden md:block">user</div>
                <div className="md:col-span-5 w-full">
                    <Chat />
                </div>
                <div className="col-span-3 hidden md:block"></div>
            </div>
        </MaxWidthWrapper>
    );
};

export default page;

// https://dribbble.com/shots/20298059-Messenger-UI
