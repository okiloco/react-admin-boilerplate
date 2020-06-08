import React from "react";
import Loader from "./components/loader/";
import Loadeable from "react-loadable";

const Users = Loadeable({
    loader: () => import("./pages/users/UserList"),
    loading: Loader
});
const CMS = Loadeable({
    loader: () => import("./pages/cms/CMS"),
    loading: Loader
});
const Cities = Loadeable({
    loader: () => import("./pages/cities/Cities"),
    loading: Loader
});
const ShowCities = Loadeable({
    loader: () => import("./pages/cities/ShowCities"),
    loading: Loader
});
const Types = Loadeable({
    loader: () => import("./pages/types/Types"),
    loading: Loader
});
const Thirdparties = Loadeable({
    loader: () => import("./pages/third-parties/Thirdparties"),
    loading: Loader
});
const ShowThirdparties = Loadeable({
    loader: () => import("./pages/third-parties/ShowThirdparties"),
    loading: Loader
});
const Contacts = Loadeable({
    loader: () => import("./pages/contacts/Contacts"),
    loading: Loader
});

const routes = [
    {
        name: "users",
        menu: {
            path: `/users`,
            primaryText: "Usuarios"
        },
        list: Users
    },
    {
        name: "cms",
        menu: {
            path: `/cms`,
            primaryText: "CMS"
        },
        list: CMS
    },
    {
        name: "cities",
        menu: {
            path: `/cities`,
            primaryText: "Ciudades"
        },
        list: Cities,
        show: ShowCities
    },
    {
        name: "contacts",
        menu: {
            path: `/contacts`,
            primaryText: "Contactos"
        },
        list: Contacts
    },
    {
        name: "third-parties",
        menu: {
            path: `/third-parties`,
            primaryText: "Terceros"
        },
        list: Thirdparties,
        show: ShowThirdparties
    },
    {
        name: "types",
        menu: {
            path: `/types`,
            primaryText: "Tipos"
        },
        list: Types
    },
    {
        name: "neighborhoods",
    },
    {
        name: "third-party-contacts",
    },
];
export default routes;