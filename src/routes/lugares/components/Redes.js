import React from 'react';
import { api } from '../api';
import { connect } from 'react-redux';
import { message, Form, Input, Row, Col, Select, Button, Menu, Icon, Divider, Dropdown, Table } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

class Redes extends React.Component {

    state = {
        disabledLogin: false,
        confirmLoading: false,
        totalDataSize: 10000,
        flag: true,
        autoCompleteLocalidades: [],
        fetchingLocalidades: [],
        autoCompletePropietarios: [],
        fetchingPropietario: [],
        conpddiferido: false,
        columns: [
            {
                title: 'ID',
                dataIndex: 'idlugar',
                sorter: true,
                key: 'idlugar',
                width: '5%',
            },
            {
                title: 'Red Social',
                dataIndex: 'nombrerrss',
                sorter: true,
                key: 'nombrerrss',
                width: 100,
            },
            {
                title: 'Descripción',
                dataIndex: 'descriprrss',
                sorter: true,
                key: 'descriprrss',
                width: 100,
            },
            {
                title: 'Acción',
                key: 'action',
                width: 50,
                align: 'center',
                render: (text, record) => {
                    return (
                        <Dropdown trigger={['click']} overlay={
                            <Menu>
                                <Menu.Item key="1" onClick={() => this.handleDelete(record)}><Icon type="delete" style={{ color: '#grey' }} />Eliminar</Menu.Item>
                            </Menu>
                        }>
                            <Button size="small">
                                <Icon type="ellipsis" />
                            </Button>
                        </Dropdown>
                    )
                },
            }
        ],
    }

    async componentDidMount() {
        this.fetch({
            limite: 10,
            pagina: 1,
        });
    }
    fetch = async (params = {}) => {
        try {
            const response = await api.rrss.getLista()
            if (response.status === "success") {
                this.setState({ rrss: response.data.redes })
            }

            const response1 = await api.rrss.getAll(this.props.id)
            if (response1.status === "success") {
                this.setState({ data: response1.data.redes_sociales })
            }
        } catch (e) {
            message.error(e.toString(), 7);
        }
    }

    handleDelete = async (record) => {
        try {
            const response = await api.rrss.baja(record.id)
            if(response.status === "success"){
                message.success("Eliminado con exito!")
                this.fetch()
            }
        } catch (error) {
            message.error(error)
        }
    }

    handleSubmit = (e) => {
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })
                    const response = await api.rrss.create({
                        ...values,
                        idlugar: parseInt(this.props.id)
                    });
                    if (response.status === "success") {
                        this.props.form.setFieldsValue({
                            idrrss: '',
                            urlrrss: '',
                            descriprrss: '',
                        })
                        this.fetch();
                    } else {
                        message.error(response.message, 7);
                    }
                } catch (e) {
                    message.error(e.toString(), 7);
                } finally {
                    this.setState({
                        confirmLoading: false,
                    })
                }
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="steps-content">
                    <Form>
                        <Row gutter={8}>
                            <Col span={24}>
                                <FormItem label="Red" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('idrrss', {
                                        initialValue: '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Select
                                            placeholder="Provincia"
                                            optionFilterProp="children"
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                            }
                                        >
                                            {this.state.rrss && this.state.rrss.map((data, index) => {
                                                return <Option value={data.id} key={index}>{data.nombrerrss}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={8}>
                            <Col span={24}>
                                <FormItem label="Dominio" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('urlrrss', {
                                        initialValue: '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={8}>
                            <Col span={24}>
                                <FormItem label="Descripción" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 18 }, },
                                }}>
                                    {getFieldDecorator('descriprrss', {
                                        initialValue: '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input.TextArea rows={3} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <br />
                <Row>
                    <Col span={24}>
                        <Button type="primary" style={{ float: 'right' }} onClick={() => { this.handleSubmit() }}>
                            Guardar
                        </Button>
                    </Col>
                </Row>

                <Divider>Redes Sociales</Divider>

                <Table
                    bordered={false}
                    components={this.components}
                    columns={this.state.columns}
                    rowKey={(record, index) => index}
                    dataSource={this.state.data && this.state.data}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const WrappedRedes = Form.create()(Redes);

export default connect(
    mapStateToProps,
)(WrappedRedes);