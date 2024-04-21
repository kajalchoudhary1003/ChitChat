"use client";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { Concert_One } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const pop = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const san = Concert_One({ subsets: ["latin"], weight: ["400"] });

const TopBar = () => {
  const pathname = usePathname();
  // logout function
  const handleLogout = async () => {
    signOut({ callbackUrl: "/" });
  };
  // to assess current user
  const { data: session } = useSession();
  const user = session?.user;
  return (
    // navigation bar
    <div>
      <div
        className={`${pop.className} flex flex-row justify-between py-4 bg-slate-100`}
      >
        {/* logo and name */}
        <div className="flex flex-row justify-start space-x-3 pl-5">
          <Link href="/chats">
            <Image src="/assests/logo.png" alt="logo" width={50} height={50} />
          </Link>
          <Link href="/chats">
            <h1 className={`${san.className} text-5xl cursor-pointer`}>
              Chit-Chat
            </h1>
          </Link>
        </div>
        {/* nav items */}
        <div className="flex flex-row justify-end space-x-5 pr-5">
          <Link
            href="/chats"
            className={`${pathname === "/chats" ? "text-cyan-700" : ""}`}
          >
            <h1 className="text-2xl pt-2 font-semibold cursor-pointer">
              Chats
            </h1>
          </Link>
          <Link
            href="/contacts"
            className={`${pathname === "/contacts" ? "text-cyan-700" : ""}`}
          >
            {" "}
            <h1 className="text-2xl pt-2 font-semibold cursor-pointer">
              Contacts
            </h1>
          </Link>
          <Image
            src="/assests/logout.svg"
            className="cursor-pointer logout"
            onClick={handleLogout}
            alt="logout"
            width={35}
            height={35}
          />
          <Link href="/profile">
            {" "}
            <Image
              src={user?.profileImage || "/assests/person.jpg"}
              className="cursor-pointer rounded-full"
              alt="profile-image"
              width={50}
              height={50}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
