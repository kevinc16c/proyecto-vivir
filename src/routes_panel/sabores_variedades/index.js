import React from 'react';
import { connect } from 'react-redux';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
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
import queryString from 'query-string';
import { api } from './api';
import Nuevo from './Nuevo';
import Edit from './Edit';
import './styless.scss';

class Sabores_Variedades extends React.Component {

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
					title: 'Descripción',
					dataIndex: 'descripcion',
					sorter: true,
					key: 'descripcion',
					width: 300,
				},
				{
					title: 'Acción',
					key: 'action',
					width: 10,
					align: 'center',
					render: (text, record) => {
						return (
                            <Dropdown trigger={['click']} overlay={
								<Menu>
									<Menu.Item key="1" onClick={() => this.setState({ openEditar: true, registro: record })}><EditOutlined style={{ color: '#grey' }} />Editar</Menu.Item>
									<Menu.Item key="3" onClick={() => this.showDeleteConfirm(record.id)}><DeleteOutlined style={{ color: 'red' }} />Eliminar</Menu.Item>
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
							onChange={(e) => this.onChangeSuspenderHabilitar(e, record.id, index)}
						/>
					}
				},
			],
		}
	}

	showDeleteConfirm = async (id) => {
		const _this = this;
		Modal.confirm({
			title: '¿Está seguro de que desea borrar?',
			okText: 'Aceptar',
			okType: 'danger',
			cancelText: 'Cancelar',
			async onOk() {
				let response = await api.insumos.delete(id);
				if (response.status === "success") {
					message.info("¡El registro se ha eliminado exitosamente!", 3);
					_this.fetch();
				} else {
					message.error("Error  " + response.message, 7);
				}
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}

	onChangeSuspenderHabilitar = async (e, id) => {
		const data = this.state.data
		for (let i = 0; i < data.length; i++) {
			if (data[i].id === id) {
				if (e === true) {
					const responseAgotado = await api.suspender.get(id ? parseInt(id) : null);
					if (responseAgotado.status === "success") {
						message.success(responseAgotado.message)
					}
				}
				if (e === false) {
					const responseEnStock = await api.habilitar.get(id ? parseInt(id) : null);
					if (responseEnStock.status === "success") {
						message.success(responseEnStock.message)
					}
				}
			}
		}
		await this.setState({ data: this.state.data })
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
			title: '¿Está seguro que desea dar de baja?',
			okText: 'Aceptar',
			okType: 'danger',
			cancelText: 'Cancelar',
			async onOk() {
				const response = await api.insumos.baja(record);
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
				const response = await api.insumos.habilitar(record);
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

			// Todos los insumos del lugar
			const response = await api.insumos.getAll(parseInt(sessionStorage.getItem('lugar_id')), queryString.stringify({
				...params,
				query: this.state.q
			}))

			const pagination = { ...this.state.pagination };
			if (response.status === "success") {
				pagination.total = parseInt(response.data.registros);
				this.setState({
					data: response.data.insumos,
					pagination,
					loading: false,
				});
			} else {
				this.setState({
					data: [],
					loading: false,
				});
				message.error(response.message, 5);
			}
			// Lugares del propietario
			const responseLugares = await api.lugares.get(this.props.user && this.props.user.id)
			if (responseLugares.status === "success") {
				const i = responseLugares.data.lugares.findIndex(item => item.idlugar === parseInt(sessionStorage.getItem('lugar_id')))
				this.setState({ nombrelugar: responseLugares.data.lugares[i].nombrelugar });
			}
		} catch (e) {
			this.setState({
				data: [],
				loading: false,
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
						<Breadcrumb.Item>Sabores / variedades / agregados</Breadcrumb.Item>
					</Breadcrumb>

					<div className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
						<div className="box-body">
							<Row >
								<Col style={{ float: 'left' }} sm={{ span: 12 }} xs={{ span: 24 }}>
									<h4 style={{ marginBottom: 15, display: 'inline-block' }}>{this.state.nombrelugar && 'Sabores / variedades / agregados - ' + this.state.nombrelugar}</h4>
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
								loading={this.state.loading}
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
						idlugar={sessionStorage.getItem('lugar_id')}
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
)(Sabores_Variedades);
