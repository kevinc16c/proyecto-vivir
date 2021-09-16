
import React from 'react';
import { api } from 'api';
import { connect } from 'react-redux';
import { message, Tabs, Breadcrumb, Form, Input, Row, Col, Transfer, Button, Divider } from 'antd';
import QueueAnim from 'rc-queue-anim';
import './styles.scss'
import Blanquear from './components/BlanqueoClave';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class Editar extends React.Component {
	_isMounted = false;
	state = {
		disabledLogin: true,
		confirmLoading: false,
		targetKeysRoles: [],
		selectedKeysRoles: [],
		openBlanqueo: false
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	async componentDidMount() {
		this._isMounted = true;
		//Usuario
		const response = await api.usuarios.get(this.props.idusuario);
		if (response.status === "success") {
			if (this._isMounted) {
				this.setState({
					...response.data.usuario,
					targetKeysRoles: response.data.usuario.roles ? response.data.usuario.roles.map((data) => { return JSON.stringify(data) }) : [],
				})
			}
		}
		const responseRoles = await api.roles.getAll();
		if (responseRoles.status === "success") {
			if (this._isMounted) {
				this.setState({
					roles: responseRoles.data.roles ? responseRoles.data.roles : [],
				})
			}
		}
		this.setState({
			disabledLogin: false,
		})

	}
	handleSelectChangeRoles = (sourceSelectedKeys, targetSelectedKeys) => {
		this.setState({ selectedKeysRoles: [...sourceSelectedKeys, ...targetSelectedKeys] });
	}
	//Transfer roles
	handleChangeRoles = (nextTargetKeys, direction, moveKeys) => {
		this.setState({ targetKeysRoles: nextTargetKeys });
	}
	handleSubmit = (e) => {
		e.preventDefault();
		if (!this.state.confirmLoading) {
			this.setState({ confirmLoading: true, disabledLogin: true })
			this.props.form.validateFields(async (err, values) => {
				if (!err) {
					try {
						const response = await api.usuarios.update({
							...values,
							roles: this.state.targetKeysRoles ? this.state.targetKeysRoles.map((data) => JSON.parse(data)) : [],
						});
						if (response.status === "success") {
							message.success(response.message, 7);
							this.props.onUpdate();
							this.props.closeModal();
						} else {
							message.error(response.message, 7);
							this.setState({ disabledLogin: true })
						}
					} catch (e) {
						message.error(e.toString(), 7);
						this.setState({ disabledLogin: true })
					} finally {
						if (this._isMounted) {
							this.setState({ confirmLoading: false, })
						}
					}
				} else {
					message.error("Revise si los datos son correctos o fueron cargados")
					this.setState({ confirmLoading: false, disabledLogin: false })
				}
			})
		}
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { targetKeysRoles, selectedKeysRoles } = this.state;
		return (
			<QueueAnim type="bottom" className="ui-animate">
				<Breadcrumb>
					<Breadcrumb.Item>Inicio</Breadcrumb.Item>
					<Breadcrumb.Item>Usuarios</Breadcrumb.Item>
					<Breadcrumb.Item>{this.props.idusuario}</Breadcrumb.Item>
				</Breadcrumb>
				<div className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
					<div className="box-body">
						<h4 style={{ marginBottom: 15, display: 'inline-block' }}>Usuarios</h4>
						<Tabs defaultActiveKey="1">
							<TabPane tab="Datos" key="1">
								<Form style={{ marginTop: 10 }}>
									<Row gutter={16}>
										<Col span={16}>
											<FormItem label="Id Usuario" {...{
												labelCol: { sm: { span: 5 }, },
												wrapperCol: { sm: { span: 10 }, },
											}}>
												{getFieldDecorator('id', {
													initialValue: this.state.id ? this.state.id : '',
													rules: [{ required: true, message: ' ' }],
												})(
													<Input size="default" placeholder="Id Ususario .." disabled />
												)}
											</FormItem>
											<FormItem label="Usuario" {...{
												labelCol: { sm: { span: 5 }, },
												wrapperCol: { sm: { span: 10 }, },
											}}>
												{getFieldDecorator('usuario', {
													initialValue: this.state.usuario ? this.state.usuario : '',
													rules: [{ required: true, message: ' ' }],
												})(
													<Input size="default" placeholder="Usuario.." disabled />
												)}
											</FormItem>
										</Col>
									</Row>
									<Row gutter={16}>
										<Col span={16}>
											<FormItem label="Nombre" {...{
												labelCol: { sm: { span: 5 }, },
												wrapperCol: { sm: { span: 19 }, },
											}}>
												{getFieldDecorator('nombre', {
													initialValue: this.state.nombre ? this.state.nombre : '',
													rules: [{ required: true, message: ' ' }],
												})(
													<Input size="default" placeholder="Nombre.." />
												)}
											</FormItem>
										</Col>
									</Row>
									<Row gutter={16}>
										<Col span={16}>
											<FormItem label="Apellido" {...{
												labelCol: { sm: { span: 5 }, },
												wrapperCol: { sm: { span: 19 }, },
											}}>
												{getFieldDecorator('apellido', {
													initialValue: this.state.apellido ? this.state.apellido : '',
													rules: [{ required: true, message: ' ' }],
												})(
													<Input size="default" placeholder="Apellido.." />
												)}
											</FormItem>
										</Col>
									</Row>
									<Row gutter={16}>
										<Col span={16}>
											<FormItem label="Mail" {...{
												labelCol: { sm: { span: 5 }, },
												wrapperCol: { sm: { span: 19 }, },
											}}>
												{getFieldDecorator('mail', {
													initialValue: this.state.mail ? this.state.mail : '',
												})(
													<Input size="default" placeholder="E-Mail.." />
												)}
											</FormItem>
										</Col>
									</Row>
									<Row gutter={16}>
										<Col span={16}>
											<FormItem label="Teléfono" {...{
												labelCol: { sm: { span: 5 }, },
												wrapperCol: { sm: { span: 19 }, },
											}}>
												{getFieldDecorator('telefono', {
													initialValue: this.state.telefono ? this.state.telefono : '',
													rules: [{ required: true, message: ' ' }],
												})(
													<Input size="default" placeholder="Teléfono.." />
												)}
											</FormItem>
										</Col>
									</Row>
								</Form>
							</TabPane>
							<TabPane tab="Roles" key="2">
								<Transfer
									dataSource={this.state.roles && this.state.roles.map((data, index) => {
										return {
											key: JSON.stringify(data),
											title: data.rol,
											description: 'okok',
										}
									})}
									titles={['Roles', 'Roles asignados']}
									targetKeys={targetKeysRoles}
									selectedKeys={selectedKeysRoles}
									onChange={this.handleChangeRoles}
									onSelectChange={this.handleSelectChangeRoles}
									onScroll={this.handleScrollRoles}
									render={item => item.title}
									listStyle={{
										width: 250,
										height: 220,
									}}
								/>
							</TabPane>
						</Tabs>
						<Divider></Divider>
						<Button
							icon="lock"
							disabled={this.state.disabledLogin}
							loading={this.state.confirmLoading}
							style={{ marginTop: 5, float: 'left' }}
							onClick={() => this.setState({ openBlanqueo: true })}>
							Blanquear clave
								</Button>
						<Button type="primary" htmlType="submit" icon="save"
							style={{ marginTop: 5, marginLeft: 5, float: 'right' }}
							onClick={this.handleSubmit}
							disabled={this.state.disabledLogin}
							loading={this.state.confirmLoading}>
							Guardar
								</Button>
						<Button htmlType="submit" icon="close"
							style={{ marginTop: 5, float: 'right' }}
							onClick={this.props.closeModal}>
							Cancelar
								</Button>

					</div>
					{this.state.openBlanqueo &&
						<Blanquear
							closeModal={() => {
								this.setState({ openBlanqueo: false });
							}}
							data={{ ...this.state }}
							id={this.state.id}
						/>
					}
				</div>
			</QueueAnim>
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
