import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { FaUser } from 'react-icons/fa'
import { Button } from '../ui/button'
import Image from 'next/image';

export default function Buttons() {
    const { data: session } = useSession();
    return (
        <div>
            {session ? (
                <div className="flex  flex-col items-center gap-2 ">
                    <a href="./allDetails" className='flex justify-center items-center flex-col'>
                        {
                                session.Student.Image ?
                            <div className =''>
                                <Image
                                    src={session.Student.Image}
                                    alt='Profile'
                                        className=' animate-shimmer bg-[linear-gradient(110deg,#015091,45%,#5bacee,55%,#16446a)] bg-[length:200%_100%] p-[1px] rounded-full transition-transform hover:scale-150 hover:my-4 '
                                        width={50}
                                        height={50}
                                /> 
                            </div>
                                : <div className="w-12 h-12 rounded-full  flex items-center justify-center text-white font-bold text-lg animate-shimmer bg-[linear-gradient(110deg,#015091,45%,#5bacee,55%,#16446a)] bg-[length:200%_100%]">
                                    {session.Student.Name.charAt(0).toUpperCase()}
                                </div>
                        }
                        
                        
                        <span className='text-main font-bold font-sans '>{session.user?.name}</span>
                    </a>
                </div>
            ) : (

                <Button
                    variant="link"
                    className='rounded-full p-5 bg-main text-white font-sans text-lg px-7'
                    onClick={() => signIn('google')} // Trigger Google sign-in
                >
                    Sign in with Google
                </Button>
            )}
        </div>
    )
}