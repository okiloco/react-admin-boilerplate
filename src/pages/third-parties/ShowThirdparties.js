import React from 'react';
import ThirdPartyContacts from "./ThirdPartyContacts";
import { Tabs, Tab, AppBar, Box } from '@material-ui/core';
import {
    Show,
    useEditController,
} from "react-admin";

import { Layout } from "antd";
const { Content } = Layout;

const ShowThirdparties = props => {
    const { record, resource } = useEditController(props);

    if (!record) {
        return null;
    }
    return (<Show  {...props}>
        <>
            <ThirdPartyContacts id={record.id} record={record} />
        </>
    </Show>)
}
export default ShowThirdparties;