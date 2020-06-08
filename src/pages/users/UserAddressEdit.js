import React, { Component, useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
    Edit,
    SimpleForm,
    TextInput,
    useEditController,
    SelectInput,
    ReferenceArrayInput,
    ReferenceInput,
    SelectArrayInput,
    NumberInput,
} from "react-admin";
import { Title, role_list } from "./";
import { Grid } from "@material-ui/core";
import { HeadLine } from "../../components/com";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const UserAddressEdit = ({ onCancel, ...props }) => {
    const controllerProps = useEditController(props);
    const history = useHistory();
    const handleClose = useCallback(() => {
        history.push("/users");
    }, [history]);

    const handleOnCancel = () => {
        if (onCancel) return onCancel();
        handleClose();
    };
    if (!controllerProps.record) {
        return null;
    }
    delete controllerProps.record.state;
    delete controllerProps.record.city;
    return (<>
        <HeadLine variant="h6">Editar Dirección Usuario</HeadLine>
        <SimpleForm
            basePath={controllerProps.basePath}
            record={controllerProps.record}
            save={controllerProps.save}
            version={controllerProps.version}
            redirect="list"
            resource="users"
        >
            <TextInput fullWidth source="id" label={false} type="hidden" />
            <Grid fullWidth spacing={16}>
                <Grid item xl={6} spacing={6}>
                    <TextInput source="name" label="Nombre" />
                    <TextInput source="address" label="Dirección" />

                </Grid>
                <Grid fullWidth item xs={12} md={6}>
                    {<ReferenceInput
                        perPage={1000}
                        label="Ciudad"
                        source="city_id"
                        reference="locations-cities"
                    >
                        <SelectInput optionText="name" />
                    </ReferenceInput>}
                    {<ReferenceInput
                        perPage={1000}
                        label="Estado"
                        source="state_id"
                        reference="locations-states"
                    >
                        <SelectInput optionText="name" />
                    </ReferenceInput>}
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextInput fullWidth multiline source="details" label="Detalles" />
                </Grid>
            </Grid>

        </SimpleForm>
    </>
    );
};
export default UserAddressEdit;
