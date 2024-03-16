import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { Concert_One } from "next/font/google";

const pop = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const san = Concert_One({ subsets: ["latin"], weight: ["400"] });

const Form = ({ type }) => {
  return (
    // outer viewport
    <div
      className={`${pop.className} layout flex flex-row justify-center items-center h-screen`}
    >
      {/* box */}
      <div className="content flex flex-col items-center border border-slate-300 p-3 rounded-lg shadow-lg shadow-slate-400">
        {/* logo heading */}
        <div className="logo flex flex-row">
          <Image src="/assests/logo.png" alt="logo" width={50} height={50} />
          <h1 className={`${san.className} text-4xl font-extrabold mt-2 ml-2`}>
            Chit-Chat
          </h1>
        </div>
        {/* form */}
        <form action="" className="form w-80 flex flex-col items-center">
          {/* conditional rendering */}
          {type === "register" && (
            <div className="input flex flex-row border border-slate-300 rounded-md px-3 py-1 my-2 w-full focus-within:border-slate-600 focus-within:border-2">
              <Input
                type="text"
                placeholder="Username"
                className="text-md  p-0 border-none focus-visible:ring-offset-0 focus-visible:ring-offset-transparent focus-visible:ring-transparent"
              />
              <Image
                src="/assests/user.svg"
                alt="user"
                width={20}
                height={20}
                className="w-5 h-5 mt-2 stroke-slate-300"
              />
            </div>
          )}
          {/* email */}
          <div className="email flex flex-row border border-slate-300 rounded-md px-3 py-1 my-2 w-full focus-within:border-slate-600 focus-within:border-2">
            <Input
              type="email"
              placeholder="Email"
              className="text-md  p-0 border-none focus-visible:ring-offset-0 focus-visible:ring-offset-transparent focus-visible:ring-transparent"
            />
            <Image
              src="/assests/email.svg"
              alt="email"
              width={20}
              height={20}
              className="w-5 h-5 mt-2 "
            />
          </div>
          {/* password */}
          <div className="password flex flex-row border border-slate-300 rounded-md px-3 py-1 my-2 w-full focus-within:border-slate-600 focus-within:border-2">
            <Input
              type="password"
              placeholder="Password"
              className="text-md  p-0 border-none focus-visible:ring-offset-0 focus-visible:ring-offset-transparent focus-visible:ring-transparent"
            />
            <Image
              src="/assests/password.svg"
              alt="password"
              width={20}
              height={20}
              className="w-5 h-5 mt-2 stroke-red-500 "
            />
          </div>
          {/* button */}
          <Button type="submit" className="w-full text-md bg-primary hover:bg-cyan-600 font-semibold">
            {type === "register" ? "Register for Free" : "Login"}
          </Button>
        </form>
        {/* link */}
        {type === "register" ? (
          <Link href="/">
            <h1 className="mt-2 text-slate-500 hover:text-black text-sm hover:text-semibold">Already have an account. Sign in Here!</h1>
          </Link>
        ) : (
          <Link href="/register">
            <h1 className="mt-2 text-slate-500 hover:text-black text-sm hover:text-semibold">Don't have an account. Register Here!</h1>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Form;
