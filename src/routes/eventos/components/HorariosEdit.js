import React from 'react';
import { api } from '../api';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Modal, Input, Select, Row, Col, Divider } from 'antd';
import _ from 'lodash';

const Option = Select.Option;
const FormItem = Form.Item;
class HorariosEdit extends React.Component {

    state = {
        disabledLogin: false,
        confirmLoading: false,
        totalDataSize: 10000,
    }

    async componentDidMount() {
        this.fetch({
            limite: 10,
            pagina: 1,
        });
    }

    fetch = async (params = {}) => {
        const response2 = await api.horas.getAll()
        if (response2.status === "success") {
            this.setState({ horas: response2.data.horas })
        }

        const response3 = await api.minutos.getAll()
        if (response3.status === "success") {
            this.setState({ minutos: response3.data.minutos })
        }
    }

    async onSelectRubro(e) {
        await this.setState({ idrubro: e })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })

                    let Lughorades = values.Lughorades._d.toString()
                    let LughoradesCut = Lughorades.substr(16, 9)
                    await this.setState({ LughoradesCut: LughoradesCut })

                    let Lughorahas = values.Lughorahas._d.toString()
                    let LughorahasCut = Lughorahas.substr(16, 9)
                    await this.setState({ LughorahasCut: LughorahasCut })

                    const response = await api.horarios.update({
                        id: this.props.data.id,
                        idlugar: this.props.data.idlugar,
                        iddia: this.props.data.iddia,
                        Lughorades: this.state.LughoradesCut,
                        Lughorahas: this.state.LughorahasCut,
                    });
                    if (response.status === "success") {
                        this.props.closeModal();
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
            <Modal
                visible={true}
                confirmLoading={this.state.confirmLoading}
                onOk={this.handleSubmit}
                onCancel={this.props.closeModal}
                cancelText="Cancelar"
                okText="Aceptar"
                width={650}
            >
                <section className="form-v1-container col-md-12">
                    <h4 style={{ marginBottom: 15 }}>Editar</h4>
                    <Divider />
                    <Form style={{ marginTop: 10 }}>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Día" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('dsubrubro', {
                                        initialValue: this.props.data ? this.props.data.dia : '',
                                    })(
                                        <Input
                                            style={{ width: "100%" }}
                                            placeholder="Día" readOnly />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={8}>
                                <FormItem label="Desde" {...{
                                    labelCol: { sm: { span: 12 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('horasdesde', {
                                        initialValue: '',
                                        rules: [{ required: true, message: "" }],
                                    })(
                                        <Select
                                            placeholder="Hora"
                                            optionFilterProp="children"
                                            showSearch
                                            onSelect={(e) => this.setState({ horaSelectD: e })}
                                            filterOption={(input, option) =>
                                                option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                            }
                                        >
                                            {this.state.horas && this.state.horas.map((data, index) => {
                                                return <Option value={data.mascarahora} key={index}>{data.mascarahora}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="" {...{
                                    labelCol: { sm: { span: 0 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('minutosdesde', {
                                        initialValue: '',
                                        rules: [{ required: true, message: "" }],
                                    })(
                                        <Select
                                            placeholder="Minutos"
                                            optionFilterProp="children"
                                            showSearch
                                            onSelect={(e) => this.setState({ minutoSelectD: e })}
                                            filterOption={(input, option) =>
                                                option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                            }
                                        >
                                            {this.state.minutos && this.state.minutos.map((data, index) => {
                                                return <Option value={data.mascaraminu} key={index}>{data.mascaraminu}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={8}>
                            <Col span={8}>
                                <FormItem label="Hasta" {...{
                                    labelCol: { sm: { span: 12 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('horas', {
                                        initialValue: '',
                                        rules: [{ required: true, message: "" }],
                                    })(
                                        <Select
                                            placeholder="Hora"
                                            optionFilterProp="children"
                                            showSearch
                                            onSelect={(e) => this.setState({ horaSelect: e })}
                                            filterOption={(input, option) =>
                                                option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                            }
                                        >
                                            {this.state.horas && this.state.horas.map((data, index) => {
                                                return <Option value={data.mascarahora} key={index}>{data.mascarahora}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="" {...{
                                    labelCol: { sm: { span: 0 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('minutos', {
                                        initialValue: '',
                                        rules: [{ required: true, message: "" }],
                                    })(
                                        <Select
                                            placeholder="Minutos"
                                            optionFilterProp="children"
                                            showSearch
                                            onSelect={(e) => this.setState({ minutoSelect: e })}
                                            filterOption={(input, option) =>
                                                option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                            }
                                        >
                                            {this.state.minutos && this.state.minutos.map((data, index) => {
                                                return <Option value={data.mascaraminu} key={index}>{data.mascaraminu}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </section>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const WrappedHorariosEdit = Form.create()(HorariosEdit);

export default connect(
    mapStateToProps,
)(WrappedHorariosEdit);