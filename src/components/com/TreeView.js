import React, { Component } from 'react';
import { TreeSelect } from 'antd';
import styled from 'styled-components'
import { getService } from '../../services'

const treeData = [
    {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: 'Child Node1',
                value: '0-0-1',
                key: '0-0-1',
            },
            {
                title: 'Child Node2',
                value: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
    },
];

const TreeView = styled(TreeSelect)
    `
    
    &.ant-select{
        min-height:50px!important;
    }
    & .ant-select-tree-node-selected{
        background-color: rgba(0, 0, 0, 0.08)!important;
    }
    & .ant-select-arrow{
        color: rgba(0, 0, 0, 0.54)!important;
    }
    & .ant-select-selection{
        position: relative!important;
        transition: background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms!important;
        background-color: rgba(0, 0, 0, 0.04)!important;
        border-top-left-radius: 4px!important;
        border-top-right-radius: 4px!important;

        border:0px!important;
        transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms!important;
        border-bottom: 1px solid rgba(0, 0, 0, 0.42)!important;

        line-height: 1.1875em!important;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif!important;
    }
    & .ant-select-selection:focus{
        outline-color:transparent!important;
        border-color:transparent!important;
        box-shadow:none!important;
    }
    & .ant-select-selection{
        box-shadow:transparent!important;
    }
    &.ant-tree-select:focus,
    & .ant-select-focused{
        outline-color:transparent!important;
        border-color:transparent!important;
        box-shadow:none!important;
    }
`
const defaultStyle = {
    width: "97%",
    margin: "8px"
}
const { SHOW_PARENT } = TreeSelect;


export default class ComboTree extends Component {
    state = {
        initialValues: [],
        dataSource: [],
        service: null,
        initialized: false,
        value: null
    }
    constructor(props) {
        super(props);
    }

    getData = (params = {}) => {
        let { reference } = this.props;
        let service = getService(reference);

        service.find({
            query: params
        })
            .then(({ data }) => {
                let dataSource = this.refinament(data);
                this.setState({
                    dataSource
                })
            }).catch(err => console.log(err))
    }
    refinament = (dataSource) => {
        let data = {}
        dataSource.reduce((prev, current) => {
            if (!current.parent_id && !data[current.id])
                data[current.id] = {
                    title: current.name,
                    value: current.id,
                    key: current.id
                }
            if (current.parent_id) {
                let parent = dataSource.filter(it => it.id == current.parent_id)[0];
                if (parent) {
                    data[parent.id] = data[parent.id] || {
                        title: parent.name,
                        value: parent.id,
                        key: parent.id
                    }
                    data[parent.id]["children"] = data[parent.id]["children"] || []
                    data[parent.id]["children"].push({
                        title: current.name,
                        value: current.id,
                        key: current.id
                    })
                }
            }
            return current;
        }, data)
        return Object.values(data)
    }
    handleChange = value => {
        this.setState({ value });
        if (this.props.onChange) this.props.onChange(value);
    }
    componentDidMount() {
        let { record, source, treeData } = this.props;
        let { initialized } = this.state;
        if (record) {
            let value = record[source];
            if (!initialized) {
                if (typeof value !== "undefined")
                    if (value.length > 0) {
                        this.setState({
                            value: value.map(it => (it.id))
                        })
                    }
                this.setState({
                    initialized: true
                })
            }
        } else {
            this.setState({
                initialized: true
            })
        }
    }
    componentWillMount() {
        let { reference, params } = this.props;
        let service = getService(reference);
        this.setState({
            service
        });
        this.getData(params)
    }

    render() {
        let { source, name, record, treeData = [], treeCheckeable, multiple = true, allowClear = true, placeholder, style = defaultStyle } = this.props;
        let { dataSource, initialized, initialValues, value } = this.state;
        return <>{initialized && <TreeView
            size="large"
            treeData={dataSource}
            source={source}
            showSearch
            treeNodeLabelProp={'title'}
            defaultValue={initialValues}
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            multiple={multiple}
            allowClear={allowClear}
            treeCheckeable={true}
            showCheckedStrategy={SHOW_PARENT}
            searchPlaceholder={placeholder || 'Seleccionar'}
            onChange={this.handleChange}
            style={style}
        />}
        </>
    }
}