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
        source: "title",
        fullWidth: true,
        label: "Titulo"
    },
    {
        xtype: "statusfield",
        source: 'status',
        label: "Estado"
    },

];
const fields = [
    {
        xtype: "textfield",
        source: "title",
        fullWidth: true,
        label: "Titulo"
    },
    {
        xtype: "richtextfield",
        source: 'body',
        multiline: true,
        fullWidth: true,
        label: "Descripción"
    },
    {
        xtype: "statusfield",
        source: 'status',
        label: "Estado"
    },

];
const Cities = props => {

    return <CRUD
        title="CMS"
        actions={{ "delete": false }}
        columns={columns}
        fields={fields}
    />
}
export default Cities;