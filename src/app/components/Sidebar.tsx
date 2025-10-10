
import Image from "next/image";

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[14px] transition-colors duration-200
        ${active ? "bg-[#0b1227] text-white" : "text-[#0f172a] hover:bg-[#0b1227] hover:text-white"}`}
    >
      <span className="inline-grid h-5 w-5 place-items-center">
        <Image
          src={`/assets/dashboard/vectors/${icon}.svg`}
          alt=""
          width={18}
          height={18}
          className={active ? "invert" : "group-hover:invert"}
        />
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default function Sidebar() {
  return (
  <aside className="sticky top-0 h-screen w-[340px] max-w-full shrink-0 border-r border-slate-200 bg-white min-w-[70px] md:w-[340px] md:block hidden">
      <div className="flex justify-center items-center px-4 py-6">
        <a href="/dashboard">
          <Image
            src="/assets/dashboard/lgo with name.png"
            alt="STREVIO"
            width={180}
            height={44}
            priority
          />
        </a>
      </div>
      <div className="mt-2 space-y-1 px-3">
        <SidebarItem icon="dashboard" label="Dashboard" active />
        <SidebarItem icon="job" label="Jobs" />
        <SidebarItem icon="candidates" label="Candidates" />
        <SidebarItem icon="interview" label="Interviews" />
        <SidebarItem icon="analytics" label="Analytics" />
        <SidebarItem icon="settings" label="Settings" />
      </div>
      <div className="mt-auto px-3 pb-4 pt-12">
        <SidebarItem icon="play" label="Logout" />
      </div>
    </aside>
  );
}
