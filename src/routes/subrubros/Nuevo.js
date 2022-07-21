import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Modal, Input, Row, Col, Divider, Select, InputNumber } from 'antd';
import queryString from 'query-string';

const Option = Select.Option;
const FormItem = Form.Item;
class Nuevo extends React.Component {

    state = {
        disabledLogin: false,
        confirmLoading: false,
        totalDataSize: 10000,
    }

    async componentDidMount() {
        this.fetch({
            limite: 10,
            pagina: 1,
        });
    }

    fetch = async (params = {}) => {
        try {
    		const response = await api.rubros.getAllLista(queryString.stringify({
				...params,
				query: this.state.q
			}))
			if (response.status === "success") {
				this.setState({
					rubros: response.data.rubros,
                });
            }
        } catch (e) {
            message.error(e.toString(), 7);
        }
    }

    async onSelectRubro(e) {
        await this.setState({idrubro: e})
        const rubro = this.state.rubros.filter(item => item.id === this.state.idrubro ? parseInt(this.state.idrubro) : null);
        var  porcentajeComision = rubro[0].porcomision      
        await this.setState({porcentajeComision: porcentajeComision})
    }
    
    async porcentajeOnChange(e) {
        this.setState({porcentajeComision: e})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })
                    const response = await api.subrubros.create({
                        ...values,
                        idrubro: this.state.idrubro,
                        porcomision: parseFloat(this.state.porcentajeComision)
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
                    <h4 style={{ marginBottom: 15 }}>Nuevo</h4>
                    <Divider />
                    <Form style={{ marginTop: 10 }}>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Descripción" {...{
                                    labelCol: { sm: { span: 7 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('dsubrubro', {
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Descripción" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Rubro" {...{
                                    labelCol: { sm: { span: 7 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('idrubro', {
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Select
                                            placeholder="Rubro"
                                            optionFilterProp="children"
                                            showSearch
                                            onSelect={(e)=> this.onSelectRubro(e)}
                                            filterOption={(input, option) =>
                                            option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                            }
                                        >
                                            {this.state.rubros && this.state.rubros.map((data, index) => {
                                                return <Option value={data.id} key={index}>{data.descrirubro}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col sm={{ span: 24 }} xs={{ span: 24 }}>
                                <FormItem label="Porcentaje de comisión" {...{
                                    labelCol: { sm: { span: 7 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    <InputNumber 
                                        disabled={!this.state.idrubro} 
                                        min={0} max={100} 
                                        value={this.state.porcentajeComision} 
                                        placeholder="Porcentaje de comisión"
                                        onChange={(e)=>this.porcentajeOnChange(e)} 
                                    />
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

const WrappedNuevo = Form.create()(Nuevo);

export default connect(
    mapStateToProps,
)(WrappedNuevo);