import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Input, Row, Col, Modal, Divider, Select } from 'antd';
import queryString from 'query-string';

const Option = Select.Option;
const FormItem = Form.Item;
class Nuevo extends React.Component {

    state = {
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
    		const response = await api.rubros.getAll(queryString.stringify({
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })
                    const response = await api.palabras.create({
                        ...values,
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
                width={700}
            >
                <section className="form-v1-container col-md-12">
                    <h4 style={{ marginBottom: 15 }}>Nuevo</h4>
                    <Divider />
                    <Form style={{ marginTop: 10 }}>
                    <Row gutter={8} >
                            <Col sm={{ span: 24 }} xs={{ span: 24 }}>
                                <FormItem label="Palabra clave" {...{
                                    labelCol: { sm: { span: 5 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('palabraclave', {
                                        initialValue: this.props.data ? this.props.data.palabraclave : '',
                                        
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input min={0} max={100} placeholder="Palabra clave" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Rubro" {...{
                                    labelCol: { sm: { span: 5 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('idrubro', {
                                        initialValue: this.props.data ? this.props.data.idrubro : '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Select
                                            optionFilterProp="children"
                                            showSearch
                                            placeholder="Rubro"
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