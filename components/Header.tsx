import Image from "next/image";

export default function Header() {
  return (
    <header className="relative py-4 shadow-sm bg-[#F4E5DA] text-[#144949]">
      <a href="/">
        <h1 className="text-3xl font-bold text-center">AnonCetty</h1>
      </a>
      <a href="/">
        <img
          src="/logo.jpg"
          alt="AnonCetty"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10"
        />
      </a>
    </header>
  );
}
