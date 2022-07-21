import React from 'react';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Table, Breadcrumb, Input, Tag, Select, Modal, Col, Row } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { api } from './api';
import moment from 'moment';
import { utils } from 'utils';
import './styless.scss';
import queryString from 'query-string';
const Option = Select.Option;

class Pedidos extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			q: '',
			searchText: '',
			data: [],
			totalDataSize: 100,
			pagination: { showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'] },
			loading: false,
			idEstado: 1,
			columns: [
				{
					title: 'Fecha',
					dataIndex: 'fechaalta',
					sorter: true,
					key: 'fecha',
					width: 100,
					render: (text, record) => moment.parseZone(record.fechaalta).format("DD-MM-YYYY")
				},
				{
					title: 'Apellido y nombre',
					dataIndex: 'nombres, apellido',
					sorter: true,
					key: 'nombres',
					width: 150,
					render: (text, record) => `${record.usuario.nombres + " " + record.usuario.apellido}`
				},
				{
					title: 'Tipo de retiro',
					dataIndex: 'tipo_retiro.tipo',
					sorter: true,
					key: 'tipo',
					width: 150,
					render: (text, record) => `${record.tipo_retiro.tipo}`
				},
				{
					title: 'Delivery',
					dataIndex: 'tipo_delivery.tipodelivery',
					sorter: true,
					key: 'tipo',
					width: 100,
					render: (text, record) => `${record.tipo_delivery.tipodelivery}`
				},
				{
					title: 'Destino',
					dataIndex: 'direccion',
					sorter: true,
					key: 'direccion',
					width: 100,
				},
				{
					title: 'Pago',
					dataIndex: 'tipo_pago.pago',
					sorter: true,
					key: 'pago',
					width: 100,
					render: (text, record) => `${record.idtipopago === 1 ? 'Efectivo' : 'Online'}`
				},
				{
					title: 'Total',
					dataIndex: 'importe',
					sorter: true,
					key: 'importe',
					align: 'right',
					width: 100,
					render: (text, record) => `$ ${utils.currency(record.importe)}`,
				},
				{
					title: 'Estado',
					dataIndex: 'estado',
					key: 'estado',
					width: 100,
					render: (text, record) =>
						<Tag
							color={
								record.idestado === 1 ? "" : 			// Recibido
									record.idestado === 2 ? "green" :		// Aceptado
										record.idestado === 3 ? "orange" :		// En preparación
											record.idestado === 4 ? "volcano" :		// En camino
												record.idestado === 5 ? "gold" : 		// Entregado
													record.idestado === 6 ? "red" :			// Cancelado
														record.idestado === 7 ? "lime" :		// Rechazado
															""}
						>
							{record.estado.estado}
						</Tag>
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

	showHabilitar = async (record) => {
		const _this = this;
		Modal.confirm({
			title: '¿Está seguro que desea habilitar?',
			okText: 'Aceptar',
			okType: 'danger',
			cancelText: 'Cancelar',
			async onOk() {
				const response = await api.pedidos.habilitar(record);
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
				const response = await api.pedidos.baja(record);
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
				const response = await api.pedidos.baja(record);
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
			this.setState({ loading: true });

			const response = await api.pedidos.estados()
			if (response.status === "success") {
				this.setState({
					estados: response.data.estados_lista,
				});
			}

			const response1 = await api.pedidos.getAll(parseInt(sessionStorage.getItem('lugar_id')), this.state.idEstado, queryString.stringify({
				...params,
				query: this.state.q,
			}))
			const pagination = { ...this.state.pagination };
			if (response1.status === "success") {
				pagination.total = parseInt(response1.data.registros);
				this.setState({
					data: response1.data.pedidos,
					loading: false,
					pagination
				});

				// Lugares del propietario
				const response2 = await api.lugares.get(this.props.user && this.props.user.id)
				if (response2.status === "success") {
					// var nombrelugar = _.find(response2.data.lugares, ["idlugar", parseInt(this.props.match.params.id)]).nombrelugar
					const i = response2.data.lugares.findIndex(item => item.idlugar === parseInt(sessionStorage.getItem('lugar_id')))
					this.setState({ nombrelugar: response2.data.lugares[i] && response2.data.lugares[i].nombrelugar });
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

	cambiarEstado = async (e) => {
		this.setState({ idEstado: e }, () => {
			this.fetch({
				limite: 10,
				pagina: 1,
			});
		})
	}

	render() {

		const { getFieldDecorator } = this.props.form;
		let columns = [...this.state.columns];
		const id_user = this.props.user && this.props.user.id;

		return (
			<div className="container-fluid no-breadcrumb">
				<QueueAnim type="bottom" className="ui-animate">
					<Breadcrumb>
						<Breadcrumb.Item href={"#/panel/lugares/" + id_user}>Lugares</Breadcrumb.Item>
						<Breadcrumb.Item>Pedidos</Breadcrumb.Item>
					</Breadcrumb>
					<div className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
						<div className="box-body">
							<Row >
								<Col style={{ float: 'left' }} sm={{ span: 12 }} xs={{ span: 24 }}>
									<h4 style={{ marginBottom: 15, display: 'inline-block' }}>{this.state.nombrelugar && 'Pedidos - ' + this.state.nombrelugar}</h4>
								</Col>
							</Row>
							<Row >
								<Col style={{ float: 'left' }} sm={{ span: 12 }} xs={{ span: 24 }}>
									{getFieldDecorator('estados', {
										initialValue: this.state.estados && this.state.estados[0].id,
										rules: [{ required: true, message: "Este campo es obligatorio." }],
									})(
										<Select
											placeholder="Estados"
											optionFilterProp="children"
											showSearch
											onChange={(e) => this.cambiarEstado(e)}
											style={{ width: 230 }}
											filterOption={(input, option) =>
												option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
											}
										>
											{this.state.estados && this.state.estados.map((data, index) => {
												return <Option value={data.id} key={index}>{data.estado}</Option>
											})}
										</Select>
									)}
								</Col>
								<Col style={{ float: 'right' }} sm={{ span: 12 }} xs={{ span: 24 }}>
									<Input.Search
										placeholder="Buscar..."
										onSearch={value => this.search(value)}
										style={{ marginBottom: 10, marginTop: 0, display: 'inline-block', float: 'right', width: '65%' }}
									/>
								</Col>
							</Row>
							<Table
								bordered={false}
								components={this.components}
								columns={columns}
								rowKey={(record, index) => index}
								dataSource={this.state.data && this.state.data}
								pagination={false}
								scroll={{ y: 400 }}
								loading={this.state.loading}
								onChange={this.handleTableChange}
								rowClassName={(record, index) => record.estado === "B" ? 'deleteRow' : ''}
								onRow={(record, rowIndex) => {
									if (record.estado !== "B") {
										return {
											onDoubleClick: (e) => {
												this.setState({ registro: record })
												this.props.history.push(`/panel/pedidos/detalle/${record.id}`)
											},
										};
									}
								}}
							/>
						</div>
					</div>
				</QueueAnim>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
});

const WrappedPedidos = Form.create()(Pedidos);

export default connect(
	mapStateToProps,
)(WrappedPedidos);
