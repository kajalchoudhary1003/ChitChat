"use client";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { Concert_One } from "next/font/google";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const pop = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const san = Concert_One({ subsets: ["latin"], weight: ["400"] });

const Form = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    if (type === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/");
      }
      if (res.error) {
        toast.error("Something went wrong");
      }
    }
    if (type === "login") {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res.ok) {
        router.push("/chats");
      }
      if (res.error) {
        toast.error("Invalid email or password");
      }
    }
  };

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form w-80 flex flex-col items-center"
        >
          {/* conditional rendering */}
          {type === "register" && (
            // username
            <>
              <div className="input flex flex-row border border-slate-300 rounded-md px-3 py-1 my-2 w-full focus-within:border-slate-600 focus-within:border-2">
                <Input
                  defaultValue=""
                  {...register("username", {
                    required: "username is required",
                    validate: (value) => {
                      if (value.length < 3)
                        return "username must be atleast 3 characters long";
                    },
                  })}
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
              {errors.username && (
                <p className="text-red-500 text-sm self-start">
                  {errors.username.message}
                </p>
              )}
            </>
          )}
          {/* email */}
          <>
            <div className="email flex flex-row border border-slate-300 rounded-md px-3 py-1 my-2 w-full focus-within:border-slate-600 focus-within:border-2">
              <Input
                defaultValue=""
                {...register("email", {
                  required: "email is required",
                })}
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
            {errors.email && (
              <p className="text-red-500 text-sm self-start">
                {errors.email.message}
              </p>
            )}
          </>
          {/* password */}
          <>
            <div className="password flex flex-row border border-slate-300 rounded-md px-3 py-1 my-2 w-full focus-within:border-slate-600 focus-within:border-2">
              <Input
                defaultValue=""
                {...register("password", {
                  required: "password is required",
                  validate: (value) => {
                    if (
                      value.length < 5 ||
                      !value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)
                    )
                      return "password must be atleast 5 characters long and contain atleast one special character";
                  },
                })}
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
            {errors.password && (
              <p className="text-red-500 text-sm self-start">
                {errors.password.message}
              </p>
            )}
             
          </>
          {/* button */}
          <Button
            type="submit"
            className="w-full text-md bg-primary hover:bg-cyan-600 font-semibold"
          >
            {type === "register" ? "Register for Free" : "Login"}
          </Button>
        </form>
        {/* link */}
        {type === "register" ? (
          <Link href="/">
            <h1 className="mt-2 text-slate-500 hover:text-black text-sm hover:text-semibold">
              Already have an account. Sign in Here!
            </h1>
          </Link>
        ) : (
          <Link href="/register">
            <h1 className="mt-2 text-slate-500 hover:text-black text-sm hover:text-semibold">
              Don't have an account. Register Here!
            </h1>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Form;
