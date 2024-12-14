import React from 'react';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
  className
}) => {
  return (
    <div className={`font-sans ${center ? 'text-center' : 'text-start'} ${className || ''}`}>
          <div className=" text-[30px] md:text-[50px] font-bold">
        {title}
      </div>
      <div className={` font-light text-[20px] text-neutral-500 mt-1`}>
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
