// components/LogoutButton.js
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-4 py-2  border border-black  text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none ml-5"
        >
            <span>Logout</span>
        </button>
    );
}
