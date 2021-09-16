import React from 'react';
import { api } from '../api';
import { connect } from 'react-redux';
import { message, Modal, Form, Icon, Input } from 'antd';
const FormItem = Form.Item;

class ChangePassword extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            disabledLogin: false,
            confirmLoading: false,
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
                    const response = await api.propietarios.asignarPass({
                        clave: values.clave,
                        id: `${this.props.id}`,
                    });
                    if (response.status === "success") {
                        message.success(response.message, 7);
                        this.props.closeModal();
                    } else {
                        message.error(response.message, 10);
                    }
                } catch (e) {
                    message.error("Verifique su conexión a internet", 7);
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
            >
                <section className="form-v1-container">
                <h1 style={{marginRight:'45%', marginLeft:'45%'}}><Icon type="user"/></h1>
                    <h2>Asignar clave</h2>
                    <p className="lead"></p>
                    <Form className="form-v1">
                        <FormItem>
                            {getFieldDecorator('usuario', {
                                initialValue: this.props.data && this.props.data.email,
                                rules: [{ required: true, message: ' ' }],
                            })(
                                <Input size="large" prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Usuario" readOnly />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('clave', {
                                rules: [{ required: true, message: ' ' }],
                            })(
                                <Input type="password" size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="Clave" />
                            )}
                        </FormItem>
                    </Form>
                </section>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const WrappedChangePassword = Form.create()(ChangePassword);

export default connect(
    mapStateToProps,
)(WrappedChangePassword);
