import React from "react";
import {
  NumberField,
  List,
  Datagrid,
  TextField,
  EditButton
} from "react-admin";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    fontWeight: "bold",
    // This is JSS syntax to target a deeper element using css selector, here the svg icon for this button
    "& svg": { color: "orange" }
  }
});
const handleClick = id => {
  window.location.href = `/#/guides/${id}`;
  /* window.location.reload(); */
};
const MyEditButton = ({ record, ...props }) => {
  const classes = useStyles();
  return (
    <>
      {/* <EditButton className={classes.button} {...props} /> */}
      <a onClick={() => handleClick(record.id)}>Editar</a>
      {JSON.stringify(props)}
    </>
  );
};

export default MyEditButton;
