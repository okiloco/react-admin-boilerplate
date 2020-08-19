import React, { useState } from "react";
import { Input, AutoComplete, message } from "antd";
import styled from "styled-components";
import { getService } from "../../../services/"
const Wrapper = styled(AutoComplete)`
  & .ant-input {
    border-radius: 20px !important;
    box-shadow: 3px 3px 3px rgba(224, 224, 224, 0.4) !important;
    border: 1px solid rgba(224, 224, 224, 0.8) !important;
  }
`;
const SearchField = ({ placeholder, defaultFilterValues = {}, optionText = "name", optionValue = "id", searchKey = "search", source, ...props }) => {
  const [data, setData] = useState([]);
  const handleSearch = value => {
    if (value && source) {
      const service = getService(source);
      service.find({
        query: {
          [searchKey]: value,
          ...defaultFilterValues
        }
      })
        .then(({ data }) => {
          setData(data);
        })
        .catch(error => message.error(error.message));
    }
  }
  const { Option } = AutoComplete;

  return (
    <Wrapper
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={500}
      style={{ width: 250, ...props.style }}
      onSearch={handleSearch}
      dataSource={data.map(it => props.renderItem || (<Option key={it[optionValue]}>
        {props.render ? props.render(it[optionText], it) : it[optionText]}
      </Option>))}
      {...props}
    >
      <Input.Search size="large" placeholder={placeholder || "Search"} />
    </Wrapper>
  )
};

export default SearchField;
