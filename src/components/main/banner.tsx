import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import img1 from "@/components/Images/images.jpeg"
import img2 from "@/components/Images/logo.jpeg"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Define the interface for banner images
interface BannerImage {
    src: any;
    alt: string;
    link: string;
}
const bannerImages: BannerImage[] = [
    { src: img1, alt: 'Banner 1', link: 'https://www.gpfwjammu.edu.in/images/210725-hostel-1.jpg' },
        { src: img2, alt: 'Banner 2', link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGG9H8zjyJ9osk_y-ZmIftkeK29w5X2NEZg&s' },
]

// Define the array of banner images
// const bannerImages: BannerImage[] = [
//     { src: 'https://www.gpfwjammu.edu.in/images/210725-hostel-1.jpg', alt: 'Banner 1', link: 'https://www.gpfwjammu.edu.in/images/210725-hostel-1.jpg' },
//     { src: 'https://www.gpfwjammu.edu.in/images/hostel1.jpg', alt: 'Banner 2', link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGG9H8zjyJ9osk_y-ZmIftkeK29w5X2NEZg&s' },
//     { src: 'https://www.gpfwjammu.edu.in/images/210725-hostel-2.jpg', alt: 'Banner 3', link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNGG9H8zjyJ9osk_y-ZmIftkeK29w5X2NEZg&s' },

// ];

// Define the Banner component
const Banner: React.FC = () => {
    return (
        <div className="relative w-full h-[500px]">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]} // Include necessary Swiper modules
                navigation // Enable navigation arrows
                pagination={{ clickable: true }} // Enable pagination with clickable dots
                autoplay={{ delay: 5000, disableOnInteraction: false }} // Enable autoplay with 5-second delay
                loop // Enable continuous loop
                className="w-full h-full"
            >
                {bannerImages.map((image, index) => (
                    <SwiperSlide key={index} className="relative w-full h-full">
                        <Link href={image.link} passHref>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                fill
                                    priority={index === 0} // Priority loading for the first image
                                />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
