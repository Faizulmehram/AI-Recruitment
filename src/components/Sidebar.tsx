import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="w-80 bg-white shadow-lg rounded-tr-3xl">
      <div className="p-6">
        <div className="flex items-center justify-center">
          <Link href="/dashboard" className="cursor-pointer">
            <Image 
              src="/assets/dashboard/lgo with name.png"
              alt="STREVIO Logo"
              width={181}
              height={40}
              className="object-contain max-w-full h-auto hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          <li>
            <a href="#" className="group flex items-center px-4 py-3 text-white bg-black rounded-lg transition-colors">
              <Image 
                src="/assets/dashboard/vectors/dashboard.svg"
                alt="Dashboard"
                width={20}
                height={20}
                className="mr-3 invert"
              />
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="group flex items-center px-4 py-3 text-black bg-white rounded-lg hover:bg-black hover:text-white transition-colors">
              <Image 
                src="/assets/dashboard/vectors/job.svg"
                alt="Jobs"
                width={20}
                height={20}
                className="mr-3 grayscale group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              />
              Jobs
            </a>
          </li>
          <li>
            <a href="#" className="group flex items-center px-4 py-3 text-black bg-white rounded-lg hover:bg-black hover:text-white transition-colors">
              <Image 
                src="/assets/dashboard/vectors/candidates.svg"
                alt="Candidates"
                width={20}
                height={20}
                className="mr-3 grayscale group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              />
              Candidates
            </a>
          </li>
          <li>
            <a href="#" className="group flex items-center px-4 py-3 text-black bg-white rounded-lg hover:bg-black hover:text-white transition-colors">
              <Image 
                src="/assets/dashboard/vectors/interview.svg"
                alt="Interviews"
                width={20}
                height={20}
                className="mr-3 grayscale group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              />
              Interviews
            </a>
          </li>
          <li>
            <a href="#" className="group flex items-center px-4 py-3 text-black bg-white rounded-lg hover:bg-black hover:text-white transition-colors">
              <Image 
                src="/assets/dashboard/vectors/analytics.svg"
                alt="Analytics"
                width={20}
                height={20}
                className="mr-3 grayscale group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              />
              Analytics
            </a>
          </li>
          <li>
            <a href="#" className="group flex items-center px-4 py-3 text-black bg-white rounded-lg hover:bg-black hover:text-white transition-colors">
              <Image 
                src="/assets/dashboard/vectors/settings.svg"
                alt="Settings"
                width={20}
                height={20}
                className="mr-3 grayscale group-hover:invert group-hover:brightness-0 group-hover:contrast-200"
              />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
