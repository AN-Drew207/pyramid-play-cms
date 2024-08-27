import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import clsx from "clsx";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

export const DropdownSelect: React.FC<any> = ({ children, name }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => {
        return (
          <>
            <div className="flex justify-center items-center bg-transparent rounded-full w-full">
              <Menu.Button className="inline-flex justify-center items-center w-full  bg-transparent focus:outline-none">
                <div
                  className={clsx(
                    "flex bg-[#F4F4F4] py-3 rounded-md justify-between items-center cursor-pointer w-64 px-4",
                  )}
                >
                  <div className="flex items-center gap-1">
                    <p className="text-[#989898] text-sm whitespace-nowrap shrink-0">
                      {name}
                    </p>
                  </div>

                  {open ? (
                    <ChevronUpIcon className="text-[#989898] w-4" />
                  ) : (
                    <ChevronDownIcon className="text-[#989898] w-4" />
                  )}
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute top-0 right-3 z-20 md:mt-7 origin-top-right bg-overlay divide-y shadow-lg rounded-xl focus:outline-none">
                <div>
                  <div className="flex flex-col items-center justify-center border border-overlay-border rounded-md overflow-hidden bg-[#F4F4F4]">
                    {children}
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </>
        );
      }}
    </Menu>
  );
};
