import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Modal, Input, Row, Col, Select, Divider } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class Editar extends React.Component {

    state = {
        disabledLogin: false,
        confirmLoading: false,
        totalDataSize: 10000,
        flag: true,
        autoCompleteLocalidades: [],
        fetchingLocalidades: [],
    }

    async componentDidMount() {
        this.fetch({
			limite: 10,
			pagina: 1,
		});
    }
    fetch = async (params = {}) => {
        try {
            const response = await api.paises.getLista()
            if(response.status === "success"){
                this.setState({paises:response.data.paises})
            }
            this.setState({
                data: this.props.data
            })
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
                    const response = await api.provincias.update({
                        ...values,
                        idprovincia: this.props.data.idprovincia
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

    async onSelectLocalidad(e) {
        try {
            const response = await api.localidades.get(e)
            if (response.status === "success") {
                this.setState({ localidad: response.data.localidad })
            }
        } catch (error) {
            message.error(error)
        }
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
                width={800}
            >
                <section className="form-v1-container col-md-12">
                    <h4 style={{ marginBottom: 15 }}>Nuevo</h4>
                    <Divider />
                    <Form style={{ marginTop: 10 }}>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Provincia" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('nombrepcia', {
                                        initialValue: this.state.data ? this.state.data.nombrepcia : '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Provincia" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={12}>
                                <FormItem label="País" {...{
                                    labelCol: { sm: { span: 8 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('idpais', {
                                        initialValue: this.state.data ? this.state.data.idpais : '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Select
                                            placeholder="Países"
                                            optionFilterProp="children"
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                            }
                                        >
                                            {this.state.paises && this.state.paises.map((data, index) => {
                                                return <Option value={data.idpais} key={index}>{data.nombrepais}</Option>
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

const WrappedEditar = Form.create()(Editar);

export default connect(
    mapStateToProps,
)(WrappedEditar);