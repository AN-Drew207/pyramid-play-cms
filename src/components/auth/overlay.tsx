"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import React from "react";

export default function OverlayAuth({ children }: any) {
  const pathname = usePathname();

  return (
    <main
      className={clsx(
        "flex bg-overlay flex-col items-center justify-center w-full relative min-h-screen",
      )}
    >
      <div className="flex flex-col items-center justify-center w-full h-full relative min-h-[calc(100vh-100px)] overflow-hidden">
        <div className="flex flex-col w-full h-full items-center justify-center gap-8 relative">
          <div className="flex lg:flex-row flex-col w-full min-h-screen justify-center items-center lg:gap-10 relative">
            <img
              src="/images/auth.png"
              className="w-full h-full absolute top-0 left-0 lg:hidden flex opacity-50"
              alt=""
            />
            <div className="lg:w-1/2 w-full h-full shrink-0 lg:flex items-center justify-center px-4 gap-4 relative">
              <div className="flex flex-col py-8 px-10 rounded-xl gap-4 lg:w-[500px] w-full bg-white shadow-box">
                {children}
              </div>
            </div>
            <div className="xl:flex hidden items-center justify-center w-1/2">
              <img src="/images/auth.png" className="w-full" alt="" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
