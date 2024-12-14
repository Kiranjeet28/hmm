// components/BackButton.js
import { useRouter } from 'next/router';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-black rounded-full hover:bg-neutral-300 focus:outline-none border-black border-1 "
        >
            <ArrowLeftIcon className="h-5 w-5 text-black " />
        </button>
    );
}
