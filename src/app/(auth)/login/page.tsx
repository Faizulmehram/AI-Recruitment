import Image from "next/image";
import Link from "next/link";
import LoginForm from "./LoginForm";
import image from "../../../../public/assets/LoginPage/ef289c0b93b0fa3821609260c7ba5b1e569cfac1.png";
import blueGradientBg from "../../../../public/assets/LoginPage/Blue Gradient.jpg";
export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-[40vw_60vw] bg-white">
      {/* LEFT: image + caption (optional image) - 40% */}
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
          <p className="w-[70%] text-[29.75px] leading-relaxed font-inter font-semibold">
            Smarter recruiting, powered by AI — find the right jobs, candidates, and matches in seconds.
          </p>
        </div>
      </section>

      {/* RIGHT: form - 60% */}
      <section className="flex items-center justify-center py-12 px-6 sm:px-10">
        <div className="w-[531px] h-[838px] space-y-11">
          <div className="flex justify-center mb-6 mt-8">
            {/* Replace with your logo if available */}
            <Image src={image} alt="Logo" width={65} height={65} />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-[1.8rem] font-bold">Welcome Back</h1>
            <p className="text-[0.9rem] text-black">Sign in to your account</p>
          </div>

          <LoginForm />

          <p className="mt-10 text-center text-[0.95rem] text-gray-600">
            Need an account?{" "}
            <Link href="/register" className="text-[#0ad3f2] hover:underline font-medium text-[0.95rem]">Create a new account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
