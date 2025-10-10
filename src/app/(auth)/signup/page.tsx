"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import image from "../../../../public/assets/LoginPage/ef289c0b93b0fa3821609260c7ba5b1e569cfac1.png";
import blueGradientBg from "../../../../public/assets/LoginPage/Blue Gradient.jpg";

const SignupPage = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 500)); // TODO: replace with real auth
    setStatus("done");
  }

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-[40vw_60vw] bg-white">
      {/* LEFT: image + caption - 40% */}
      <section className="relative hidden lg:block w-full min-h-screen">
        {/* Blue gradient background image */}
        <Image 
          src={blueGradientBg} 
          alt="Blue gradient background" 
          fill 
          priority 
          className="object-cover w-full h-full" 
        />
        {/* Black gradient overlay for bottom 20% */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-20% to-transparent to-30%" />
        {/* Dull overlay for entire image - 20% */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-8 left-8 right-8 text-white pb-[10%] pl-[7%]">
          <p className="w-[70%] text-lg sm:text-xl lg:text-[29.75px] leading-relaxed font-inter font-semibold">
            Smarter recruiting, powered by AI — find the right jobs, candidates, and matches in seconds.
          </p>
        </div>
      </section>

      {/* RIGHT: form - 60% */}
      <section className="flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-10">
        <div className="w-full max-w-[531px] space-y-6 sm:space-y-8 lg:space-y-11">
          <div className="flex justify-center mb-4 sm:mb-6 mt-4 sm:mt-8">
            {/* Logo */}
            <Image src={image} alt="Logo" width={50} height={50} className="sm:w-[65px] sm:h-[65px]" />
          </div>

          <div className="text-center space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-[1.8rem] font-bold">Create Account</h1>
            <p className="text-sm sm:text-[0.9rem] text-black">Sign up to get started</p>
          </div>

          <form className="mt-4 sm:mt-8 space-y-4 sm:space-y-5" onSubmit={onSubmit}>
            {/* Name fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-xs sm:text-[0.81rem] font-medium text-gray-700">First Name</label>
                <input
                  id="firstName" name="firstName" type="text" required placeholder="Enter first name"
                  className="mt-1.5 sm:mt-2 w-full rounded-md border border-gray-300 px-3 py-2 sm:px-[0.81rem] sm:py-[0.63rem] text-sm sm:text-[0.81rem] focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs sm:text-[0.81rem] font-medium text-gray-700">Last Name</label>
                <input
                  id="lastName" name="lastName" type="text" required placeholder="Enter last name"
                  className="mt-1.5 sm:mt-2 w-full rounded-md border border-gray-300 px-3 py-2 sm:px-[0.81rem] sm:py-[0.63rem] text-sm sm:text-[0.81rem] focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs sm:text-[0.81rem] font-medium text-gray-700">Email</label>
              <input
                id="email" name="email" type="email" required placeholder="Enter your email"
                className="mt-1.5 sm:mt-2 w-full rounded-md border border-gray-300 px-3 py-2 sm:px-[0.81rem] sm:py-[0.63rem] text-sm sm:text-[0.81rem] focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs sm:text-[0.81rem] font-medium text-gray-700">Password</label>
              <input
                id="password" name="password" type="password" required placeholder="Create a password"
                className="mt-1.5 sm:mt-2 w-full rounded-md border border-gray-300 px-3 py-2 sm:px-[0.81rem] sm:py-[0.63rem] text-sm sm:text-[0.81rem] focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs sm:text-[0.81rem] font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirmPassword" name="confirmPassword" type="password" required placeholder="Confirm your password"
                className="mt-1.5 sm:mt-2 w-full rounded-md border border-gray-300 px-3 py-2 sm:px-[0.81rem] sm:py-[0.63rem] text-sm sm:text-[0.81rem] focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <label className="inline-flex items-start text-xs sm:text-[0.81rem] text-gray-700">
              <input type="checkbox" className="mr-2 sm:mr-[0.63rem] mt-0.5 h-4 w-4 sm:h-[0.99rem] sm:w-[0.99rem] rounded border-gray-300" required />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            <button
              type="submit"
              className="w-full rounded-md bg-[#0B1B2B] px-3 py-2.5 sm:px-[0.81rem] sm:py-[0.63rem] text-sm sm:text-[0.81rem] font-semibold text-white hover:brightness-110"
            >
              {status === "sending" ? "Creating account..." : status === "done" ? "Account created" : "Sign up"}
            </button>

            {/* Divider */}
            <div className="relative py-2 sm:py-[0.63rem]">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-[0.81rem]">
                <span className="bg-white px-2 sm:px-[0.63rem] text-gray-500">or</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 sm:gap-[0.7rem] rounded-md border border-gray-300 bg-white px-3 py-2.5 sm:px-[0.9rem] sm:py-[0.7rem] text-sm sm:text-[0.9rem] hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
              onClick={() => alert("Wire up Google with next-auth here")}
            >
              <Image src="/assets/LoginPage/google img.png" alt="Google" width={16} height={16} className="sm:w-[18px] sm:h-[18px]" /> Sign up with Google
            </button>
          </form>

          <p className="mt-6 sm:mt-10 text-center text-sm sm:text-[0.95rem] text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#0ad3f2] hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default SignupPage;
