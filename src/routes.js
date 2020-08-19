import React from "react";
import Loader from "./components/loader/";
import Loadeable from "react-loadable";
const Users = Loadeable({
    loader: () => import("./pages/users/Users"),
    loading: Loader
});
const routes = [
    {
        name: "users",
        path: `/users`,
        icon: "team",
        primaryText: "Usuarios",
        list: Users
    }
];
export default routes;