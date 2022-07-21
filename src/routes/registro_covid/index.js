import React from 'react';
import { connect } from 'react-redux';
import { PrinterOutlined, SearchOutlined } from '@ant-design/icons';
import { message, Table, Breadcrumb, Input, Button, AutoComplete, Spin, Modal, Col, Row, Tabs, DatePicker, Result } from 'antd';
import QueueAnim from 'rc-queue-anim';
import queryString from 'query-string';
import { api } from './api';
import './styless.scss';
import moment from 'moment';

const AutoCompleteOption = AutoComplete.Option;
class Vehiculos extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			q: '',
			searchText: '',
			data: [],
			dataLugar: [],
			totalDataSize: 100,
			pagination: { showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'] },
			loading: false,
			openCambiarPass: false,
			openAsignarPass: false,
			autoCompleteUsuarios: [],
			autoCompleteLugares: [],
			columnsLugares: [
				{
					title: 'ID',
					dataIndex: 'id',
					sorter: true,
					key: 'id',
					width: '5%',
				},
				{
					title: 'Nombre y apellido',
					dataIndex: 'usuario.nombres',
					sorter: true,
					key: 'usuario.nombres',
					width: 100,
					render: (col, row) => `${row.usuario.nombres} ${row.usuario.apellido}`,
				},
				{
					title: 'Nro. Documento',
					dataIndex: 'usuario.numedocume',
					sorter: true,
					key: 'usuario.numedocume',
					width: 100,
					render: (col, row) => row.usuario.numedocume,
				},
				{
					title: 'Fecha',
					dataIndex: 'fechayhora',
					sorter: true,
					key: 'fechayhora',
					width: 100,
					render: (col, row) => moment.parseZone(row.fechayhora).format("DD/MM/YYYY hh:mm"),
				},
				{
					title: 'Email',
					dataIndex: 'usuario.correoelec',
					sorter: true,
					key: 'usuario.correoelec',
					width: 100,
					render: (col, row) => row.usuario.correoelec,
				},
				{
					title: 'Celular',
					dataIndex: 'celular',
					sorter: true,
					key: 'celular',
					width: 100,
					render: (col, row) => row.usuario.celular
				},
			],
			columns: [
				{
					title: 'ID',
					dataIndex: 'id',
					sorter: true,
					key: 'id',
					width: '5%',
				},
				{
					title: 'Lugar',
					dataIndex: 'nombrelugar',
					sorter: true,
					key: 'nombrelugar',
					width: 100,
				},
				{
					title: 'Localidad',
					dataIndex: 'nombrelocali',
					sorter: true,
					key: 'nombrelocali',
					width: 100,
				},
				{
					title: 'Fecha',
					dataIndex: 'fechayhora',
					sorter: true,
					width: 100,
					render: (col, row) => moment.parseZone(row.fechayhora).format("DD/MM/YYYY hh:mm"),
				},
				{
					title: 'Email',
					dataIndex: 'e_mail',
					sorter: true,
					key: 'e_mail',
					width: 100,
				},
				{
					title: 'Celular',
					dataIndex: 'celular',
					sorter: true,
					key: 'celular',
					width: 100,
				},
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
		this.setState({ id: record, openAsignarPass: true })
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

		} catch (e) {
			this.setState({
				data: [],
			});
			message.error(e.toString(), 5);
		}
	}

	filtrarUsuarios = async () => {
		try {
			if (this.state.idusuario && this.state.desdeUsuarios && this.state.hastaUsuarios) {
				const response = await api.registro.getAll(this.state.idusuario, queryString.stringify({
					tipo: 'usuarios',
					desde: moment.parseZone(this.state.desdeUsuarios).format("YYYY-MM-DD hh:mm:ss"),
					hasta: moment.parseZone(this.state.hastaUsuarios).format("YYYY-MM-DD hh:mm:ss"),
				}))
				const pagination = { ...this.state.pagination };
				if (response.status === "success") {
					pagination.total = parseInt(response.data.registros);
					this.setState({
						data: response.data.registros_usuarios,
						pagination
					});
				} else {
					this.setState({
						data: [],
					});
					message.error(response.message, 5);
				}
			} else {
				message.error("Por favor, controle que haya ingresado todos los datos para la busqueda.", 5);
			}
		} catch (e) {
			this.setState({
				data: [],
			});
			message.error(e.toString(), 5);
		}
	}

	filtrarLugares = async () => {
		try {
			if (this.state.idusuario && this.state.desdeUsuarios && this.state.hastaUsuarios) {
				const response = await api.registro.getAll(this.state.idusuario, queryString.stringify({
					tipo: 'lugares',
					desde: moment.parseZone(this.state.desdeLugares).format("YYYY-MM-DD hh:mm:ss"),
					hasta: moment.parseZone(this.state.hastaLugares).format("YYYY-MM-DD hh:mm:ss"),
				}))
				const pagination = { ...this.state.pagination };
				if (response.status === "success") {
					pagination.total = parseInt(response.data.registros);
					this.setState({
						dataLugar: response.data.registros_usuarios,
						pagination
					});
				} else {
					this.setState({
						data: [],
					});
					message.error(response.message, 5);
				}
			} else {
				message.error("Por favor, controle que haya ingresado todos los datos para la busqueda.", 5);
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

	handleUsuarios = async (value) => {
		this.setState({
			mar: null,
		})
		if (value.trim().length >= 3) {
			try {
				this.setState({ fetchingUsuarios: true });
				const response = await api.usuarios.getAll(queryString.stringify({
					query: value.trim(),
				}))

				this.setState({
					autoCompleteUsuarios: response.data.usuarios ? response.data.usuarios.map((data, index) => {
						return {
							text: `${data.nombres} ${data.apellido}/email: ${data.correoelec} /cel: ${data.celular}`,
							value: data.id,
						}
					}) : [],
					fetchingUsuarios: false,
				});

			} catch (e) {
				message.error(e.toString(), 7);
			}
		} else if (value.trim().length === 0) {
			this.setState({ autoCompleteLugares: [] })
		}
	}

	async onSelectUsuario(e) {
		await this.setState({ idusuario: e })
	}
	async desdeUsuarios(e) {
		await this.setState({ desdeUsuarios: e })
	}
	async hastaUsuarios(e) {
		await this.setState({ hastaUsuarios:  e })
	}

	handleLugares = async (value) => {
		this.setState({
			mar: null,
		})
		if (value.trim().length >= 3) {
			try {
				this.setState({ fetchingLugares: true });
				const response = await api.lugares.getAll(queryString.stringify({
					query: value.trim(),
				}))

				this.setState({
					autoCompleteLugares: response.data.lugares ? response.data.lugares.map((data, index) => {
						return {
							text: `${data.nombrelugar}`,
							value: data.idlugar,
						}
					}) : [],
					fetchingLugares: false,
				});

			} catch (e) {
				message.error(e.toString(), 7);
			}
		} else if (value.trim().length === 0) {
			this.setState({ autoCompleteLugares: [] })
		}
	}

	async onSelectLugares(e) {
		await this.setState({ idusuario: e })
	}
	async desdeLugares(e) {
		await this.setState({ desdeLugares: e })
	}
	async hastaLugares(e) {
		await this.setState({ hastaLugares:  e })
	}

	pdfRegistroLugares = async () => {
		const file = await api.lugares.pdfRegistroLugares(this.state.idusuario, (queryString.stringify({
			tipo: 'lugares',
			desde: moment.parseZone(this.state.desdeLugares).format("YYYY-MM-DD hh:mm:ss"),
			hasta:moment.parseZone(this.state.hastaLugares).format("YYYY-MM-DD hh:mm:ss"),
			desdeMostrar: moment.parseZone(this.state.desdeLugares).format("DD/MM/YYYY"),
			hastaMostrar: moment.parseZone(this.state.hastaLugares).format("DD/MM/YYYY"),
		})), 'application/pdf');
		var fr = new FileReader();
		fr.readAsDataURL(file);
		var blob = new Blob([file], { type: "application/pdf" });
		var objectURL = window.URL.createObjectURL(blob);
		// eslint-disable-next-line
		var link = document.createElement('a');
		window.open(objectURL)
    }

	pdfRegistroUsuarios = async () => {
		const file = await api.usuarios.pdfRegistroUsuarios(this.state.idusuario, (queryString.stringify({
			tipo: 'usuarios',
			desde: moment.parseZone(this.state.desdeUsuarios).format("YYYY/MM/DD hh:mm:ss"),
			hasta: moment.parseZone(this.state.hastaUsuarios).format("YYYY/MM/DD hh:mm:ss"),
			desdeMostrar: moment.parseZone(this.state.desdeUsuarios).format("DD/MM/YYYY"),
			hastaMostrar: moment.parseZone(this.state.hastaUsuarios).format("DD/MM/YYYY"),
		})), 'application/pdf');
		var fr = new FileReader();
		fr.readAsDataURL(file);
		var blob = new Blob([file], { type: "application/pdf" });
		var objectURL = window.URL.createObjectURL(blob);
		// eslint-disable-next-line
		var link = document.createElement('a');
		window.open(objectURL)
    }
	
	render() {
		let columns = [...this.state.columns];
		let columnsLugares = [...this.state.columnsLugares];
		const { fetchingUsuarios, autoCompleteUsuarios, fetchingLugares, autoCompleteLugares } = this.state;
		const usuariosOptions = autoCompleteUsuarios.map(data => (
			<AutoCompleteOption key={data.value}>{data.text.trim()}</AutoCompleteOption>
		));
		
		const lugaresOptions = autoCompleteLugares.map(data => (
			<AutoCompleteOption key={data.value}>{data.text.trim()}</AutoCompleteOption>
		));

		const hayRegistrosUsuarios = typeof this.state.data !== 'undefined' && this.state.data.length > 0
		const hayRegistrosLugares = typeof this.state.dataLugar !== 'undefined' && this.state.dataLugar.length > 0

		const noHayResultadosUsuarios = typeof this.state.data === 'undefined'
		const noHayResultadosLugares = typeof this.state.dataLugar === 'undefined'

		return (
            <div className="container-fluid no-breadcrumb">
				<QueueAnim type="bottom" className="ui-animate">
					<Breadcrumb>
						<Breadcrumb.Item>Inicio</Breadcrumb.Item>
						<Breadcrumb.Item>Registro covid</Breadcrumb.Item>
					</Breadcrumb>

					<div className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
						<div className="box-body">
							<Row >
								<Col style={{ float: 'left' }} sm={{ span: 12 }} xs={{ span: 24 }}>
									<h4 style={{ marginBottom: 15, display: 'inline-block' }}>Registro covid</h4>
								</Col>
							</Row>
							<Tabs defaultActiveKey="1">
								<Tabs.TabPane key="1" tab="Usuarios">
								{hayRegistrosUsuarios &&
									<Row>
										<Col style={{ float: 'right' }}>
											<Button
												type="primary"
												icon={<PrinterOutlined />}
												onClick={() => this.pdfRegistroUsuarios()}
											>
												Imprimir
											</Button>
										</Col>
									</Row>
								}
									<Row gutter={8}>
										<Col span={2} style={{ marginTop: 3 }}>Usuario: </Col>
										<Col span={12}>
											<AutoComplete
												dataSource={usuariosOptions}
												onChange={this.handleUsuarios}
												onSelect={(e) => this.onSelectUsuario(e)}
												notFoundContent={fetchingUsuarios ? <Spin size="small" /> : null}
												style={{ width: '100%' }}
											>
												<Input
													style={{ width: '100%', display: 'inline-block' }}
													placeholder="Usuario..."
												/>
											</AutoComplete>
										</Col>
									</Row>
									<br />
									<Row gutter={8}>
										<Col span={2} style={{ marginTop: 3 }} >Desde: </Col>
										<Col span={5}>
											<DatePicker onChange={(e)=>this.desdeUsuarios(e)} format="DD/MM/YY" style={{ width: '100%' }} />
										</Col>
										<Col span={2} style={{ marginTop: 3 }}>Hasta: </Col>
										<Col span={5}>
											<DatePicker onChange={(e)=>this.hastaUsuarios(e)} format="DD/MM/YY" style={{ width: '100%' }} />
										</Col>
									</Row>
									<Row>
										<Col span={24}>
											<Button
												type="primary"
												icon={<SearchOutlined />}
												style={{ margin: 10, float: 'right' }}
												onClick={() => this.filtrarUsuarios()}
											>
												Filtrar
											</Button>
										</Col>
									</Row>
									{hayRegistrosUsuarios &&
										<Table
											bordered={false}
											components={this.components}
											columns={columns}
											rowKey={(record, index) => index}
											dataSource={this.state.data && this.state.data}
											pagination={this.state.pagination}
											onChange={this.handleTableChange}
											rowClassName={(record, index) => record.estado === "B" ? 'deleteRow' : ''}
										/>
									}
									{noHayResultadosUsuarios &&
										<Result
											status="404"
											title="No se han encontrado resultados"
										/>
									}
								</Tabs.TabPane>
								<Tabs.TabPane key="2" tab="Lugares">
								{hayRegistrosLugares &&
									<Row>
										<Col style={{ float: 'right' }}>
											<Button
												type="primary"
												icon={<PrinterOutlined />}
												onClick={() => this.pdfRegistroLugares()}
											>
												Imprimir
											</Button>
										</Col>
									</Row>
								}
									<Row gutter={8}>
										<Col span={2} style={{ marginTop: 3 }}>Lugar: </Col>
										<Col span={12}>
											<AutoComplete
												dataSource={lugaresOptions}
												onChange={this.handleLugares}
												onSelect={(e) => this.onSelectLugares(e)}
												notFoundContent={fetchingLugares ? <Spin size="small" /> : null}
												style={{ width: '100%' }}
											>
												<Input
													style={{ width: '100%', display: 'inline-block' }}
													placeholder="Lugar..."
												/>
											</AutoComplete>
										</Col>
									</Row>
									<br />
									<Row gutter={8}>
										<Col span={2} style={{ marginTop: 3 }}  >Desde: </Col>
										<Col span={5}>
											<DatePicker onChange={(e)=>this.desdeLugares(e)} format="DD/MM/YY" style={{ width: '100%' }} />
										</Col>
										<Col span={2} style={{ marginTop: 3 }}>Hasta: </Col>
										<Col span={5}>
											<DatePicker onChange={(e)=>this.hastaLugares(e)} format="DD/MM/YY" style={{ width: '100%' }} />
										</Col>
									</Row>
									<Row>
										<Col span={24}>
											<Button
												type="primary"
												icon={<SearchOutlined />}
												style={{ margin: 10, float: 'right' }}
												onClick={() => this.filtrarLugares()}
											>
												Filtrar
											</Button>
										</Col>
									</Row>
									{hayRegistrosLugares &&
										<Table
										bordered={false}
										components={this.components}
										columns={columnsLugares}
										rowKey={(record, index) => index}
										dataSource={this.state.dataLugar && this.state.dataLugar}
										pagination={this.state.pagination}
										onChange={this.handleTableChange}
										rowClassName={(record, index) => record.estado === "B" ? 'deleteRow' : ''}
									/>
									}
									{noHayResultadosLugares &&
										<Result
											status="404"
											title="No se han encontrado resultados"
										/>
									}
								</Tabs.TabPane>
							</Tabs>
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

export default connect(
	mapStateToProps
)(Vehiculos);
