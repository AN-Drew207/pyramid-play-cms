import React, { useContext } from "react";
import { Input } from "@/components/common/form/input";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import ReporteFichasTabla from "../../reporte_fichas/tablaReporteFichas";
import ReporteFichasPerfilTabla from "./tablas/tablaReporteFichasPerfil";
import axios from "axios";
import { PencilIcon } from "@heroicons/react/solid";
import EditarUsuarioMe from "@/components/usuarios/modales/editarUsuarioMe";
import { useModal } from "@/hooks/modal";
import ReporteCompraDeFichasTabla from "@/components/reporte_fichas/tablaReporteCompraFichas";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/useUser";

export default function PerfilPyramid() {
  const [page, setPage] = React.useState(0);
  const [pageMembership, setPageMembership] = React.useState(0);
  const [pageChips, setPageChips] = React.useState(0);
  const [txs, setTxs] = React.useState(0);
  const [length, setLength] = React.useState(0);
  const [lengthMembership, setLengthMembership] = React.useState(0);
  const [lengthChips, setLengthChips] = React.useState(0);
  const [dates, setDates] = React.useState([
    new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
    new Date(new Date().setHours(23, 59, 59, 59)).toISOString(),
  ]);
  const [datesMembership, setDatesMembership] = React.useState([
    new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
    new Date(new Date().setHours(23, 59, 59, 59)).toISOString(),
  ]);
  const [datesChips, setDatesChips] = React.useState([
    new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
    new Date(new Date().setHours(23, 59, 59, 59)).toISOString(),
  ]);
  const { register } = useForm();
  const [user, serUser] = React.useState<any>({});
  const [memberships, setMembership] = React.useState<any>([]);
  const [chips, setChips] = React.useState<any>([]);
  const router = useRouter();
  const { setAuth } = useContext(AuthContext);

  const {
    Modal: ModalEdit,
    isShow: isShowEdit,
    show: showEdit,
    hide: hideEdit,
  } = useModal();

  const onUpdate = () => {
    axios
      .get(`/users/me`)
      .then((response) => {
        console.log(response, "user");
        serUser(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        if (error?.response?.status == 401) {
          setAuth(null);
          router.push("/auth/login");
        }
      });
  };

  React.useEffect(() => {
    onUpdate && onUpdate();
  }, []);

  React.useEffect(() => {
    axios
      .get(
        `/reports/chips/me?from=${dates[0]}&to=${dates[1]}&limit=10&offset=${
          page * 10
        }`,
      )
      .then((response) => {
        setTxs(response.data.data);
        setLength(response.data.metadata.totalPages);
      })
      .catch((error) => {
        console.error(error);
        if (error?.response?.status == 401) {
          setAuth(null);
          router.push("/auth/login");
        }
      });
  }, [user, dates, page]);

  React.useEffect(() => {
    if (user?.role == "distributor") {
      axios
        .get(
          `/checkout/memberships?from=${datesMembership[0]}&to=${
            datesMembership[1]
          }&limit=10&offset=${pageMembership * 10}`,
        )
        .then((response) => {
          setMembership(response.data.data);
          setLengthMembership(response.data.metadata.totalPages);
        })
        .catch((error) => {
          console.error(error);
        });
      axios
        .get(
          `/checkout/chips-purchased?from=${datesChips[0]}&to=${
            datesChips[1]
          }&limit=10&offset=${pageChips * 10}`,
        )
        .then((response) => {
          setChips(response.data.data);
          setLengthChips(response.data.metadata.totalPages);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user, datesChips, datesMembership, pageChips, pageMembership]);

  return (
    <div className="flex flex-col shrink-0 w-full px-10 py-4">
      <ModalEdit isShow={isShowEdit}>
        <EditarUsuarioMe hide={hideEdit} id={user?.id} onUpdate={onUpdate} />
      </ModalEdit>
      <div className="flex gap-4 rounded-xl items-center shadow-box w-full py-6 px-10">
        <img src="/icons/perfil/icon.svg" className="w-10" alt="" />
        <h1 className="text-2xl text-overlay-border font-[550]">Perfil</h1>
      </div>
      <div className={clsx("w-full flex flex-col py-4 px-6 gap-8")}>
        <div className="w-full flex flex-wrap gap-6 items-end pt-6">
          <div>
            <Input
              name="name"
              required
              labelVisible
              title="Nombre"
              defaultValue={user?.firstName}
              register={register}
              classNameContainer="xl:!w-auto !w-36 px-6 rounded-md !py-3"
              disabled
            />
          </div>
          <div>
            <Input
              name="lastName"
              required
              labelVisible
              title="Apellido"
              defaultValue={user?.lastName}
              register={register}
              classNameContainer="xl:!w-auto !w-36 px-6 rounded-md !py-3"
              disabled
            />
          </div>
          <div>
            <Input
              name="email"
              required
              labelVisible
              title="Email"
              defaultValue={user?.email}
              register={register}
              classNameContainer="xl:!w-auto !w-36 px-6 rounded-md !py-3"
              disabled
            />
          </div>
          <div>
            <Input
              name="password"
              required
              labelVisible
              title="Contraseña"
              placeholder={"**********"}
              register={register}
              classNameContainer="xl:!w-auto !w-36 px-6 rounded-md !py-3"
              disabled
            />
          </div>
          <div className="p-3">
            <PencilIcon
              className="w-6 text-[#5c5c5c]"
              onClick={() => {
                showEdit();
              }}
            />
          </div>
        </div>
        {user.role == "distributor" && (
          <>
            <ReporteFichasPerfilTabla
              dates={datesMembership}
              setDates={setDatesMembership}
              transacciones={memberships}
              length={lengthMembership}
              page={pageMembership}
              setPage={setPageMembership}
            />
            <h2 className="text-2xl text-[#B3B3B3] font-[500]">
              Reporte de compra de fichas
            </h2>
            <ReporteCompraDeFichasTabla
              dates={datesChips}
              setDates={setDatesChips}
              transacciones={chips}
              length={lengthChips}
              page={pageChips}
              setPage={setPageChips}
            />
          </>
        )}
        <h2 className="text-2xl text-[#B3B3B3] font-[500]">
          Reporte de transferencias de fichas
        </h2>
        <ReporteFichasTabla
          transacciones={txs || []}
          totalPages={length}
          page={page}
          setPage={setPage}
          dates={dates}
          setDates={setDates}
        />
      </div>
    </div>
  );
}
