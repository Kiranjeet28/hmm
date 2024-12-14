import Image from 'next/image';
import React from 'react';
import Buttons from './buttons';
import img2 from "@/components/Images/logo.jpeg"

function Header() {
  return (
    <div>
      <div className='flex flex-row bg-white justify-between items-center p-5'>
        <Image
          // src={'https://www.gpfwjammu.edu.in/images/name.png'}
          src={img2}
          // width={1100}
          width={100}
          height={10}
          alt='logo'
        />
        <Buttons />
      </div>
      <div className='bg-main text-white font-serif text-[20px] md:text-[40px] flex items-center justify-center'>
        <span>Hostel Mess Management System</span>
      </div>
    </div>
  );
}

export default Header;
