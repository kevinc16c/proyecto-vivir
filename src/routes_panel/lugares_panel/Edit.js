import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { message, Modal, Form, Button, Row, Divider, Icon, Col } from 'antd';
import {config} from '../../config';

class Editar extends React.Component {

    state = {
        confirmLoading: false,
        totalDataSize: 10000,
    }

    async componentDidMount() {
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })
                    const response = await api.rubros.update({
                        ...values,
                        id: this.props.data ? this.props.data.id : null
                    });
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

    imprimir = async () => {
		const file = await api.lugares.pdf(this.props.idlugar, 'application/pdf');
		var fr = new FileReader();
		fr.readAsDataURL(file);
		var blob = new Blob([file], { type: "application/pdf" });
		var objectURL = window.URL.createObjectURL(blob);
		// eslint-disable-next-line
		var link = document.createElement('a');
		window.open(objectURL)
    }
    
    handleImageErrored = async () => {
        await this.setState({ imageStatus: 'failed' });
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
                                <img onError={this.handleImageErrored.bind(this)} src={config.URL_IMG + `/img/lugares/qr/${this.props.idlugar}.png`} class="img-fluid" alt="resp-imagen"/>
                            </Col>
                        </Row>
                        <Divider/>
                        <Row gutter={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Col span={7}>
                                <Button
                                    onClick={this.props.closeModal}
                                    loading={this.state.loading}
                                    type="danger"
                                >
                                    Cancelar
                            </Button>
                            </Col>
                            <Col span={4}>
                                <Button
                                    onClick={()=>this.imprimir()}
                                    loading={this.state.loading}
                                >
                                    Imprimir <Icon type="printer" />
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

const WrappedEditar = Form.create()(Editar);

export default connect(
    mapStateToProps,
)(WrappedEditar);