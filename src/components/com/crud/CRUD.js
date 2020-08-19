import React, { Fragment, useState, useEffect, cloneElement, Suspense } from "react";
import {
    TopToolbar, CreateButton, ExportButton, Button, sanitizeListRestProps,
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    ShowButton,
    DeleteButton,
    Filter
} from "react-admin";
import { Route, withRouter } from "react-router-dom";
/* import { Drawer } from "antd"; */
import { Drawer } from '@material-ui/core';




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
    mode,
    onCreate,
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
            {(actions.create && mode == "sidebar" ? actions.create : true) && <CreateButton label={createButtonText || "Agregar"} basePath={basePath} />}
            {actions.export && <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filter={{ ...filterValues, ...permanentFilter }}
                exporter={exporter}
                maxResults={maxResults}
            />}
            {actions.create && mode == "form" ? <Button onClick={onCreate} label={createButtonText || "Agregar"} basePath={basePath} /> : null}
            {/* Add your custom  actions */}
            {
                actions.props &&
                <React.Fragment fullWidth>
                    {React.cloneElement(actions, {
                        fullWidth: true
                    })}
                </React.Fragment>
            }
            {children}
        </TopToolbar>
    );

const CustomFilters = ({ filters, ...props }) => {
    return <Filter {...props}>
        {
            filters.map(({ props }) => (<Factory
                {...props}
                alwaysOn={props.filter}
                input={true} />))
        }
    </Filter>
}
const CRUD = ({ children, defaultValues, actions, redirect, onCreate, mode = "sidebar", ...props }) => {
    const [columns, setColumns] = useState([]);
    const [resource, setResource] = useState();
    const [open, setOpen] = useState(true);
    const [action, setAction] = useState();
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
        let action = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
        setAction(action);
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
    const handleActions = (action) => {
        setAction(action);
    }
    return (<div>
        <Wrapper>
            {mode == "sidebar" ? <Route path={props.path || `/${resource}/:id`}>
                {({ match, location }) => {
                    let isMatch = (
                        match &&
                        match.params
                    );
                    if (isMatch && action == "show" && props.show) return;
                    return (
                        <Fragment>
                            {props.title && <HeadLine>{props.title}</HeadLine>}
                            {props.tools && <TopToolbar style={{
                                justifyContent: "start"
                            }}>
                                {props.tools}
                            </TopToolbar>}
                            <List
                                className="dinamic-list"
                                filters={props.filters ? props.filters : <CustomFilters filters={columns.filter(({ props }) => (props.filter))} />}
                                exporter={false}
                                hasCreate={true}
                                bulkActionButtons={false}
                                filterDefaultValues={props.filterDefaultValues}
                                basePath={props.basePath || `/${resource}`}
                                resource={resource}
                                actions={<ListActions
                                    createButtonText={props.createButtonText}
                                    actions={props.extra}
                                />}
                                {...props}
                            >
                                <Datagrid /* rowClick="edit" */ optimized {...props}>
                                    {columns}
                                    {tools.edit && <EditButton onClick={() => handleActions("edit")} label={false} />}
                                    {tools.delete && <DeleteButton onClick={() => handleActions("delete")} label={false} />}
                                    {tools.show && <ShowButton onClick={() => handleActions("show")} label={false} />}
                                    {Array.isArray(actions) && actions}
                                </Datagrid>
                            </List>
                            {open && isMatch && action != "show" && <Drawer
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
                                {isMatch && match.params.id != "create" ? (<>
                                    <EditView
                                        /*  className={classes.drawerContent} */
                                        id={isMatch ? match.params.id : null}
                                        onCancel={handleClose}
                                        title={props.editTitle}
                                        basePath={props.basePath || `/${resource}`}
                                        redirect={redirect}
                                        mode={mode}
                                        fields={props.fields || props.columns}
                                        resource={resource}
                                        {...props}
                                    />
                                </>) :
                                    isMatch && match.params.id == "create" && (
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
            </Route> : mode == "form" ?
                    <>
                        {props.title && <HeadLine>{props.title}</HeadLine>}
                        <List
                            className="dinamic-list"
                            filters={props.filters && props.filters}
                            exporter={false}
                            hasCreate={true}
                            bulkActionButtons={false}
                            filterDefaultValues={props.filterDefaultValues}
                            basePath={props.basePath || `/${resource}`}
                            resource={resource}
                            actions={<ListActions
                                mode={mode}
                                createButtonText={props.createButtonText}
                                actions={props.tools}
                            />}
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
                    </> : null}
            {props.show && <Route path={props.path || `/${resource}/:id/:action`}>
                {({ match }) => {
                    let isMatch = (
                        match &&
                        match.params
                    );
                    return (
                        <Fragment>
                            {
                                isMatch && match.params.action == "show" && (
                                    <>
                                        <ShoWView
                                            id={isMatch ? match.params.id : null}
                                            onCancel={handleClose}
                                            title={props.editTitle}
                                            basePath={props.basePath || `/${resource}`}
                                            redirect={redirect}
                                            defaultValues={defaultValues}
                                            mode={mode}
                                            show={props.show && React.cloneElement(props.show, {
                                                ...props
                                            })}
                                            fields={props.fields || props.columns}
                                            resource={resource}
                                            {...props}
                                        />
                                    </>
                                )
                            }
                        </Fragment>)
                }}
            </Route>}
        </Wrapper>
    </div>
    )
}
export default withRouter(CRUD);