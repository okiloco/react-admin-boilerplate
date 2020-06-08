import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { URL_S3, DEFAULT_AVATAR_IMAGE, DEFAULT_IMAGE } from "../../constants"

const Image = styled.img`
    height:100%;
    width:100%;
    padding:8px;
    object-fit: contain;
`
const ImageWrapper = styled.div`
   
   
    object-fit: contain;
    background: #fff;
    overflow:hidden;
    margin:0px 10px 4px 0px;

    &.circle{
        border-radius:50%;
        border: 1px solid rgba(224,224,224,.3);
        box-shadow:3px 3px 3px rgba(224, 224, 224, .4);
    }
    &.square{
        border-radius:0px;
        border: 0px solid rgba(224,224,224,.3);
        width:100%;
        height:100%;
    }
    &.cover{
            width:100%;
            height:100%;
    }
    &.picture{
        padding: 5px!important;
    }
    &.cover img{
        padding: 0px!important;
        object-fit: cover;
        object-position: center;
    }
    &.tiny{
        height:30px;
        width:30px;
    }
    &.small{
        height:40px;
        width:40px;
    }
    &.medium{
        height:50px;
        width:50px;
    }
    &.large{
        height: 150px;
        width: 150px;
        margin: 10px auto!important;
    }
    &.default{
        height:60px;
        width:60px;
        
    }
`
const Avatar = ({ source, size = "default", type = "cover", record, src, shape = "circle", className, ...props }) => {
    const [url, setUrl] = useState();

    let value;
    if (record && source) {
        value = record[source];
        value = typeof record[source] == "object" ? record[source][props.name || "path"] : record[source];
    }
    useEffect(() => {
        let url =
            src ?
                `${URL_S3}${src}` :
                value ?
                    value
                        ?
                        `${URL_S3}${value}` : DEFAULT_IMAGE : DEFAULT_AVATAR_IMAGE;
        setUrl(url);
    }, [src])
    return (
        <ImageWrapper
            style={props.style}
            className={
                `${className} ${type} ${shape} ${size}`
            }>
            <Image src={url} />
        </ImageWrapper>)
}

export default Avatar;