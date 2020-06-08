import React, { Fragment, useState, useEffect, cloneElement, Suspense } from "react";
import {
    TopToolbar, CreateButton, ExportButton, Button, sanitizeListRestProps,
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    ShowButton,
    DeleteButton
} from "react-admin";
import { Route, withRouter } from "react-router-dom";
/* import { Drawer } from "antd"; */
import { Drawer } from '@material-ui/core';


import Loadeable from "react-loadable";


import ShoWView from "./showView";
import Factory from "./Factory";
import HeadLine from "../HeadLine";
import styled from "styled-components";

import EditView from "./EditView";
import CreateView from "./CreateView";


const Wrapper = styled.div`
    margin:8px;
    padding:4px;
`;
const LoaderWrapper = styled.div`
    margin:8px;
    padding:4px;
`;
/* const Loader = props => (<LoaderWrapper>
    <p>Cargando...</p>
</LoaderWrapper>);

const EditView = Loadeable({
    loader: () => import("./EditView"),
    loading: Loader
});
const CreateView = Loadeable({
    loader: () => import("./CreateView"),
    loading: Loader
}); */


const ListActions = ({
    currentSort,
    className,
    resource,
    filters,
    displayedFilters,
    exporter, // you can hide ExportButton if exporter = (null || false)
    filterValues,
    permanentFilter,
    hasCreate, // you can hide CreateButton if hasCreate = false
    basePath,
    selectedIds,
    onUnselectItems,
    showFilter,
    maxResults,
    total,
    children,
    createButtonText,
    actions = {},
    ...rest
}) => (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            {filters && cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            })}
            {(typeof actions.create != "undefined" ? actions.create : true) && <CreateButton label={createButtonText || "Agregar"} basePath={basePath} />}
            {actions.export && <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filter={{ ...filterValues, ...permanentFilter }}
                exporter={exporter}
                maxResults={maxResults}
            />}
            {/* Add your custom  actions */}
            {children}
        </TopToolbar>
    );
const CRUD = ({ children, defaultValues, actions, redirect, mode = "sidebar", ...props }) => {
    const [columns, setColumns] = useState([]);
    const [resource, setResource] = useState();
    const [open, setOpen] = useState(true);
    const [tools, setToolActions] = useState({
        edit: true,
        delete: true,
        show: false
    });
    const [initialized, setInitialized] = useState(false);
    const getColumns = () => {
        let { columns = [] } = props;
        columns = columns.map(field => <Factory {...field} />);
        setColumns(columns);
    }
    useEffect(() => {
        let { location, resource } = props;
        let { pathname } = location;
        let basePath = pathname;
        if (!initialized) {
            basePath = basePath.substring(1);
            basePath = basePath.substring(0, basePath.indexOf("/") != -1 ? basePath.indexOf("/") : basePath.length);
            resource = resource || basePath;
            setResource(resource);
            setInitialized(true);
            getColumns();
            if (!Array.isArray(actions)) {
                setToolActions({
                    ...tools,
                    ...actions
                })
            } else {
                setToolActions({
                    edit: false,
                    delete: false,
                    show: false
                });
            }
        }
        if (props.columns.length != columns.length) {
            console.log("Columns!", props.columns.length, columns.length);
            getColumns();
        }
        setOpen(true);
    }, [actions, props.location, props.columns])
    if (!resource) {
        return "Loading";
    }
    const handleClose = () => {
        let { history } = props;
        if (!redirect) {
            history.push(props.basePath || `/${resource}`);
        } else {
            if (typeof redirect == "boolean") {
                return history.replace(`/${resource}`);
            }
            history.replace(`/${redirect}`);
        }

    }
    return (<div>
        <Wrapper>
            {mode == "sidebar" ? <Route path={props.path || `/${resource}/:id`}>
                {({ match }) => {
                    let isMatch = (
                        match &&
                        match.params
                    );
                    return (
                        <Fragment>
                            {props.title && <HeadLine>{props.title}</HeadLine>}
                            <List
                                {...props}
                                className="dinamic-list"
                                filters={props.filters && props.filters}
                                exporter={false}
                                hasCreate={true}
                                bulkActionButtons={false}
                                filterDefaultValues={props.filterDefaultValues}
                                basePath={props.basePath || `/${resource}`}
                                resource={resource}
                                actions={<ListActions
                                    createButtonText={props.createButtonText}
                                    actions={props.tools}
                                />}
                                sort={props.sort}
                            >
                                <Datagrid /* rowClick="edit" */ optimized {...props}>
                                    {columns}
                                    {tools.edit && <EditButton label={false} />}
                                    {tools.delete && <DeleteButton label={false} />}
                                    {tools.show && <ShowButton label={false} />}
                                    {Array.isArray(actions) && actions}
                                </Datagrid>
                            </List>
                            {open && <Drawer
                                className="dinamic-drawer"
                                destroyOnClose
                                closable={false}
                                width={props.wrapperWidth || 500}
                                style={{
                                    maxWidth: 500,
                                }}
                                onClose={handleClose}
                                visible={isMatch}
                                open={isMatch}
                                anchor="right"
                            >
                                {isMatch && match.params.id != "create" ? (
                                    <EditView
                                        /*  className={classes.drawerContent} */
                                        {...props}
                                        id={isMatch ? match.params.id : null}
                                        onCancel={handleClose}
                                        title={props.editTitle}
                                        basePath={props.basePath || `/${resource}`}
                                        redirect={redirect}
                                        mode={mode}
                                        fields={props.fields || props.columns}
                                        resource={resource}
                                    />
                                ) :
                                    isMatch && match.params.action == "show" ? (
                                        <ShoWView
                                            /*  className={classes.drawerContent} */
                                            {...props}
                                            id={isMatch ? match.params.id : null}
                                            onCancel={handleClose}
                                            title={props.editTitle}
                                            basePath={props.basePath || `/${resource}`}
                                            redirect={redirect}
                                            defaultValues={defaultValues}
                                            mode={mode}
                                            show={React.cloneElement(props.show, {
                                                ...props
                                            })}
                                            fields={props.fields || props.columns}
                                            resource={resource}
                                        />
                                    ) :
                                        (
                                            <CreateView
                                                /*  className={classes.drawerContent} */
                                                id={isMatch ? match.params.id : null}
                                                onCancel={handleClose}
                                                basePath={props.basePath || `/${resource}`}
                                                resource={resource}
                                                redirect={redirect}
                                                defaultValues={defaultValues}
                                                mode={mode}
                                                {...props}
                                            />
                                        )}
                            </Drawer>}
                        </Fragment>
                    );
                }}
            </Route> :
                <>
                    {props.title && <HeadLine>{props.title}</HeadLine>}
                    <List
                        className="dinamic-list"
                        exporter={false}
                        hasCreate={true}
                        bulkActionButtons={false}
                        basePath={`/${resource}`}
                        resource={resource}
                        {...props}
                    >
                        <Datagrid /* rowClick="edit" */ optimized {...props}>
                            {columns}
                            {tools.edit && <EditButton label={false} />}
                            {tools.delete && <DeleteButton label={false} />}
                            {tools.show && <ShowButton label={false} />}
                            {Array.isArray(actions) && actions}
                        </Datagrid>
                    </List>

                </>}
        </Wrapper>
    </div>
    )
}
export default withRouter(CRUD);