import React from "react";
const CustomField = ({ record, source, render, ...props }) => {
    let value = record[source];
    value = typeof record[source] == "object" ? record[source][props.name || "path"] : record[source];
    return (<span>{!render ? `${value}` : render(value, record)}</span>)
}

export default CustomField;