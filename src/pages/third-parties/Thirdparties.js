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
        source: 'name',
        label: "Nombre"
    },
];
const fields = [
    {
        xtype: "textfield",
        source: 'name',
        fullWidth: true,
        label: "Nombre"
    }
]
const Thirdparties = props => {

    return <CRUD
        redirect
        title="Terceros"
        actions={{ "delete": false, show: true, delete: true }}
        columns={columns}
        fields={fields}
    />
}
export default Thirdparties;