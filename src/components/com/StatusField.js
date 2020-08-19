import React, { useState, useEffect } from "react";
import { Tag } from "antd";
import styled from "styled-components";
import {
    ChipField
} from "react-admin";

const Wrapper = styled.div`
    &.tag-status .MuiChip-root{
        border-radius: 20px;
        text-align: center;
        text-transform: capitalize;
        border: 0px!important;
        font-size: 14px!important;
        font-weight: 700!important;
        padding: 0 8px!important;
    }
    &.active .MuiChip-root,
    &.Activo .MuiChip-root{
        background:#56b475!important;
        color:#fff!important;
    }
    &.inactive .MuiChip-root,
    &.Inactivo .MuiChip-root
    {
        background:#f5222d!important;
        color:#ccc!important;
    }
    &.yellow .MuiChip-root{
        background:#ffea30!important;
        color: #172533!important;
    }
    &.blue .MuiChip-root{
        background:#19c3d8!important;
        color: #fff!important;
    }
    &.red .MuiChip-root{
        background:#f5222d!important;
        color: #fff!important;
    }
`;
const StatusField = ({ label, reference, ...props }) => {
    let { source, children } = props;
    const [status, setStatus] = useState();
    const [initialized, setInitialized] = useState(false);
    const [record, setNewRecord] = useState(props.record);

    useEffect(() => {
        let { record } = props;
        if (!initialized && record) {

            setStatus(record[source]);
            record[source] = record[source] == "active" ? "Activo" : (record[source] == "inactive" || record[source] == "disabled") ? "Inactivo" : record[source];
            setInitialized(true);
        }
        setNewRecord(record);
    }, [props.record])
    return (
        <Wrapper className={`tag-status ${record[source]}`} {...props}>
            {!children && initialized && <ChipField
                {...props}
                record={record}
                style={{
                    background: record.color,
                    color: "#fff"
                }}

            />}
            {children && children}
        </Wrapper>
    )
}
export default StatusField;