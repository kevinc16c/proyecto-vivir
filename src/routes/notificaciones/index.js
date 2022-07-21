import React from 'react';
import { connect } from 'react-redux';
import { NotificationOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Breadcrumb, Input, Button, Select, Modal, Col, Row, DatePicker } from 'antd';
import QueueAnim from 'rc-queue-anim';
import queryString from 'query-string';
import { api } from './api';
import moment from 'moment'
import './styles.scss'
const Option = Select.Option;
const FormItem = Form.Item;

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

class Notificaciones extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			q: '',
			searchText: '',
			required: false,
			imageUrl: "",
			data: [],
			value: "normal",
			datetime: "",
			totalDataSize: 100,
			pagination: { showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'] },
			loading: false,
		}
	}

	componentDidMount() {
	}

	showDeleteConfirm = async (record) => {
		const _this = this;
		Modal.confirm({
			title: '¿Esta seguro que desea dar de baja?',
			okText: 'Aceptar',
			okType: 'danger',
			cancelText: 'Cancelar',
			async onOk() {
				const response = await api.subgrupos.baja(record.co_subgru);
				_this.fetch({
					limit: this.state.pagination.pageSize,
					page: this.state.pagination.current,
				});
				if (response.status === "success") {
					message.success(response.message)
				}
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}




	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		this.setState({
			pagination: pager,
		});
		this.fetch({
			limit: pagination.pageSize,
			page: pagination.current,
			sortField: sorter.field,
			sortOrder: sorter.order === "ascend" ? "ASC" : "DESC",
			...filters,
		});
	}

	fetch = async (params = {}) => {

		try {
			const response = await api.subgrupos.getAll(queryString.stringify({
				...params,
			}))
			if (response.status === "success") {
				this.setState({
					data: response.data.subgrupos,
					totalDataSize: response.data.registros,
				});
			} else {
				this.setState({
					data: [],
				});
				message.error(response.message, 5);
			}
		} catch (e) {
			this.setState({
				data: [],
			});
			message.error(e.toString(), 5);
		}
	}


	search = (text) => {

		this.setState({ q: text }, () => {
			this.fetch({
				limit: this.state.pagination.pageSize,
				page: this.state.pagination.current,
			});
		})

	}

	onChange = (e) => {
		this.setState({
			value: e.target.value,
		});
		if (e.target.value === "imagen") {
			this.setState({ required: true })
		} else {
			this.setState({ required: false })
		}
		this.props.form.setFieldsValue({
			formato: e.target.value,
		})
	};


	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				try {
					this.setState({
						confirmLoading: true,
					})
					const response = await api.notificaciones.create({
						...values,
						formato: this.state.value,
						tipo: values.topico,
						imagen: this.state.imageUrl && this.state.imageUrl,
						vencimiento: this.state.datetime,
					});
					if (response.status === "success") {
						window.location.reload()
					} else {
						message.error(response.message, 7);
					}
				} catch (e) {
					message.error(e.toString(), 7);
				}
			}
		})
	}

	beforeUpload(file) {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('Solo puedes subir archivos JPG/PNG!');
		}
		const isLt2M = file.size <= 204800;
		if (!isLt2M) {
			message.error('La imagen debe ser más pequeña que 2KB!');
		}
		return isJpgOrPng && isLt2M;
	}

	handleChange = (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, imageUrl =>
				this.setState({
					imageUrl,
					loading: false,
				}),
			);
		}
	};


	render() {
		const { getFieldDecorator } = this.props.form;
		return (
            <div className="container-fluid no-breadcrumb">
				<QueueAnim type="bottom" className="ui-animate">
					<Breadcrumb>
						<Breadcrumb.Item>Inicio</Breadcrumb.Item>
						<Breadcrumb.Item>Notificaciones</Breadcrumb.Item>
					</Breadcrumb>

					<div className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
						<div className="box-body">
							<h4 style={{ marginBottom: 15, display: 'inline-block' }}>Notificaciones</h4>
							<Form style={{ marginTop: 10 }}>
								<Row gutter={16}>
									<Col span={12}>
										<FormItem label="Topicos" {...{
											labelCol: { sm: { span: 5 }, },
											wrapperCol: { sm: { span: 19 }, },
										}}>
											{getFieldDecorator('topico', {
												rules: [{ required: true, message: ' ' }],
											})(
												<Select
													placeholder="Seleccione un topico"
													style={{ width: "100%" }}
													optionFilterProp="children"
													showSearch
													filterOption={(input, option) =>
														option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
													}
												>
													<Option value="noticias">Noticias y Novedades</Option>
													<Option value="alojamientos">Alojamientos</Option>
													<Option value="gastronomia">Gastronomia</Option>
													<Option value="entretenimientos">Entretenimientos</Option>
													<Option value="comercios">Comercios</Option>
													<Option value="atractivos">Atractivos</Option>
													<Option value="utilidades">Utilidades</Option>
													<Option value="ofertas">Ofertas</Option>
													<Option value="eventos">Eventos</Option>
												</Select>
											)}
										</FormItem>
									</Col>
								</Row>
								<Row gutter={16}>
									<Col span={12}>
										<FormItem label="Título" {...{
											labelCol: { sm: { span: 5 }, },
											wrapperCol: { sm: { span: 19 }, },
										}}>
											{getFieldDecorator('titulo', {
												rules: [{ required: true, message: ' ' }],
											})(
												<Input size="default" placeholder="Título..." maxLength={50} />
											)}
										</FormItem>
									</Col>

								</Row>
								<Row>
									<Col span={12}>
										<FormItem label="Vencimiento" {...{
											labelCol: { sm: { span: 5 }, },
											wrapperCol: { sm: { span: 6 }, },
										}}>
											{getFieldDecorator('vencimiento', {
												rules: [{ required: true, message: ' ' }],
											})(
												<DatePicker
													showTime={true}
													placeholder={"Vencimiento"}
													onChange={(e) => this.setState({ datetime: moment.parseZone(e._d).format('YYYY-MM-DD hh:mm:ss') })}
												/>
											)}
										</FormItem>
									</Col>
								</Row>
								<Row gutter={16}>
									<Col span={12}>
										<FormItem label="Mensaje" {...{
											labelCol: { sm: { span: 5 }, },
											wrapperCol: { sm: { span: 19 }, },
										}}>
											{getFieldDecorator('mensaje', {
												rules: [{ required: true, message: ' ' }],
											})(
												<Input.TextArea rows={5} />
											)}
										</FormItem>
									</Col>
								</Row>
								<Row gutter={16}>
									<Col span={12}>
										<Button
											type="primary"
											icon={<NotificationOutlined />}
											onClick={this.handleSubmit}
											style={{ marginBottom: 10 }}>
											Enviar notificación
										</Button>
									</Col>
								</Row>
							</Form>
						</div>
					</div>
				</QueueAnim>
			</div>
        );
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.user,
	}
};
const WrappedNotificaciones = Form.create()(Notificaciones);
export default connect(
	mapStateToProps
)(WrappedNotificaciones);