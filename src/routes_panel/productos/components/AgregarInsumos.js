import React from 'react';
import { api } from '../api';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Modal, Row, Col, Divider, Table } from 'antd';
import _ from 'lodash';
import queryString from 'query-string';

class AgregarInsumo extends React.Component {

    state = {
        disabledLogin: false,
        confirmLoading: false,
        totalDataSize: 10000,
        selectedRowKeys: [],
        propsData: [],

        columns: [
            {
                title: 'Descripción',
                dataIndex: 'descripcion',
                // sorter: true,
                key: 'descripcion',
                width: 100,
            },
        ],
    }

    async componentDidMount() {
        this.fetch({
            limite: 1000,
            pagina: 1,
        });
    }

    fetch = async (params = {}) => {
        try {
            // Todos los insumos del lugar
            const response = await api.insumos.getAllAgregar(parseInt(sessionStorage.getItem('lugar_id')), queryString.stringify({
                ...params,
                query: this.state.q
            }))
            const pagination = { ...this.state.pagination };
            if (response.status === "success") {
                pagination.total = parseInt(response.data.registros);
                this.setState({
                    data: response.data.insumos,
                    pagination
                });

                var idinsumo = []
                if (this.props.data && this.state.data) {
                    for (let i = 0; i < this.props.data.length; i++) {
                        idinsumo.push(this.props.data[i].idinsumo)
                    }
                    var indices = []
                    for (let i = 0; i < this.state.data.length; i++) {
                        var index = _.findIndex(this.state.data, ["id", idinsumo[i]])
                        indices.push(index)
                    }
                    var length = this.props.data.length
                    indices = indices.slice(0, length)
                }

                await this.setState({
                    selectedRowKeys: indices
                })

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

    async onSelectCategoria(e) {
        await this.setState({ idrubro: e })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.datos) {
            this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    try {
                        this.setState({
                            confirmLoading: true,
                        })
                        const response = await api.productos.setInsumos(this.props.idproducto, this.state.datos);
                        if (response.status === "success") {
                            this.props.closeModal();
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
            })
        }

    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        var newdata = [];
        selectedRows.forEach(data => {
            newdata.push({
                idproducto: parseInt(this.props.idproducto),
                idinsumo: data.id,
                dinsuprodu: data.descripcion,
            })
        })
        this.setState({ selectedRowKeys, selectedRows, datos: newdata })
    };

    render() {
        let columns = [...this.state.columns];
        const { selectedRowKeys } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            columnWidth: '1%'
        };
        return (
            <Modal
                visible={true}
                confirmLoading={this.state.confirmLoading}
                onOk={this.handleSubmit}
                onCancel={this.props.closeModal}
                cancelText="Cancelar"
                okText="Agregar"
                width={650}
            >
                <section className="form-v1-container col-md-12">
                    <h4 style={{ marginBottom: 15 }} className="pb-4">Agregar</h4>
                    <Divider />
                    <Form style={{ marginTop: 10 }}>
                        <Row gutter={8} >
                            <Col span={24}>
                                <Table
                                    bordered={false}
                                    components={this.components}
                                    columns={columns}
                                    rowKey={(record, index) => index}
                                    dataSource={this.state.data && this.state.data}
                                    pagination={false}
                                    loading={this.state.loading}
                                    onChange={this.handleTableChange}
                                    rowSelection={rowSelection}
                                    scroll={{ y: 500 }}
                                />
                            </Col>
                        </Row>
                    </Form>
                </section>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const WrappedAgregarInsumo = Form.create()(AgregarInsumo);

export default connect(
    mapStateToProps,
)(WrappedAgregarInsumo);