"use client";

import { useState } from "react";
import Image from "next/image";

export default function LoginForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 500)); // TODO: replace with real auth
    setStatus("done");
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={onSubmit}>
      <div>
        <label htmlFor="email" className="block text-[0.81rem] font-medium text-gray-700">Email</label>
        <input
          id="email" name="email" type="email" required placeholder="Enter your email"
          className="mt-2 w-full rounded-md border border-gray-300 px-[0.81rem] py-[0.63rem] text-[0.81rem] focus:ring-2 focus:ring-gray-200"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-[0.81rem] font-medium text-gray-700">Password</label>
          <a href="#" className="text-[0.72rem] text-[#0ad3f2] hover:underline">Forgot Password?</a>
        </div>
        <input
          id="password" name="password" type="password" required placeholder="Enter your password"
          className="mt-2 w-full rounded-md border border-gray-300 px-[0.81rem] py-[0.63rem] text-[0.81rem] focus:ring-2 focus:ring-gray-200"
        />
      </div>

      <label className="inline-flex items-center text-[0.81rem] text-gray-700">
        <input type="checkbox" className="mr-[0.63rem] h-[0.99rem] w-[0.99rem] rounded border-gray-300" />
        Remember me
      </label>

      <button
        type="submit"
        className="w-full rounded-md bg-[#0B1B2B] px-[0.81rem] py-[0.63rem] text-[0.81rem] font-semibold text-white hover:brightness-110"
      >
        {status === "sending" ? "Signing in..." : status === "done" ? "Signed in" : "Sign in"}
      </button>

      {/* Divider */}
      <div className="relative py-[0.63rem]">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-[0.81rem]">
          <span className="bg-white px-[0.63rem] text-gray-500">or</span>
        </div>
      </div>

      <button
        type="button"
        className="w-full inline-flex items-center justify-center gap-[0.7rem] rounded-md border border-gray-300 bg-white px-[0.9rem] py-[0.7rem] text-[0.9rem] hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
        onClick={() => alert("Wire up Google with next-auth here")}
      >
        <Image src="/assets/LoginPage/google img.png" alt="Google" width={18} height={18} /> Sign in with Google
      </button>
    </form>
  );
}
