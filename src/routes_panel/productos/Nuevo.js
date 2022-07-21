import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
    message,
    Modal,
    Input,
    Select,
    Row,
    Col,
    Divider,
    InputNumber,
    Switch,
    Checkbox,
} from 'antd';
import _ from 'lodash';
import TextArea from 'antd/lib/input/TextArea';

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
            // Todos los lugares del propietario
            const responseLugares = await api.lugares.get(parseInt(this.props.user && this.props.user.id))
            if (responseLugares.status === "success") {
                if (responseLugares.data.lugares) {
                    // idrubro del lugar seleccionado
                    var idrubro = _.find(responseLugares.data.lugares, ["idlugar", parseInt(this.props.idlugar)]).idrubro
                }
            }

            // Categorias rubro elegido
            const response = await api.categorias.get(idrubro ? idrubro : null)
            if (response.status === "success") {
                this.setState({
                    categorias: response.data.categorias,
                });
            }

            const responseAlicuota = await api.alicuota.getAll()
            if (responseAlicuota.status === "success") {
                this.setState({
                    alicuotas_iva: responseAlicuota.data.alicuotas_iva,
                });
            }
        } catch (e) {
            message.error(e.toString(), 7);
        }
    }

    async onSelectCategoria(e) {
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
                    const response = await api.productos.create({
                        ...values,
                        descriprod: values.descriprod,
                        idcategprod: values.idcategprod,
                        desextprod: values.desextprod,
                        agregados: values.agregados,
                        prunitprod: parseFloat(values.prunitprod),
                        Aliivaprod: values.Aliivaprod,
                        suspendido: values.suspendido === true ? 1 : values.suspendido === false ? 0 : this.props.data && this.props.data.suspendido,
                        controlstock: values.controlstock === true ? 1 : values.controlstock === false ? 0 : this.props.data && this.props.data.controlstock,
                        idlugar: parseInt(this.props.idlugar)
                    });
                    if (response.status === "success") {
                        window.location.reload();
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
                    <h4 style={{ marginBottom: 15 }} className="pb-4">Nuevo</h4>
                    <Divider />
                    <Form style={{ marginTop: 10 }}>
                    <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Nombre" {...{
                                    labelCol: { sm: { span: 7 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('descriprod', {
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Nombre del producto" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Descripción extendida" {...{
                                    labelCol: { sm: { span: 7 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('desextprod', {
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <TextArea placeholder="Composición del producto, ingredientes, etc." />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Categoría" {...{
                                    labelCol: { sm: { span: 7 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('idcategprod')(
                                        <Select
                                            placeholder="Categoría"
                                            optionFilterProp="children"
                                            showSearch
                                            onSelect={(e) => this.onSelectCategoria(e)}
                                            filterOption={(input, option) =>
                                                option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                            }
                                        >
                                            {this.state.categorias && this.state.categorias.map((data, index) => {
                                                return <Option value={data.id} key={index}>{data.descricatprod}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row  >
                            <Col span={12}>
                                <FormItem label="Precio unitario" {...{
                                    labelCol: { sm: { span: 14 }, },
                                    wrapperCol: { sm: { span: 7 }, },
                                }}>
                                    {getFieldDecorator('prunitprod', {
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <InputNumber min={0} placeholder="Precio unitario" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Alicuota" {...{
                                    labelCol: { sm: { span: 13 }, },
                                    wrapperCol: { sm: { span: 10 }, },
                                }}>
                                    {getFieldDecorator('Aliivaprod', {
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Select
                                            placeholder="Alicuota"
                                            optionFilterProp="children"
                                            showSearch
                                            style={{ width: '90px' }}
                                            filterOption={(input, option) =>
                                                option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                            }
                                        >
                                            {this.state.alicuotas_iva && this.state.alicuotas_iva.map((data, index) => {
                                                return <Option value={data.alicuoalic} key={index}>{data.descrialic}</Option>
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="Suspendido" {...{
                                    labelCol: { sm: { span: 14 }, },
                                    wrapperCol: { sm: { span: 10 }, },
                                }}>
                                    {getFieldDecorator('suspendido', {
                                        initialValue: this.props.data ? this.props.data.suspendido : '',
                                    })(
                                        <Switch/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Control de stock" {...{
                                    labelCol: { sm: { span: 13 }, },
                                    wrapperCol: { sm: { span: 10 }, },
                                }}>
                                    {getFieldDecorator('controlstock', {
                                        initialValue: this.props.data ? this.props.data.controlstock : '',
                                    })(
                                        <Checkbox >
                                        </Checkbox>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Limite de sabores y/o agregados" {...{
                                    labelCol: { sm: { span: 9 }, },
                                    wrapperCol: { sm: { span: 10 }, },
                                }}>
                                    {getFieldDecorator('agregados', {
                                        initialValue: 0,
                                        rules: [{ required: false, message: "Este campo es obligatorio." }],
                                    })(
                                        <InputNumber min={0} placeholder="Limite de sabores y/o agregados" />
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