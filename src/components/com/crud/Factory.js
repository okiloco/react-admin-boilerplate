
import React, { useEffect, useState } from "react";
import {
    /* Fields */
    StatusField,
    Avatar,
    CustomField,
    /* Input */
    StatusSelectInput,
    FileField

} from "../"
import {
    /* Fields */
    TextField,
    ReferenceField,
    NumberField,
    SelectField,
    DateField,

    /* Inputs */
    TextInput,
    ReferenceInput,
    SelectInput,
    NumberInput,
    DateInput,
    FileInput,

} from "react-admin";
import RichTextInput from 'ra-input-rich-text';


const CustomEl = ({ record, ...rest }) => {
    return <>
        {rest.render(record[rest.name], record)}
    </>
}


const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
const Factory = ({ input, ...field }) => {
    let xtype = input ?
        field.xtype ?
            field.xtype.replace("field", "input") : field.xtype : field.xtype;
    let el;
    switch (xtype) {
        case 'textfield':
            if (field.reference) {
                return <ReferenceField
                    link={false}
                    {...field}
                >
                    {field.render ? <CustomEl {...field} /> : <TextField source={field.name || "name"} />}
                </ReferenceField >
            }
            return <TextField
                {...field}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
            />
            break;
        case 'filefield':
            if (field.reference) {
                return <ReferenceField
                    /* target={"_id"} */
                    {...field}>
                    <Avatar source={field.path || "path"} />
                </ReferenceField>
            }
            return <Avatar
                {...field}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
            />
            break;
        case 'customfield':

            return <CustomEl {...field} />;
            if (field.content) {
                return React.cloneElement(field.content, field);
            }
            if (field.reference) {
                return <ReferenceField
                    /* target={"_id"} */
                    {...field}>
                    <CustomField {...field} />
                </ReferenceField>
            }
            return <CustomField
                {...field}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
            />
            break;
        case 'textfield':
            return <TextField
                {...field}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
            />
            break;
        case 'numberfield':
            return <NumberField
                {...field}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
            />
            break;
        case 'statusfield':
            return <StatusField
                {...field}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
            />
            break;
        case 'selectfield':
            if (field.reference) {
                return <ReferenceField
                    label={field.text || field.label}
                    source={field.dataIndex || field.source}
                    reference={field.reference}>
                    <TextField source={field.optionText || "name"} />
                </ReferenceField>
            }
            return <SelectField
                {...field}
                optionText={field.optionText || "name"}
                optionValue={field.optionValue || "id"}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
            />
            break;
        case 'datefield':
            return <DateField
                {...field}
            />
            break;
        case 'richtextfield':
            return <DateField
                {...field}
            />
            break;
        /* Inputs */
        case "testinput":
            return <ReferenceInput label="*Establecimiento"
                source="establishment_id"
                reference="establishments"
                {...field}
            >
                <SelectInput defaultValue={1} optionText="name" />
            </ReferenceInput >
            break;
        case 'textinput':
            if (field.reference) {

                console.log("FIELD: ", field)
                return <ReferenceInput
                    disabled={field.disabled}
                    defaultValue={field.defaultValue}
                    source={field.source}
                    label={field.label}
                    reference={field.reference}
                >
                    <SelectInput
                        style={field.style}
                        disabled={field.disabled}
                        defaultValue={field.defaultValue}
                        optionText={field.optionText || "name"}
                    />
                </ReferenceInput>

            }

            console.log("INPUT:: ", field)
            return <TextInput
                {...field}
                disabled={field.disabled}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
            />
            break;
        case 'statusinput':

            if (field.reference) {
                return <ReferenceInput
                    {...field}>
                    <SelectInput
                        {...field}
                        optionText={field.optionText || "name"}
                        optionValue={field.optionValue || "id"}
                    />
                </ReferenceInput>
            }
            /* return <SelectInput
                {...field}
                optionText={field.optionText || "name"}
                optionValue={field.optionValue || "id"}
            /> */

            if (field.reference) {
                return <ReferenceInput
                    {...field}>
                    <StatusSelectInput optionText={field.name || "name"} />
                </ReferenceInput>
            }
            return <StatusSelectInput
                {...field}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
            />
            break;
        case 'numberinput':
            if (field.reference) {
                return <ReferenceInput
                    {...field}>
                    <SelectInput optionText={field.name || "name"} />
                </ReferenceInput>
            }
            return <NumberInput
                {...field}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
            />
            break;
        case 'richtextinput':
            return <RichTextInput
                {...field}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
            />
            break;
        case 'selectinput':
            if (field.reference) {
                return <ReferenceInput
                    {...field}>
                    <SelectInput
                        optionText={field.optionText || "name"}
                        optionValue={field.optionValue || "id"}
                        {...field}
                    />
                </ReferenceInput>
            }
            return <SelectInput
                {...field}
                optionText={field.optionText || "name"}
                optionValue={field.optionValue || "id"}
            />
            break;
        case 'dateinput':
            return <DateInput
                {...field}
            />
            break;
        case 'fileinput':
            if (field.reference) {
                return <ReferenceInput
                    className="file-input"
                    label={field.label}
                    source={field.source}
                    reference={field.reference}
                    disabled={false}
                >
                    <FileField
                        {...field}
                        disabled={false}
                        name={field.name || "path"}
                    />
                </ReferenceInput>
            }
            return <FileField
                {...field}
                source={field.name || "path"}
            />
            break;
        case 'custominput':
            return <CustomEl {...field} />;
            return <CustomField
                {...field}
                source={field.source || field.dataIndex}
                label={field.label || field.text}
            />
        default:

            return input ? <TextInput
                {...field}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
            /> :
                <TextField
                    {...field}
                    source={field.source || field.dataIndex}
                    label={field.label || field.text}
                />
            break;
    }
}
export default Factory;