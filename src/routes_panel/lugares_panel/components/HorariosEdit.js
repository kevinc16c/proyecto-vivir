import React from 'react';
import { api } from '../api';
import { connect } from 'react-redux';
import { message, Modal, Form, Input, Row, Col, Divider, TimePicker, Button } from 'antd';
import _ from 'lodash';
import moment from 'moment';

const format = 'HH:mm';

const FormItem = Form.Item;
class HorariosEdit extends React.Component {

    state = {
        disabledLogin: false,
        confirmLoading: false,
        totalDataSize: 10000,
    }

    async componentDidMount() {
    }


    async onSelectRubro(e) {
        await this.setState({ idrubro: e })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })
                    
                   let Lughorades = values.Lughorades._d.toString()
                   let LughoradesCut = Lughorades.substr(16, 9)
                   await this.setState({LughoradesCut: LughoradesCut})

                   let Lughorahas = values.Lughorahas._d.toString()
                   let LughorahasCut = Lughorahas.substr(16, 9)
                   await this.setState({LughorahasCut: LughorahasCut})

                    const response = await api.horarios.update({
                        id: this.props.data.id,
                        idlugar: this.props.data.idlugar,
                        iddia: this.props.data.iddia,
                        Lughorades: this.state.LughoradesCut,
                        Lughorahas: this.state.LughorahasCut,
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

    handleOpenChange = (open) => {
        this.setState({ open });
    };

    handleClose = () => {
        this.setState({ open: false })
    }

    handleOpenChange1 = (open1) => {
        this.setState({ open1 });
    };

    handleClose1 = () => {
        this.setState({ open1: false })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={true}
                confirmLoading={this.state.confirmLoading}
                onOk={this.handleSubmit}
                onCancel={this.props.closeModal}
                cancelText="Cancelar"
                okText="Aceptar"
                width={650}
            >
                <section className="form-v1-container col-md-12">
                    <h4 style={{ marginBottom: 15 }}>Editar</h4>
                    <Divider />
                    <Form style={{ marginTop: 10 }}>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Día" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('dsubrubro', {
                                        initialValue: this.props.data ? this.props.data.dia : '',
                                    })(
                                        <Input
                                            style={{ width: "100%" }}
                                            placeholder="Día" readOnly />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={24}>
                                <FormItem label="Desde" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                        {getFieldDecorator('Lughorades', {
                                        initialValue: moment(this.props.data.Lughorades, format),
                                        rules: [{ required: true, message: ' ' }],
                                    })(
                                    <TimePicker
                                        open={this.state.open}
                                        onOpenChange={this.handleOpenChange}
                                        format="HH:mm"
                                        style={{ width: "100%" }}
                                        defaultValue={moment(this.props.data.Lughorades, format)} format={format}
                                        hourStep={1}
                                        minuteStep={15}
                                        addon={() => (
                                            <Button size="small" type="primary" onClick={this.handleClose}>
                                                Ok
                                            </Button>
                                        )}
                                    />
                                    )}

                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={24}>
                                <FormItem label="Hasta" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('Lughorahas', {
                                        initialValue: moment(this.props.data.Lughorahas, format),
                                        rules: [{ required: true, message: ' ' }],
                                    })(
                                        <TimePicker
                                            open={this.state.open1}
                                            onOpenChange={this.handleOpenChange1}
                                            hourStep={1}
                                            format={format}
                                            style={{ width: "100%" }}
                                            minuteStep={15}
                                            addon={() => (
                                                <Button size="small" type="primary" onClick={this.handleClose1}>
                                                    Ok
                                                </Button>
                                            )}
                                        />
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

const WrappedHorariosEdit = Form.create()(HorariosEdit);

export default connect(
    mapStateToProps,
)(WrappedHorariosEdit);