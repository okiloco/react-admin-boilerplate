import React from "react";
import { SimpleForm } from "./SimpleForm";
import styled from "styled-components";
import {
  Input,
  Select,
  InputNumber,
  Divider,
  Checkbox,
  DatePicker
} from "antd";
const { TextArea } = Input;
const Form = styled(SimpleForm)`
  width: 100% !important;
  & .ant-form {
    width: 100% !important;
  }
`;
const HeadLine = styled.h2`
  color: rgb(0, 0, 0, 0.8);
  font-size: 24px;
  text-align: center;
  margin-bottom: 0px !important;
`;
const SubHeadLine = styled.h2`
  font-style: italic;
  color: rgb(0, 0, 0, 0.5);
`;
const DividerHeadLine = props => (
  <div {...props} flex={1}>
    <SubHeadLine
      style={{
        marginBottom: 0,
        ...props.style
      }}
    >
      {props.text}
    </SubHeadLine>
  </div>
);

const Combo = ({
  data = [],
  valueField = "value",
  displayField = "text",
  ...props
}) => {
  const { Option } = Select;
  return (
    <Select {...props} size="large" style={{ width: "100%", minWidth: 220 }}>
      {data.map((item, index) => (
        <Option key={item[valueField] || index}>
          {item[displayField] || "--- None ---"}
        </Option>
      ))}
    </Select>
  );
};

const Builder = ({ xtype = "text", ...props }, index) => {
  let { required } = props;

  if (required) {
    props["validations"] = props["validations"] || [];
    props["validations"].push({
      required: props.required,
      message: props.message || `This field is required`
    });
    delete props.required;
  }

  switch (xtype) {
    case "text":
      return <Input size="large" key={index} {...props} />;
      break;
    case "textarea":
      return <TextArea size="large" key={index} {...props} />;
      break;
    case "date":
      console.log("DATE:: ", props);
      return <DatePicker key={index} {...props} />;
      break;
    case "checkbox":
      return (
        <Checkbox key={index} xtype={xtype} {...props}>
          <>{props.text && <span>{props.text}</span>}</>
        </Checkbox>
      );
      break;
    case "combo":
      return <Combo key={index} {...props} />;
      break;
    case "number":
      return <InputNumber size="large" key={index} {...props} size="large" />;
      break;
    case "divider":
      return props.text ? (
        <DividerHeadLine {...props} flex={1} />
      ) : (
        <Divider key={index} {...props} flex={1} />
      );
      break;
    case "headline":
      return props.text ? (
        <HeadLine {...props} flex={1}>
          {props.text}
        </HeadLine>
      ) : (
        <Divider key={index} {...props} flex={1} />
      );
      break;

    default:
      return <Input size="large" key={index} {...props} />;
      break;
  }
};
export const DinamicForm = ({ fields, ...props }) => {
  const getFields = () => {
    return fields.map((item, index) => Builder(item, index));
  };
  return <Form {...props}>{getFields()}</Form>;
};
