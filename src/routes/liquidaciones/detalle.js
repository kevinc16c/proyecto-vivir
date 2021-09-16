import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { message, Table, Card, Divider, PageHeader, Modal, Form, Row, Col, Button } from 'antd';
import './styles.scss'
import QueueAnim from 'rc-queue-anim';
import moment from 'moment';
import { utils } from 'utils';

class Detalle extends React.Component {
    constructor(props) {
        super(props)
        this._nodes = new Map();
    }

    _isMounted = false;

    state = {
        activeKey: "1",
        disabledLogin: false,
        confirmLoading: false,
        cheques: [],
        valores: [],
        comprobantes: [],
        totalimporte: 0,
        disabledSig: true,
        autoCompleteClientes: [],
        autoCompleteClientesOrigen: [],
        cobrado: 0,
        tot: 0,
        totales: [],
        columns: [
            {
                title: 'N°',
                dataIndex: 'id',
                width: 50,
            },
            {
                title: 'Fecha',
                dataIndex: 'fechaalta',
                width: 80,
                render: (col, row) => moment.parseZone(row.fechaalta).format("DD/MM/YYYY")
            },
            {
                title: 'Retiro',
                dataIndex: 'tipo_retiro.tipo',
                key: 'tipo_retiro.tipo',
                width: 200,
                render: (text, record) => record.tipo_retiro ? record.tipo_retiro.tipo : '',
            },
            {
                title: 'Importe',
                dataIndex: 'importe',
                width: 140,
                align: 'right',
                render: (text, record) => utils.currency(record.importe),
            },
            {
                title: 'Importe Comis.',
                dataIndex: 'impcomision',
                width: 140,
                align: 'right',
                render: (text, record) => utils.currency(record.impcomision),
            },
            {
                title: 'Total',
                dataIndex: 'impneto',
                width: 140,
                align: 'right',
                render: (text, record) => utils.currency(record.impneto),
            },],
    }

    componentWillUnmount() {
        this._isMounted = false;

    }
    async componentDidMount() {
        this._isMounted = true;
        this.fetch()
    }

    fetch = async () => {
        var totales = []
        try {
            const response = await api.liquidacion.get(this.props.match.params.id)
            if (response.status === "success") {
                this.setState({
                    data: response.data,
                    pedidos: response.data.liquidacion ? response.data.liquidacion.pedidos : [],
                });
                totales.push({
                    totalcreditos: response.data.creditos,
                    totaldebitos: response.data.debitos,
                    saldocomprobantes: response.data.impfaclqfl,
                    totalvales: response.data.impadelqfl,
                    totalpagado: response.data.itotallqfl,
                })
                this.setState({ totales: totales })
            } else {
                this.setState({
                    fpago: [],
                });
                message.error(response.message, 5);
            }
        } catch (e) {
            this.setState({
                fpago: [],
            });
            message.error(e.toString(), 5);
        } finally {
            var tot = 0
            this.state.valores && this.state.valores.forEach(data => {
                tot += parseFloat(data.importetot)
            })
            this.setState({ totalimporte: tot })
        }
    }

    sumarTotal() {
        var cob1 = 0;
        for (var i = 0; i < this.state.comprobantes.length; i++) {
            if (typeof this.state.comprobantes[i].impagoctcl !== "undefined") {
                if (this.state.comprobantes[i].ticompctcl === "FACTURA" || this.state.comprobantes[i].ticompctcl === "NOTA DE DEBITO" || this.state.comprobantes[i].ticompctcl === "FACTURA MIPYMES" || this.state.comprobantes[i].ticompctcl === "NOTA DEBITO MIPYMES") {
                    cob1 += parseFloat(this.state.comprobantes[i].impagoctcl);
                } else {
                    cob1 -= parseFloat(this.state.comprobantes[i].impagoctcl);
                }
            }
        }
        this.setState({ cobrado: cob1 })
    }
    imprimir = async () => {
        const file = await api.liquidaciones_fleteros.imprimir(this.props.match.params.id, 'application/pdf');
        var fr = new FileReader();
        fr.readAsDataURL(file);
        var blob = new Blob([file], { type: "application/pdf" });
        var objectURL = window.URL.createObjectURL(blob);
        // eslint-disable-next-line
        var link = document.createElement('a');
        window.open(objectURL)
    }

