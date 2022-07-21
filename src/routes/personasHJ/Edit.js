import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Modal, Input, Row, Col, Select, Spin, Divider, AutoComplete } from 'antd';
import queryString from 'query-string';
import MaskedInput from 'antd-mask-input';

const Option = Select.Option;
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;

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
            const responseNivel = await api.condicioniva.getAllLista(queryString.stringify({
                query: '',
            }))
            if (responseNivel.status === "success") {
                this.setState({
                    condicionesiva: responseNivel.data.condiciones_iva,
                });
            } else {
                this.setState({
                    localidades: [],
                });
                message.error(responseNivel.message, 5);
            }
            this.setState({data: this.props.data}, ()=>{
                this.onSelectLocalidad(this.props.data.idlocalidad)
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
                    const response = await api.propietarios.update({
                        ...values,
                        id:this.props.data.id,
                        idlocalidad: this.state.localidad && this.state.localidad.idlocalidad
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

    handleLocalidades = async (value) => {

        this.setState({
            mar: null,
        })
        if (value.trim().length >= 3) {
            try {
                this.setState({ fetchingLocalidades: true });
                const response = await api.localidades.getAll(queryString.stringify({
                    query: value.trim(),
                    limite: 10,
                    pagina: 1,
                }))

                this.setState({
                    autoCompleteLocalidades: response.data.localidades ? response.data.localidades.map((data, index) => {
                        return {
                            text: `${data.nombrelocali} - ${data.nombrepcia} - ${data.nombrepais}`,
                            value: data.idlocalidad,
                        }
                    }) : [],
                    fetchingLocalidades: false,
                });

            } catch (e) {
                message.error(e.toString(), 7);
            }
        } else if (value.trim().length === 0) {
            this.setState({ autoCompleteLocalidades: [] })
        }
    }

    async onSelectLocalidad(e) {
        try {
            const response = await api.localidades.get(e)
            if(response.status === "success"){
                this.setState({localidad:response.data.localidad})
            }
        } catch (error) {
            message.error(error)
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { fetchingLocalidades, autoCompleteLocalidades } = this.state;
        const localidadesOptions = autoCompleteLocalidades.map(data => (
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
                width={800}
            >
                <section className="form-v1-container col-md-12">
                    <h4 style={{ marginBottom: 15 }}>Nuevo</h4>
                    <Divider />
                    <Form style={{ marginTop: 10 }}>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Razón social" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('razonsocial', {
                                        initialValue: this.state.data ? this.state.data.razonsocial : '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Razón social" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Nombre fantasía" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('nofantasia', {
                                        initialValue: this.state.data ? this.state.data.nofantasia : '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Nombre de fantasía" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row gutter={8} >
                            <Col span={12}>
                                <FormItem label="Condición IVA" {...{
                                    labelCol: { sm: { span: 8 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('idcondiva', {
                                        initialValue: this.state.data ? this.state.data.idcondiva : '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Select
                                            placeholder="Niveles"
                                            optionFilterProp="children"
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                            }
                                        >
                                            {this.state.condicionesiva && this.state.condicionesiva.map((data, index) => {
                                                return <Option value={data.codigociva} key={index}>{data.descriciva}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="CUIT" {...{
                                    labelCol: { sm: { span: 8 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('numerocuit', {
                                        initialValue: this.state.data ? this.state.data.numerocuit : '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <MaskedInput
                                            mask="11-11111111-1"
                                            name="card"
                                        />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Localidad" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 18 }, },
                                }}>
                                    {getFieldDecorator('idlocalidad', {
                                        initialValue: this.state.data ? this.state.data.nombrelocali : '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <AutoComplete
                                            dataSource={localidadesOptions}
                                            onChange={this.handleLocalidades}
                                            onSelect={(e) => this.onSelectLocalidad(e)}
                                            notFoundContent={fetchingLocalidades ? <Spin size="small" /> : null}
                                        >
                                            <Input
                                                style={{ width: '90%', display: 'inline-block' }}
                                            />
                                        </AutoComplete>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Dirección" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 18 }, },
                                }}>
                                    {getFieldDecorator('direccion', {
                                        initialValue: this.state.data ? this.state.data.direccion : '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Dirección" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={12}>
                                <FormItem label="Tel. 1" {...{
                                    labelCol: { sm: { span: 8 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('telefono', {
                                        initialValue: this.state.data ? this.state.data.telefono : '',
                                        rules: [{ required: false, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Teléfono" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Tel. 2" {...{
                                    labelCol: { sm: { span: 6 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('telefono2', {
                                        initialValue: this.state.data ? this.state.data.telefono2 : '',
                                        rules: [{ required: false, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Teléfono" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={8}>
                                <FormItem label="Cel. 1" {...{
                                    labelCol: { sm: { span: 12 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('celular1', {
                                        initialValue: this.state.data ? this.state.data.celular1 : '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Teléfono" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="Cel. 2" {...{
                                    labelCol: { sm: { span: 6 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('celular2', {
                                        initialValue: this.state.data ? this.state.data.celular2 : '',
                                        rules: [{ required: false, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Teléfono" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="Cel. 3" {...{
                                    labelCol: { sm: { span: 6 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('celular3', {
                                        initialValue: this.state.data ? this.state.data.celular3 : '',
                                        rules: [{ required: false, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Teléfono" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Email" {...{
                                    labelCol: { sm: { span: 4 }, },
                                    wrapperCol: { sm: { span: 12 }, },
                                }}>
                                    {getFieldDecorator('email', {
                                        initialValue: this.state.data ? this.state.data.email : '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="E-mail" />
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