import { Button } from "@/components/common/button";
import { Input } from "@/components/common/form/input";
import { InputPassword } from "@/components/common/form/input/inputPassword";
import { Select } from "@/components/common/form/inputs/select";
import { Roles } from "@/components/utils/roles";
import axios from "axios";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export const Ingreso = ({ user, hide, register, me, edit }: any) => {
  const [roles, setRoles] = React.useState([]);
  const [role, setRole] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("/users/me/roles-allowed")
      .then((response) => {
        console.log(response);
        setRoles(
          response.data.data.roles.map((role: string) => {
            return { title: Roles(role), value: role };
          }),
        );
      })
      .catch((error) => {
        toast.error("Ha ocurrido un error");
      });
  }, []);

  React.useEffect(() => {
    if (user) setRole(user.role);
  }, [user]);

  return (
    <>
      <div className="flex flex-col gap-10 items-center py-8 lg:px-16 px-8 w-full">
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-2 w-1/2">
            <h2 className="text-sm font-[500] text-[#B3B3B3]">Username</h2>
            <Input
              register={register}
              classNameContainer="h-12 bg-[#F4F4F4] py-4 px-3 !text-[#5C5C5C] rounded-lg"
              className="!text-black"
              placeholder="Pablo123"
              name="username"
              disabled={Boolean(user?.username)}
            ></Input>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <h2 className="text-sm font-[500] text-[#B3B3B3]">Email</h2>
            <Input
              register={register}
              classNameContainer="h-12 bg-[#F4F4F4] py-4 px-3 !text-[#5C5C5C] rounded-lg"
              className="!text-black"
              placeholder="correo@email.com"
              name="email"
            ></Input>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          {!edit && (
            <div className="flex flex-col gap-2 w-1/2">
              <h2 className="text-sm font-[500] text-[#B3B3B3]">Contraseña</h2>
              <InputPassword
                register={register}
                classNameContainer="h-12 bg-[#F4F4F4] py-4 px-3 !text-[#5C5C5C] rounded-lg"
                className="!text-black"
                placeholder="Ingrese su clave"
                name="password"
              />
            </div>
          )}
          {!me && (
            <div className="flex flex-col gap-2 w-1/2">
              <h2 className="text-sm font-[500] text-[#B3B3B3]">
                Rol de Usuario
              </h2>
              <Select
                register={register}
                classNameContainer="h-12 bg-[#F4F4F4] !py-3 !px-3 !text-[#5C5C5C] rounded-lg"
                className="!text-black"
                placeholder="Selecciona un Rol"
                options={roles}
                value={role}
                name="role"
              ></Select>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#EAEAEA]"></div>
      <div className="flex gap-4 px-8 items-center justify-center pt-3">
        <Button
          size="small"
          className="font-[550] w-2/5"
          decoration="primary-outlined"
          onClick={() => hide()}
        >
          Cancelar
        </Button>
        <Button type="submit" size="small" className="font-[550] w-2/5">
          Siguiente
        </Button>
      </div>
    </>
  );
};

export const Datos = ({ hide, register, me }: any) => {
  return (
    <>
      <div className="flex flex-col gap-10 items-center py-8 lg:px-16 px-8 w-full">
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-2 w-1/2">
            <h2 className="text-sm font-[500] text-[#B3B3B3]">Nombre</h2>
            <Input
              register={register}
              classNameContainer="h-12 bg-[#F4F4F4] py-4 px-3 !text-[#5C5C5C] rounded-lg"
              className="!text-black"
              placeholder="Carlos"
              name="firstName"
            ></Input>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <h2 className="text-sm font-[500] text-[#B3B3B3]">Apellido</h2>
            <Input
              register={register}
              classNameContainer="h-12 bg-[#F4F4F4] py-4 px-3 !text-[#5C5C5C] rounded-lg"
              className="!text-black"
              placeholder="Pérez"
              name="lastName"
            ></Input>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-2 w-1/2">
            <h2 className="text-sm font-[500] text-[#B3B3B3]">Documento</h2>
            <Input
              register={register}
              classNameContainer="h-12 bg-[#F4F4F4] py-4 px-3 !text-[#5C5C5C] rounded-lg"
              className="!text-black"
              placeholder="ID:"
              name="documentId"
            ></Input>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <h2 className="text-sm font-[500] text-[#B3B3B3]">Teléfono</h2>
            <Input
              register={register}
              classNameContainer="h-12 bg-[#F4F4F4] py-4 px-3 !text-[#5C5C5C] rounded-lg"
              className="!text-black"
              placeholder="+54..."
              name="phoneNumber"
            ></Input>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-2 w-1/2">
            <h2 className="text-sm font-[500] text-[#B3B3B3]">País</h2>
            <Input
              register={register}
              classNameContainer="h-12 bg-[#F4F4F4] py-4 px-3 !text-[#5C5C5C] rounded-lg"
              className="!text-black"
              placeholder="Argentina"
              name="country"
            ></Input>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <h2 className="text-sm font-[500] text-[#B3B3B3]">Ciudad</h2>
            <Input
              register={register}
              classNameContainer="h-12 bg-[#F4F4F4] py-4 px-3 !text-[#5C5C5C] rounded-lg"
              className="!text-black"
              placeholder="Córdoba"
              name="city"
            ></Input>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#EAEAEA]"></div>
      <div className="flex gap-4 px-8 items-center justify-center pt-3">
        <Button
          size="small"
          className="font-[550] w-2/5"
          decoration="primary-outlined"
          onClick={() => hide()}
        >
          Cancelar
        </Button>
        <Button type="submit" size="small" className="font-[550] w-2/5">
          {me ? "Editar" : "Siguiente"}
        </Button>
      </div>
    </>
  );
};

export const Permisos = ({ hide, categories, register }: any) => {
  return (
    <>
      <div className="flex flex-col gap-10 items-center py-8 lg:px-16 px-8 w-full">
        <div className="flex gap-4 w-full">
          {/* <div className="flex flex-col gap-2 w-1/2 rounded-2xl border border-[#F4F4F4] overflow-hidden">
            <h2 className="text-md font-[500] text-[#5C5C5C] py-3 px-4 bg-[#F4F4F4]">
              Casino
            </h2>
            <div className="flex flex-col py-4 px-4 bg-[#FCFCFC]">
              {categories
                .find((category: any) => {
                  return category.name === "Casino";
                })
                ?.games?.map((game: any, index: any) => {
                  return (
                    <div className="flex items-center gap-4 justify-between w-full">
                      <h2>{game.name}</h2>
                      <Input
                        register={register}
                        name={"game-" + index}
                        className="w-14"
                        placeholder="0%"
                        classNameContainer="rounded-xl px-3 py-1"
                      />
                    </div>
                  );
                })}
            </div>
          </div> */}
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#EAEAEA]"></div>
      <div className="flex gap-4 px-8 items-center justify-center pt-3">
        <Button
          size="small"
          className="font-[550] w-2/5"
          decoration="primary-outlined"
          onClick={() => hide()}
        >
          Cancelar
        </Button>
        <Button type="submit" size="small" className="font-[550] w-2/5">
          Siguiente
        </Button>
      </div>
    </>
  );
};

export const Comisiones = ({ hide, categories, register, setValue }: any) => {
  return (
    <>
      <div className="flex flex-col gap-10 items-center py-8 lg:px-16 px-8 w-full max-h-[70vh]">
        <div className="flex items-center justify-center gap-4 w-full">
          <p className="text-[#B3B3B3] text-md font-[600] whitespace-nowrap">
            Liquidar automaticamente
          </p>{" "}
          <Select
            register={register}
            name="liquidation"
            classNameContainer="!w-[200px] font-[400] py-2 px-3 text-lg !rounded-md"
            placeholder="Selecciona Rango"
            options={[
              { title: "Semanal", value: "weekly" },
              { title: "Mensual", value: "monthly" },
            ]}
          />
        </div>
        <div className="flex items-center justify-center gap-4 w-full">
          <p className="text-[#B3B3B3] text-md font-[600] whitespace-nowrap">
            Comisión General
          </p>{" "}
          <Input
            register={register}
            name={`commission_general`}
            onChangeCustom={(e: any) => {
              categories.forEach((category: any) => {
                category.games.forEach((game: any, index: any) => {
                  setValue(
                    `commissions[${game.index}].commissionAmount`,
                    e.target.value,
                  );
                  setValue(`commissions[${game.index}].gameId`, game.id);
                });
              });
            }}
            className="!w-[80px]"
            placeholder="0"
            classNameContainer="rounded-xl px-3 py-1"
            rightImg={"%"}
          />
        </div>
        <div
          className={clsx(
            "flex flex-wrap gap-4 w-full justify-between overflow-auto px-2",
          )}
        >
          {categories.map((category: any, indexCat: any) => (
            <div
              key={"category-" + indexCat}
              className="flex flex-col gap-2 w-[45%] rounded-2xl border border-[#F4F4F4] overflow-hidden"
            >
              <h2 className="text-md font-[500] text-[#5C5C5C] py-3 px-4 bg-[#F4F4F4]">
                {category?.name[0]?.toUpperCase()}
                {category?.name?.substr(1)}
              </h2>
              <div className="flex flex-col gap-2 py-4 px-4 bg-[#FCFCFC]">
                {category?.games?.map((game: any, index: any) => {
                  return (
                    <React.Fragment key={index}>
                      <CommisionItem
                        game={game}
                        index={game.index}
                        register={register}
                        setValue={setValue}
                      />
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#EAEAEA]"></div>
      <div className="flex gap-4 px-8 items-center justify-center pt-3">
        <Button
          size="small"
          className="font-[550] w-2/5"
          decoration="primary-outlined"
          onClick={() => hide()}
        >
          Cancelar
        </Button>
        <Button type="submit" size="small" className="font-[550] w-2/5">
          Crear
        </Button>
      </div>
    </>
  );
};

const CommisionItem = ({ game, index, register, setValue, edit }: any) => {
  React.useEffect(() => {
    setValue(`commissions[${index}].gameId`, game.id);
  }, [game]);
  return (
    <div className="flex items-center gap-4 justify-between w-full">
      <h2 className="text-sm !w-2/3">{game.name}</h2>
      <Input
        register={register}
        name={`commissions[${index}].commissionAmount`}
        className="!w-[80px]"
        type="number"
        placeholder="0"
        classNameContainer="rounded-xl px-3 py-1"
        rightImg={"%"}
      />
      <Input
        register={register}
        name={`commissions[${index}].gameId`}
        className="!w-[80px] hidden"
        placeholder="0"
        classNameContainer="rounded-xl px-3 py-1"
        rightImg={"%"}
      />
      {edit && (
        <Input
          register={register}
          name={`commissions[${index}].comisionId`}
          className="!w-[80px] hidden"
          placeholder="0"
          classNameContainer="rounded-xl px-3 py-1"
          rightImg={"%"}
        />
      )}
    </div>
  );
};
