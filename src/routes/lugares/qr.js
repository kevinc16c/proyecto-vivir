import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { PrinterOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Button, Row, Divider, Col } from 'antd';
import { config } from '../../config';

class QR extends React.Component {

    state = {
        confirmLoading: false,
        totalDataSize: 10000,
    }

    async componentDidMount() {
    }

    imprimirQR = async () => {
		const file  = await api.lugares.ImprimirQr(this.props.idlugar)
        var fr = new FileReader();
        fr.readAsDataURL(file);
        var blob = new Blob([file], { type: "application/pdf" });
        var objectURL = window.URL.createObjectURL(blob);
		window.open(objectURL)
	}
    render() {
        return (
            <Modal
                visible={true}
                confirmLoading={this.state.confirmLoading}
                footer={false}
                width={400}
            >
                <section className="form-v1-container col-md-12">
                    <h4 style={{ marginBottom: 15 }}>QR</h4>
                    <Divider />
                    <Form style={{ marginTop: 10 }}>
                        <Row gutter={8} >
                            <Col sm={{ span: 24 }} xs={{ span: 24 }}>

                                <img src={config.URL_IMG + `/img/lugares/qr/${this.props.idlugar}.png`} className="img-fluid" alt="res-imagen" />

                            </Col>
                        </Row>
                        <Divider />
                        <Row gutter={8} style={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}>
                            <Col span={7}>
                                <Button
                                    onClick={this.props.closeModal}
                                    loading={this.state.loading}
                                    type="danger"
                                >
                                    Cerrar
                                </Button>
                            </Col>
                            <Col span={4}>
                                <Button
                                    onClick={()=>this.imprimirQR()}
                                    loading={this.state.loading}
                                >
                                    Imprimir <PrinterOutlined />
                                </Button>
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

const WrappedQR = Form.create()(QR);

export default connect(
    mapStateToProps,
)(WrappedQR);