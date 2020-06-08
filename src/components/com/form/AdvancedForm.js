import React, { Component } from "react";
import { Form, Row, Col, Button, Divider } from "antd";
import "./form.css";
import styled from "styled-components";
const footerStyle = {
  marginTop: 20
};
const HeadTitle = styled.div`
  h2 {
    font-size: 24px !important;
    font-style: italic !important;
    text-align: center !important;
    color: #ccc !important;
  }
`;
class AdvancedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      record: {},
      formLayout: "vertical"
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (typeof this.props.onSubmit !== "undefined") {
        this.props.onSubmit(err, {
          ...values,
          ...this.state.record
        }, this.props.form);
        //if (!err) this.props.form.resetFields();
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };
  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };
  handleChange = (key, value) => {

    //console.log(key, value)
    if (this.props.onChange) this.props.onChange(key, value, this.props.form);
    this.props.form.setFieldsValue({
      [key]: value
    });
  };
  checkdate = (rule, value, callback) => {
    if (value) {
      callback();
      return;
    }
    callback("Date is required!");
  };
  // To generate mock Form.Item
  getFields() {

    const me = this;
    const { getFieldDecorator } = this.props.form;
    const { children, initialValues } = this.props;
    let childrens = [];

    let { formLayout } = this.state;
    formLayout = this.props.formLayout || formLayout;

    //console.log("formLayout:: ",formLayout);
    const formItemLayout =
      formLayout === "vertical"
        ? {
          span: 12
        }
        : null;

    if (typeof children !== "undefined") {
      try {
        let { props } = children;
        let childNodes = props.children || [];
        childrens = React.Children.map(childNodes, (child, index) => {
          if (!child) return child;

          let {
            name,
            label,
            help,
            required,
            message,
            validations,
            style,
            initial,
            initialValue,
            onChange,
            onSelect,
            type,
            xtype,
            reference,
            flex,
            mode,
            feedback = false
          } = child.props;




          name = typeof name === "undefined" ? `field_${index}` : name;

          style = style || {};

          /* InitialValue Map */
          let { latName = "lat", lngName = "lng" } = child.props;
          let { form } = me.props;
          if (xtype === "map") {
            let values = form.getFieldsValue([latName, lngName]);
            /* form.setFieldsValue({ [lngName]: values[lngName] });
            form.setFieldsValue({ [latName]: values[latName] }); */
            initialValue = Object.values(values);
            //console.log("Values: ", initialValue, values);
          }
          if (initialValues) initialValue = initialValues[name];
          validations = validations || [
            {
              required: required || this.props.allRequired || false,
              message: message || `${label} es requerido`
            }
          ];

          if (reference) {
            if (validations.filter(it => it.validator).length === 0) {
              validations.push({
                validator: (rule, value, callback) => {
                  if (value && value !== form.getFieldValue(reference)) {
                    callback("Two passwords that you enter is inconsistent!");
                  } else {
                    callback();
                  }
                }
              });
            }
          }
          if (type === "email") {
            validations.push({
              type: "regexp",
              pattern: new RegExp(
                "^([a-zd.-]+)@([a-zd-]+).([a-z]{2,8})(.[a-z]{2,8})?$"
              ),
              message: "Wrong format!"
            });
          }
          if (xtype === "password") {


            if (validations.filter(it => it.validator).length === 0) {
              validations.push({
                validator: async (rule, value) => {
                  var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
                  if (mediumRegex.test(value)) {
                    //console.log("green");
                  } else {
                    throw new Error(value ? 'Contraseña mal formada!' : "La Contraseña es requerida");
                  }
                }
              });
            }
          }
          delete child.value;
          if (type === "hidden")
            style = {
              width: "100%",
              height: 0,
              margin: 0,
              padding: 0
            };

          if (flex <= 1) style["width"] = `${flex * 100}%`;
          if (!child.type || typeof child == "undefined") {
            return null;
          };
          return (
            <Col
              {...formItemLayout}
              key={name || `field-${index}`}
              style={{ padding: 5, display: "inline-block", ...style }}
              className={`${
                typeof child.className !== "undefined"
                  ? "item-form " + child.className
                  : "item-form"
                } ${type === "hidden" ? "item-hidden" : ""}`}
            >
              <Form.Item label={label} hasFeedback={reference != null}
                help={help}
              >
                {getFieldDecorator(name || `field-${index}`, {
                  initialValue: initialValue || initial,
                  /*  trigger: "focus", */
                  validateTrigger: "onChange",
                  /* trigger: "dateChange", */
                  valuePropName: "value",

                  rules: validations,
                  onSelect: function (value) {
                    alert(value);
                  },
                  onChange: function (key, value) {
                    let { form } = me.props;

                    if (xtype === "map") {
                      /*  let { latName = "lat", lngName = "lng" } = child.props; */
                      value = key;
                      let { lng, lat } = value;
                      form.setFieldsValue({ [lngName]: lng });
                      form.setFieldsValue({ [latName]: lat });
                    }

                    if (value)
                      if (typeof value === "object") {
                        value = key;
                        if (Array.isArray(key)) {
                          value = value.join(",");

                        }
                        /* if (Array.isArray(value)) {
                          if (mode === "multiple") {
                            console.log("VALUE:: ", key, value);
                            value = value.map(item => {
                              let { props } = item;
                              return props.value;
                            });
                          }
                          value = value.join(",");
                        } else {
                          value = key;
                        } */
                      }
                    if (xtype === "checkbox") {
                      let { checked } = key.target;
                      value = checked;
                    }
                    if (typeof key === "object") {
                      if (key)
                        if ("target" in key) value = key.target.value;
                    }

                    if (typeof value == "undefined" && typeof key != "undefined")
                      value = key;
                    if (xtype == "autocomplete") {
                      if (isNaN(Number(value))) return;
                      if (!isNaN(Number(value)))
                        value = Number(value);
                    }

                    me.handleChange(name, value);
                    form.setFieldsValue({
                      ...form.getFieldsValue(),
                      [name]: value
                    });
                    console.log(form.getFieldsValue())

                    me.setState({
                      record: form.getFieldsValue()
                    });

                    if (typeof onChange !== "undefined") onChange(name, value, form);
                  }
                })(
                  React.cloneElement(child, {
                    style: { width: "100%" },
                    trigger: "focus",
                    form
                  })
                )}
              </Form.Item>
            </Col>
          );
        });
      } catch (err) {
        console.log("ERROR: ", err);
      }
    }

    return childrens;
  }

  componentDidMount() {
    let { formLayout } = this.props;
    if (typeof formLayout !== "undefined")
      this.setState({
        formLayout
      });
  }
  componentWillUnmount() {
    this.props.form.resetFields();
  }
  render() {
    const { formLayout } = this.state;
    let {
      footer,
      title,
      titleStyle,
      className,
      style,
      autoSubmit = true,
      textAcceptButton = "GUARDAR",
      submitting = false,
      initialValues
    } = this.props;
    return (
      <Form
        className={className || "advanced-form"}
        layout={formLayout}
        onSubmit={this.handleSubmit}
        style={style || { margin: 20 }}
      >
        {title && <HeadTitle className="head-title">{title}</HeadTitle>}
        <Row gutter={24}>{this.getFields()}</Row>
        <Row
          className={
            typeof footer !== "undefined" ? "footer-advanced-form" : null
          }
        >
          {autoSubmit ? (
            <>
              <Row type="flex" justify="center" align="middle">
                {formLayout == "vertical" && <Col span={24}>
                  <Divider
                    style={{
                      width: "100%",
                      margin: "20px 0px 20px 0px"
                    }}
                  />
                </Col>}
                <Col span={24}>
                  <Button
                    type={this.props.typeSubmitButton || "primary"}
                    icon={this.props.iconSubmitButton}
                    loading={submitting}
                    size="large"
                    htmlType="submit"
                    className="login-form-button btn-green"
                    style={
                      this.props.buttonSubmitStyle || {
                        width: "50%",
                        margin: "10px 0px",
                        textAlign: "center"
                      }
                    }
                    size="large"
                    block
                  >
                    {textAcceptButton}
                  </Button>
                </Col>
              </Row>
              <Row
                style={footerStyle}
                type="flex"
                justify="center"
                align="middle"
              >
                <Col span={24}>{footer}</Col>
                <Col span={24}>
                  {!autoSubmit && (
                    <Divider
                      style={{
                        width: "100%",
                        margin: "20px 0px 20px 0px"
                      }}
                    />
                  )}
                </Col>
              </Row>
            </>
          ) : (
              <Row
                style={footerStyle}
                type="flex"
                justify="center"
                align="middle"
              >
                <Col span={24}>{footer}</Col>
              </Row>
            )}
        </Row>
      </Form>
    );
  }
}
const WrappedAdvancedForm = Form.create({ name: "search_form" })(AdvancedForm);

export default WrappedAdvancedForm;
