import React from "react";
import UserList from "./UserList";
import UserEdit from "./UserEdit";
import UserAddress from "./UserAdrress";
import UserAddressEdit from "./UserAddressEdit";
const Title = ({ record }) => {
  return <span>{record ? `Editar ${record.name}` : "Listar usuarios"}</span>;
};
export { UserList, UserEdit, Title, UserAddress, UserAddressEdit };

export const role_list = [
  { id: "user", name: "Usuario" },
  { id: "admin", name: "Administrador" }
];
