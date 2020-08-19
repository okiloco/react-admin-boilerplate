import styled from 'styled-components';
import { TextInput } from "react-admin";
export const HiddenField = styled(TextInput)`
    width:100%;
    height:0px!important;
    padding: 0px!important;
    background:red;
    & .MuiFilledInput-marginDense::before{
        content:none!important;
    }
`; 