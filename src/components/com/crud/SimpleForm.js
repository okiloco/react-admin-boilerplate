import React from 'react';
import { Show, SimpleForm, useShowController, Toolbar, SaveButton } from "react-admin";
import SaveIcon from '@material-ui/icons/SaveAltOutlined';
import { message } from "antd";
import { getService } from "../../../services/";
import Builder from "./Builder";
const FooterToolbar = props => (
    <Toolbar {...props} >
        <SaveButton
            style={{
                margin: 10,
                ...props.style
            }}
            label={props.label}
            redirect={props.redirect || "list"}
            icon={props.icon || <SaveIcon />}
            submitOnEnter={true}
        />
    </Toolbar>
);
const Form = ({ fields, autoSubmit = true, onSubmit, ...props }) => {
    let { resource } = props;
    const controllerProps = useShowController(props);
    let record = controllerProps.record;
    if (!record) return null;
    const builder = Builder({ fields });
    const handleSubmit = (record) => {
        if (!autoSubmit && onSubmit) return onSubmit(record);
        if (autoSubmit) {
            const service = getService(resource);
            let { id } = record;
            if (id)
                return service.patch(id, record).then(response => {
                    if (onSubmit) return onSubmit(response);
                    message.success("Registro Actualizado con éxito!");
                })
                    .catch(err => message.error(err.message));
            service.create(record).then(response => {
                if (onSubmit) return onSubmit(response);
                message.success("Registro Creado con éxito!");
            })
                .catch(err => message.error(err.message));
        }
    }
    return (<>
        <Show
            record={record}
            redirect={props.redirect || "list"}
            resource={controllerProps.resource || resource}
            {...props}>
            <SimpleForm
                toolbar={<FooterToolbar
                    label={props.saveButtonText}
                    redirect={props.redirect}
                    icon={props.saveButtonIcon}
                />}
                save={handleSubmit}
            >
                {builder.getFields(record)}
            </SimpleForm>
        </Show>
    </>)
}
export default Form;