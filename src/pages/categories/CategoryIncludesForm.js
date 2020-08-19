import React, { useEffect, useState } from 'react';
import { SimpleForm } from "../../components/com/crud";
import { getService } from '../../services';
import { message } from 'antd';
const CategoryIncludesForm = (props) => {
    let { id } = props;
    const [include_ids, setIncludeIds] = useState();
    const [loading, setLoading] = useState(true);
    const getIncludeIds = () => {
        if (id) {
            setLoading(true)
            const service = getService("services-categories-include");
            service.find({
                query: {
                    category_id: id
                }
            })
                .then(({ data }) => {
                    setIncludeIds(data.map(it => (it.include_id)))
                    setLoading(false)
                })
                .catch(error => message.error(error.message));
        }
    }
    const save = ({ include_id }) => {
        const service = getService("services-categories-include");
        service.create({
            category_id: id,
            include_id
        })
            .then(response => {
                message.success("Veneficios Actualizados!");
            })
            .catch(error => message.error(error.message));
    }
    useEffect(() => {
        getIncludeIds();
    }, [props.id])
    return (<>
        {!loading && <SimpleForm
            /* resource="services-categories-include" */
            onSubmit={save}
            autoSubmit={false}
            saveButtonText="GUARDAR"
            fields={[
                {
                    xtype: "selectfield",
                    multiple: true,
                    source: "include_id",
                    defaultValue: include_ids,
                    label: "Beneficios",
                    reference: "services-include",
                    optionText: "title"
                }
            ]}
            {...props} />}
    </>);
}
export default CategoryIncludesForm;