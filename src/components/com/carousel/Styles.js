import React from "react";
import styled from "styled-components";
export const Wrapper = styled.div`
    max-width:500px;
    max-height: 400px;
    margin:10px;

    & .slick-track{
        height:100%!important;
    }
    & .slick-prev {
        left: 8px!important;
        z-index: 2!important;
    }
    & .slick-next {
        right: 8px!important;
        z-index: 2!important;
    }
    @media(max-width:768px){
        max-width:calc(768px - 50px);
    }
`;
export const Item = styled.div`
    width: 100%;
    padding: 0px;
    max-height: 400px!important;
`;
export const Image = styled.img`
    max-height: 350px;
    object-fit: contain!important;
    object-position: center center!important;
    width: 100%!important;

    @media(max-width:768px){
        object-fit: cover!important;
    }
`;