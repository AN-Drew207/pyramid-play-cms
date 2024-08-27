/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";

export const Logo = () => {
  const pathname = usePathname();

  return (
    <Link href="/">
      <div className="md:py-0 py-2 flex gap-2 items-center cursor-pointer max-w-1/2">
        <img
          className="h-8"
          src={
            pathname.includes("/app/wallet")
              ? "/logos/nav_wallet.png"
              : "/logos/nav_logo.png"
          }
          alt="logo"
        />
      </div>
    </Link>
  );
};

export const NavbarItem = ({ name, link, className }: any) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Link href={link}>
      <p
        className={clsx(
          "py-2 relative text-md text-white cursor-pointer",
          { "font-[900]": link === pathname },
          className,
        )}
      >
        {name}
      </p>
    </Link>
  );
};

export const SocialMediaItem = ({ image, link }: any) => {
  return (
    <a target="_blank" href={link}>
      <img src={image} className={clsx("h-5")} alt={link} />
    </a>
  );
};

export const navItems = [
  {
    name: "Nosotros",
    link: "/nosotros",
  },
  { name: "Contáctanos", link: "/contactanos" },
  { name: "Whitepaper", link: "/whitepaper" },
  { name: "Wallet", link: "/wallet" },
  { name: "Iniciar Sesion", link: "/login" },
];

export const footerItems = [
  {
    name: "Nosotros",
    link: "/nosotros",
  },
  { name: "Contáctanos", link: "/contactanos" },
  { name: "Whitepaper", link: "/whitepaper" },
  { name: "Wallet", link: "/wallet" },
  { name: "Terminos y Condiciones", link: "/terminos" },
];

export const socialMedia = [
  {
    image: "/icons/instagram.svg",
    link: "/nosotros",
  },
  { image: "/icons/tiktok.svg", link: "/contactanos" },
  { image: "/icons/twitter.svg", link: "/whitepaper" },
  { image: "/icons/facebook.svg", link: "/wallet" },
];

export const profileItems = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: "/icons/dashboard.svg",
    role: 1,
    onlyUser: true,
  },
  {
    name: "Usuarios",
    link: "/usuarios",
    icon: "/icons/user.svg",
    role: 1,
    onlyUser: false,
  },
  // {
  //   name: "Configuracion de Juegos",
  //   link: "/juegos",
  //   icon: "/icons/config.svg",
  // },
  // {
  //   name: "Gestión de apuestas",
  //   link: "/gestion",
  //   icon: "/icons/gestion.svg",
  //   role: 3,
  // },
  {
    name: "Tienda",
    link: "/tienda",
    icon: "/icons/tienda.svg",
    role: 3,
    onlyUser: false,
  },
  {
    name: "Reporte Global",
    link: "/reporte_global",
    icon: "/icons/reporte_global.svg",
    role: 1,
    onlyUser: true,
  },
  {
    name: "Reporte de Fichas",
    subItems: [
      {
        name: "Reporte de Distribuidores",
        link: "/reporte_fichas/distribuidor",
        role: 4,
        onlyUser: false,
      },
      {
        name: "Reporte de Agentes",
        link: "/reporte_fichas/agente",
        role: 3,
        onlyUser: false,
      },
      {
        name: "Reporte de Cajeros",
        link: "/reporte_fichas/cajero",
        role: 2,
        onlyUser: false,
      },
      {
        name: "Reporte de Jugadores",
        link: "/reporte_fichas/jugador",
        role: 1,
        onlyUser: false,
      },
    ],
    icon: "/icons/reportes.svg",
    role: 1,
  },
  // {
  //   name: "Pagos",
  //   link: "/pagos",
  //   icon: "/icons/pagos.svg",
  //   role: 3,
  // },
  {
    name: "Configuracion de Perfil",
    link: "/perfil",
    icon: "/icons/config_perfil.svg",
    role: 1,
  },
];
