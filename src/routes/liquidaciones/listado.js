import React from 'react';
import { connect } from 'react-redux';
import './styles.scss'
import { FilePdfTwoTone, FileTwoTone } from '@ant-design/icons';
import { message, Table, Breadcrumb, Input, Button, Row, Modal, Tooltip, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { Resizable } from 'react-resizable';
import queryString from 'query-string';
import { api } from './api';
import moment from 'moment'
import {utils} from 'utils'
const ResizeableTitle = (props) => {
	const { onResize, width, ...restProps } = props;

	if (!width) {
		return <th {...restProps} />;
	}

	return (
		<Resizable width={parseInt(width)} height={0} onResize={onResize}>
			<th {...restProps} />
		</Resizable>
	);
};

class Liquidaciones extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			q: '',
			searchText: '',
			data: [],
			pagination: { showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'] },
			loading: false,
			columns: [
				{
					title: 'ID',
					dataIndex: 'id',
					sorter: true,
					key: 'id',
					width: 50,
				},
				{
					title: 'Fecha',
					dataIndex: 'fecha',
					sorter: true,
					key: 'fecha',
					width: 50,
					render:(col,row)=> moment.parseZone(row.fecha).format("DD/MM/YYYY")
                },
				{
					title: 'Lugar',
					dataIndex: 'nombrelugar',
					sorter: true,
					key: 'nombrelugar',
					width: 150,
				},
				{
					title: 'Dirección',
					dataIndex: 'direccion',
					sorter: true,
					key: 'direccion',
					width: 150,
				},
				{
					title: 'Importe pedidos',
					dataIndex: 'totalbruto',
					align: 'right',
					key: 'totalbruto',
					width: 80,
					render:(col,row)=> `$ ${utils.currency(row.totalbruto)}`
				},
				{
					title: 'A cobrar',
					dataIndex: 'acobrar',
					align: 'right',
					key: 'acobrar',
					width: 70,
					render:(col,row)=> `$ ${utils.currency(row.acobrar)}`
				},
				{
					title: '',
					key: 'baja',
					width: 10,
					render: (text, record) => {
						return (
                            <div>
								<Col span={12} >
									<Tooltip title="Ver detalle">
										<FileTwoTone
                                            twoToneColor="#0063c7"
                                            style={{marginRight:4, fontSize:18 }}
                                            onClick={()=>{this.props.history.push(`/admin/liquidaciones/${record.id}`)}} />
									</Tooltip>
								</Col>
								<Col span={12}>
									<Tooltip title="Imprimir comprobante">
										<FilePdfTwoTone
                                            twoToneColor="#d10000"
                                            style={{marginLeft:4, fontSize:18}}
                                            onClick={()=>this.imprimir(record.numerolqfl)} />
									</Tooltip>
								</Col>
							</div>
                        );
					},
				}
			],
			columnsCon: [
				{
					title: 'Fecha',
					dataIndex: 'fecha_comp',
					sorter: true,
					key: 'fecha_comp',
					width: 50,
				},
				{
					title: 'Comprobante',
					dataIndex: 'numer_comp',
					sorter: true,
					key: 'numer_comp',
					width: 200,
					render:(col, row)=>`${row.tipo_comp} ${row.letra_comp} ${row.numer_comp}`
				},
				{
					title: 'Cliente',
					dataIndex: 'nomb_clien',
					sorter: true,
					key: 'nomb_clien',
					width: 200,
				},
				{
					title: 'Total',
					dataIndex: 'total_fact',
					sorter: true,
					align: 'right',
					key: 'total_fact',
					width: 70,
					render:(col,row)=> `$ ${utils.currency(row.total_fact)}`
				},
				{
					title: '',
					key: 'baja',
					width: 10,
					render: (text, record) => {
						return (
                            <div>
								<Col span={12} >
									<Tooltip title="Ver detalle">
										<FileTwoTone
                                            twoToneColor="#0063c7"
                                            style={{marginRight:4, fontSize:18 }}
                                            onClick={()=>{this.props.history.push(`/app/comprobantes/cliente/${record.id}`)}} />
									</Tooltip>
								</Col>
								<Col span={12}>
									<Tooltip title="Imprimir comprobante">
										<FilePdfTwoTone
                                            twoToneColor="#d10000"
                                            style={{marginLeft:4, fontSize:18}}
                                            onClick={()=>this.imprimir(record.id)} />
									</Tooltip>
								</Col>
							</div>
                        );
					},
				}
			],
		}
	}

	componentDidMount() {
		this.fetch({
			limite: 102,
			pagina:1,
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
				const response = await api.clientes.estado({ codigoclie: record.codigoclie, estado: "B" });
				_this.fetch();
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
				const response = await api.clientes.baja({ codigoclie: record.codigoclie });
				_this.fetch();
				if (response.status === "success") {
					message.success(response.message)
				}
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}

	showEstadoConfirm = async (record) => {
		const _this = this;
		Modal.confirm({
			title: '¿Esta seguro que desea dar de alta?',
			okText: 'Aceptar',
			okType: 'danger',
			cancelText: 'Cancelar',
			async onOk() {
				const response = await api.clientes.estado({ codigoclie: record.codigoclie, estado: "" });
				_this.fetch();
				if (response.status === "success") {
					message.success(response.message)
				}
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}

	components = {
		header: {
			cell: ResizeableTitle,
		},
	}

	handleResize = index => (e, { size }) => {
		this.setState(({ columns }) => {
			const nextColumns = [...columns];
			nextColumns[index] = {
				...nextColumns[index],
				width: size.width,
			};
			return { columns: nextColumns };
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
		this.setState({ loading: true });
		try {
			const response = await api.liquidacion.getAll(queryString.stringify({
				...params,
				query: this.state.q,
			}))
			const pagination = { ...this.state.pagination };
			if (response.status === "success") {
				pagination.total = response.data.registros;
				this.setState({
					data: response.data.liquidaciones,
					loading: false,
					pagination
				})
			} else {
				message.error(response.message, 5);
			}
		} catch (e) {
			this.setState({
				loading: false,
				data: [],
			});
			message.error(e.toString(), 5);
		}
	}

	imprimir = async (id) => {
        const file = await api.liquidaciones_fleteros.imprimir(id, 'application/pdf');
        var fr = new FileReader();
        fr.readAsDataURL(file);
        var blob = new Blob([file], { type: "application/pdf" });
        var objectURL = window.URL.createObjectURL(blob);
        // eslint-disable-next-line
        var link = document.createElement('a');
        window.open(objectURL)
    }

	handleSearch = (selectedKeys, confirm) => {
		confirm();
		this.setState({ searchText: selectedKeys[0] });
	}

	handleReset = (clearFilters) => {
		clearFilters();
		this.setState({ searchText: '' });
	}

	search = (text) => {
		this.setState({ q: text }, () => {
			this.fetch({pagina:1, limite:10});
		})
	}

	render() {
		let columns = [...this.state.columns];
		columns = columns.map((col, index) => ({
			...col,
			onHeaderCell: column => ({
				width: column.width,
			}),
		}));

		return (
			<div className="container-fluid no-breadcrumb">
				<QueueAnim type="bottom" className="ui-animate">
					<Breadcrumb>
						<Breadcrumb.Item>Inicio</Breadcrumb.Item>
						<Breadcrumb.Item>Liquidaciones</Breadcrumb.Item>
					</Breadcrumb>

					<div className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
						<div className="box-body">
							<Row>
								<Col span={12}>
								<h4 style={{ marginBottom: 15, display: 'inline-block' }}>Liquidaciones</h4>
								</Col>
								<Col span={12}>
									<Button 
									type="primary" 
									style={{float:'right'}}
									onClick={()=>{this.props.history.push("/admin/liquidar")}}>
										Liquidar
									</Button>
								</Col>
							</Row>
							<Input.Search
								placeholder="Buscar..."
								onSearch={value => this.search(value)}
								style={{ width: 400, marginTop: 0, float: 'right', display: 'inline-block' }}
							/>
							<Table
								bordered={false}
								components={this.components}
								columns={columns}
								rowKey={(record, index) => index}
								dataSource={this.state.data}
								pagination={this.state.pagination}
								loading={this.state.loading}
								onChange={this.handleTableChange}
								rowClassName={(record, index) => record.baja ? 'deleteRow' : ''}
								onRow={(record, rowIndex) => {
									return {
										onDoubleClick: (e) => {this.props.history.push("/admin/liquidaciones/"+record.id)},
									};
								}}
							/>
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
)(Liquidaciones);