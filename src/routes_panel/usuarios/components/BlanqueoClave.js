import React from 'react';
import {api} from 'api';
import { connect } from 'react-redux';
import { message, Modal, Form, Icon, Input } from 'antd';
const FormItem = Form.Item;

class ChangePassword extends React.Component {

    constructor(props){
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
                    const response = await api.usuarios.blanquearClave(this.props.id, { ...values, clave: '', usuario: this.props.user.usuario });
                    if (response.status === "success") {
                        message.success(response.message, 7);
                        this.props.closeModal();
                    }else {
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
                  <h4 style={{display: 'inline-block'}}>Blanqueo de clave</h4>
                  <p className="lead"></p>
                    <Form >
                      <FormItem label="Blaqueo:" {...{
												labelCol: {sm: { span:5 },},
												wrapperCol: {sm: { span: 10 },},
											}}>
												{getFieldDecorator('newclave', {
													initialValue:"",
													rules: [{ required: true, message: ' '}],
													})(
														<Input type="password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="Clave" />
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
