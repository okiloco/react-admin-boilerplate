import React from 'react';
import styled from 'styled-components';
import {
  Input,
  Button
} from "antd";
const { Search } = Input;
export const SearchBox = styled(Search)`
  /* box-shadow: 3px 3px 3px rgba(0,0,0,0.03) !important */
  border-radius: 20px !important;
  & input {
    border-radius: 20px !important;
  }
`;

export const Wrapper = styled.div`
    & .ant-table {
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.03) !important;
        border: 1px solid #e8e8e85e !important;
        border-radius: 8px !important;
    }
`;

export const RoundedButton = styled(Button)`
    border-radius: 20px !important;
`;