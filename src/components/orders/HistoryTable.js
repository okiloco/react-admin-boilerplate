import React, { useState, useEffect } from "react"
import { Table } from "antd";
import { getService } from '../../services'
import styled from 'styled-components'
import moment from 'moment';
const Wrapper = styled(Table)`
& .ant-table{
  box-shadow:3px 3px 3px #ccc;
}
`;
const columns = [
    {
        title: 'Estado',
        dataIndex: 'order_status.name',
        key: 'name',
    },
    {
        title: 'Usuario',
        dataIndex: 'user',
        render: (user) => (user ? `${user.first_name} ${user.last_name}` : ""),
        key: 'name',
    },
    {
        title: 'Fecha',
        dataIndex: 'createdAt',
        render: value => (moment(value).format("DD/MM/YYYY H:m:s")),
        key: 'date',
    },
]
const HistoryTable = ({ params = {}, source, ...props }) => {
    const [data, setData] = useState([]);



    const getData = async (params) => {
        const service = getService(source || "order-history");

        console.log("Params::: ", params);

        service.find({
            query: {
                ...params,
                $sort: {
                    createdAt: -1,
                }
            }
        })
            .then(({ data }) => {
                setData(data);
            });
    }
    useEffect(() => {
        if (params)
            getData(params)
    }, [params.id, params.express_product_order_id])
    return <Wrapper scroll={{ y: 285 }} size="small" dataSource={data} columns={columns} pagination={false} />
}
export default HistoryTable;