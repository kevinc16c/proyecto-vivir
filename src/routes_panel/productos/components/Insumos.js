import React from 'react';
import { api } from '../api';
import { connect } from 'react-redux';
import { message, Form, Row, Col, Button, Modal, Table } from 'antd';
import queryString from 'query-string';
import AgregarInsumos from './AgregarInsumos';

class Redes extends React.Component {

    state = {
        disabledLogin: false,
        confirmLoading: false,
        totalDataSize: 10000,
        flag: true,
        pagination: { showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'] },
        columns: [
            {
                title: 'Descripción',
                dataIndex: 'dinsuprodu',
                sorter: true,
                key: 'dinsuprodu',
                width: 300,
            },
        ],
    }

    async componentDidMount() {
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
            const response = await api.insumos.getAll(this.props.id, queryString.stringify({
                ...params,
                query: this.state.q
            }))
            const pagination = { ...this.state.pagination };
            if (response.status === "success") {
                pagination.total = parseInt(response.data.registros);
                this.setState({
                    data: response.data.insumos,
                    cntRegistros: response.data.registros,
                    pagination
                })
            }

            const responseProductos = await api.productos.get(this.props.id)
            if (responseProductos.status === "success") {
                this.setState({
                    agregados: responseProductos.data.producto.agregados
                });
            }
        } catch (e) {
            message.error(e.toString(), 7);
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <Button type="primary" style={{ float: 'right', margin:10 }} onClick={() => this.setState({openAgregarInsumos: true})}>
                            Agregar
                        </Button>
                    </Col>
                </Row>
                <Table
                    bordered={false}
                    components={this.components}
                    columns={this.state.columns}
                    rowKey={(record, index) => index}
                    dataSource={this.state.data && this.state.data}
                    pagination={this.state.pagination}
                    // loading={this.state.loading}
                    onChange={this.handleTableChange}
                rowClassName={(record, index) => record.estado === "B" ? 'deleteRow' : ''}
                />
                {this.state.openAgregarInsumos &&
                    <AgregarInsumos
                        closeModal={() => {
                            this.setState({ openAgregarInsumos: false });
                            this.fetch({
                                limite: 10,
                                pagina: 1,
                            });
                        }}
                        data={this.state.registro}
                    />
                }
                {this.state.openAgregarInsumos &&
					<AgregarInsumos
						closeModal={() => {
							this.setState({ openAgregarInsumos: false });
							this.fetch({
								limite: 10,
								pagina: 1,
							});
                        }}
                        idproducto={this.props.id}
                        data={this.state.data}
					/>
				}
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const WrappedRedes = Form.create()(Redes);

export default connect(
    mapStateToProps,
)(WrappedRedes);