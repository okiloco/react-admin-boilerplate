import React from "react";
import CRUD from '../../components/com/crud/CRUD';
import CategoryShow from "./CategoryShow";
const columns = [
    {
        xtype: "textfield",
        source: "id",
        label: "ID"
    },
    {
        xtype: "filefield",
        source: "photo",
        label: "Foto"
    },
    {
        xtype: "textfield",
        source: "name",
        label: "Nombre"
    },
    {
        xtype: "textfield",
        source: "category_id",
        reference: "services-categories",
        label: "Categoria Padre"
    },

];
const fields = [
    {
        xtype: "textfield",
        source: "name",
        fullWidth: true,
        label: "Nombre"
    },
];
const View = ({ id, ...props }) => {
    return <>
        <CRUD
            title="Categorías"
            editTitle="Editar Sucursal"
            filterDefaultValues={{
                category_id: id
            }}
            redirect
            actions={{
                show: true,
                create: true,
                edit: true,
                delete: true,
            }}
            edit={() => (<>
                Edit
            </>)}
            columns={columns}
            fields={[...fields,
            {
                xtype: "textfield",
                source: "category_id",
                reference: "services-categories",
                defaultValue: id,
                fullWidth: true,
                disabled: (typeof id != "undefined"),
                //showBy: "edit",
                label: "Categoria Padre"
            },
            {
                xtype: "filefield",
                idComponent: "services-categories-cover",
                path: "services-categories",
                source: "cover",
                label: "Portada",
                resource: "services-categories"
            },
            {
                xtype: "filefield",
                idComponent: "services-categories-photo",
                path: "services-categories",
                source: "photo",
                label: "Foto",
                resource: "services-categories"
            }
            ]}
        />
    </>
}
export default View;