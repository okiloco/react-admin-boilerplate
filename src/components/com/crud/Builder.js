import React, { useState, useEffect } from 'react';
import Factory from "./Factory";
import { FormDataConsumer } from "react-admin";
import { Grid } from "@material-ui/core";
const ConditionalField = ({ record, children, conditional, ...rest }) => {
    if (conditional)
        return <FormDataConsumer>
            {({ formData, ...rest }) => conditional(formData) &&
                children
            }
        </FormDataConsumer>;
    return children;
}
const Field = ({ record, ...field }) => {
    let style = {};
    if (field.type === 'hidden') {
        field.xtype = "hiddenfield";
    }
    return <Factory
        record={record}
        style={{
            width:
                field.type == "hidden" ?
                    "100%" :
                    `${
                    field.fullWidth ? 100 :
                        field.flex ? Number(field.flex) * 100 : 50}%`,
            ...style
        }} input {...field} />
};
const Builder = props => {
    let { record, primaryKey = "id" } = props;
    let fields = [];
    function getFields(record) {
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
                                <Field disabled={field.readOnly || field.disabled} record={record} {...field} />
                            </ConditionalField> :
                            <Field disabled={field.readOnly || field.disabled} record={record} {...field} />
                    ));
            return <Grid fullWidth spacing={16}>
                {fields}
            </Grid>;
        }
    }
    return {
        getFields
    }
}

export default Builder;