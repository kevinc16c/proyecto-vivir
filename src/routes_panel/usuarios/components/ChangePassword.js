import React from 'react';
import { api } from '../../../api_panel';
import { connect } from 'react-redux';
import { message, Modal, Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class ChangePassword extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            disabledLogin: false,
            confirmLoading: false,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.open !== prevState.open) {
            return { open: nextProps.open };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.open !== this.props.open) {
            this.setState({ open: this.props.open });
        }
    }

    handleSubmit = (e) => {

        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })
                    const response = await api.user.changePassword({
                        ...values,
                        id: this.props.id
                    });
                    if (response.status === "success") {
                        sessionStorage.removeItem("token_panel");
                        window.location.href = '/#/panel';
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
                visible={this.state.open}
                confirmLoading={this.state.confirmLoading}
                //   onOk={this.handleSubmit}
                onCancel={this.props.closeModal}
                cancelText=""
                okText=""
                footer={[
                    <Button key="aceptar" loading={this.state.confirmLoading} type="primary" onClick={() => this.handleSubmit()}>Aceptar</Button>
                ]}
            >
                <section className="form-v1-container">

                    <h2>Cambio de clave</h2>
                    <p className="lead">Complete el formulario para modificar su clave.</p>
                    <Form className="form-v1">
                        <FormItem>
                            {getFieldDecorator('oldclave', {
                                rules: [{ required: true, message: 'Por favor ingrese su clave actual' }],
                            })(
                                <Input autoComplete="off" type="password" size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="Clave actual" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('clave', {
                                rules: [{ required: true, message: 'Por favor ingrese su nueva clave' }],
                            })(
                                <Input type="password" autoComplete="off" size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="Nueva clave" />
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
