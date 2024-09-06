import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Freekick Club",
  description: "A Freekick Club site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Header = () => {
    const links = [
      { name: "Premier League", href: "/premier-league" },
      { name: "La Liga", href: "/laliga" },
      { name: "Champtions league", href: "/cl" },
      { name: "ISL", href: "/isl" },
      { name: "Kerala Super League", href: "/kerala-super-league" },
      { name: "I-League", href: "/i-league" },
      { name: "International", href: "/international" },
    ];

    return (
      <div className="bg-black h-20 flex justify-between items-center font-semibold px-5">
        <Link
          href={"/"}
          className="text-white hover:text-amber-200 transition-colors transform hover:scale-[1.1] transition-transform duration-200 ease-in-out inline-block"
        >
          <Image
            src="/freekicklogo.jpg"
            alt="Freekick Club Logo"
            className="dark:invert"
            height={50}
            width={50}
            priority
          />
        </Link>
        <nav className="mx-4">
          <ul className="flex justify-center space-x-4">
            {links.map((link) => (
              <li key={link.name} className="px-1">
                <Link
                  href={link.href}
                  className="text-white hover:text-amber-200 transition-colors transform hover:scale-[1.03] transition-transform duration-200 ease-in-out inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* <Image
          src="https://awareak.org/wp-content/uploads/2023/07/CITYPNG.COMHD-White-Instagram-Round-Logo-Icon-PNG-1600x1200-1.png"
          alt="Instagram"
          height={50}
          width={50}
        /> */}
      </div>
    );
  };
  const Footer = () => {
    // const links = [{ name: "About us", href: "/isl" }];
    return (
      <div className="bg-black h-12 flex justify-between items-center font-semibold px-5">
        <Link
          href={"/"}
          className="text-white text-xs transition-colors transform transition-transform duration-200 ease-in-out inline-block"
        >
          FreekickClub2024™
        </Link>
        {/* <nav className="mx-4">
          <ul className="flex justify-center space-x-4">
            {links.map((link) => (
              <li key={link.name} className="px-2">
                <Link
                  href={link.href}
                  className="text-white hover:text-amber-200 transition-colors transform hover:scale-[1.03] transition-transform duration-200 ease-in-out inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav> */}
        <Link
          href={
            "https://www.instagram.com/freekickclub_offcl?igsh=MWdlc2VpYXVqdzBweg=="
          }
        >
          <Image
            src="https://awareak.org/wp-content/uploads/2023/07/CITYPNG.COMHD-White-Instagram-Round-Logo-Icon-PNG-1600x1200-1.png"
            alt="Instagram"
            height={30}
            width={30}
          />
        </Link>
      </div>
    );
  };

  const LiveScoreComingSoon = () => {
    return (
      <div className="bg-amber-50 h-10 flex justify-between items-center font-semibold px-5 overflow-hidden">
        <p className="rounded-lg px-2 py-[2px] animate-slide">
          ⚡ Live score coming soon. Stay tuned ⚡
        </p>
      </div>
    );
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <LiveScoreComingSoon />
        <section className="min-h-[81vh]">{children}</section>
        <Footer />
      </body>
    </html>
  );
}
