import React from 'react';
import { connect } from 'react-redux';
import { DollarOutlined, InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
    message,
    Table,
    Breadcrumb,
    Input,
    Button,
    AutoComplete,
    Spin,
    Modal,
    Col,
    Row,
    PageHeader,
    Divider,
    DatePicker,
    Statistic,
} from 'antd';
import QueueAnim from 'rc-queue-anim';
import queryString from 'query-string';
import { api } from './api';
import moment from 'moment';
import { utils } from 'utils';
const AutoCompleteOption = AutoComplete.Option;
const FormItem = Form.Item;

class Viajes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			q: '',
			current: 0,
			loading2: false,
			searchText: '',
			activeKey: '1',
			data: [],
			acancelar: 0,
			data1: [],
			comprobantes: [],
			cheques: [],
			chequesT: [],
			adelantos: [],
			datos: 0,
			impcomisionMP: 0,
			totalfactura: 0,
			importecomision:0,
			totalDataSize: 100,
			totaladelantos: 0,
			totalpedido: 0,
			apagar: 0,
			autoCompleteClientes: [],
			disabledTab: true,
			selectedRowKeys: [],
			idpedidos:[],
			loading: false,
			autoCompleteClientesOrigen: [],
			pagination: { showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'] },
			columns: [
				{
					title: 'Fecha',
					dataIndex: 'fechaalta',
					width: 100,
					render: (text, record) => text !== "" ? moment.parseZone(record.fechaalta).format("DD/MM/YYYY") : "",
				},
				{
					title: 'Concepto',
					dataIndex: 'observaciones',
					width: 200,
				},
				{
					title: 'Neto',
					dataIndex: 'impneto',
					width: 100,
					align: 'right',
					render: (text, record) => utils.currency(record.impneto),
				},
				{
					title: 'Comisión',
					dataIndex: 'impcomision',
					width: 100,
					align: 'right',
					render: (text, record) => utils.currency(record.impcomision),
				},
				{
					title: 'Importe',
					dataIndex: 'importe',
					width: 100,
					align: 'right',
					render: (text, record) => utils.currency(record.importe),
				},
			],
		}
	}

	componentDidMount() {
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

			const responseIVA = await api.alicuotas.getAll(queryString.stringify({
				...params,
			}))
			if (responseIVA.status === "success") {
				this.setState({
					alicuotas: responseIVA.data.alicuotas,
				});
			} else {
				this.setState({
					alicuotas: [],
				});
				message.error(responseIVA.message, 5);
			}

			const responsefpago = await api.fpago.getAll(queryString.stringify({
				query: this.state.q
			}))
			if (responsefpago.status === "success") {
				this.setState({
					fpago: responsefpago.data.formasPago,
				});
			} else {
				this.setState({
					fpago: [],
				});
				message.error(responsefpago.message, 5);
			}

			const responseCuentas = await api.cuentas_bancarias.getAll(queryString.stringify({
				limite: 1000,
			}))
			if (responseCuentas.status === "success") {
				this.setState({
					bancos: responseCuentas.data.cuentas,
					totalDataSize: responseCuentas.data.registros,
				});
			}
		} catch (e) {
			this.setState({
				alicuotas: [],
			});
			message.error(e.toString(), 5);
		}
	}

	cargarfpago = async (id) => {
		this.state.fpago.forEach(data => {
			if (id === data.codigofpag) {
				this.setState({ formapago: data })
			}
		})
	}

	search = (text) => {

		this.setState({ q: text }, () => {
			this.fetch();
		})

	}

	handleClienteOrigen = async (value) => {

		this.setState({
			cliente_origen: null,
			datos: 0,
		})
		if (value.trim().length >= 2) {
			try {
				this.setState({ fetchingOrigen: true });
				const response = await api.lugares.getLista(queryString.stringify({
					query: value.trim(),
				}))

				this.setState({
					autoCompleteClientesOrigen: response.data.lugares ? response.data.lugares.forEach(data => {
						return {
							text: `${data.nombrelugar}`,
							value: data.idlugar,
						}
					}) : [],
					fetchingOrigen: false,
				});

			} catch (e) {
				message.error(e.toString(), 7);
			}
		} else if (value.trim().length === 0) {
			this.setState({ autoCompleteClientesOrigen: [] })
		}
	}

	onSelectCliente = async (e) => {
		this.setState({ id: e, datos: 1 })
		try {
			const response = await api.lugares.getLugar(e)
			if (response.status === "success") {
				this.setState({ lugar: response.data.lugar })
			}
		} catch (error) {
			message.error(error)
		}
	}

	onSelectChange = (selectedRowKeys) => {
		this.setState({ selectedRowKeys });
		var impcomision = 0
		var impcomisionMP = 0
		var total = 0
		var ids = []
		var totalpedido = 0
		selectedRowKeys.forEach(data => {
			ids.push({
				id: data.id
			})
			if(data.idtipopago === 1){
				impcomision = impcomision + parseFloat(data.impcomision)
			}else{
				impcomisionMP = impcomisionMP + parseFloat(data.impcomision)
			}
			totalpedido = data.importe
		})
		total = impcomisionMP + impcomision
		this.setState({ total: total, importecomision: impcomision, impcomisionMP: impcomisionMP, idpedidos: ids, totalpedido: totalpedido })
	};

	async llenar() {
		this.setState({
			loading: true,
			data: [],
			selectedRowKeys: [],
			totalfactura: 0,
			totaladelantos: 0,
			apagar: 0,
			totaldebitos: 0,
			totalcreditos: 0,
		})
		if (typeof this.state.id !== "undefined" && this.state.desde && this.state.hasta) {
			let response = await api.pedidos.pendientesLiquidacion(this.state.id, queryString.stringify({
				desde:moment.parseZone(this.state.desde).format("YYYY-MM-DD"),
				hasta:moment.parseZone(this.state.hasta).format("YYYY-MM-DD"),
			}))
			if(response.status === "success"){
				this.setState({
					data:response.data.liquidar,
				})
			}
		} else {
			this.setState({ loading: false })
			message.error('Recuerde que debe seleccionar un LUGAR y las fechas DESDE y HASTA')
		}
		this.setState({ disabledTab: false, loading: false, })
	}

	handleApagar = () => {
		var comprobantes = this.state.totalfactura
		var adelantos = this.state.totaladelantos
		var apagar = 0

		apagar = comprobantes - adelantos

		this.setState({ apagar: apagar })
	}


	iva = async (e) => {
		var iva = 0.00
		var total = 0.00
		var importeiva = 0.00
		this.state.alicuotas.forEach(data => {
			if (data.codigoalic === e) {
				iva = parseFloat(data.alicuoalic)
				this.setState({ alicuota: data })
			}
		})
		total = (parseFloat(this.state.netogravado) * (1 + (iva / 100)))
		importeiva = total - this.state.netogravado
		this.setState({ totalfactura: total, iva: importeiva, selectiva: e })
		this.props.form.setFieldsValue({
			importeiva: parseFloat(importeiva).toFixed(2)
		})
	}

	calculos = async (e, tipo) => {
		const netoviajes = this.state.neto
		var porcentajecomision = 0
		var netogravado = 0
		if (tipo === "porcomisviaj") {
			porcentajecomision = netoviajes * (e / 100)
			netogravado = netoviajes - porcentajecomision
			this.props.form.setFieldsValue({
				porcecomis: e,
				importecomis: parseFloat(porcentajecomision).toFixed(2),
				netogravado: parseFloat(netogravado).toFixed(2)
			})
			this.setState({ netogravado: netogravado, porcecomis: e, importecomis: parseFloat(porcentajecomision) })
		}

	}
	comprobante = async (e) => {
		this.state.comprobantes.forEach(data => {
			if (data.codigocomp === e) {
				this.setState({ comp: data, })
			}
		})

	}

	modalConfirm = () => {
		const _this = this
		Modal.confirm({
			title: 'Atención',
			content: '¿Emitir liquidación?',
			okText: 'Emitir',
			icon: <InfoCircleOutlined />,
			cancelText: 'Cancelar',
			async onOk() {
				_this.props.form.setFieldsValue({
					controltotal: parseFloat(_this.state.apagar),
				}, () => { _this.facturar(); })
			},
		});
	}

	facturar = async (e) => {
		this.props.form.validateFields(['fecha_lqfl'], async (err, values) => {
			if (this.state.selectedRowKeys.length !== 0) {
				try {
					this.setState({
						confirmLoading: true,
					})

					const response = await api.liquidacion.create({
						idlugar:parseInt(this.state.id),
						fecha:moment.parseZone(moment.now()).format("YYYY-MM-DDTHH:mm:ssZ"),
						vencimiento:"2021-03-08T17:31:49Z",
						observacion:values.cucobservacion,
						totalbruto:this.state.totalpedido,
						comisefvo:this.state.importecomision,
						comismpgo:this.state.impcomisionMP,
						acobrar:this.state.importecomision,
						pedidos:this.state.idpedidos
					})
					if (response.status === "success") {
						message.success("Pedidos liquidados con éxito")
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
			} else {
				message.error("Debe seleccionar uno o más viajes")
			}
		})
	}

	next() {
		const current = this.state.current + 1;
		this.setState({ current });
		if (current === 1) {
			this.setState({
				acancelar: this.state.acancelar !== 0 ? this.state.acancelar : this.state.apagar,
			})
		}
	}
	

	importetotal = () => {
		var importe = 0.00
		var dif = 0.00
		this.state.data1.forEach((data) => {
			importe = (importe + parseFloat(data.importetot))
		})
		if (this.state.acancelar <= this.state.apagar) {
			dif = this.state.apagar - importe
		}
		this.setState({ totalimporte: importe, acancelar: dif })
	}

	handleAgregar = async () => {
		this.props.form.validateFields(['codforpago', 'num_cupon', 'importetot'], (err, values) => {
			if (!err) {
				try {
					this.state.data1.push({
						codforpago: this.state.formapago.codigofpag,
						desforpago: this.state.formapago.descrifpag,
						num_cupon: values.num_cupon,
						importetot: values.importetot,
						tipo: "",
					})
				} catch (error) {
					message.error(error)
				} finally {
					this.props.form.setFieldsValue({
						codforpago: '',
						num_cupon: '',
						importetot: '',
					})
					this.importetotal()
				}
			}
		})
	}

	borrar = (row, index) => {
		var newdata = []
		var newcheque = []
		var rowSelection2 = []
		var importe = 0
		var dif = 0.00
		var chequesTerceros = this.state.chequesT
		try {
			this.state.data1.forEach((data, i) => {
				if (i !== index) {
					newdata.push(data)
				}
			})
			this.setState({ data1: newdata })
			newdata.forEach(data => {
				importe = importe + data.importetot
			})

			if (this.state.acancelar <= this.state.apagar) {
				dif = this.state.apagar - importe
			}
			this.setState({ totalimporte: importe, acancelar: dif })


			if (row.tipo !== "T") {
				const found = this.state.cheques.findIndex(item => row.num_cupon === `${item.nombco_cp}-${item.nuseri_cp}-${item.numero_cp}`);
				if (found >= 0) {
					this.state.cheques.forEach((data, indes) => {
						if (found !== indes) {
							newcheque.push(data)
						}
					})
					this.setState({ cheques: newcheque })
				}
			} else {
				this.setState({ loading2: true, chequesT: [] });
				const found = this.state.chequesT.findIndex(item => row.num_cupon === `${item.nombco_ct}-${item.nuseri_ct}-${item.numero_ct}`);
				this.state.chequesT.forEach((data, indes) => {
					if (found !== indes) {
						rowSelection2.push(data)
					}
				})
				setTimeout(() => {
					this.setState({
						selectedRowKeys2: rowSelection2,
						loading2: false,
						chequesT: chequesTerceros
					});
				}, 700);
			}
		} catch (error) {
			message.error(error)
		}
	}


	async desde(e) {
		await this.setState({ desde: moment.parseZone(e).format("YYYY-MM-DD hh:mm:ss") })
	}
	async hasta(e) {
		await this.setState({ hasta: moment.parseZone(e).format("YYYY-MM-DD hh:mm:ss") })
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const {  selectedRowKeys, fetchingOrigen, autoCompleteClientesOrigen } = this.state;
		const clientesOrigenOptions = autoCompleteClientesOrigen.forEach(data => (
			<AutoCompleteOption key={data.value}>{data.text.trim()}</AutoCompleteOption>
		));
		let columns = [...this.state.columns];
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};
		return (
            <div className="container-fluid no-breadcrumb">
				<QueueAnim type="bottom" className="ui-animate">
					<Breadcrumb>
						<Breadcrumb.Item>Inicio</Breadcrumb.Item>
						<Breadcrumb.Item href="#/admin/liquidaciones">Liquidaciones</Breadcrumb.Item>
					</Breadcrumb>
					<div className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
						<div className="box-body">
							<Row gutter={16}>
								<PageHeader
									title="Liquidación"
								/>
							</Row>
							<Divider />
							<Row gutter={16}>
								<Col span={12}>
									<FormItem label="Lugar:"   {...{
										labelCol: { sm: { span: 3 }, },
										wrapperCol: { sm: { span: 21 }, },
									}}>
										<AutoComplete
											dataSource={clientesOrigenOptions}
											onChange={this.handleClienteOrigen}
											style={{ width: '100%' }}
											onSelect={(e) => this.onSelectCliente(e)}
											notFoundContent={fetchingOrigen ? <Spin size="small" /> : null}
										>
											<Input style={{ width: '100%' }} />
										</AutoComplete>
									</FormItem>
								</Col>
							</Row>
							<Row gutter={8}>
								<Col span={6}>
									<FormItem label="Desde:"   {...{
										labelCol: { sm: { span: 6 }, },
										wrapperCol: { sm: { span: 18 }, },
									}}>
										<DatePicker onChange={(e) => this.desde(e)} style={{ width: '100%' }} format="DD/MM/YYYY" />
									</FormItem>
								</Col>
								<Col span={6}>
									<FormItem label="Hasta:"   {...{
										labelCol: { sm: { span: 6 }, },
										wrapperCol: { sm: { span: 18 }, },
									}}>
										<DatePicker onChange={(e) => this.hasta(e)} style={{ width: '100%' }} format="DD/MM/YYYY" />
									</FormItem>
								</Col>
								<Col span={12}>
									<Button type="default"
										style={{ marginTop: 5, float: 'left' }}
										loading={this.state.loading}
										onClick={() => this.llenar()}
									><SearchOutlined />
										Buscar
									</Button>
								</Col>
							</Row>
							<Divider />
							<Row gutter={16}>
								<Col span={11}>
									<Col span={24}>
										<label>Domicilio:  </label><b>{this.state.lugar && this.state.lugar ? `${this.state.lugar.direccion}` : ""}</b>
									</Col>
									<Col span={24}>
										<label>Localidad:  </label><b>{this.state.lugar && this.state.lugar ? `${this.state.lugar.nombrelocali} - ${this.state.lugar.nombrepcia}` : ""}</b>
									</Col>
									<Col span={24}>
										<label>Tel/Cel:  </label><b>{this.state.lugar && this.state.lugar ? `${this.state.lugar.telefono !== '' ? this.state.lugar.telefono : '  -'} / ${this.state.lugar.celular}` : ""}</b>
									</Col>
								</Col>
								<Col span={2}>
									<Col span={24}>
										<h3 style={{ fontStyle: 'bold' }}>{this.state.letra ? this.state.letra : ''}</h3>
									</Col>

								</Col>
								<Col span={11}>
									<Row gutter={8}>
										<Col span={24}>
											<FormItem label="Fecha" {...{
												labelCol: { sm: { span: 6 }, },
												wrapperCol: { sm: { span: 18 }, },
											}}>
												{getFieldDecorator('fecha_lqfl', {
													initialValue: moment().startOf('day'),
													rules: [{ required: true, message: 'Este campo es requerido' }],
												})(
													<DatePicker style={{ width: '80%' }}
														format="DD/MM/YYYY"
													/>
												)}
											</FormItem>
										</Col>
									</Row>
									<Row gutter={8}>
										<Col span={24}>
											<FormItem label="Observación" {...{
												labelCol: { sm: { span: 6 }, },
												wrapperCol: { sm: { span: 18 }, },
											}}>
												{getFieldDecorator('observacion', {
													initialValue: '',
													rules: [{ required: false, message: '' }],
												})(
													<Input.TextArea rows={3} placeholder="Observación"/>
												)}
											</FormItem>
										</Col>
									</Row>
								</Col>
							</Row>
							<Row gutter={8}>
								<Col span={8}>
									<Statistic
										style={{ float: "right", textAlign: 'right', }}
										title="Total comisiones"
										value={utils.currency(this.state.total ? parseFloat(this.state.total) : 0)}
										prefix={<DollarOutlined style={{ marginRight: 15, color: '#00800d' }} />} />
								</Col>
								<Col span={8}>
									<Statistic
										style={{ float: "right", textAlign: 'right', }}
										title="Comisión MercadoPago"
										value={utils.currency(this.state.impcomisionMP ? parseFloat(this.state.impcomisionMP) : 0)}
										prefix={<DollarOutlined style={{ marginRight: 15, color: '#0b00a6' }} />} />
								</Col>
								<Col span={8}>
									<Statistic
										style={{ float: "right", textAlign: 'right', fontWeight: 'bold', color: '#bf0d00' }}
										title="Comisiones efectivo"
										value={utils.currency(this.state.importecomision)}
										prefix={<DollarOutlined style={{ marginRight: 15, color: '#bf0d00' }} />} />
								</Col>
							</Row>
							<Divider />

							<br />
							<div>
								<Row gutter={16}>
									<Col span={24}>
										<h4 style={{ fontWeight: 'bold' }}>Comprobantes</h4>
									</Col>
									<Col span={24}>
										<Table
											pagination={false}
											columns={columns}
											rowKey={(record, index) => record}
											dataSource={this.state.data}
											loading={this.state.loading}
											rowSelection={rowSelection}
										/>
									</Col>
								</Row>
							</div>

							<br />
							<div style={{ float: 'right' }}>
								<Button
									key="cargar"
									type="primary"
									disabled={this.state.id ? false : true}
									onClick={() => this.modalConfirm()}
									style={{ float: 'right', marginLeft: 10 }}
								>
									Finalizar
									</Button>
							</div>
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
const WrappedIndex = Form.create()(Viajes);

export default connect(
	mapStateToProps
)(WrappedIndex);