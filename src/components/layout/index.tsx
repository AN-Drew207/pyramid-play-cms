"use client";
import { profileItems } from "@/utils/navbar";
import clsx from "clsx";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useContext } from "react";
import OverlayAuth from "../auth/overlay";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import { AuthContext } from "@/context/useUser";
import { configureHOST } from "@/api/config";
import { RoleEnum } from "../utils/roles";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { SidebarMobile } from "./sidebars/mobile";

export default function Layout({ children }: any) {
  const path = usePathname();
  const router = useRouter();
  registerLocale("es", es);
  setDefaultLocale("es");
  const { auth, setAuth } = useContext(AuthContext);

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const refSidebarMobile = React.useRef(null);

  React.useEffect(() => {
    //Initializing axios
    configureHOST();
  }, []);

  React.useEffect(() => {
    if (path && !path.includes("/auth") && auth === undefined) {
      router.push("/auth/login");
    }
  }, [auth]);

  return (
    <>
      {path?.includes("/auth") ? (
        <OverlayAuth>{children}</OverlayAuth>
      ) : (
        <div className="min-h-screen w-full flex relative bg-secondary">
          <div className="w-[285px] lg:flex hidden pb-8 flex-col gap-8 justify-start shrink-0 min-h-[calc(100vh-48px)] top-0 left-0 !sticky z-[10] border-secondary">
            <div className="flex flex-col gap-2 w-full">
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
          </div>
          <aside
            className={clsx(
              "flex flex-col  items-center justify-start lg:w-[calc(100vw-285px)] bg-white w-full gap-x-4 pb-8 relative",
            )}
          >
            <div className="flex items-center lg:justify-end justify-between w-full h-20 bg-[#f4f4f4] shadow-box text-white py-6 px-8">
              <div className="flex gap-2 lg:flex-row flex-row-reverse">
                <div className="flex gap-2 justify-center items-center lg:px-8 lg:border-r-[2px] border-[#B3B3B3]">
                  <img
                    src="/icons/modals/coins.svg"
                    className="w-6 h-6"
                    alt=""
                  />
                  <p className="lg:text-lg text-sm text-[#B3B3B3] font-[550]">
                    {auth?.user?.balance}
                  </p>
                </div>
                <a
                  href="mailto:support@pyramidplay.com"
                  className="lg:flex hidden gap-2 items-center px-8 border-r-[2px] border-[#B3B3B3]"
                >
                  <img
                    src="/icons/layout/support.svg"
                    className="w-6 h-6"
                    alt=""
                  />
                </a>{" "}
                <Link
                  href={"/perfil"}
                  className="flex gap-2 lg:border-none border-r-2 border-[#B3B3B3] items-center lg:pl-8 lg:pr-0 pr-2"
                >
                  <img
                    src="/icons/layout/user.svg"
                    className="w-5 h-5"
                    alt=""
                  />
                  <p className="lg:text-lg text-sm text-[#B3B3B3] font-[550]">
                    {auth?.user?.firstName}
                  </p>
                </Link>
              </div>
              {!sidebarOpen ? (
                <MenuIcon
                  className="h-6 w-6 shrink-0 text-primary cursor-pointer lg:hidden flex"
                  aria-hidden="true"
                  onClick={() => {
                    setSidebarOpen((prev) => !prev);
                  }}
                />
              ) : (
                <XIcon
                  className="h-6 w-6 shrink-0 text-primary cursor-pointer lg:hidden flex"
                  aria-hidden="true"
                  onClick={() => {
                    setSidebarOpen((prev) => !prev);
                  }}
                />
              )}
            </div>
            <div className="h-full p-4 w-full">{children}</div>
          </aside>
          <SidebarMobile
            initialFocus={refSidebarMobile}
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
            auth={auth}
            setAuth={setAuth}
          />
        </div>
      )}
    </>
  );
}

const NavbarSubMenu = ({ name, icon, items, userRole }: any) => {
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
