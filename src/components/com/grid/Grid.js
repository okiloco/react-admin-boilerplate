import React, { useState, useEffect } from 'react';
import {
    Table,
    message,
    Row,
    Col,
    Tooltip,
    Button,
    Modal
} from "antd";
import { Wrapper, SearchBox, RoundedButton } from "./Styles";
import { exportToCsv, exportTableToPdf } from "../../../utils/Helper";
import { FileUploader } from "../";
import { getService } from "../../../services/";
import { Route, BrowserRouter, withRouter } from 'react-router-dom';
/* import { Link, navigate } from "@reach/router"; */
import { MyModal } from '../MyModal';
const { confirm } = Modal;
const LIMIT = 50;
const defaultState = {
    actions: {
        edit: true,
        delete: true
    },
    pagination: {
        showSizeChanger: true,
        defaultCurrent: 1,
        current: 1,
        defaultPageSize: LIMIT,
        pageSizeOptions: ['10', '20', '30', '40', '50']
    }
}
const Grid = ({ source, edit,
    mode = "show",
    actions = defaultState.actions,
    columns,
    searchText,
    search = true, refresh = true, extra, exportCsv = false, importCsv = true, model, ...props }) => {
    const [pagination, setPagination] = useState(defaultState.pagination);
    const [filters, setFilters] = useState({});
    const [sorter, setSorter] = useState({});
    const [dataSource, setDataSource] = useState(props.dataSource || []);
    const [loading, setLoading] = useState(false);
    const [exporting, setExport] = useState(false);
    const [visible, setVisible] = useState(true);
    const [record, setRecord] = useState({});


    const handleDelete = id => {
        if (source && id) {
            confirm({
                title: "Atención",
                size: "small",
                content: "Desea eliminar el registro?",
                onOk() {
                    const service = getService(source);
                    service.remove(id)
                        .then(response => {
                            getData();
                            message.info("Record deleted");
                        })
                        .catch(err => message.error(err.message));
                },
                onCancel() { }
            });
        }
    };
    const handleSearch = value => {
        setFilters({
            search: value
        });
        getData({
            query: {
                search: value
            }
        });
    };
    const handleOnChange = (paginator, filters, sorter) => {
        let pager = { ...pagination };
        pager.current = paginator.current;
        setPagination(pager);
        setFilters(filters);
        if (sorter.field)
            setSorter({
                [sorter.field]: sorter.order == "ascend" ? 1 : -1
            });
    };
    const onChange = (field, value) => {
        setFilters({
            ...filters,
            [field]: value
        });
    }
    const handleExport = () => {
        setExport(true);
        let params = {
            query: {
                ...filters,
                $sort: sorter,
                $limit: 500000
            }
        };
        if (source) {
            const service = getService(source);
            service.find(params).then(({ data, meta }) => {
                console.log(data);
                exportToCsv(data, {
                    title: props.reportName || "Report"
                });
                setExport(false);
            });
        };
    }
    const getData = params => {
        setLoading(true);
        if (!params)
            params = {
                $limit: LIMIT,
                //$page: pagination.current || pagination.defaultCurrent || 1,
                ...filters,
                $sort: sorter
            };
        if (source) {
            const service = getService(source);
            service.find(params).then(({ data, meta, total }) => {
                setLoading(false);
                let pager = { ...pagination };
                pager.total = meta ? meta.TotalRecords : total;
                setPagination(pager);
                setDataSource(data);
            })
                .catch(err => {
                    message.error(err.message);
                    setLoading(false);
                });
        }
    };
    const handleEdit = id => {
        if (source) {
            const service = getService(source);
            if (service && id)
                service.remove(id)
                    .then(response => {
                        setLoading(false);
                        getData();
                    })
                    .catch(err => {
                        message.error(err.message);
                        setLoading(false);
                    });
        }
    }
    useEffect(() => {
        getData({
            query: {
                $limit: LIMIT,
                //$page: pagination.current || pagination.defaultCurrent || 1,
                ...filters,
                $sort: sorter
            }
        });
    }, [pagination.current, sorter, filters]);
    return (<Wrapper>
        {mode == "modal" && <BrowserRouter>
            {<Route path={`/${props.basePath || "dashboard"}/${props.path || source}/:id`}>
                {({ match }) => {
                    let isMatch = (
                        match &&
                        match.params
                    );
                    return (<MyModal
                        title="Editar"
                        closabled
                        onCancel={() => setVisible(false)}
                        visible={visible && isMatch && match.params && match.params.id != "create"}
                    >
                        {<Route
                            path={`/${props.basePath || "dashboard"}/${props.path || source}/:id`}
                            component={edit}
                            id={record.id} />}
                    </MyModal>)
                }}
            </Route>}
        </BrowserRouter>}

        <Row
            style={{
                margin: 10
            }}
            gutter={16}
            type="flex"
            justify="space-between"
            align="middle"
        >
            <Col>

                <Row type="flex" gutter={16}>
                    {search && <SearchBox
                        allowClear={true}
                        placeholder={searchText || "Search..."}
                        onSearch={value => handleSearch(value)}
                        style={{ width: 200 }}
                    />}
                    {props.filters &&
                        React.Children.map(props.filters.props.children, (it, index) => {
                            let { name } = it.props;
                            return <Col key={index}>
                                {React.cloneElement(it, {
                                    onChange: (e, value) => {
                                        value = e.target ? e.target.value : value;
                                        onChange(name || "field-" + index, value || e)
                                    }
                                })}
                            </Col>
                        })
                    }
                </Row>
            </Col>
            <Col>
                {extra}
                {
                    exportCsv && <Tooltip placement="bottom" title="Export Csv">
                        <RoundedButton
                            loading={exporting}
                            style={{
                                margin: "0px 10px",
                                background: "#1dbf73",
                                border: "1px solid #1dbf73"
                            }}
                            icon="file-excel"
                            type="primary"
                            onClick={handleExport}
                        />
                    </Tooltip>
                }
                {
                    importCsv && model && <Tooltip placement="bottom" title="Upload Csv">
                        <FileUploader
                            {...model}
                            onSubmit={getData}
                            loading={exporting}
                        />
                    </Tooltip>
                }
                {
                    refresh && <Tooltip placement="bottom" title="Refresh">
                        <Button
                            shape="circle"
                            icon="reload"
                            type="link"
                            onClick={() => getData()}
                        />
                    </Tooltip>
                }

            </Col>
        </Row>
        <Table
            size="small"
            onChange={handleOnChange}
            pagination={pagination}
            rowKey="id"
            loading={loading}
            columns={[...columns,
            {
                width: 100,
                title: "Actions",
                fixed:
                    props.fixed ?
                        typeof props.fixed == "boolean" ?
                            props.fixed ? "right" : false : props.fixed
                        : false,
                render: (record) => {
                    return (<Row type="flex" justify="start" gutter={4}>
                        {
                            actions.edit && <Col>
                                <Button
                                    type="dashed"
                                    shape="circle"
                                    icon="edit"
                                    onClick={() => {
                                        setRecord(record);
                                        setVisible(true);
                                        if (props.onChange) props.onChange(record);
                                        let { history } = props;
                                        history.push(`${props.basePath || ""}/${props.path || source}/${record.id}`);
                                    }} />
                            </Col>
                        }
                        {
                            actions.delete && <Col>
                                <Button
                                    icon="delete"
                                    onClick={() => handleDelete(record.id)}
                                    type="dashed"
                                    shape="circle"
                                />
                            </Col>
                        }

                    </Row>)
                }

            }
            ].filter(it => (typeof it != "undefined"))}
            scroll={props.scroll || {
                y: 600,
                x: 800
            }}
            dataSource={dataSource}
        />
    </Wrapper>);
}
export default withRouter(Grid);