import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Factory from "./Factory";
import { FormDataConsumer } from 'react-admin';
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import {
    Create,
    SimpleForm,
    useCreateController,
    Toolbar,
    SaveButton
} from "react-admin";

const FormContainer = styled.div`
    min-width:400px;
    /* min-height:100vh; */

    padding:0px;
    margin:0px;

    & .MuiToolbar-root{
        /* position: absolute!important; */
        /* bottom: 0!important; */
        width: 100%!important;
    }
    & .head-title{
        display: flex;
        color: var(--color-white)!important;
        justify-content: space-between;
        padding: 0px 16px;
        margin-top: 10px!important;
        margin-bottom: 0px!important;
    }
    & .MuiPaper-root{
        box-shadow:none!important;
    }
`;
const UserCreateToolbar = ({ permissions, ...props }) =>
    <Toolbar {...props}>
        <SaveButton
            label="Guardar"
            redirect="edit"
            submitOnEnter={true}
        />
        {permissions === 'admin' &&
            <SaveButton
                label="Guardar"
                redirect={false}
                submitOnEnter={false}
                variant="text"
            />}
    </Toolbar>;
const ConditionalField = ({ record, children, conditional, ...rest }) => {
    if (conditional)
        return <FormDataConsumer>
            {({ formData, ...rest }) => conditional(formData) &&
                children
            }
        </FormDataConsumer>;
    return children;
}
const Field = ({ record, ...field }) => <Factory
    record={record}
    style={{
        width: `${
            field.fullWidth ? 100 :
                field.flex ? Number(field.flex) * 100 : 50}%`
    }} input {...field} />;
const CreateView = (props) => {
    const {
        basePath, // deduced from the location, useful for action buttons
        defaultTitle, // the translated title based on the resource, e.g. 'Create Post'
        record, // empty object, unless some values were passed in the location state to prefill the form
        redirect, // the default redirection route. Defaults to 'edit', unless the resource has no edit view, in which case it's 'list'
        resource, // the resource name, deduced from the location. e.g. 'posts'
        save, // the create callback, to be passed to the underlying form as submit handler
        saving, // boolean that becomes true when the dataProvider is called to create the record
        version, // integer used by the refresh feature
        mode
    } = useCreateController(props);
    let { onCancel, editform, permissions, primaryKey = "id", defaultValues } = props;
    const history = useHistory();
    const [fields, setFields] = useState([]);
    const getFields = (record) => {
        if (props) {
            let { fields, columns } = props;
            fields = fields || columns;
            if (fields)
                fields = fields
                    .filter(it => (it.source != "_id" && it.source != primaryKey
                        && it.showBy ? it.showBy == "create" ? true : false : true
                    ))
                    .map(field => (
                        field.conditional ?
                            <ConditionalField {...field}>
                                <Field record={record} {...field} />
                            </ConditionalField> :
                            <Field record={record} {...field} />
                    ))
            setFields(fields);
        }
    }

    const handleOnCancel = () => {
       /*  handleClose(); */
        if (onCancel) onCancel();
    };
    useEffect(() => {
        getFields();
    }, []);


    return <FormContainer>
        <div className="head-title">
            {<Typography variant="h6">{`${
                props.mode == "sidebar" && !props.title ? "Crear" :
                    props.title
                }`}</Typography>}
            {props.mode == "sidebar" && <IconButton onClick={handleOnCancel}>
                <CloseIcon />
            </IconButton>}
        </div>
        {<Create
            /*  className={classes.form} */
            {...props}
            /* basePath={`/${props.basePath}`} */
            redirect={props.redirect ? props.redirect : "list"}
            submitOnEnter={props.submitOnEnter || false}
            resource={props.resource}

        >
            <SimpleForm
                record={record}
                initialValues={{
                    ...defaultValues,
                    ...props.initialValues
                }}
                submitOnEnter={props.submitOnEnter || false}
            /* toolbar={<UserCreateToolbar permissions={permissions} />} */
            >
                <Grid fullWidth spacing={16}>
                    {fields}
                </Grid>
            </SimpleForm>
        </Create>}
    </FormContainer>
}
export default CreateView;