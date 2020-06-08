import React, { Component } from "react";
import ColorPicker from "material-ui-color-picker";
import { TextField } from "react-admin";

const doEvent = (obj, event) => {
  /* Created by David@Refoua.me */
  var event = new Event(event, { target: obj, bubbles: true });
  return obj ? obj.dispatchEvent(event) : false;
};
export default class MyColorPicker extends Component {
  state = {
    value: "#000"
  };
  RefField = React.createRef();
  componentWillReceiveProps({ record }) {}
  componentDidMount() {
    let { record = {}, source, name } = this.props;
    this.setState({
      value: record[source] || "#000"
    });
  }
  render() {
    let { record = {}, source, name, onChange } = this.props;
    let { value } = this.state;
    let { id } = this.props;
    return (
      <>
        {value && (
          <label
            htmlFor={"1"}
            className="flat-button-file"
            variant="outlined"
            style={{
              background: value || "#fff",
              color: "#fff"
            }}
          >
            {value}
          </label>
        )}
        <ColorPicker
          id={id || "colorpicker"}
          name="color"
          ref={this.RefField}
          /* defaultValue={"#000"} */
          {...this.props}
          label={!value ? this.props.label : null}
          /*  value={value} */
          // value={this.state.color} - for controlled component
          onChange={value => {
            if (typeof value !== "undefined") {
              if (value !== "#ffffff") {
                this.setState({
                  value
                });

                var el,
                  inputs = window.document
                    .getElementById(id || "colorpicker")
                    .getElementsByTagName("input");
                console.log(inputs);
                if (inputs.length > 0) el = inputs[0];
                if (el) {
                  console.log("EL", el);
                  el.value = value;
                  doEvent(el, "input");
                }
              }
              if (onChange) onChange(value);
            }
          }}
        />
      </>
    );
  }
}
