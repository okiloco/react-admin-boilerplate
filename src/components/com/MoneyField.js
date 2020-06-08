import React from "react";
import { money } from "../../utils/Helper"
const MoneyField = ({ source, record }) => {
    return (<>{money(record[source])}</>)
}

export default MoneyField;