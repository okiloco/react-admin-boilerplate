import React, { useState, useEffect } from 'react';
import { TreeSelect } from 'antd';
import styled from 'styled-components'
import { getService } from '../../services'
import PropTypes from 'prop-types';

const TreeView = styled(TreeSelect)`
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


const ComboTree = ({ source, name, record, reference, params, treeData = [], treeCheckeable, multiple = true, allowClear = true, placeholder, style = defaultStyle, ...props }) => {

    const [initialValues, setInitialValues] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [initialized, setInitialized] = useState(false)
    const [value, setValue] = useState([])

    useEffect(() => {
        if (record) {
            let value = record[source];
            if (!initialized) {
                if (typeof value !== "undefined") {
                    if (Array.isArray(value)) {
                        setInitialValues(value)
                    } else if (typeof value == 'number') {
                        setInitialValues([value])

                    }
                }
                setInitialized(true)
            }
        } else {
            setInitialized(true)
        }

        getData(params)
            .then(({ data }) => {
                let dataSource = refinament(data);
                setDataSource(dataSource)
            }).catch(err => console.log(err))

        return () => {
        };
    }, [record])

    const getData = (params = {}) => {
        let service = getService(reference);
        return service.find({
            query: params
        })

    }
    const refinament = (dataSource) => {
        let data = {}
        dataSource.reduce((prev, current) => {
            if (!current.parent_id && !data[current.id])
                data[current.id] = {
                    title: current.name,
                    value: parseInt(current.id),
                    key: parseInt(current.id)
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
                        value: parseInt(current.id),
                        key: parseInt(current.id)
                    })
                }
            }
            return current;
        }, data)
        return Object.values(data)
    }
    const handleChange = value => {
        alert(JSON.stringify(value))
        setValue(value);
        if (props.onChange) props.onChange(value);
    }


    return <>{initialized && <TreeView
        {...props}
        size="large"
        treeData={dataSource}
        source={source}
        showSearch
        defaultValue={initialValues}
        /* value={value} */
        multiple={multiple}
        allowClear={allowClear}
        treeCheckeable={true}
        showCheckedStrategy={SHOW_PARENT}
        searchPlaceholder={placeholder || 'Seleccionar'}
        onChange={handleChange}
        style={style}
    />}</>
}

ComboTree.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};
export default ComboTree;