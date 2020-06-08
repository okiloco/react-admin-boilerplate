import React, { Fragment } from "react";
import {
    EditButton,
    Filter,
    TextInput,
    TextField,
    DateField,
    List,
    Datagrid,
    ReferenceField
} from "react-admin";
import { MoneyField, CustomList, CustomField, StatusField, HeadLine } from "../../components/com";
import UserAddressEdit from "./UserAddressEdit";
import { Route, useHistory } from "react-router-dom";
import { Drawer, useMediaQuery, makeStyles } from "@material-ui/core";

const CompanyFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Razón social" source="name" alwaysOn />
    </Filter>
);
const UserAddress = ({ history, ...props }) => {

    const handleClose = () => {
        history.push("/users");
    }

    

    return (
        <>
            <Route path="/users-addresses/:id">
                {({ match }) => {
                    const isMatch = !!(
                        match &&
                        match.params &&
                        match.params.id !== "create"
                    );
                    return (<Fragment>
                        <HeadLine>Direcciones de Usuarios</HeadLine>
                        <List
                            {...props}
                            /* source={"users-addresses"} */
                            exporter={false}
                            bulkActionButtons={false}
                        >
                            <Datagrid >
                                <TextField source="id" />
                                <ReferenceField label="Usuario" source="user_id" reference="users">
                                    <CustomField source="first_name" render={(record, source) => (<span>{`${record[source]} ${record['last_name']}`}</span>)} />
                                </ReferenceField>
                               {/*  <ReferenceField label="Email" source="user_id" reference="users">
                                    <CustomField source="email" />
                                </ReferenceField> */}
                                <TextField label="Dirección" source="address" />
                                <TextField label="Detalles" source="details" />
                                <TextField source="city.name" label="Ciudad" />
                                <TextField source="state.name" label="Departamento" />
                                <EditButton label="Editar" />
                            </Datagrid>
                        </List>
                        <Drawer
                            variant="persistent"
                            open={isMatch}
                            anchor="right"
                            onClose={handleClose}
                        /* classes={{
                            paper: classes.drawerPaper
                        }} */
                        >
                            {isMatch ? (
                                <UserAddressEdit
                                    id={match.params.id}
                                    onCancel={handleClose}
                                    {...props}
                                />
                            ) : null}
                        </Drawer>
                    </Fragment>)
                }}
            </Route>
        </>);
};

export default UserAddress;
