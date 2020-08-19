import React from "react";
import CRUD from '../../components/com/crud/CRUD';
import { getService } from "../../services";
import { message } from "antd";
const columns = [
    {
        xtype: "textfield",
        source: "id",
        label: "ID"
    },
    {
        xtype: "filefield",
        path: "users",
        componentId: "photo",
        source: "photo",
        label: "Foto"
    },
    {
        xtype: "textfield",
        source: "first_name",
        fullWidth: true,
        label: "Nombre",
        render: (value, record) => (`${value} ${record.last_name}`)
    },
    {
        source: "email",
        filter: true,
        label: "Email",
    },
    {
        source: "phone",
        label: "Phone",
    },
    {
        xtype: "selectfield",
        source: "plan_id",
        reference: "services-commissions-plans",
        optionText: "title",
        label: "Plan",
    },
    {
        source: "role",
        label: "Role",
    },
    {
        xtype: "statusfield",
        source: "status",
        label: "Status",
    }
];
const fields = [
    {
        xtype: "textfield",
        source: "first_name",
        label: "Nombres",
    },
    {
        xtype: "textfield",
        source: "last_name",
        label: "Apellidos",
    },
    {
        source: "email",
        label: "Email",
    },
    {
        source: "gender",
        label: "Gender",
    },
    {
        source: "phone",
        label: "Phone",
    },
    {
        source: "role",
        label: "Role",
    },
    {
        xtype: "selectfield",
        source: "plan_id",
        fullWidth: true,
        reference: "services-commissions-plans",
        optionText: "title",
        label: "Plan",
    },
    {
        xtype: "statusinput",
        source: "status",
        label: "Status",
    }
];
const Cities = props => {

    const handleUploadFinish = (field, url, file, _id) => {
        const service = getService('users');
        service.patch(_id, {
            [field]: url
        }).then(response => {
            message.success("Foto Actualizada!");
        })
            .catch(err => message.error(err.message));
    };
    return <CRUD
        title="Usuarios"
        actions={{ "delete": false }}
        columns={columns}
        fields={[
            {
                xtype: "filefield",
                path: "users",
                fullWidth: true,
                onFinish: (url, file, id) => handleUploadFinish("photo", url, file, id),
                showBy: "edit",
                componentId: "photo",
                source: "photo",
                name: "photo",
                label: "Foto"
            },
            ...fields]}
    />
}
export default Cities;