"use client";
import { AddressText } from "@/components/common/specialFields/SpecialFields";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

export const SaleCard = ({ icon, name, size = "normal" }: any) => {
  return (
    <div className="pb-6 relative">
      <Link
        className={clsx(
          "rounded-3xl flex flex-col text-gray-100 w-64 bg-[#19213D] relative overflow-hidden z-[2] cursor-pointer p-4",
          { "lg:w-96": size === "normal" },
          { "lg:w-80": size === "small" },
        )}
        href={`/shop`}
      >
        <>
          <div className="flex flex-col relative">
            <div className="w-full flex justify-center items-center mb-2 relative">
              <img src={icon} className={"h-full w-full"} />
            </div>
            <div className="flex flex-col w-full px-2 pb-2 gap-2 relative py-1">
              <div className="flex flex-col">
                <div className="flex items-center justify-between w-full">
                  <p className="text-white text-[15px] font-[500]">
                    {name || "Maradonita"}
                  </p>
                  <div className="py-1 px-2 text-white text-xs font-[500] bg-primary rounded-md">
                    MATIC
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full">
                <div className="flex gap-2 w-2/3">
                  <div className="w-10 h-10 shrink-0 rounded-md bg-white overflow-hidden">
                    <img
                      src="/logos/logo_maradona.png"
                      className="w-ful"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-gray-200 text-xs font-[400]">Owner</p>
                    <p className="text-white text-sm font-[400]">
                      {"Maradonita 1"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </Link>
    </div>
  );
};
