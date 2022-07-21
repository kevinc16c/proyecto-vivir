import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Modal, Input, Row, Col, Divider, Switch } from 'antd';

const FormItem = Form.Item;

class Nuevo extends React.Component {

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
        try {
            // Todos los lugares del propietario
            const response = await api.lugares.get(parseInt(this.props.user && this.props.user.id))
            if (response.status === "success") {
                this.setState({
                    lugares: response.data.lugares,
                });
            } else {
                this.setState({
                    lugares: [],
                });
                message.error(response.message, 5);
            }
        } catch (e) {
            message.error(e.toString(), 7);
        }
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })
                    const response = await api.insumos.create({
                        idlugar: this.props.idlugar && parseInt(this.props.idlugar),
                        descripcion: values.descripcion,
                        suspendido: (typeof values.suspendido === 'undefined' || values.suspendido === false) ? 0 : 1
                    });
                    if (response.status === "success") {
                        window.location.reload();
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
                    <h4 style={{ marginBottom: 15 }}>Nuevo</h4>
                    <Divider />
                    <Form style={{ marginTop: 10 }}>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Descripción" {...{
                                    labelCol: { sm: { span: 6 }, },
                                    wrapperCol: { sm: { span: 15 }, },
                                }}>
                                    {getFieldDecorator('descripcion', {
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Descripción" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Suspendido" {...{
                                    labelCol: { sm: { span: 6 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('suspendido', {
                                        valuePropName: 'checked',
                                    })(
                                        <Switch />
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

const WrappedNuevo = Form.create()(Nuevo);

export default connect(
    mapStateToProps,
)(WrappedNuevo);