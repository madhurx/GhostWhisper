import Chat from '@/components/Chat';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const page = () => {

    return (
        <MaxWidthWrapper>
            <div className="py-2 mx-auto my-2 md:grid md:grid-flow-col flex max-w-full border rounded-lg h-[calc(100vh-5rem)] md:auto-cols-fr">
                <div className="col-span-1 hidden md:block">buttons</div>
                <div className="col-span-2 hidden md:block">user</div>
                <div className="md:col-span-6 w-full grid grid-flow-row">
                    <Chat/>
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
