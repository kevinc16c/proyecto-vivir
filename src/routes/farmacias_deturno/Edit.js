import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { message, Form, Input, Row, Col, Modal, Divider, AutoComplete, Spin, DatePicker } from 'antd';
import queryString from 'query-string';
import moment from 'moment'
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;
class Editar extends React.Component {
    state = {
        confirmLoading: false,
        totalDataSize: 10000,
        autoCompleteLugares: [],
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
                    const response = await api.farmacias.update({
                        idlugar:isNaN(parseInt(values.idlugar)) ? this.props.data.idlugar : parseInt(values.idlugar),
                        finalturno: moment.parseZone(values.finalturno).format("YYYY-MM-DDTHH:mm:ssZ"),
                        inicioturno: moment.parseZone(values.inicioturno).format("YYYY-MM-DDTHH:mm:ssZ"),
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

    async onSelectLugar(e) {
        await this.setState({ idlugar: e })
    }

    handleLugares = async (value) => {
        this.setState({
            mar: null,
        })
        if (value.trim().length >= 3) {
            try {
                this.setState({ fetchingLugares: true });
                const response = await api.lugares.GetConSubrubro(queryString.stringify({
                    query: value.trim(),
                }))

                this.setState({
                    autoCompleteLugares: response.data.lugares ? response.data.lugares.map((data, index) => {
                        return {
                            text: `${data.nombrelugar}`,
                            value: data.idlugar,
                        }
                    }) : [],
                    fetchingLugares: false,
                });

            } catch (e) {
                message.error(e.toString(), 7);
            }
        } else if (value.trim().length === 0) {
            this.setState({ autoCompleteLugares: [] })
        }
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteLugares, fetchingLugares } = this.state;
        const lugaresOptions = autoCompleteLugares.map(data => (
            <AutoCompleteOption key={data.value}>{data.text.trim()}</AutoCompleteOption>
        ));
        return (
            <Modal
                visible={true}
                confirmLoading={this.state.confirmLoading}
                onOk={this.handleSubmit}
                onCancel={this.props.closeModal}
                cancelText="Cancelar"
                okText="Aceptar"
                width={700}
            >
                <section className="form-v1-container col-md-12">
                    <h4 style={{ marginBottom: 15 }}>Nuevo</h4>
                    <Divider />
                    <Form style={{ marginTop: 10 }}>
                        <Row gutter={8} >
                            <Col sm={{ span: 24 }} xs={{ span: 24 }}>
                                <FormItem label="Lugar" {...{
                                    labelCol: { sm: { span: 5 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('idlugar', {
                                        initialValue: this.props.data ? this.props.data.nombrelugar : '',
                                        rules: [{ required: true, message: "Este campo es Obligatorio" }],
                                    })(
                                        <AutoComplete
                                            dataSource={lugaresOptions}
                                            onChange={this.handleLugares}
                                            onSelect={(e) => this.onSelectLugar(e)}
                                            notFoundContent={fetchingLugares ? <Spin size="small" /> : null}
                                        >
                                            <Input
                                                style={{ width: '100%', display: 'inline-block' }}
                                                placeholder="Lugar..."
                                            />
                                        </AutoComplete>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col sm={{ span: 24 }} xs={{ span: 24 }}>
                                <FormItem label="Inicio de turno" {...{
                                    labelCol: { sm: { span: 5 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('inicioturno', {
                                        initialValue: this.props.data && moment.parseZone(this.props.data.inicioturno),
                                        rules: [{ required: true, message: "Este campo es Obligatorio" }],
                                    })(
                                        <DatePicker format="DD/MM/YYYY" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col sm={{ span: 24 }} xs={{ span: 24 }}>
                                <FormItem label="Cierre de turno" {...{
                                    labelCol: { sm: { span: 5 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('finalturno', {
                                        initialValue: this.props.data && moment.parseZone(this.props.data.finalturno),
                                        rules: [{ required: true, message: "Este campo es Obligatorio" }],
                                    })(
                                        <DatePicker format="DD/MM/YYYY" />
                                    )}
                                </FormItem>
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