import React, { useEffect, useState } from "react";
import AdvancedForm from "./AdvancedForm";
import { Row, message, Input } from "antd";
import styled from "styled-components";
import { getService } from "../../../services/";

const Form = styled(AdvancedForm)`
  width: 400px;
  background: #fff;
  padding: 40px 35px;
  border: 1px solid #ccc;

  

  box-shadow: 0 2px 10px -1px rgba(69, 90, 100, 0.3);
  margin-bottom: 30px;
  transition: box-shadow 0.2s ease-in-out;

  border: 0px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;

  & .item-form {
    padding: 5px 20px !important;
  }
  & .item-hidden {
    padding: 0px !important;
  }
  & .ant-form-item input:focus {
    box-shadow: none !important;
  }
  & .ant-form-item {
    padding-bottom: 5px !important;
    margin-bottom: 5px !important;
  }
  & .ant-input-prefix i {
    color: rgba(0, 0, 0, 0.25) !important;
    font-size: var(--font-size-tiny) !important;
  }
  & .ant-select-search__field {
    /* border: 0px !important; */
  }
  & .ant-input-number.ant-input-number-lg,
  .ant-select-selection {
    /* border: 0px !important; */
  }
  & .ant-select {
    /* border-bottom: 1px solid #ccc; */
  }
  & .ant-divider-horizontal {
    margin: 10px 0 !important;
    color: #ccc!important;
    font-style: italic!important;
  }
  & .ant-card-bordered {
    /* box-shadow: 3px 3px 3px #ccc !important; */
    border-radius: 10px !important;
  }

  & .ant-form-explain{
    /* background: rgba(255,78,78,.1)!important; */
    color: #ff4e4e!important;
    /* padding: 8px!important;
    border-radius: 0px 8px!important;
    border-radius: 20px!important; */

    margin-top: 10px!important;
  }
  & .search .ant-select-arrow{
    height: 100%!important;
    background: #73dcc9!important;
    top: 5px!important;
    width: 35px!important;
    right: 0!important;
    border-radius: 0px 8px 8px 0px!important;
    display: flex!important;
    justify-content: center!important;
    align-items: center!important;
    color: #fff!important;
    font-size: 1.2rem!important;
    padding: 0px 5px!important;
    border: 2px solid #73dcc9!important;
  }
  & .footer-advanced-form .ant-btn {
    /* padding: 15px 20px; */
    /* margin-top: 20px; */
    height: 30px;
    line-height: 0 !important;
    margin-bottom: -20px;
    border-radius: 30px!important;
    font-size: 0.95rem;
    transition: all 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .ant-btn-default,
  .ant-btn-default:hover
  {
    color: rgba(0, 0, 0, 0.65)!important;
    background-color: var(--color-gray-light)!important;
  }

  & .ant-form-item input,
  textarea {
    /* border: 0px;
    border-radius: 0px;
    border-bottom: 1px solid #ccc; */

    /* padding: 0.625rem 1.1875rem; */
    /* font-size: 0.875rem; */
    font-weight: 400;
    line-height: 1.5;

    height: 44px!important;
    /* padding: 10px 4px 8px 30px!important; */
    /* font-size: 1.2em!important; */
  }
  & .login-form-button {
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 1.5rem !important;
    border: 1px solid transparent !important;
    padding: 0.625rem 1.1875rem !important;
    font-size: 0.875rem !important;
    line-height: 1.5 !important;
    border-radius: 2px !important;
  }
  & .ant-form-item label {
    position: relative !important;
    font-style: italic !important;
    color: #bfbfbf !important;
  }
  
  & .ant-form-item input:hover,
  .ant-select-selection:hover,
  textarea.ant-input:hover
  {
    background: #e5ecee!important
  }
  & .ant-form-item input,
  .ant-select-selection,
  textarea.ant-input
  {
    border-radius: 5px!important;
    background: #f4f7f8!important;
    transition: all .25s ease!important;
    border: 2px solid transparent!important;
    color: #546067!important;
  }
  .ant-input-number-handler-wrap{
    visibility:hidden!important;
  }
  .ant-select-focused .ant-select-selection,
  .ant-select-selection:focus,
  .ant-select-selection:active,
  .ant-input:hover,
  .ant-input:focus,
  .ant-input:active,
  .ant-input-number,
  textarea.ant-input,
  .ant-select-open .ant-select-selection {
    border: 2px solid transparent!important;
    box-shadow: none!important;
  }
  & .ant-col-12.item-form {
    padding: 5px 4px !important;
  }

  &.ant-form-horizontal{
    width: auto!important;
    padding: 4px!important;

    display: flex;
    justify-content: start;
    align-items: center;
    justify-items: stretch;
  }
  /* &.ant-form-horizontal .footer-advanced-form .ant-row-flex > .ant-col-24{
    width:150px!important;
  } */
  &.ant-form-horizontal .footer-advanced-form{
    display: flex!important;
    justify-content: center!important;
    align-items: center!important;
    margin-top: 30px!important;
    min-width: 150px!important;
  }
  &.ant-form-horizontal{
    padding:5px 20px!important;
  }
  &.ant-form-horizontal .item-form{
      padding:4px!important;
  }
  &.ant-form-horizontal .login-form-button{
    width: 100%!important;
    margin-top: -4px;
    text-align: center!important;
    border-radius: 4px!important;
  }

  /* .ant-time-picker-panel-select ul,
  .ant-time-picker-panel-input{
    width: 100%!important;
  }
  .ant-time-picker-panel-select,
  .ant-time-picker-panel-input-wrap{
    width: 50%!important;
  } */

`;
const HeadLine = styled.div`
  text-align: center;
  & h2 {
    font-size: 1.5rem;
  }
  & img {
    margin-bottom: 1.5rem !important;
  }
`;
const Footer = styled(Row)`
  & .ant-col {
    margin-bottom: 0.5rem !important;
  }
`;
export const SimpleForm = ({
  source = "",
  title,
  footer,
  children,
  onSubmit,
  style,
  id,
  idKey = "_id",
  layout = "vertical",
  width = "100%",
  textAcceptButton,
  autoSubmit = true,
  onChange,
  owner = false,
  ownerId = "user_id",
  ...props
}) => {
  const [service, setService] = useState();
  const [record, setRecord] = useState(props.record);
  const [initialValues, setInitialValues] = useState(props.initialValues);

  const save = async payloads => {
    return new Promise((resolve, reject) => {

      if (id) {
        return service
          .patch(id, payloads)
          .then(({ msg, ...rest }) => {
            message.info(msg || "Registro Actualizado!");
            resolve(rest);
            setInitialValues();
            setRecord();
            if (props.onAfterSubmit) props.onAfterSubmit(rest);
          })
          .catch(err => {
            reject(err);
            message.error(err.message)
          });
      }
      service
        .create(payloads)
        .then(({ msg, ...rest }) => {
          message.info(msg || "Registro Creado con éxito!");
          resolve(rest);
          setInitialValues();
          setRecord();
        })
        .catch(err => {
          reject(err);
          message.error(err.message)
        });
    });
  };
  const getData = () => {
    console.log("FORM");
    if (source && id) {
      const service = getService(source);
      service
        .get(id)
        .then(response => {
          setInitialValues(response);
          setRecord(response);
          if (props.onLoad) props.onLoad(response);
          console.log("DATA::: ", response);
        })
        .catch(err => console.log(err));
    }
  };
  const handleSubmit = async (err, data, form) => {

    console.log(form.getFieldsValue())
    if (autoSubmit) {
      if (err) return;
      const response = await save(data);
      if (onSubmit) onSubmit(err, response, form);
    } else {
      if (onSubmit) onSubmit(err, data, form);
    }
  };
  useEffect(() => {
    setService(getService(source));
    if (id) getData();
    return () => { };
  }, [id]);
  return (
    <Form
      {...props}
      onSubmit={handleSubmit}
      onChange={onChange}
      style={{
        ...style
      }}
      autoSubmit={autoSubmit}
      layout={layout}
      formLayout={layout}
      autoSubmit={autoSubmit}
      initialValues={initialValues}
      textAcceptButton={textAcceptButton || "AGREGAR"}
      footer={
        <Footer type="flex" justify="center" align="middle">
          {footer}
        </Footer>
      }
      title={
        title && (
          <HeadLine
            style={{
              width: "100%"
            }}
          >
            {title}
          </HeadLine>
        )
      }
    >
      <>{children}</>
    </Form>
  );
};
