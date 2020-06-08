import React, { useEffect, useState, useCallback } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Factory from "./Factory";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import {
    Show,
    SimpleShowLayout,
    useShowController
} from "react-admin";

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
`
const ShowView = (props) => {
    let { onCancel, children, show, primaryKey = "id" } = props;
    const controllerProps = useShowController(props);
    let record = controllerProps.record;
    const history = useHistory();
    const [fields, setFields] = useState([]);
    const getFields = (record) => {
        if (props) {
            let { fields, columns } = props;
            fields = fields || columns;
            if (fields)
                fields = fields
                    .filter(it => (it.source != "_id" && it.source != primaryKey))
                    .map(field => (
                        <Factory
                            record={record}
                            style={{
                                width: `${
                                    field.fullWidth ? 100 :
                                        field.flex ? Number(field.flex) * 100 : 50}%`
                            }} input {...field} />
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
        getFields(controllerProps.record);
    }, []);
    if (!controllerProps.record)
        return null;
    for (const field in controllerProps.record) {
        if (field != "id") {
            const exists = props.fields.filter(it => (it.source == field));
            if (exists.length == 0) {
                delete controllerProps.record[field];
            }
        }
    }
    return <FormContainer style={props.style}>
        <div className="head-title">
            {<Typography variant="h6">{`${props.title || "Detalle"}`}</Typography>}
            {props.mode == "sidebar" && <IconButton onClick={handleOnCancel}>
                <CloseIcon />
            </IconButton>}
        </div>
        {<Show
            /*  className={classes.form} */
            {...props}
            /* basePath={`/${controllerProps.basePath}`} */
            record={controllerProps.record}
            save={controllerProps.save}
            version={controllerProps.version}
            redirect={props.redirect ? props.redirect : "list"}
            resource={controllerProps.resource}
            submitOnEnter={props.submitOnEnter || false}
        >
            <SimpleShowLayout
                submitOnEnter={props.submitOnEnter || false}
                record={controllerProps.record}
            >
                <>
                    {children && children}
                    {show && React.cloneElement(show, {
                        record: controllerProps.record,
                        ...props
                    })}
                </>
            </SimpleShowLayout>
        </Show>}

    </FormContainer>
}
export default withRouter(ShowView);