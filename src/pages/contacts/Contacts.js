import React from "react";
import CRUD from '../../components/com/crud/CRUD';
//'owner,agency worker,independent realtor'
const types = [
    {
        id: "owner",
        name: "Propietario"
    },
    {
        id: "agency",
        name: "Agencia"
    },
    {
        id: "worker",
        name: "Trabajador"
    },
    {
        id: "independent",
        name: "Independente"
    },
    {
        id: "realtor",
        name: "Relator"
    },
]
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
        source: "cellphone",
        label: "Teléfono"
    },
    {
        xtype: "selectfield",
        source: "type",
        choices: types,
        label: "Tipo"
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
        source: "cellphone",
        label: "Teléfono",
    },
    {
        xtype: "selectinput",
        source: "type",
        fullWidth: true,
        choices: types,
        label: "Tipo"
    },
    {
        source: "notes",
        multiline: true,
        label: "Notas",
        fullWidth: true
    }
];

const Contacts = ({ id, record, ...props }) => {
    return <>
        <CRUD
            title={"Contáctos"}
            editTitle="Editar Contacto"
            sort={{ field: 'name', order: 'ASC' }}
            fields={fields}
            columns={columns}
        />
    </>
}
export default Contacts;