import React from 'react';
import { api } from '../api';
import { connect } from 'react-redux';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
    message,
    Modal,
    Row,
    Col,
    Select,
    Button,
    Menu,
    Divider,
    Dropdown,
    Table,
    TimePicker,
} from 'antd';
import moment from 'moment';
import Edit from './HorariosEdit';

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
            limite: 10,
            pagina: 1,
        });
    }
    fetch = async (params = {}) => {
        try {
            const response = await api.dias.getLista()
            if (response.status === "success") {
                this.setState({ dias: response.data.dias })
            }

            const response1 = await api.horarios.getAll(this.props.id)
            if (response1.status === "success") {
                this.setState({ data: response1.data.horarios })
            }
        } catch (e) {
            message.error(e.toString(), 7);
        }
    }

    handleSubmit = (e) => {
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })
                    const response = await api.horarios.create({
                        ...values,
                        lughorades: moment.parseZone(values.lughorades).format("HH:mm:00"),
                        lughorahas: moment.parseZone(values.lughorahas).format("HH:mm:00"),
                        idlugar: parseInt(this.props.id)
                    });
                    if (response.status === "success") {
                        this.props.form.setFieldsValue({
                            iddia: '',
                            lughorades: '',
                            lughorahas: '',
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

    showDeleteConfirm = async (id) => {
		const _this = this;
		Modal.confirm({
			title: '¿Está seguro de que desea borrar?',
			okText: 'Aceptar',
			okType: 'danger',
			cancelText: 'Cancelar',
			async onOk() {
				const response = await api.horarios.delete(id);
				if (response.status !== "success") {
					message.error(response.message, 7);
				}
				_this.fetch({
					limite: 10,
					pagina: 1,
				});
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}

    handleOpenChange = (open) => {
        this.setState({ open });
    };

    handleClose = () => {
        this.setState({ open: false })
    }

    handleOpenChange1 = (open1) => {
        this.setState({ open1 });
    };

    handleClose1 = () => {
        this.setState({ open1: false })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="steps-content">
                    <Form>
                        <Row gutter={8}>
                            <Col span={24}>
                                <FormItem label="Día" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('iddia', {
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
                                            {this.state.dias && this.state.dias.map((data, index) => {
                                                return <Option value={data.id} key={index}>{data.dia}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={8}>
                            <Col span={24}>
                                <FormItem label="Desde" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 14 }, },
                                }}>
                                    {getFieldDecorator('lughorades', {
                                        initialValue: '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <TimePicker
                                            open={this.state.open}
                                            onOpenChange={this.handleOpenChange}
                                            format="HH:mm"
                                            hourStep={1}
                                            minuteStep={15}
                                            addon={() => (
                                                <Button size="small" type="primary" onClick={this.handleClose}>
                                                    Ok
                                                </Button>
                                            )}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={8}>
                            <Col span={24}>
                                <FormItem label="Hasta" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 14 }, },
                                }}>
                                    {getFieldDecorator('lughorahas', {
                                        initialValue: '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <TimePicker
                                            open={this.state.open1}
                                            onOpenChange={this.handleOpenChange1}
                                            format="HH:mm"
                                            hourStep={1}
                                            minuteStep={15}
                                            addon={() => (
                                                <Button size="small" type="primary" onClick={this.handleClose1}>
                                                    Ok
                                                </Button>
                                            )}
                                        />
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

                <Divider>Horarios</Divider>

                <Table
                    bordered={false}
                    components={this.components}
                    columns={this.state.columns}
                    rowKey={(record, index) => index}
                    dataSource={this.state.data && this.state.data}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    onRow={(record, rowIndex) => {
                        return {
                            onDoubleClick: (e) => {
                                    this.setState({ openEditar: true, registro: record, })
                            },
                        };
                    }}                />
                {this.state.openEditar &&
					<Edit
						closeModal={() => {
							this.setState({ openEditar: false });
							this.fetch({
								limite: 10,
								pagina: 1,
							});
						}}
						data={this.state.registro}
					/>
				}
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