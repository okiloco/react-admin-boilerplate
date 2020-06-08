import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Row, Col, Card, Skeleton, Icon } from "antd";
import { Link } from "react-router-dom";
import { getService } from '../services'
import { Avatar, HeadLine } from "./com";
const CardContainer = styled(Card)`
  box-shadow:3px 3px 3px #ccc;
`;
const InlineIcon = styled(Icon)`
    vertical-align:middle!important;
    opacity:.8;
`
const UserCard = ({ source, params = {}, id, ...props }) => {
    const [user, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const getData = (id) => {
        const service = getService(source || "users");
        setLoading(true);
        service.get(id)
            .then(response => {
                setLoading(false);
                setUserData(response)
            })
    }
    useEffect(() => {
        if (id)
            getData(id)
    }, [id])
    return (<CardContainer>
        <Skeleton loading={loading} avatar active>
            <Card.Meta
                description={
                    <>
                        {<Row type="flex" justify="start">
                            <Col>
                                <Avatar src={user.profile_picture} />
                            </Col>
                            <Col>
                                <div>
                                    <Link to={`/users/${params.user_id}`}>{user.first_name} {user.last_name}</Link>
                                </div>
                                {user.email && <div>
                                    <InlineIcon type="mail" />
                                    <span> {user.email.toLowerCase()}</span>
                                </div>
                                }
                                {user.phone && <div>
                                    <InlineIcon type="phone" />
                                    <span> {user.phone}</span>
                                </div>
                                }
                            </Col>
                        </Row>}
                        <Row type="flex" justify="start">
                            <Col span={24}>
                                <HeadLine size={"small"}>Datos de envío</HeadLine>
                                {params.address && <div>{params.address.toUpperCase()}</div>}
                                {params.details && <div style={{
                                    borderBottom: "1px dashed rgba(244,244,244,.8)",
                                    marginBottom: 4,
                                    paddingBottom: 8
                                }}>{params.details}</div>}
                                <div>
                                    {params.city_name && <span>{params.city_name}</span>}
                                    {params.state_name && <span>, {params.state_name}</span>}
                                </div>
                                {params.lat &&
                                    <div style={{
                                        margin: "8px 0px"
                                    }}>
                                        <Icon type="environment" />{" "}
                                        <a href={`https://maps.google.com/?q=${params.lat},${params.lng}`} target="_blank">Ver en mapa</a>
                                    </div>}
                            </Col>

                        </Row>
                    </>
                }

            />
        </Skeleton>
    </CardContainer>)
}
export default UserCard;