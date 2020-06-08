import React, { useState, Fragment } from "react"
import keyBy from 'lodash/keyBy'
import { useQuery, Datagrid, TextField, Pagination, Loading, ShowButton, useEditController, List } from 'react-admin'
import { Route, useHistory, withRouter } from "react-router-dom";
import { useEffect } from "react";

const CustomList = ({ source, children, ...props }) => {
    const [page, setPage] = useState(1);
    const perPage = 10;

    const { data, total, loading, error } = useQuery({
        type: 'GET_LIST',
        resource: source,
        payload: {
            pagination: { page, perPage },
            sort: { field: 'id', order: 'ASC' },
            filter: {},
        }
    });

    if (loading) {
        return <Loading />
    }
    if (error) {
        return <p>ERROR: {error}</p>
    }
    return (
        <List
            exporter={props.exporter || false}
            bulkActionButtons={props.bulkActionButtons || false}
            {...props}>
                
            <Datagrid
            >
                {children}
            </Datagrid>
        </List>
    )
}
export default withRouter(CustomList);