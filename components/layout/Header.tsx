"use client";

import { useRouter } from "next/navigation";

// TODO: will change chatchphrase
const Header = () => {
    const router = useRouter();

    return (
        <header
            className="p-2 flex gap-2 items-end hover:cursor"
            onClick={() => router.push("/")}
        >
            <h1 className="text-2xl font-bold tracking-wider">REROLL</h1>
            <p>OBS 오버레이 관리 대시보드</p>
        </header>
    );
};

export default Header;
