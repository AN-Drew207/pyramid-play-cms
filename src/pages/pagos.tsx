"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";

export default function Pagos() {
  const router = useRouter();

  return (
    <div className="flex flex-col shrink-0 w-full px-10 py-4">
      <div className="flex gap-4 rounded-xl items-center shadow-box w-full py-6 px-10">
        <img src="/icons/dashboard/icon.svg" className="w-10" alt="" />
        <h1 className="text-2xl text-overlay-border font-[550]">Pagos</h1>
      </div>
    </div>
  );
}
