'use client';
import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import { ModeToggle } from './ModeToggle';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const user = false;
    const pathname = usePathname();
    const isAnonChatPage = pathname === '/anonChat';
    return (
        <div className="sticky z-50 top-0 inset-x-0 h-16">
            <div className="relative">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-400">
                        <div className="flex h-16 items-center">
                            <div className="ml-4 flex">
                                <Link href={'/'}>GhostWhisper</Link>
                            </div>

                            {!isAnonChatPage && (
                                <div className="hidden z-50 md:block">
                                    <h1 className="ml-5">
                                        <Link
                                            href={'/anonChat'}
                                            className={buttonVariants({
                                                variant: 'ghost',
                                            })}
                                        >
                                            Secret Chat
                                        </Link>
                                    </h1>
                                </div>
                            )}

                            <div className="ml-auto flex items-center">
                                {!isAnonChatPage ? (
                                    <div className="hidden md:flex md:flex-1 md:items-center lg:justify-end lg:space-x-6">
                                        {user ? null : (
                                            <Link
                                                href={'/sign-in'}
                                                className={buttonVariants({
                                                    variant: 'ghost',
                                                })}
                                            >
                                                Sign-In
                                            </Link>
                                        )}

                                        {user ? null : (
                                            <span className="h-6 w-px dark:bg-gray-300 bg-gray-700" />
                                        )}

                                        {user ? null : (
                                            <Link
                                                href={'/sign-up'}
                                                className={buttonVariants({
                                                    variant: 'ghost',
                                                })}
                                            >
                                                Sign-Up
                                            </Link>
                                        )}

                                        {user ? null : (
                                            <span className="h-6 w-px dark:bg-gray-300 bg-gray-700" />
                                        )}

                                        <ModeToggle />
                                    </div>
                                ) : (
                                    <div className="hidden md:flex md:flex-1 md:items-center lg:justify-end lg:space-x-6">
                                        <ModeToggle />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>
        </div>
    );
};

export default Navbar;
