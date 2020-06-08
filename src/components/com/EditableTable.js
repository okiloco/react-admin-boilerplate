import React, { useEffect, useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Select, Button, message, TimePicker, ConfigProvider, Empty, Icon } from 'antd';
import Factory from "../com/crud/Factory";
import { getService } from "../../services/";
import moment from 'moment';
const format = 'hh:mm';
const { Option } = Select;
const EditableContext = React.createContext();
const SelectField = ({ input, record, onChange, onSearch, source, dataIndex, placeholder, reference, ...props }) => {

    const [choices, setChoices] = useState();
    const [optionText, setOptionText] = useState();
    const [optionValue, setOptionValue] = useState();
    const [loading, setLoading] = useState(false);
    const getData = async () => {
        if (reference) {

            const service = getService(reference);
            setLoading(true);
            await service.find({})
                .then(({ data }) => {
                    setLoading(false);
                    setOptionText(
                        data.find(it => (record[source || dataIndex] == it.id))[optionText || "name"]
                    )
                    setChoices(data);

                })
                .catch(err => {
                    setLoading(false);
                    message.error(err.message)
                });
        }
    }
    useEffect(() => {
        if (props.choices) {
            setChoices(props.choices);
            let choices = props.choices || [];
            let value = choices.filter(it => (it.id == record[dataIndex]));
            let text = value.length > 0 ? value[0]["name"] : "";
            value = value.length > 0 ? value[0]["id"] : "";
            setOptionText(text);
            setOptionValue(value);
        } else if (record[source || dataIndex]) {
            setOptionText(record[source || dataIndex]["name"]);
            setOptionValue(record[source || dataIndex]["id"]);
        }
        if (reference) {
            getData();
        }
    }, [record])

    return (
        input ? <Select
            loading={loading}
            defaultValue={optionValue || record[dataIndex]}
            showSearch
            style={props.style || { width: 200 }}
            placeholder={placeholder || "Seleccione un registro"}
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {choices && choices.map(it => (<Option value={it[it.optionValue || "id"]}>
                {it[it.optionText || "name"]}
            </Option>))}
        </Select> : <>{optionText}</>);
}


class EditableCell extends React.Component {
    getInput = () => {

        let { xtype, name, placeholder, onChange, onSearch, choices, source, record } = this.props;

        switch (xtype) {
            case 'numberfield':
                return <InputNumber min={0} />;
                break;
            case 'timefield':
                return <TimePicker
                    minuteStep={30}
                    use12Hours
                    placeholder={placeholder}
                    name={name}
                    format={format}
                /* defaultValue={moment.tz(record[name], "America/Bogota")} */
                />
                break;
            case 'selectfield':
                return <SelectField input {...this.props} />
                break;
            default:
                return <Input />;
                break;
        }
    };

    renderField = () => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            xtype,
            record,
            name,
            index,
            children,
            ...restProps
        } = this.props;
        switch (xtype) {
            case 'selectfield':
                return <SelectField {...this.props} />
                break;
            case 'timefield':
                return `${
                    moment(moment(record[dataIndex], format))
                        .format("hh:mm a")
                    }`;
                break;
            default:
                return children;
                break;
        }
    }

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            xtype,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: xtype != "timefield" ? record[dataIndex] :
                                moment(moment(record[dataIndex], format))
                            ,
                        })(this.getInput(record))}
                    </Form.Item>
                ) : (
                        this.renderField(this.props)
                    )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], editingKey: '', actions: props.actions || {
                edit: true,
                delete: true,
            }
        };
        this.columns = [
            ...this.props.columns,
        ];
        if (this.state.actions.edit || this.state.actions.delete) {
            this.columns = [...this.columns,
            {
                title: 'Acciones',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {form => (
                                    <Button
                                        type="link"
                                        icon="save"
                                        onClick={() => this.save(form, record)}
                                        style={{ marginRight: 8 }}
                                    >
                                    </Button>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm title="Desea Cancelar?" onConfirm={() => this.cancel(record.key)}>
                                <Button
                                    type="link"
                                    icon="close"></Button>
                            </Popconfirm>
                        </span>
                    ) : (<>
                        {this.state.actions.edit && <Button
                            icon="edit"
                            type="link" disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                        </Button>}
                        {
                            this.state.actions.delete && <Popconfirm title="Desea Eliminar?" onConfirm={() => this.delete(record.key)}>
                                <Button
                                    icon="delete"
                                    type="link">
                                </Button>
                            </Popconfirm>}

                    </>
                        );
                },
            },]
        }
    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, record) {
        let { key } = record;

        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {

                newData.push(row);
                this.setState({ data: newData, editingKey: '' });

                if (this.props.onSubmit)
                    this.props.onSubmit({
                        id: record.id,
                        ...row
                    }, record);
            }

        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }
    delete = (key) => {
        if (this.props.onDelete)
            this.props.onDelete(key);
    }
    componentWillReceiveProps(nextProps) {
        let { dataSource } = nextProps;
        if (dataSource != this.state.data)
            this.setState({
                data: dataSource
            });
    }
    componentDidMount() {
        let { dataSource } = this.props;
        this.setState({
            data: dataSource
        });
    }

    renderEmpty = () => {

        if (this.props.renderEmpty)
            return this.props.renderEmpty();

        let { source } = this.props;
        return (<>
            <Empty
                image={Empty.PRESENTED_IMAGE_DEFAULT}
                imageStyle={{
                    height: 60,
                }}
                description={
                    <span>
                        {this.props.newTextDescription ? this.props.newTextDescription : "Aún no hay registros, empieza agregando uno nuevo"}
                    </span>
                }
            >
                {this.props.onNew && <Button
                    onClick={() => this.props.onNew()}
                    size="large"
                    type="primary">
                    {this.props.newText || <span>
                        <Icon type="plus" size="large" />{" "}AGREGAR</span>}
                </Button>}
            </Empty>
        </>);
    }
    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    xtype: col.xtype,
                    choices: col.choices,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                    ...col
                }),
            };
        });

        return (
            <ConfigProvider renderEmpty={this.renderEmpty}>
                <EditableContext.Provider value={this.props.form}>

                    <Table
                        size="small"
                        bordered={false}
                        loading={this.props.loading}
                        rowKey={this.props.rowKey || "id"}
                        components={components}
                        dataSource={this.state.data && this.state.data.map(it => ({
                            key: it.id,
                            ...it
                        }))}
                        columns={columns}
                        showHeader
                        onExpand={this.props.onExpand}
                        expandedRowRender={this.props.expandedRowRender}
                        rowClassName="editable-row"
                        pagination={false}
                    />
                </EditableContext.Provider>
            </ConfigProvider>
        );
    }
}
const EditableFormTable = Form.create()(EditableTable);
export default EditableFormTable;