"use client"
import React from "react";
import Image from "next/image";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Poppins } from "next/font/google";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";

const pop = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const Profile = () => {
    const {data: session} = useSession()
    const user = session?.user;

    // react-hook-form
    const {register, watch, setValue, handleSubmit, formState: {error}} = useForm(); 

    const uploadPhoto = (result ) => {
        setValue("profileImage", result?.info?.secure_url)
    }
  return (
    // outer viewport
    <div className={`${pop.className} flex flex-row justify-center mt-20`}>
      {/* box */}
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl">Edit Your Profile</h1>
        {/* form */}
        <form action="" className="space-y-4 mt-4">
          {/* input-username */}
          <div className="flex flex-row border border-slate-300 rounded-md px-3 py-1 my-2 w-full focus-within:border-slate-600 focus-within:border-2">
            <Input {...register("username", {required: "Username is required", validate: (value) => {if(value.length < 3) {return "Username must be atleast 3 characters long"}}})}
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
          {/* profile image */}
          <div className="flex flex-row justify-around">
            <Image
              src={watch("profileImage") || user?.profileImage || "/assests/person.jpg"}
              alt="user-profile"
              width={180}
              height={180}
            />
            <div className="flex items-center ml-5">
              <CldUploadButton options={{maxFiles: 1}} onUpload={uploadPhoto} uploadPreset="euk8fafl">
              <p className="border-2 border-black bg-transparent text-black rounded-md p-3 hover:bg-slate-200 ">Upload New Image</p>
              </CldUploadButton>
            </div>
          </div>
          {/* submit-button */}
          <Button className="w-full bg-cyan-500 hover:bg-cyan-700 text-lg" type="submit" >Save Changes</Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
