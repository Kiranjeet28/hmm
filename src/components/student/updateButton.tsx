// components/BackButton.js
import { useRouter } from 'next/router';
import { Button } from '../ui/button';

export default function UpdateButton() {
    const router = useRouter();

    return (
        <button className="px-4 py-2 rounded-full border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
 
            onClick={() => router.push("/updateDetails")}
            
        >
            Update
</button>
        
    );
}
