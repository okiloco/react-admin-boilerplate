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
        source: "locality",
        label: "Localidad"
    },
]
const fields = [
    {
        source: "name",
        label: "Nombre"
    },
    {
        source: "locality",
        label: "Localidad"
    },
];

const Neigborhoods = ({ id, record, ...props }) => {
    return <>
        <CRUD
            title={"Barrios en: " + record.name}
            editTitle="Editar Barraio"
            basePath={`/cities/${id}/show/neighborhoods`}
            path={`/cities/:city_id/show/neighborhoods/:id`}
            resource="neighborhoods"
            filterDefaultValues={{
                city_id: id,
            }}
            sort={{ field: 'createdAt', order: 'DESC' }}
            redirect={`cities/${id}/show`}
            fields={[
                {
                    xtype: "textinput",
                    type: "hidden",
                    fullWidth: true,
                    source: "city_id",
                    defaultValue: id
                }, ...fields]}
            columns={columns}
        />
    </>
}
export default Neigborhoods;