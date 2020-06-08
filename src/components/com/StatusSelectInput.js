import React, { useState, useEffect } from "react";
import {
    SelectInput
} from "react-admin";
const status = [
    { id: "active", name: "Activo" },
    { id: "inactive", name: "Inactivo" }
];

const StatusSelectInput = props => {
    return <SelectInput
        {...props}
        choices={props.choices || status}
        label="Estado"
        source={props.source || "status"}
        optionText="name"
        optionValue="id"
        alwaysOn={props.alwaysOn}
    />
}

export default StatusSelectInput;