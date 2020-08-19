import React from "react";
import styled from "styled-components";
import propTypes from "prop-types"
const Wrapper = styled.div`
    margin:4px;
    & h1, h2, h3, h4{
        margin-bottom:0px!important;
    }
`
const HeadLine = ({ size, children, label, source, record, className }) => {
    let value = record ? record[source] : label ? label : children;
    switch (size) {
        case "tiny":
            return (<Wrapper className={className || "headline"}>
                <h4>
                    {value}
                </h4>
            </Wrapper>)
            break;
        case "small":
            return (<Wrapper className={className || "headline"}>
                <h3>
                    {value}
                </h3>
            </Wrapper>)
            break;
        case "medium":
            return <Wrapper className={className || "headline"}>
                <h2>
                    {value}
                </h2>
            </Wrapper>
            break;
        case "large":
            return <Wrapper className={className || "headline"}>
                <h1>
                    {value}
                </h1>
            </Wrapper>
            break;
        default:
            return <Wrapper className={className || "headline"}>
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

