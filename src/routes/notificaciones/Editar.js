import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Modal, Input, Row, Col, Select, InputNumber } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

class Editar extends React.Component {

	state = {
		disabledLogin: false,
		confirmLoading: false,
	}

	async componentDidMount() {
		try {
			const responseGrupos = await api.grupos.getAll()
			if (responseGrupos.status === "success") {
				this.setState({ grupos: responseGrupos.data.grupos })
			}
			this.props.form.setFieldsValue({
				de_subgru: this.props.data.de_subgru,
				mar_gru: this.props.data.mar_gru,
				cod_gru: this.props.data.cod_gru,
			})
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
					const response = await api.subgrupos.update({
						...values,
						co_subgru: this.props.data.co_subgru,
					});
					if (response.status === "success") {

					} else {
						message.error(response.message, 7);
					}
				} catch (e) {
					message.error(e.toString(), 7);
				} finally {
					this.setState({
						confirmLoading: false,
					})
					this.props.closeModal();
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
				okText="Guardar"
				width={600}
			>
				<section className="form-v1-container col-md-12">
					<h4 style={{ marginBottom: 15 }}>Editar</h4>
					<Form style={{ marginTop: 10 }}>
						<Row gutter={16}>
							<Col span={24}>
								<FormItem label="Subgrupo" {...{
									labelCol: { sm: { span: 5 }, },
									wrapperCol: { sm: { span: 19 }, },
								}}>
									{getFieldDecorator('de_subgru', {
										rules: [{ required: true, message: ' ' }],
									})(
										<Input size="default" placeholder="Subgrupo..." />
									)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={24}>
								<FormItem {...{
									labelCol: { sm: { span: 5 }, },
									wrapperCol: { sm: { span: 14 }, },
								}} label="Grupo:">
									{getFieldDecorator('cod_gru', {
										rules: [{ required: true, message: ' ' }],
									})(
										<Select
											placeholder="Grupos"
											name="co_grupos"
											style={{ width: "100%" }}
											optionFilterProp="children"
											showSearch
											filterOption={(input, option) =>
												option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
											}
										>
											{this.state.grupos && this.state.grupos.map((data, index) => {
												return <Option value={data.co_grupos} key={index}>{data.de_grupos}</Option>
											})}
										</Select>
									)}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={24}>
								<FormItem label="Margen" {...{
									labelCol: { sm: { span: 5 }, },
									wrapperCol: { sm: { span: 6 }, },
								}}>
									{getFieldDecorator('mar_gru', {
									})(
										<InputNumber
											min={0}
											max={100}
											presision={2}
											formatter={value => `${value}%`}
											style={{ width: '100%', textAlign: 'right' }}
										/>
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
