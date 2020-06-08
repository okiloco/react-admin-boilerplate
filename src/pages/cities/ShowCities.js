import React from 'react';
import Neigborhoods from "./Neigborhoods";
import { Tabs, Tab, AppBar, Box } from '@material-ui/core';
import {
    Show,
    useEditController,
} from "react-admin";

import { Layout } from "antd";
const { Content } = Layout;

const ShowCities = props => {
    const { record, resource } = useEditController(props);

    if (!record) {
        return null;
    }
    return (<Show  {...props}>
        <>
            <Neigborhoods id={record.id} record={record} />
        </>
    </Show>)
}
export default ShowCities;