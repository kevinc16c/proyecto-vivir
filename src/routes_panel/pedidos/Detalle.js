import React from 'react';
import { connect } from 'react-redux';
import { message, Table, Breadcrumb, Input, Select, Modal, Col, Row, Form, Divider, Tag } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { api } from './api';
import moment from 'moment';
import { utils } from 'utils';
import _ from 'lodash';
import './styless.scss';
const FormItem = Form.Item;

const Option = Select.Option;
class Detalle extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			q: '',
			pedido: [],
			totalDataSize: 100,
			pagination: { showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'] },
			loading: false,
			columns: [
				{
					title: 'Producto',
					dataIndex: 'direccion',
					// sorter: true,
					key: 'direccion',
					width: 200,
					render: (text, record) => `${record.producto.descriprod}`
				},
				{
					title: 'Variedad',
					dataIndex: 'descvariedad',
					// sorter: true,
					key: 'descvariedad',
					width: 200,
					render: (text, record) => `${record.descvariedad}`
				},
				{
					title: 'Cantidad',
					dataIndex: 'cantidad',
					// sorter: true,
					key: 'cantidad',
					width: 200,
					align: 'right',
					render: (text, record) => `${record.cantidad}`
				},
				{
					title: 'Precio unitario',
					dataIndex: 'punitario',
					// sorter: true,
					align: 'right',
					key: 'punitario',
					width: 200,
					render: (text, record) => `$ ${utils.currency(record.punitario)}`
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
			this.setState({loading: true});

			const response = await api.pedidos.get(parseInt(this.props.match.params.id))
			const pagination = { ...this.state.pagination };
			if (response.status === "success") {
				this.setState({
					pedido: response.data.pedido,
					loading: false,
					pagination
				});
				
				const response1 = await api.pedidos.estados(parseInt(this.state.pedido.idestado))
				const idestado = parseInt(this.state.pedido && this.state.pedido.idestado)
				if (response1.status === "success") {
					this.setState({
						estados: response1.data.estados,
						estadoActual:  _.find(response1.data.estados_lista, ["id", idestado]).estado,
						loading: false,
						pagination
					});
				}

				const response2 = await api.pedidos.estadosSegunAnterior(parseInt(this.state.pedido.idestado))
				if (response2.status === "success") {
					this.setState({
						estados: response2.data.estados,
						loading: false,
						pagination
					});
				}

				const response3 = await api.tiposDelivery.getAll()
					console.log(response3)
				if (response3.status === "success") {
					this.setState({
						tiposDelivery: response3.data.tiposDelivery,
						loading: false,
					});
				}
				console.log(this.state.tiposDelivery)

			} else {
				this.setState({
					pedido: [],
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

	cambiarEstado = (e) => {
		const _this = this;
		Modal.confirm({
			title: '¿Está seguro de que desea cambiar el estado?',
			okText: 'Aceptar',
			okType: 'danger',
			cancelText: 'Cancelar',
			async onOk() {
						const response = await api.pedidos.cambiarEstado({
							idpedido: parseInt(_this.props.match.params.id),
							idestado: e,
						});
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

    onSelectCambiarDelivery = async e => {
        try {
            this.setState({ loading: true });

            const response = await api.tiposDelivery.update({
                idpedido: parseInt(this.props.match.params.id),
                idtipodelivery: e
            });
            if (response.status !== "success") {
                message.error(response.message, 7);
            }
        } catch (e) {
            message.error(e.toString(), 7);
        } finally {
            this.setState({  loading: false });
        }
    };

	render() {
		const { getFieldDecorator } = this.props.form;
		let columns = [...this.state.columns];
		const id_user = this.props.user && this.props.user.id;

		return (
			<div className="container-fluid no-breadcrumb">
				<QueueAnim type="bottom" className="ui-animate">
					<Breadcrumb>
						<Breadcrumb.Item href={"#/panel/lugares/" + id_user}>Lugares</Breadcrumb.Item>
						<Breadcrumb.Item href="#/panel/pedidos">Pedidos</Breadcrumb.Item>
						<Breadcrumb.Item>Detalle</Breadcrumb.Item>
					</Breadcrumb>
					<div className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
						<div className="box-body">
							<Row >
							<Col span={14}>									
								<h4 style={{ marginBottom: 15, display: 'inline-block' }}>{this.state.pedido && this.state.pedido.lugar && 'Pedidos - ' + this.state.pedido.lugar.nombrelugar}</h4>
							</Col>
							<Col span={10} >	
								<Row gutter={8} style={{ float: "right"}}>
                                    {getFieldDecorator('estados', {
                                        initialValue: 'Cambiar estado',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Select
                                            placeholder="Provincia"
                                            optionFilterProp="children"
											showSearch
											onChange={(e)=>this.cambiarEstado(e)}
											style={{width: 230}}
											dropdownRender={menu => (
												<div>
													{menu}
													<Divider style={{ margin: '4px 0' }} />
													<div
														style={{ padding: '4px 8px', cursor: 'pointer' }}
													>
														Estado actual: <b>{this.state.pedido && this.state.pedido.estado && this.state.pedido.estado.estado}</b>
													</div>
												</div>
											)}
                                            filterOption={(input, option) =>
                                                option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                            }
                                        >
                                            {this.state.estados && this.state.estados.map((data, index) => {
                                                return <Option value={data.idestado} key={index}>{data.estado}</Option>
                                            })}
                                        </Select>
                                    )}
                        		</Row>
							</Col>
						</Row>
							<Row gutter={16} className="pt-2">
								<Col span={12}>
									<p>
										Número de pedido: <b>{this.state.pedido ? this.state.pedido.id : ''}</b><br />
										Cliente: <b>{this.state.pedido && this.state.pedido.usuario ? this.state.pedido.usuario.nombres +" "+  this.state.pedido.usuario.apellido : ''}</b><br />
										Dirección de destino: <b>{this.state.pedido ? this.state.pedido.direccion : ''}</b><br />
										Fecha: <b>{this.state.pedido ? moment.parseZone(this.state.pedido.fechaalta).format("DD-MM-YYYY") : ''}</b><br /> 
									</p>
									<Row gutter={8}>
                                        <Col span={24}>
                                            <FormItem label="Observación" {...{
                                                labelCol: { sm: { span: 4 }, },
                                                wrapperCol: { sm: { span: 16 }, },
                                            }}>
                                                {getFieldDecorator('observaciones', {
                                                    initialValue: this.state.pedido && this.state.pedido.observaciones,
                                                })(
                                                    //selector
                                                    <Input.TextArea disabled={true}/>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
								</Col>
								<Col span={12}>
									<p>			
										Estado actual: <Tag
										color={
											this.state.pedido && this.state.pedido.idestado === 1 ? "" : 			// Recibido
											this.state.pedido && this.state.pedido.idestado === 2 ? "green" :		// Aceptado
											this.state.pedido && this.state.pedido.idestado === 3 ? "orange" :		// En preparación
											this.state.pedido && this.state.pedido.idestado === 4 ? "volcano" :		// En camino
											this.state.pedido && this.state.pedido.idestado === 5 ? "gold" : 		// Entregado
											this.state.pedido && this.state.pedido.idestado === 6 ? "red" :			// Cancelado
											this.state.pedido && this.state.pedido.idestado === 7 ? "lime" :		// Rechazado
										""}
										>
											{this.state.estadoActual}
										</Tag><br />					
										Tipo de retiro: <b>{this.state.pedido && this.state.pedido.tipo_retiro ? this.state.pedido.tipo_retiro.tipo : ''}</b><br />
										Tipo de delivery: {getFieldDecorator('id', {
												initialValue: this.state.pedido && this.state.pedido.tipo_delivery ? this.state.pedido.tipo_delivery.id : '' ,
											})(
												<Select
													placeholder="Tipo de delivery"
													optionFilterProp="children"
													showSearch
													loading={this.state.loading}
													onSelect={(e)=>this.onSelectCambiarDelivery(e)}
													style={{width: '40%'}}
													filterOption={(input, option) =>
														option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
													}
												>
													{this.state.tiposDelivery && this.state.tiposDelivery.map((data, index) => {
														// console.log(this.state.tiposDelivery)
														return <Option value={data.id} key={index}>{data.tipodelivery}</Option>
													})}
												</Select>
											)} <br />
									
										Tipo de Pago: <b>{this.state.pedido ? this.state.pedido.idtipopago === 1 ? 'Efectivo' : 'Online' : ''}</b><br />
										Costo de Delivery: <b>{this.state.pedido && !isNaN(this.state.pedido.impodelivery) ? '$ ' + utils.currency(this.state.pedido.impodelivery) : ''}</b><br /> 
										Total: <b> {this.state.pedido && !isNaN(this.state.pedido.importe) ? '$ ' + utils.currency(this.state.pedido.importe) : ''}</b><br /> 
									</p>
								</Col>
							</Row>
							<Table
								bordered={false}
								components={this.components}
								columns={columns}
								scroll={{ y: 240 }}
								rowKey={(record, index) => index}
								dataSource={this.state.pedido && this.state.pedido.detalle}
								pagination={false}
								loading={this.state.loading}
								onChange={this.handleTableChange}
								rowClassName={(record, index) => record.estado === "B" ? 'deleteRow' : ''}
								// onRow={(record, rowIndex) => {
								// 	if (record.estado !== "B") {
								// 		return {
								// 			onDoubleClick: (e) => {
								// 				this.setState({ registro: record })
								// 				this.props.history.push(`/panel/pedidos/detalle/${record.id}`)
								// 			},
								// 		};
								// 	}
								// }}
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

const WrappedDetalle = Form.create()(Detalle);

export default connect(
    mapStateToProps,
)(WrappedDetalle);
