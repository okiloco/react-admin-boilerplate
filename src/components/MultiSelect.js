import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import { SelectArrayInput } from "react-admin";
import { Input, MenuItem, InputLabel, Chip } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const value = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];
function getStyles(name, value, theme) {
  return {
    fontWeight:
      value.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default class MultiSelect extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    choices: [],
    values: []
  };
  componentWillMount() {
    let { source, record = {}, value, name } = this.props;
    let choices = record[source] || [];
    let values = value || record[source] || record[name] || [];
    this.setState({
      choices,
      values
    });
  }
  componentWillReceiveProps({ record = {}, source, name, value }) {
    let choices = record[name] || record[source] || [];

    choices = choices.map(({ id }) => {
      return id;
    })
    console.log('Choices: ', choices)

    this.setState({
      values: value
    });
    if (choices) {
      if (choices.length > 0) {
        console.log("Trae data: ", choices)
        this.setState({
          choices: choices,
        })
      }
    }
  }
  handleChange = event => {
    let { value } = event.target;
    this.setState({
      choices: value,
    });
    if (this.props.onChange) this.props.onChange(value)
  };
  handleDelete = () => { };
  render() {
    let { choices = [], values = [] } = this.state;
    let { label, placeholder, optionText, optionValue, source } = this.props;

    return (
      <div
        style={{
          margin: 8,
          minWidth: 200
        }}
      >
        {
          <SelectArrayInput
            source={source}
            choices={values}
            style={{
              minWidth: 220
            }}
            fullWidth={true}
            onChange={this.handleChange}
            optionText={optionText}
            optionValue={optionValue}
            label={label}
          />
        }
        <div
          style={{
            margin: 8
          }}
        >
          {values
            .filter(({ id }) => {
              return choices.indexOf(parseInt(id)) != -1;
            })
            .map(data => {
              console.log("Items: ", data)
              return (
                <Chip
                  key={data.id}
                  label={data.name}
                  onDelete={
                    data.name === "React" ? undefined : this.handleDelete(data)
                  }
                />
              )
            })}
        </div>
      </div>
    );
  }
}
