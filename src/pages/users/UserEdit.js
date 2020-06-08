import React, { Component, useCallback } from "react";
import { useHistory } from "react-router-dom";

import {
  Edit,
  SimpleForm,
  TextInput,
  useEditController,
  SelectInput,
  DateInput,
  NumberInput,
} from "react-admin";
import CloseIcon from "@material-ui/icons/Close";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Title, role_list } from "./";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/";

const stadosList = [
  { id: "active", name: "Activo" },
  { id: "disabled", name: "Inactivo" },
  { id: "pending validation", name: "Pendiente Validacion" },
];
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 40,
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "1em",
  },
  form: {
    /*  [theme.breakpoints.up("xs")]: {
      width: 400
    },
    [theme.breakpoints.down("xs")]: {
      width: "100vw",
      marginTop: -30
    } */
  },
  inlineField: {
    display: "inline-block",
    width: "50%",
  },
}));
const UserEdit = ({ onCancel, ...props }) => {
  const classes = useStyles();
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
  delete controllerProps.record.credit_cards;
  delete controllerProps.record.user_addresses;
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6">Editar Usuario</Typography>
        <IconButton onClick={handleOnCancel}>
          <CloseIcon />
        </IconButton>
      </div>
      <SimpleForm
        className={classes.form}
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
            <TextInput source="first_name" label="Nombre" />
            <TextInput source="last_name" label="Apellido" />
          </Grid>
          <Grid item xl={6} spacing={6}>
            <SelectInput
              style={{
                width: "50%"
              }}
              label="Genero"
              source="gender"
              choices={[
                { id: 'male', name: 'Masculino' },
                { id: 'female', name: 'Femenino' },
              ]} />
            <TextInput source="phone" label="Celular" />
          </Grid>
          <Grid item xl={6} spacing={6}>
            <TextInput source="email" />
            <TextInput type="password" source="password" />
          </Grid>
          <Grid item xl={6} spacing={6}>
            <DateInput style={{
              width: "50%"
            }} label="Fecha de nacimiento" source="birthday" />
            <SelectInput style={{
              width: "50%"
            }} source="status" label="Estado" choices={stadosList} />
          </Grid>
        </Grid>
      </SimpleForm>
    </div>
  );
};
export default UserEdit;
