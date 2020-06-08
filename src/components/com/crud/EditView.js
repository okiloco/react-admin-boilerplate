import React, { useEffect, useState, useCallback } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Factory from "./Factory";
import { FormDataConsumer } from 'react-admin';
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import {
    Edit,
    SimpleForm,
    useEditController,
    TopToolbar,
    ShowButton,
    SaveButton,
    Toolbar,
} from "react-admin";


const Actions = ({ basePath, data, resource, actions = {}, children }) => (
    <TopToolbar>
        {actions.show && <ShowButton basePath={basePath} record={data} />}
        {children}
    </TopToolbar>
);

const FormContainer = styled.div`
    min-width:400px;
    min-height:100vh;

    padding:0px;
    margin:0px;

    & .MuiToolbar-root{
       /*  position: absolute!important; */
       /*  bottom: 0!important; */
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

const EditView = (props) => {
    let { onCancel, children, primaryKey = "id", defaultValues } = props;
    const controllerProps = useEditController(props);
    let record = controllerProps.record;
    const history = useHistory();
    const [fields, setFields] = useState([]);
    const getFields = (record) => {
        if (props) {
            let { fields, columns } = props;
            fields = fields || columns;
            if (fields)
                fields = fields
                    .filter(it => (it.source != "_id" && it.source != primaryKey
                        && it.showBy ? it.showBy == "edit" ? true : false : true
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
    const handleClose = useCallback(() => {
        let { match } = props;
        if (match) {
            console.log("PARAMS:: ", controllerProps)
        }
        if (!props.redirect) {
            if (history)
                history.push(`/${controllerProps.basePath}`);
        } else {
            if (history)
                history.replace(`/${props.redirect}`);
        }
    }, [history]);

    const handleOnCancel = () => {
        /*  handleClose(); */
        if (onCancel) return onCancel();
    };


    useEffect(() => {
        getFields(record);
    }, []);
    if (!controllerProps.record)
        return null;
    for (const field in controllerProps.record) {
        if (field != "id") {
            const exists = props.fields.find(it => (it.source == field));
            if (!exists) {
                delete controllerProps.record[field];
            }
        }
    }
    return <FormContainer style={props.style}>
        <div className="head-title">
            {props.title && <Typography variant="h6">{`${props.title}`}</Typography>}
            {props.mode == "sidebar" && <IconButton onClick={handleOnCancel}>
                <CloseIcon />
            </IconButton>}
        </div>
        {<Edit
            /*  className={classes.form} */
            {...props}
            actions={<Actions actions={props.actions || { show: false }} />}
            /* basePath={`/${controllerProps.basePath}`} */
            record={controllerProps.record}
            save={controllerProps.save}
            version={controllerProps.version}
            redirect={props.redirect ? props.redirect : "list"}
            resource={controllerProps.resource}
            submitOnEnter={props.submitOnEnter || false}
        >
            <SimpleForm
                initialValues={{
                    ...defaultValues,
                    ...props.initialValues
                }}
                submitOnEnter={props.submitOnEnter || false}
                record={controllerProps.record}
            >
                {!children && <Grid fullWidth spacing={16}>
                    {fields}
                </Grid>}
                {children && children}
            </SimpleForm>
        </Edit>}

    </FormContainer>
}
export default withRouter(EditView);