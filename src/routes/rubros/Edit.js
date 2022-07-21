import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Modal, Input, Row, Col, Divider, InputNumber } from 'antd';

const FormItem = Form.Item;
class Editar extends React.Component {

    state = {
        confirmLoading: false,
        totalDataSize: 10000,
    }

    async componentDidMount() {}

    

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })
                    const response = await api.rubros.update({
                        ...values,
                        id: this.props.data ? this.props.data.id : null
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
                width={700}
            >
                <section className="form-v1-container col-md-12">
                    <h4 style={{ marginBottom: 15 }}>Editar</h4>
                    <Divider />
                    <Form style={{ marginTop: 10 }}>
                        <Row gutter={8} >
                            <Col sm={{ span: 24 }} xs={{ span: 24 }}>
                                <FormItem label="Descripción" {...{
                                    labelCol: { sm: { span: 7 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('descrirubro', {
                                        initialValue: this.props.data ? this.props.data.descrirubro : '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Descripciòn" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col sm={{ span: 24 }} xs={{ span: 24 }}>
                                <FormItem label="Porcentaje de comisión" {...{
                                    labelCol: { sm: { span: 7 }, },
                                    wrapperCol: { sm: { span: 10 }, },
                                }}>
                                    {getFieldDecorator('porcomision', {
                                        initialValue: this.props.data ? this.props.data.porcomision : '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <InputNumber min={0} max={100} placeholder="Porcentaje de comisión" />
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

const WrappedEditar = Form.create()(Editar);

export default connect(
    mapStateToProps,
)(WrappedEditar);