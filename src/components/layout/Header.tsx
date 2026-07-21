import Link from "next/link";

// TODO: will change catchphrase
const Header = () => {
    return (
        <header className="p-2">
            <Link href="/" className="flex gap-2 items-end">
                <h1 className="text-2xl font-bold tracking-wider">REROLL</h1>
                <p>OBS 오버레이 관리 대시보드</p>
            </Link>
        </header>
    );
};

export default Header;
