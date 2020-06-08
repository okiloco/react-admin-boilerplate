import React, { useState } from "react";
import { Input, AutoComplete } from "antd";
import styled from "styled-components";

const Wrapper = styled(AutoComplete)`
  & .ant-input {
    border-radius: 20px !important;
    box-shadow: 3px 3px 3px rgba(224, 224, 224, 0.4) !important;
    border: 1px solid rgba(224, 224, 224, 0.8) !important;
  }
`;
const SearchField = ({ placeholder, ...props }) => (
  <Wrapper
    dropdownClassName="certain-category-search-dropdown"
    dropdownMatchSelectWidth={500}
    style={{ width: 250, ...props.style }}
    {...props}
  >
    <Input.Search size="large" placeholder={placeholder || "Search"} />
  </Wrapper>
);

export default SearchField;
