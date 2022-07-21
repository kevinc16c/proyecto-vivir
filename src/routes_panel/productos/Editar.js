import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
    message,
    Input,
    Row,
    Col,
    Select,
    Button,
    Breadcrumb,
    PageHeader,
    Divider,
    Switch,
    InputNumber,
    Checkbox,
    Tabs,
} from 'antd';
import _ from 'lodash';
import QueueAnim from 'rc-queue-anim';
import Insumos from './components/Insumos';
import Imagenes from './components/Imagenes';
import TextArea from 'antd/lib/input/TextArea';

const Option = Select.Option;
const FormItem = Form.Item;

class Editar extends React.Component {

    state = {
        disabledLogin: false,
        confirmLoading: false,
        totalDataSize: 10000,
        tabKey: "1",
        suspendido: false,
    }

    async componentDidMount() {
        this.fetch({
            limite: 10,
            pagina: 1,
        });
    }

    fetch = async (params = {}) => {
        const responseProductos = await api.productos.get(this.props.match.params.id)
        if (responseProductos.status === "success") {
            this.setState({
                data: responseProductos.data.producto,
            });
        }
        if (this.state.data && this.state.data.suspendido === 1) {
            this.setState({ suspendido: true });
        } else {
            this.setState({ suspendido: false });
        }

        // Todos los lugares del propietario
        const responseLugares = await api.lugares.get(parseInt(this.props.user && this.props.user.id))
        if (responseLugares.status === "success") {
            if (responseLugares.data.lugares) {
                var idrubro = _.find(responseLugares.data.lugares, ["idlugar", this.state.data.idlugar]).idrubro
            }
        }

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
    }

    async onSelectCategoria(e) {
        await this.setState({ idrubro: e })
    }

    handleSubmit = (e) => {
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })
                    const response = await api.productos.update({
                        ...values,
                        id: this.state.data.id,
                        descriprod: values.descriprod,
                        idcategprod: values.idcategprod,
                        desextprod: values.desextprod,
                        agregados: values.agregados,
                        prunitprod: parseFloat(values.prunitprod),
                        Aliivaprod: values.Aliivaprod,
                        suspendido: values.suspendido === true ? 1 : values.suspendido === false ? 0 : this.state.data && this.state.data.suspendido,
                        controlstock: values.controlstock === true ? 1 : values.controlstock === false ? 0 : this.state.data && this.state.data.controlstock,
                        idlugar: this.state.data.idlugar
                    });
                    if (response.status === "success") {
                        this.props.history.goBack()
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
        const id_user = this.props.user && this.props.user.id;

        return (
            <div className="container-fluid no-breadcrumb">
                <QueueAnim type="bottom" className="ui-animate">
                    <Breadcrumb>
                        <Breadcrumb.Item href={"#/panel/lugares/" + id_user}>Lugares</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/panel/productos">Productos</Breadcrumb.Item>
                        <Breadcrumb.Item>Editar</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
                        <PageHeader
                            title={`Editar`}
                        />
                        <div className="box-body">
                            <div className="steps-content">
                                <Tabs defaultActiveKey={this.state.tabKey} onChange={(e) => this.setState({ tabKey: e })}>
                                    <Tabs.TabPane tab="Datos" key="1">
                                        <Divider>Datos Generales</Divider>
                                        <Form autoComplete="off">
                                            <section className="form-v1-container col-md-12">
                                                <Form style={{ marginTop: 10 }}>
                                                    <Row gutter={8} >
                                                        <Col span={24}>
                                                            <FormItem label="Nombre" {...{
                                                                labelCol: { sm: { span: 7 }, },
                                                                wrapperCol: { sm: { span: 16 }, },
                                                            }}>
                                                                {getFieldDecorator('descriprod', {
                                                                    initialValue: this.state.data ? this.state.data.descriprod : '',
                                                                    // rules: [{ required: true, message: "Este campo es obligatorio." }],
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
                                                                    initialValue: this.state.data ? this.state.data.desextprod : '',
                                                                    // rules: [{ required: true, message: "Este campo es obligatorio." }],
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
                                                                {getFieldDecorator('idcategprod', {
                                                                    initialValue: this.state.data ? this.state.data.idcategprod : '',
                                                                    // rules: [{ required: true, message: "Este campo es obligatorio." }],
                                                                })(
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
                                                                    initialValue: this.state.data ? this.state.data.prunitprod : '',
                                                                    // rules: [{ required: true, message: "Este campo es obligatorio." }],
                                                                })(
                                                                    <InputNumber placeholder="Precio unitario" />
                                                                )}
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={12}>
                                                            <FormItem label="Alicuota" {...{
                                                                labelCol: { sm: { span: 13 }, },
                                                                wrapperCol: { sm: { span: 10 }, },
                                                            }}>
                                                                {getFieldDecorator('Aliivaprod', {
                                                                    initialValue: this.state.data ? this.state.data.Aliivaprod : '',
                                                                    // rules: [{ required: true, message: "Este campo es obligatorio." }],
                                                                })(
                                                                    <Select
                                                                        placeholder="Alicuota"
                                                                        optionFilterProp="children"
                                                                        showSearch
                                                                        style={{ width: '90px' }}
                                                                        // onSelect={(e) => this.onSelectCategoria(e)}
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
                                                                    valuePropName: 'checked',
                                                                    initialValue: this.state.suspendido,
                                                                })(
                                                                    <Switch />
                                                                )}
                                                            </FormItem>
                                                        </Col>
                                                        <Col span={12}>
                                                            <FormItem label="Control de stock" {...{
                                                                labelCol: { sm: { span: 13 }, },
                                                                wrapperCol: { sm: { span: 10 }, },
                                                            }}>
                                                                {getFieldDecorator('controlstock', {
                                                                    valuePropName: 'checked',
                                                                    initialValue: this.state.data ? this.state.data.controlstock : '',
                                                                })(
                                                                    <Checkbox></Checkbox>
                                                                )}
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                    <Row gutter={8} >
                                                        <Col span={24}>
                                                            <FormItem label="Limite de sabores y/o agregados" {...{
                                                                labelCol: { sm: { span: 7 }, },
                                                                wrapperCol: { sm: { span: 16 }, },
                                                            }}>
                                                                {getFieldDecorator('agregados', {
                                                                    initialValue: this.state.data ? this.state.data.agregados : '',
                                                                    // rules: [{ required: true, message: "Este campo es obligatorio." }],
                                                                })(
                                                                    <InputNumber min={0} placeholder="Limite de sabores y/o agregados" />
                                                                )}
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </section>

                                        </Form>
                                        <br />
                                        <Row style={{ float: 'right' }}>
                                            <Col span={11} style={{ marginRight: '10px' }}>
                                                <Button type="danger" onClick={() => this.props.history.goBack()}>
                                                    Cancelar
                                                </Button>
                                            </Col>
                                            <Col span={11}>
                                                <Button type="primary" onClick={() => { this.handleSubmit() }}>
                                                    Finalizar
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Sabores / agregados" key="2">
                                        {this.state.tabKey === "2" ?
                                            <Insumos
                                                history={this.props.history}
                                                id={this.props.match.params.id}
                                            />
                                            : ''}
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="IMGs" key="3">
                                        {this.state.tabKey === "3" ?
                                            <Imagenes
                                                history={this.props.history}
                                                id={this.props.match.params.id}
                                            />
                                            : ''}
                                    </Tabs.TabPane>
                                </Tabs>
                            </div>
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

const WrappedEditar = Form.create()(Editar);

export default connect(
    mapStateToProps,
)(WrappedEditar);