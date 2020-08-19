
import React from "react";
import {
    /* Fields */
    StatusField,
    Avatar,
    CustomField,
    /* Input */
    StatusSelectInput,
    FileField
} from "../";
import {
    /* Fields */
    TextField,
    ReferenceField,
    NumberField,
    SelectField,
    DateField,
    ReferenceArrayField,
    SingleFieldList,
    ChipField,
    /* Inputs */
    TextInput,
    ReferenceInput,
    SelectInput,
    NumberInput,
    DateInput,
    ReferenceArrayInput,
    SelectArrayInput,
    FileInput,
} from "react-admin";
import RichTextInput from 'ra-input-rich-text';
import { money, decimal } from "../../../utils/Helper";
import { HiddenField } from "./Styles";
const CustomEl = ({ record, ...rest }) => {
    return <>
        {record && rest.render(record[rest.name || rest.source], record)}
    </>
}

const renderFullName = (firstName, lastName) => (`${firstName || ""} ${lastName || ""}`)
const Factory = ({ input, ...field }) => {
    let xtype = input ?
        field.xtype ?
            field.xtype.replace("field", "input") : field.xtype : field.xtype;
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
                source={field.dataIndex || field.source}
                label={field.text || field.label}
                {...field}
            />
            break;
        case 'selectfield':

            if (field.multiple && field.reference) {
                return <ReferenceArrayField label={field.label} reference={field.reference} source={field.source}>
                    <SingleFieldList>
                        <ChipField source={field.optionText || "name"} />
                    </SingleFieldList>
                </ReferenceArrayField>
            }
            if (field.reference) {
                return <ReferenceField
                    {...field}
                    label={field.text || field.label}
                    source={field.dataIndex || field.source}
                    reference={field.reference}
                >
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
        /* Commons Fields */
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
        case 'percentfield':
            if (field.reference) {
                return <ReferenceField
                    {...field}
                >
                    <CustomField {...field}
                        render={(value, record) => `${value}%`} />
                </ReferenceField>
            }
            return <CustomField
                {...field}
                render={(value, record) => `${value}%`}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
            />
            break;
        case 'moneyfield':
            return <CustomEl
                {...field}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
                render={(value, record) => (`${money(value)}`)}
            />
            break;
        case 'decimalfield':
            return <CustomEl
                {...field}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
                render={(value, record) => (`${decimal(value)}`)}
            />
            break;
        case 'fullnamefield':
            if (field.reference) {
                return <ReferenceField
                    {...field}>
                    <CustomField {...field}
                        render={(value, record) => renderFullName(
                            value || record[field.first_name || "first_name"],
                            record[field.last_name || "last_name"],
                        )}
                    />
                </ReferenceField>
            }
            return <CustomField
                {...field}
                render={(record) => renderFullName(
                    record[field.first_name || "first_name"],
                    record[field.last_name || "last_name"],
                )}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
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
                    perPage={field.perPage}
                    sort={field.sort}
                    filter={field.filter}
                >
                    <SelectInput
                        style={field.style}
                        disabled={field.disabled}
                        defaultValue={field.defaultValue}
                        optionText={field.optionText || "name"}
                    />
                </ReferenceInput>

            }
            return <TextInput
                {...field}
                disabled={field.disabled}
                source={field.dataIndex || field.source}
                label={field.label || field.text || ""}
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

            if (field.multiple && field.reference) {
                return <ReferenceArrayInput source={field.source} reference={field.reference}>
                    <SelectArrayInput
                        optionText={field.optionText || "name"}
                        optionValue={field.optionValue || "id"}
                        {...field} />
                </ReferenceArrayInput>
            }
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
                source={field.name || field.source || "path"}
            />
            break;
        /* Commons Inputs */
        case 'hiddeninput':
            return <HiddenField
                type="hidden"
                {...field}
                source={field.dataIndex || field.source}
                label={field.text || field.label || ""}
            />
            break;
        case 'custominput':
            return <CustomEl {...field} />;
            return <CustomField
                {...field}
                source={field.source || field.dataIndex}
                label={field.label || field.text}
            />
        case 'moneyinput':
            if (field.reference) {
                return <ReferenceInput
                    {...field}>
                    <SelectInput optionText={field.name || "name"} />
                </ReferenceInput>
            }
            return <NumberInput
                {...field}
                format={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parse={value => value.replace(/\$\s?|(,*)/g, '')}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
            />
            break;
        case 'percentinput':
            if (field.reference) {
                return <ReferenceInput
                    {...field}>
                    <SelectInput optionText={field.name || "name"} />
                </ReferenceInput>
            }
            return <NumberInput
                {...field}
                format={value => `${value}%`}
                parse={value => value.replace('%', '')}
                source={field.dataIndex || field.source}
                label={field.text || field.label}
            />
            break;

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