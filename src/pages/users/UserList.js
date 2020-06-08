import React, { Fragment, useCallback, useState } from "react";
import {
  List,
  BulkDeleteButton,
  Datagrid,
  TextField,
  EditButton,
  SelectField,
  TextInput,
  EmailField,
  ReferenceInput,
  SelectInput,
  Filter,
  DateField,
  ReferenceField
} from "react-admin";
import { role_list, Title } from "./";
import { Route, useHistory } from "react-router-dom";
import { Drawer, useMediaQuery, makeStyles } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { CreateButton, ExportButton, RefreshButton } from "react-admin";
import Toolbar from "@material-ui/core/Toolbar";
import BulkAcceptButton from "./BulkAcceptButton";
import BulkRejectButton from "./BulkRejectButton";
import { MoneyField, StatusField, StatusSelectInput, Avatar } from "../../components/com"
import UserEdit from "./UserEdit";


const Filters = props => (
  <Filter {...props}>
    <TextInput label="Título" source="title" alwaysOn />
    <SelectInput label="Rol" source="role" choices={role_list} alwaysOn />
    <StatusSelectInput alwaysOn />
  </Filter>
);
const PostActions = ({
  basePath,
  currentSort,
  displayedFilters,
  exporter,
  filters,
  filterValues,
  onUnselectItems,
  resource,
  selectedIds,
  showFilter,
  total
}) => (
    <Toolbar>
      {filters &&
        React.cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: "button"
        })}
      <CreateButton basePath={basePath} />
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filter={filterValues}
        exporter={exporter}
      />
      {/* Add your custom actions */}
      <Button color="primary" /* onClick={customAction} */>Custom Action</Button>
    </Toolbar>
  );
const ReviewsBulkActionButtons = props => (
  <Fragment>
    <BulkAcceptButton {...props} />
    <BulkRejectButton {...props} />
    <BulkDeleteButton {...props} />
  </Fragment>
);
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  list: {
    flexGrow: 1,
    transition: theme.transitions.create(["all"], {
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  },
  listWithDrawer: {
    marginRight: 400
  },
  drawerPaper: {
    zIndex: 100
  }
}));

const UserName = ({ record }) => {
  return record ? `${record.first_name} ${record.last_name}` : null;
};

const GuideList = props => {
  const [isMatch, setIsMatch] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const handleClose = useCallback(() => {
    history.push("/users");
  }, [history]);

  const handleAdd = useCallback(() => {
    history.push("/users");
  }, [history]);

  return (
    <div>
      <Route path="/users/:id">
        {({ match }) => {
          const isMatch = !!(
            match &&
            match.params &&
            match.params.id !== "create"
          );
          return (
            <Fragment>
              <List
                {...props}
                title={<Title />}
                filters={<Filters />}
                bulkActionButtons={false}
                rowClick="edit"
              >
                <Datagrid rowClick="edit" optimized {...props}>
                  <TextField source="id" />
                  <Avatar label="Foto" source="avatar_gallery" />
                  <UserName label="Nombres" />
                  <TextField source="email" label="Correo" />
                  <TextField source="gender" label="Genero" />
                  <TextField label="Celular" source="phone" />
                  <SelectField
                    label="Rol"
                    source="role"
                    choices={role_list}
                    optionText="name"
                    optionValue="id"
                  />
                  <StatusField
                    source="status"
                    label="Estado"
                  />
                  <EditButton label="Editar" />
                </Datagrid>
              </List>
              <Drawer
                variant="persistent"
                open={isMatch}
                anchor="right"
                onClose={handleClose}
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                {isMatch ? (
                  <UserEdit
                    id={match.params.id}
                    onCancel={handleClose}
                    {...props}
                  />
                ) : null}
              </Drawer>
            </Fragment>
          );
        }}
      </Route>
    </div>
  );
};
export default GuideList;
