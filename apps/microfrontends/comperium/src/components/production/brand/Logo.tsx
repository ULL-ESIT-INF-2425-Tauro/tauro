import Link from 'next/link';

export function Logo() {
  return (
    <div className="flex items-center space-x-1 sm:space-x-2 mt-4 ms-12 h-48 w-48 drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
      <Link href="/">
        <img
          src="/TauroLetters.png"
          alt="Tauro logo"
          className="h-full w-full object-contain select-none"
        />
      </Link>
    </div>
  );
}
