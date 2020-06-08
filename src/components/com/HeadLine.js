import React from "react";
import styled from "styled-components";
import propTypes from "prop-types"
const Wrapper = styled.div`
    margin:10px 0px;
    & h1, h2, h3, h4{
        margin-bottom:0px!important;
    }
`
const HeadLine = ({ size, children, label, source, record }) => {
    let value = record ? record[source] : label ? label : children;
    switch (size) {
        case "tiny":
            return (<Wrapper>
                <h4>
                    {value}
                </h4>
            </Wrapper>)
            break;
        case "small":
            return (<Wrapper>
                <h3>
                    {value}
                </h3>
            </Wrapper>)
            break;
        case "medium":
            return <Wrapper>
                <h2>
                    {value}
                </h2>
            </Wrapper>
            break;
        case "large":
            return <Wrapper>
                <h1>
                    {value}
                </h1>
            </Wrapper>
            break;
        default:
            return <Wrapper>
                <h1>
                    {value}
                </h1>
            </Wrapper>
            break;
    }

}
HeadLine.propTypes = {
    size: propTypes.oneOf(["small", "medium", "large"])
}

export default HeadLine;

