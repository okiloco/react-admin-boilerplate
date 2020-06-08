import React from "react";
import CRUD from '../../components/com/crud/CRUD';
const columns = [
    {
        source: "id",
        label: "ID"
    },
    {
        source: "name",
        label: "Nombre"
    },
    {
        source: "email",
        label: "Correo electrónico"
    },
    {
        source: "phone",
        label: "Teléfono"
    }
]
const fields = [
    {
        source: "name",
        label: "Nombre",
        fullWidth: true
    },
    {
        source: "email",
        label: "Correo electrónico"
    },
    {
        source: "phone",
        label: "Teléfono",
    },
    {
        source: "notes",
        multiline: true,
        label: "Notas",
        fullWidth: true
    },
];

const ThirdPartyContacts = ({ id, record, ...props }) => {
    return <>
        <CRUD
            title={"Contáctos en: " + record.name}
            editTitle="Editar Contacto"
            basePath={`/third-parties/${id}/show/third-party-contacts`}
            path={`/third-parties/:third_party_id/show/third-party-contacts/:id`}
            resource="third-party-contacts"
            filterDefaultValues={{
                third_party_id: id,
            }}
            sort={{ field: 'name', order: 'ASC' }}
            redirect={`third-parties/${id}/show`}
            fields={[
                {
                    xtype: "textinput",
                    type: "hidden",
                    fullWidth: true,
                    source: "third_party_id",
                    defaultValue: id
                }, ...fields]}
            columns={columns}
        />
    </>
}
export default ThirdPartyContacts;