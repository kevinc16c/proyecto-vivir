import React from 'react';
import { connect } from 'react-redux';

import {
    CheckCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    LockOutlined,
    MailOutlined,
    PlusOutlined,
    StopOutlined,
} from '@ant-design/icons';

import { message, Table, Breadcrumb, Input, Button, Dropdown, Menu, Modal, Col, Row } from 'antd';
import QueueAnim from 'rc-queue-anim';
import queryString from 'query-string';
import { api } from './api';
import Nuevo from './Nuevo';
import Edit from './Edit';
import './styless.scss';
import AsignarPass from './components/BlanqueoClave';
import ChangePassword from './components/ChangePassword';

class Vehiculos extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			q: '',
			searchText: '',
			data: [],
			totalDataSize: 100,
			pagination: { showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'] },
			loading: false,
			openCambiarPass: false,
			openAsignarPass: false,
			columns: [
				{
					title: 'ID',
					dataIndex: 'id',
					sorter: true,
					key: 'id',
					width: '5%',
				},
				{
					title: 'Razón social',
					dataIndex: 'razonsocial',
					sorter: true,
					key: 'razonsocial',
					width: 100,
				},
				{
					title: 'Direccion',
					dataIndex: 'direccion',
					sorter: true,
					key: 'direccion',
					width: 100,
				},
				{
					title: 'Email',
					dataIndex: 'email',
					sorter: true,
					key: 'email',
					width: 100,
				},
				{
					title: 'Acción',
					key: 'action',
					width: 50,
					align: 'center',
					render: (text, record) => {
						return (
                            <Dropdown trigger={['click']} overlay={
								<Menu>
									<Menu.Item key="1" onClick={() => this.setState({ openEditar: true, registro: record })}><EditOutlined style={{ color: '#grey' }} />Editar</Menu.Item>
									{
										record.estado === "B"
											?
											<Menu.Item key="2" onClick={() => this.showHabilitar(record.id)}><CheckCircleOutlined style={{ color: '#73d13d' }} />Alta</Menu.Item>
											:
											<Menu.Item key="4" onClick={() => this.showEstadoBaja(record.id)}><StopOutlined style={{ color: 'red' }} />Baja</Menu.Item>
									}
									<Menu.Item key="3" onClick={() => this.showDeleteConfirm(record.id)}><DeleteOutlined style={{ color: 'red' }} />Eliminar</Menu.Item>
									<Menu.Item key="5" disabled={record.cambiarpass === 0 ? false : true} onClick={() => this.showAsignarPass(record)}><LockOutlined style={{ color: '#grey' }} />Asignar contraseña</Menu.Item>
									<Menu.Item key="6" disabled={record.cambiarpass === 0 ? false : true} onClick={() => this.enviarPass(record)}><MailOutlined style={{ color: '#grey' }} />Enviar contraseña por mail</Menu.Item>
								</Menu>
							}>
								<Button size="small">
									<EllipsisOutlined />
								</Button>
							</Dropdown>
                        );
					},
				}
			],
		}
	}

	componentDidMount() {
		this.fetch({
			limite: 10,
			pagina: 1,
		});
	}

	showEstadoBaja = async (record) => {
		const _this = this;
		Modal.confirm({
			title: '¿Esta seguro que desea dar de baja?',
			okText: 'Aceptar',
			okType: 'danger',
			cancelText: 'Cancelar',
			async onOk() {
				const response = await api.propietarios.baja(record);
				_this.fetch({
					limite: 10,
					pagina: 1,
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
	showDelete = async (record) => {
		const _this = this;
		Modal.confirm({
			title: '¿Esta seguro que desea eliminar?',
			okText: 'Aceptar',
			okType: 'danger',
			cancelText: 'Cancelar',
			async onOk() {
				const response = await api.propietarios.baja({ codigoempl: record.codigoempl });
				_this.fetch({
					limite: 10,
					pagina: 1,
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

	showHabilitar = async (record) => {
		const _this = this;
		Modal.confirm({
			title: '¿Esta seguro que desea habilitar?',
			okText: 'Aceptar',
			okType: 'danger',
			cancelText: 'Cancelar',
			async onOk() {
				const response = await api.propietarios.habilitar(record);
				_this.fetch({
					limite: 10,
					pagina: 1,
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

	showCambiarPass = async (record) => {
		this.setState({ id: record, openCambiarPass: true })
	}

	showAsignarPass = async (record) => {
		this.setState({ id: record.id, openAsignarPass: true, registro:record })
	}

	enviarPass = async (record) => {
		try {
			const response = await api.propietarios.enviarPass(record.id, {mail:record.email})
			if(response.status === "success"){
				message.success("Los datos fueron enviados con exito!")
			}
		} catch (error) {
			message.error(error)
		}
	}

	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		this.setState({
			pagination: pager,
		});
		this.fetch({
			limite: pagination.pageSize,
			pagina: pagination.current,
			sortField: sorter.field,
			sortOrder: sorter.order === "ascend" ? "ASC" : "DESC",
			...filters,
		});
	}

	fetch = async (params = {}) => {

		try {
			const response = await api.propietarios.getAll(queryString.stringify({
				...params,
				query: this.state.q
			}))
			const pagination = { ...this.state.pagination };
			if (response.status === "success") {
				pagination.total = parseInt(response.data.registros);
				this.setState({
					data: response.data.propietarios,
					pagination
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
				limite: 10,
				pagina: 1,
			});
		})

	}

	render() {
		let columns = [...this.state.columns];
		return (
            <div className="container-fluid no-breadcrumb">
				<QueueAnim type="bottom" className="ui-animate">
					<Breadcrumb>
						<Breadcrumb.Item>Inicio</Breadcrumb.Item>
						<Breadcrumb.Item>Propietarios</Breadcrumb.Item>
					</Breadcrumb>

					<div className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
						<div className="box-body">
							<Row >
								<Col style={{ float: 'left' }} sm={{ span: 12 }} xs={{ span: 24 }}>
									<h4 style={{ marginBottom: 15, display: 'inline-block' }}>Propietarios</h4>
								</Col>
								<Col style={{ float: 'right' }} sm={{ span: 12 }} xs={{ span: 24 }}>
									<Button
										type="primary"
										icon={<PlusOutlined />}
										onClick={() => this.setState({ openNuevo: true })}
										style={{ float: 'right' }}
									>
										Nuevo
									</Button>
								</Col>
							</Row>

							<Row >
								<Col style={{ float: 'right' }} sm={{ span: 8 }} xs={{ span: 24 }}>
									<Input.Search
										placeholder="Buscar..."
										onSearch={value => this.search(value)}
										style={{ marginBottom: 10, marginTop: 0, float: 'right', display: 'inline-block' }}
									/>
								</Col>
							</Row>
							<Table
								bordered={false}
								components={this.components}
								columns={columns}
								rowKey={(record, index) => index}
								dataSource={this.state.data && this.state.data}
								pagination={this.state.pagination}
								onChange={this.handleTableChange}
								rowClassName={(record, index) => record.estado === "B" ? 'deleteRow' : ''}
								onRow={(record, rowIndex) => {
									return {
										onDoubleClick: (e) => {
											record.estado === "B" ?
												message.info("Este operador está deshabilitado")
												:
												this.setState({ openEditar: true, registro: record, })
										},
									};
								}}
							/>
						</div>
					</div>
				</QueueAnim>
				{this.state.openNuevo &&
					<Nuevo
						closeModal={() => {
							this.setState({ openNuevo: false });
							this.fetch({
								limite: 10,
								pagina: 1,
							});
						}}
						closeModalNuevo={(data) => {
							this.fetch({
								limite: 10,
								pagina: 1,
							});
							this.setState({ openNuevo: false });
							this.showAsignarPass(data.id)
						}}
					/>
				}
				{this.state.openEditar &&
					<Edit
						closeModal={() => {
							this.setState({ openEditar: false });
							this.fetch({
								limite: 10,
								pagina: 1,
							});
						}}
						data={this.state.registro}
					/>
				}
				{this.state.openAsignarPass &&
					<AsignarPass
						closeModal={() => {
							this.setState({ openAsignarPass: false });
							this.fetch({
								limite: 10,
								pagina: 1,
							});
						}}
						id={this.state.id}
						data={this.state.registro}
					/>
				}
				{this.state.openCambiarPass &&
					<ChangePassword
						closeModal={() => {
							this.setState({ openCambiarPass: false });
							this.fetch({
								limite: 10,
								pagina: 1,
							});
						}}
						data={this.state.registro}
					/>
				}
			</div>
        );
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.user,
	}
};

export default connect(
	mapStateToProps
)(Vehiculos);
