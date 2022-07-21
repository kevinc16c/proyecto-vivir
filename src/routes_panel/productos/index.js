import React from 'react';
import { connect } from 'react-redux';
import {
    CheckCircleOutlined,
    EditOutlined,
    EllipsisOutlined,
    PlusOutlined,
    StopOutlined,
} from '@ant-design/icons';
import {
    message,
    Table,
    Breadcrumb,
    Input,
    Button,
    Dropdown,
    Menu,
    Modal,
    Col,
    Row,
    Switch,
} from 'antd';
import QueueAnim from 'rc-queue-anim';
import { api } from './api';
import Nuevo from './Nuevo';
import './styless.scss';
import queryString from 'query-string';

class Productos extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			q: '',
			searchText: '',
			data: [],
			totalDataSize: 100,
			pagination: { showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'] },
			loading: false,
			columns: [
				{
					title: 'ID',
					dataIndex: 'id',
					sorter: true,
					key: 'id',
					width: '5%',
				},
				{
					title: 'Nombre',
					dataIndex: 'descriprod',
					sorter: true,
					key: 'descriprod',
					width: 200,
				},
				{
					title: 'Categoría',
					dataIndex: 'descricatprod',
					sorter: true,
					key: 'descricatprod',
					width: 200,
				},
				{
					title: 'Acción',
					key: 'action',
					width: 30,
					align: 'center',
					render: (text, record) => {
						return (
                            <Dropdown trigger={['click']} overlay={
								<Menu>
									{record.estado !== "B" &&
										<Menu.Item key="1" onClick={() => this.props.history.push({
											pathname: `/panel/productos/editar/${record.id}`,
											search: '',
											data: record,
											idrubro: this.props.location.idrubro,
										})}><EditOutlined style={{ color: '#grey' }} />Editar
									</Menu.Item>
									}
									{
										record.estado === "B"
											?
											<Menu.Item key="2" onClick={() => this.showHabilitar(record.id)}><CheckCircleOutlined style={{ color: '#73d13d' }} />Alta</Menu.Item>
											:
											<Menu.Item key="4" onClick={() => this.showEstadoBaja(record.id)}><StopOutlined style={{ color: 'red' }} />Baja</Menu.Item>
									}
								</Menu>
							}>
								<Button size="small">
									<EllipsisOutlined />
								</Button>
							</Dropdown>
                        );
					},
				},
				{
					title: 'Suspendido',
					key: 'suspendido',
					width: 50,
					align: 'center',
					render: (text, record, index) => {
						return <Switch
							disabled={record.estado === 'B' && true}
							defaultChecked={record.suspendido === 1 ? true : false}
							onChange={(e) => this.onChangeSuspender(e, record.id, index)}
						/>
					}
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

	onChangeSuspender = async (e, id) => {
		const data = this.state.data
		for (let i = 0; i < data.length; i++) {
			if (data[i].id === id) {
				if (e === true) {
					const responseAgotado = await api.stockAgotado.get(id ? parseInt(id) : null);
					if (responseAgotado.status === "success") {
						message.success(responseAgotado.message)
					}
				}
				if (e === false) {
					const responseEnStock = await api.enStock.get(id ? parseInt(id) : null);
					if (responseEnStock.status === "success") {
						message.success(responseEnStock.message)
					}
				}
			}
		}
		await this.setState({ data: this.state.data })
	}

	showHabilitar = async (record) => {
		const _this = this;
		Modal.confirm({
			title: '¿Está seguro que desea habilitar?',
			okText: 'Aceptar',
			okType: 'danger',
			cancelText: 'Cancelar',
			async onOk() {
				const response = await api.productos.habilitar(record);
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

	showEstadoBaja = async (record) => {
		const _this = this;
		Modal.confirm({
			title: '¿Esta seguro que desea dar de baja?',
			okText: 'Aceptar',
			okType: 'danger',
			cancelText: 'Cancelar',
			async onOk() {
				const response = await api.productos.baja(record);
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

	showEstadoBaja = async (record) => {
		const _this = this;
		Modal.confirm({
			title: '¿Está seguro que desea dar de baja?',
			okText: 'Aceptar',
			okType: 'danger',
			cancelText: 'Cancelar',
			async onOk() {
				const response = await api.productos.baja(record);
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
			this.setState({
				loading: true
			});

			const response = await api.productos.getAll(parseInt(sessionStorage.getItem('lugar_id')), queryString.stringify({
				...params,
				query: this.state.q
			}))

			const pagination = { ...this.state.pagination };
			if (response.status === "success") {
				pagination.total = parseInt(response.data.registros);
				this.setState({
					data: response.data.productos,
					loading: false,
					pagination
				});

				// Lugares del propietario
				const responseLugares = await api.lugares.get(this.props.user && this.props.user.id)

				if (responseLugares.status === "success") {
					const i = responseLugares.data.lugares.findIndex(item => item.idlugar === parseInt(sessionStorage.getItem('lugar_id')))
					this.setState({nombrelugar: responseLugares.data.lugares[i].nombrelugar});
				}


			} else {
				this.setState({
					data: [],
					loading: false,
				});
				message.error(response.message, 5);
			}
		} catch (e) {
			this.setState({
				data: [],
				loading: false
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
		const id_user = this.props.user && this.props.user.id;

		return (
            <div className="container-fluid no-breadcrumb">
				<QueueAnim type="bottom" className="ui-animate">
					<Breadcrumb>
						<Breadcrumb.Item href={"#/panel/lugares/" + id_user}>Lugares</Breadcrumb.Item>
						<Breadcrumb.Item>Productos</Breadcrumb.Item>
					</Breadcrumb>
					<div className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
						<div className="box-body">
							<Row >
								<Col style={{ float: 'left' }} sm={{ span: 12 }} xs={{ span: 24 }}> 
									<h4 style={{ marginBottom: 15, display: 'inline-block' }}>{this.state.nombrelugar && 'Productos - ' + this.state.nombrelugar}</h4>
								</Col>
								<Col style={{ float: 'right' }} sm={{ span: 12 }} xs={{ span: 24 }}>
									<Button
										type="primary"
										icon={<PlusOutlined />}
										onClick={() => this.setState({ openNuevo: true })}
										style={{ float: 'right'}}
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
								loading={this.state.loading}
								onChange={this.handleTableChange}
								rowClassName={(record, index) => record.estado === "B" ? 'deleteRow' : ''}
								onRow={(record, rowIndex) => {
									if (record.estado !== "B") {
										return {
											onDoubleClick: (e) => {
												this.setState({ registro: record})
												this.props.history.push(`/panel/productos/editar/${record.id}`)
											},
										};
									}
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
						data={this.state.data}
						idlugar={sessionStorage.getItem('lugar_id')}
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
)(Productos);
