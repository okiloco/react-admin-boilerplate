import React from "react";
import CRUD from '../../components/com/crud/CRUD';

const columns = [
    {
        xtype: "textfield",
        source: "id",
        label: "ID"
    },
    {
        xtype: "textfield",
        source: "name",
        fullWidth: true,
        label: "Nombre"
    },
];
const fields = [
    {
        xtype: "textfield",
        source: "name",
        fullWidth: true,
        label: "Nombre"
    }
];
const Cities = props => {
    return <CRUD
        title="Tipos"
        columns={columns}
        fields={fields}
    />
}
export default Cities;