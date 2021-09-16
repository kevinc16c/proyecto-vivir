import React from 'react';
import { connect } from 'react-redux';
import { message, Switch, Modal, Col, Row, Icon, Spin, Button } from 'antd';
import './styless.scss';
import { api } from './api';
import Nuevo from './Nuevo';
import _ from 'lodash';
import Edit from './Edit';
import './styless.scss';
import { setLugar } from '../../actions/lugar';

class Lugares extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			q: '',
			searchText: '',
			data: [],
			loading: false,
			confirmLoading: false,
			openCambiarPass: false,
			openAsignarPass: false,
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
				const response = await api.lugares.baja(record);
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
				const response = await api.lugares.baja({ codigoempl: record.codigoempl });
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
				const response = await api.lugares.habilitar(record);
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
			this.setState({
				confirmLoading: true,
			})
			const response = await api.lugares.getLugar(this.props.match.params.id)
			const pagination = { ...this.state.pagination };
			if (response.status === "success") {
				pagination.total = parseInt(response.data.registros);
				this.setState({
					data: response.data.lugares,
					pagination
				});
			} else {
				this.setState({
					data: [],
				});
				message.error(response.message, 5);
			}
		} catch (e) {
			message.error(e.toString(), 7);
		} finally {
			this.setState({
				confirmLoading: false,
			})
		}
	}

	Qr = async (idlugar) => {
		await this.setState({ openEditar: true, idlugar: idlugar })
	}

	onChange = async (checked) => {
		await this.setState({ abierto: checked })
	}

	onClick = async (e) => {
		await this.setState({
			lugarid: e,
		})

		if (this.state.abierto === true) {
			this.abierto()
		} else {
			this.cerrado()
		}
	}

	abierto = async (e) => {
		try {
			this.setState({
				confirmLoading: true,
			})
			const response = await api.lugares.abierto(parseInt(this.state.lugarid));
			if (response.status === "success") {
				message.success("¡El lugar ha sido abierto exitosamente!", 7);
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
	}

	cerrado = async () => {
		try {
			this.setState({
				confirmLoading: true,
			})
			const response = await api.lugares.cerrado(parseInt(this.state.lugarid));
			if (response.status === "success") {
				message.success("¡El lugar ha sido cerrado exitosamente!", 7);
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
	}

	onClickCard = async (e) => {
		const idlugar = _.find(this.state.data, ["idlugar", e]).idlugar
		this.props.history.push(`/panel/pedidos`)
		sessionStorage.setItem("lugar_id", idlugar);

		try {
			this.setState({
				confirmLoading: true,
			})
			if(sessionStorage.getItem('token_notification') && sessionStorage.getItem('token_notification').length > 0){
				const response = await api.lugares.sendToken({
					idlugar: parseInt(idlugar),
					token: sessionStorage.getItem('token_notification')
				});
				if (response.status === "success") {
				} else {
					message.error(response.message, 7);
				}
			}
		
		} catch (e) {
			message.error(e.toString(), 7);
		} finally {
			this.setState({
				confirmLoading: false,
			})
		}
	}

	render() {
		return (
			<div className="container-fluid no-breadcrumb">
				<Row >
					<Col style={{ float: 'left' }} sm={{ span: 12 }} xs={{ span: 24 }}>
						<h4 style={{ marginBottom: 15, display: 'inline-block' }}>{this.state.confirmLoading === false && 'Lugares'}</h4>
					</Col>
				</Row>
				{this.state.confirmLoading === true &&
					<Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
				}
				<div className="row">
					{this.state.data && this.state.data.map((data, i) => (
						<div className="col-md-4" style={{ paddingBottom: 10 }}>
							<div className="card " >
								<div className="card-body" >
									<div className="tipo-link" onClick={() => this.onClickCard(data.idlugar)}>
										<h5 className="card-title" style={{ fontSize: "21px", fontWeight: "500" }}>{data.nombrelugar}</h5>
										<h6 className="card-subtitle mb-2 text-muted" style={{ fontSize: "14px" }}> <b>Rubro: </b> {data.dsubrubro}</h6>
										<h6 className="card-subtitle mb-2 text-muted" style={{ fontSize: "14px" }}> <b>Dirección: </b>{data.direccion}</h6>
										<h6 className="card-subtitle mb-2 text-muted pb-5" style={{ fontSize: "14px" }}> <b>Localidad: </b>{data.nombrelocali}</h6>
									</div>
									<Button onClick={() => this.Qr(data.idlugar)} disabled={data.qrasignado === 1 ? false : true}>
										Imprimir QR <Icon type="qrcode" />
									</Button>
									<div style={{ float: "right" }}>
										<Switch
											checkedChildren="Abierto"
											unCheckedChildren="Cerrado"
											defaultChecked={data.activo === 1 ? true : 0}
											onChange={this.onChange}
											style={{ marginTop: "6px", marginLeft: "8px" }}
											onClick={() => this.onClick(data.idlugar)}
										/>
									</div >
								</div>
							</div>
						</div>
					))
					}
				</div>
				{this.state.openNuevo &&
					<Nuevo
						closeModal={() => {
							this.setState({ openNuevo: false });
							this.fetch({
								limite: 10,
								pagina: 1,
							});
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
						idlugar={this.state.idlugar}
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

const mapDispatchToProps = dispatch => ({
	handleSetLugar: (lugar) => {
		dispatch(setLugar(lugar));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lugares);
