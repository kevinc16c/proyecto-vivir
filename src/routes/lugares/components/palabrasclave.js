import React from 'react';
import { api } from '../api';
import { connect } from 'react-redux';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Modal, Row, Col, Select, Button, Menu, Divider, Dropdown, Tag } from 'antd';
import queryString from 'query-string';

const Option = Select.Option;
const FormItem = Form.Item;

class Horarios extends React.Component {

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
        open: false,
        open1: false,
        columns: [
            {
                title: 'ID',
                dataIndex: 'id',
                sorter: true,
                key: 'id',
                width: '5%',
            },
            {
                title: 'Día',
                dataIndex: 'dia',
                sorter: true,
                key: 'dia',
                width: 100,
            },
            {
                title: 'Desde',
                dataIndex: 'Lughorades',
                sorter: true,
                key: 'Lughorades',
                width: 100,
            },
            {
                title: 'Hasta',
                dataIndex: 'Lughorahas',
                sorter: true,
                key: 'Lughorahas',
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
                                <Menu.Item key="1" onClick={() => this.props.history.push("/admin/lugares/editar/" + record.idlugar)}><EditOutlined style={{ color: '#grey' }} />Editar</Menu.Item>
                                <Menu.Item key="2" onClick={() => this.showDeleteConfirm(record.id)}><DeleteOutlined style={{ color: 'red' }} />Eliminar</Menu.Item>
                            </Menu>
                        }>
                            <Button size="small">
                                <EllipsisOutlined />
                            </Button>
                        </Dropdown>
                    );
                },
            }
        ],
    }

    async componentDidMount() {
        this.fetch({
            limite: 10000,
            pagina: 1,
        });
    }
    fetch = async (params = {}) => {
        this.setState({
            palabras_claves: [],
            palabras: [],
        })
        try {
            const response = await api.palabras.getLista(this.props.rubros_id)
            if (response.status === "success") {
                this.setState({ palabras_claves: response.data.palabras_clave })
            }

            const response1 = await api.lugares_palabras.getAll(this.props.lugares_id, queryString.stringify({
                limite: 1000,
                pagina: 1,
                query: '',
            }))
            if (response1.status === "success") {
                this.setState({ palabras: response1.data.palabras_clave })
            }
        } catch (e) {
            message.error(e.toString(), 7);
        }
    }

    showDeleteConfirm = async (data) => {
        const _this = this;
        Modal.confirm({
            title: '¿Está seguro de que desea borrar?',
            okText: 'Aceptar',
            okType: 'danger',
            cancelText: 'Cancelar',
            async onOk() {
                const response = await api.lugares_palabras.delete(data.id);
                if (response.status !== "success") {
                    message.error(response.message, 7);
                }
                _this.fetch({
                    limite: 1000,
                    pagina: 1,
                });
            },
            onCancel() {
                console.log('Cancel');
                _this.fetch({
                    limite: 1000,
                    pagina: 1,
                });
            },
        });
    }

    handleSubmit = (e) => {
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })
                    const response = await api.lugares_palabras.create({
                        ...values,
                        idlugar: parseInt(this.props.lugares_id)
                    });
                    if (response.status === "success") {
                        this.props.form.setFieldsValue({
                            idpalabraclave: '',
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
                            <Col span={12}>
                                <FormItem label="Palabra clave" {...{
                                    labelCol: { sm: { span: 8 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('idpalabraclave', {
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
                                            {this.state.palabras_claves && this.state.palabras_claves.map((data, index) => {
                                                return <Option value={data.id} key={index}>{data.palabraclave}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <Button type="primary" style={{ float: 'left', marginTop: 2 }} onClick={() => { this.handleSubmit() }}>
                                    Guardar
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <br />
                <Row>

                </Row>

                <Divider>Palabras Clave</Divider>

                <div>
                    {this.state.palabras && this.state.palabras.map((data, i) => {
                        return <Tag closable key={data.id} color="geekblue" onClose={(e) => this.showDeleteConfirm(data)}>
                            {data.palabraclave}
                        </Tag>
                    })}
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const WrappedHorarios = Form.create()(Horarios);

export default connect(
    mapStateToProps,
)(WrappedHorarios);