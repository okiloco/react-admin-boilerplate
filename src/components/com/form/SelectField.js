import React from 'react';
import { Select } from "antd";

const { Option } = Select;
const SelectField = ({ optionValue, optionText, placeholder, onChange, onSearch, choices, ...props }) => (<Select
    size="large"
    style={{ minWidth: 150 }}
    {...props}
    showSearch
    placeholder={placeholder || "Seleccione un registro"}
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
>
    {choices && choices.map(it => (<Option value={it[optionValue || "id"]}>
        {it[optionText || "name"]}
    </Option>))}
</Select>);

export default SelectField;