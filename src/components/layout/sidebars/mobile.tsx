import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RoleEnum } from "@/components/utils/roles";
import { profileItems } from "@/utils/navbar";
import { XIcon } from "@heroicons/react/solid";

interface LayoutDashboardProps {
  title?: string;
  isLoading?: boolean;
  sidebarOpen?: boolean;
  setSidebarOpen?: any;
  initialFocus?: any;
  // navItems?: any;
  // cart: any;
  // setCartOpen: any;
  // cartOpen: any;
  auth: any;
  setAuth: any;
}
export const SidebarMobile: React.FC<LayoutDashboardProps> = ({
  // title = '',
  // isLoading = false,
  // children,
  sidebarOpen = false,
  setSidebarOpen = {},
  initialFocus = null,
  auth,
  setAuth,
}) => {
  const [set, setSet] = React.useState(false);

  const router = useRouter();
  const path = usePathname();
  return (
    <>
      {/* Sidebar mobile */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed min-h-screen w-screen flex top-0 z-40 lg:hidden bg-secondary overflow-y-auto"
          open={sidebarOpen}
          onClose={setSet as any}
          initialFocus={initialFocus}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed top-0 inset-0 z-0 blur-xl w-screen min-h-screen" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="flex flex-col gap-2 w-full relative overflow-y-auto pb-10 h-screen">
              <XIcon
                className="absolute top-4 right-2 w-8 text-white"
                onClick={() => {
                  setSidebarOpen(false);
                }}
              ></XIcon>
              <div className="flex items-center justify-center gap-2 px-3 py-16 w-full">
                <img src={"/logos/logo.svg"} className="w-[90%]" alt="" />
              </div>
              {profileItems.map(
                ({ name, link, subItems, role, icon, onlyUser }) => {
                  return role <= RoleEnum(auth?.user.role) &&
                    (onlyUser ? auth?.user.role !== "admin" : true) ? (
                    link ? (
                      <React.Fragment key={link}>
                        <Link
                          href={link}
                          onClick={() => {
                            setSidebarOpen(false);
                          }}
                          className={clsx(
                            {
                              "bg-gradient-to-r to-[#B15512] from-[#F0B826]":
                                link === path,
                            },
                            { "bg-transparent": link !== path },
                            "flex items-center px-8 py-4 gap-4 cursor-pointer",
                          )}
                        >
                          <>
                            <img src={icon} className="w-6 h-6" alt={name} />
                            <p className={clsx("text-white  text-sm")}>
                              {name}
                            </p>
                          </>
                        </Link>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={name}>
                        <NavbarSubMenu
                          name={name}
                          icon={icon}
                          items={subItems}
                          userRole={RoleEnum(auth?.user.role)}
                          setSidebarOpen={setSidebarOpen}
                        />
                      </React.Fragment>
                    )
                  ) : (
                    ""
                  );
                },
              )}

              <React.Fragment>
                <div
                  onClick={() => {
                    setAuth(null);
                    router.push("/auth/login");
                  }}
                  className={clsx(
                    "flex items-center bg-transparent px-8 py-4 gap-4 cursor-pointer",
                  )}
                >
                  <img
                    src={"/icons/salir.svg"}
                    className="w-6 h-6"
                    alt={"salir"}
                  />
                  <p className={clsx("text-white  text-sm")}>Salir</p>
                </div>
              </React.Fragment>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};

const NavbarSubMenu = ({
  name,
  icon,
  items,
  userRole,
  setSidebarOpen,
}: any) => {
  const path = usePathname();
  const [isShowed, setIsShowed] = React.useState(
    items
      .map(({ link }: any) => {
        return link;
      })
      .includes(path),
  );

  return (
    <div className="flex flex-col gap-2">
      <div
        className={clsx(
          "bg-transparent",
          "flex items-center px-8 py-4 gap-4 cursor-pointer",
        )}
        onClick={() => {
          setIsShowed((prev: any) => !prev);
        }}
      >
        <img src={icon} className="w-6 h-6" />
        <p className={clsx("text-white  text-sm")}>{name}</p>
      </div>
      {isShowed &&
        items.map(({ link, name, role }: any) => {
          return role <= userRole ? (
            <Link
              key={"subMenu-" + link}
              href={link}
              onClick={() => {
                setSidebarOpen(false);
              }}
              className={clsx(
                {
                  "bg-gradient-to-r to-[#B15512] from-[#F0B826]": link === path,
                },
                { "bg-transparent": link !== path },
                "flex items-center px-8 py-4 gap-4 cursor-pointer",
              )}
            >
              <>
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src="/icons/layout/point.svg" className="w-1" alt="" />
                </div>{" "}
                <p className={clsx("text-white  text-sm")}>{name}</p>
              </>
            </Link>
          ) : (
            ""
          );
        })}
    </div>
  );
};