    showDelete = async (record) => {
        const _this = this;
        Modal.confirm({
            title: '¿Esta seguro que desea eliminar liquidación?',
            okText: 'Aceptar',
            okType: 'danger',
            cancelText: 'Cancelar',
            async onOk() {
                const response = await api.liquidacion.baja({ id: _this.props.match.params.id });
                if (response.status === "success") {
                    _this.props.history.push("/app/liquidaciones")
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        let columns = [...this.state.columns];
        return (
            <div className="container-fluid no-breadcrumb">
                <QueueAnim type="bottom" className="ui-animate">
                    <div className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
                        <div className="box-header">
                            <PageHeader
                                title={`Liquidación N°: ${this.props.match.params.id}`}
                                extra={[
                                    <Button type="danger" onClick={() => { this.showDelete() }} icon="delete">
                                        Eliminar
                                    </Button>,
                                    <Button onClick={() => { this.imprimir() }}>
                                        <i className="fas fa-print" style={{ marginTop: 5, marginRight: 5 }}></i>
                                        Imprimir
                                    </Button>
                                ]}
                            />
                            <Divider />
                        </div>
                        <div className="box-body" style={{ paddingTop: 0 }}>
                            <Form>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Col span={24}>
                                            <label>Lugar</label>
                                        </Col>
                                        <Divider />
                                        <Col span={24}>
                                            <label>Nombre:  </label><b>{this.state.data && this.state.data.liquidacion ? this.state.data.liquidacion.lugar.nombrelugar : ""}</b>
                                        </Col>
                                        <Col span={24}>
                                            <label>Dirección:  </label><b>{this.state.data && this.state.data.liquidacion ? this.state.data.liquidacion.lugar.direccion : ""}</b>
                                        </Col>
                                        <Col span={24}>
                                            <label>Propietario:  </label><b>{this.state.data && this.state.data.liquidacion ? this.state.data.liquidacion.lugar.propietario.razonsocial : ""}</b>
                                        </Col>
                                        <Col span={24}>
                                            <label>Fecha liquidación:  </label><b>{this.state.data && this.state.data.liquidacion ? moment.parseZone(this.state.data.liquidacion.fecha).format("DD/MM/YYYY") : ""}</b>
                                        </Col>
                                    </Col>
                                    <Col span={12}>
                                        <Card className="card" style={{ width: 400, float: 'right' }}>
                                            <div className="row">
                                                <div className="col-7">
                                                    <label className="alineado" style={{float:'right', fontSize:'16px'}}>Comisión Efectivo: $ </label>
                                                </div>
                                                <div className="col-5">
                                                    <label className="alineado" style={{float:'right', fontSize:'16px',}}><b>0.00</b></label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-7">
                                                    <label className="alineado" style={{float:'right', fontSize:'16px'}}>Comisión Mercado Pago: $</label>
                                                </div>
                                                <div className="col-5">
                                                    <label className="alineado" style={{float:'right', fontSize:'16px',}}><b>0.00</b></label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-7">
                                                    <label className="alineado" style={{float:'right', fontSize:'16px'}}>A cobrar: $</label>
                                                </div>
                                                <div className="col-5">
                                                    <label className="alineado" style={{float:'right', fontSize:'16px',}}><b>0.00</b></label>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                            </Form>

                            <br />
                            <Col span={24}>
                                <h4 style={{ fontWeight: 'bold' }}>Pedidos</h4>
                            </Col>
                            <Col span={24}>
                                <Table
                                    pagination={false}
                                    columns={columns}
                                    rowKey={(record, index) => index}
                                    dataSource={this.state.pedidos}
                                    loading={this.state.loading}
                                    onChange={this.handleTableChange}
                                />
                            </Col>
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