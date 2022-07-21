import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, PageHeader, Modal, Input, Row, Col } from 'antd';
import './styles.scss'

const FormItem = Form.Item;

class Nuevo extends React.Component {

	state = {
		disabledLogin: false,
		confirmLoading: false,
	}

	async componentDidMount() {
		try {

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
					const response = await api.user.create({
						...values
					});
					if (response.status === "success") {
						this.props.onCreate();
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
				okText="Crear"
				width={600}
				title={<PageHeader onBack={this.props.closeModal} title="Usuarios" subTitle="Nuevo" />}
			>
				<section className="form-v1-container col-md-12">
					<Form style={{ marginTop: 10 }}>
						<Row gutter={16}>
							<Col span={24}>
								<FormItem label="Usuario" {...{
									labelCol: { sm: { span: 5 }, },
									wrapperCol: { sm: { span: 10 }, },
								}}>
									{getFieldDecorator('usuario', {
										rules: [{ required: true, message: ' ' }],
									})(
										<Input size="default" placeholder="Usuario.." />
									)}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={24}>
								<FormItem label="Nombre" {...{
									labelCol: { sm: { span: 5 }, },
									wrapperCol: { sm: { span: 19 }, },
								}}>
									{getFieldDecorator('nombre', {
										rules: [{ required: true, message: ' ' }],
									})(
										<Input size="default" placeholder="Nombre.." />
									)}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={24}>
								<FormItem label="Apellido" {...{
									labelCol: { sm: { span: 5 }, },
									wrapperCol: { sm: { span: 19 }, },
								}}>
									{getFieldDecorator('apellido', {
										rules: [{ required: true, message: ' ' }],
									})(
										<Input size="default" placeholder="Apellido.." />
									)}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={24}>
								<FormItem label="Mail" {...{
									labelCol: { sm: { span: 5 }, },
									wrapperCol: { sm: { span: 19 }, },
								}}>
									{getFieldDecorator('mail', {
									})(
										<Input size="default" placeholder="E-Mail.." />
									)}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={24}>
								<FormItem label="Teléfono" {...{
									labelCol: { sm: { span: 5 }, },
									wrapperCol: { sm: { span: 19 }, },
								}}>
									{getFieldDecorator('telefono', {
										rules: [{ required: false, message: ' ' }],
									})(
										<Input size="default" placeholder="Teléfono.." />
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
