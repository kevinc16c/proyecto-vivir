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
    AutoComplete,
    Breadcrumb,
    PageHeader,
    Divider,
    Spin,
    InputNumber,
    Checkbox,
    DatePicker,
    Tabs,
} from 'antd';
import QueueAnim from 'rc-queue-anim';
import queryString from 'query-string';
import moment from 'moment';
import Redes from './components/Redes';
import Horarios from './components/Horarios';
import Imagenes from './components/Imagenes';
import Geosuggest from 'react-geosuggest';
import Map from './Map';

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
        autoCompletePropietarios: [],
        fetchingPropietario: [],
        conpddiferido: false,
    }

    async componentDidMount() {
        this.fetch({
            limite: 10,
            pagina: 1,
        });
    }

    fetch = async (params = {}) => {
        try {

            const responseLugar = await api.lugares.getLugar(this.props.match.params.id)
            if (responseLugar.status === "success") {
                this.setState({
                    lugar: responseLugar.data.lugar,
                    latitud: responseLugar.data.lugar.latitud,
                    longitud: responseLugar.data.lugar.longitud,
                })
            }
            const response = await api.provincias.getLista()
            if (response.status === "success") {
                this.setState({ provincias: response.data.provincias })
            }
            const response1 = await api.rubros.getLista(queryString.stringify({
                query: ''
            }))
            if (response1.status === "success") {
                this.setState({ rubros: response1.data.rubros })
            }

            const response3 = await api.tipos_lugares.getLista()
            if (response3.status === "success") {
                this.setState({ tiposLugares: response3.data.tiposLugares })
            }

            const response4 = await api.convenios.getLista()
            if (response4.status === "success") {
                this.setState({ convenios: response4.data.tiposConvenio })
            }

            const response5 = await api.tipo_delivery.getLista()
            if (response5.status === "success") {
                this.setState({ tiposDelivery: response5.data.tiposDelivery })
            }

            if (this.state.lugar) {
                this.selectRubro(this.state.lugar.idrubro)
                this.setState({ conpddiferido: this.state.lugar.conpddiferido })
            }
        } catch (e) {
            message.error(e.toString(), 7);
        }
    }

    handleSubmit = (e) => {
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })
                    const response = await api.lugares.update({
                        ...values,
                        tipoubicac: 'DIR',
                        latitud: this.state.latitud,
                        longitud: this.state.longitud,
                        idlocalidad: isNaN(values.idlocalidad) ? this.state.lugar.idlocalidad : parseInt(values.idlocalidad),
                        idpropietario: isNaN(values.idpropietario) ? this.state.lugar.idpropietario : parseInt(values.idpropietario),
                        conpddiferido: this.state.conpddiferido === true ? 1 : 0,
                        vencimiento: moment.parseZone(values.vencimiento).format("YYYY-MM-DDTHH:mm:ssZ"),
                        fechaalta: moment.parseZone(this.state.lugar.fechaalta).format("YYYY-MM-DDTHH:mm:ssZ"),
                        idlugar: parseInt(this.state.lugar.idlugar)
                    });
                    if (response.status === "success") {
                        this.props.history.push("/admin/lugares");
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

    async onSelectPropietario(e) {
    }

    async onSelectLocalidad(e) {
    }

    handlePropietarios = async (value) => {

        this.setState({
            mar: null,
        })
        if (value.trim().length >= 3) {
            try {
                this.setState({ fetchingPropietario: true });
                const response = await api.propietarios.getLista(queryString.stringify({
                    query: value.trim(),
                    limite: 20,
                    pagina: 1,

                }))

                this.setState({
                    autoCompletePropietarios: response.data.propietarios ? response.data.propietarios.map((data, index) => {
                        return {
                            text: `${data.razonsocial}`,
                            value: data.id,
                        }
                    }) : [],
                    fetchingPropietario: false,
                });

            } catch (e) {
                message.error(e.toString(), 7);
            }
        } else if (value.trim().length === 0) {
            this.setState({ autoCompletePropietarios: [] })
        }
    }

    handleLocalidades = async (value) => {
        this.setState({
            mar: null,
        })
        if (value.trim().length >= 3) {
            try {
                this.setState({ fetchingLocalidades: true });
                const response = await api.localidades.getLista(queryString.stringify({
                    query: value.trim(),
                    limite: 20,
                    pagina: 1,
                }))

                this.setState({
                    autoCompleteLocalidades: response.data.localidades ? response.data.localidades.map((data, index) => {
                        return {
                            text: `${data.nombrelocali} - ${data.nombrepcia}`,
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

    selectRubro = async (e) => {
        try {
            const response = await api.subrubros.getByRubro(e)
            if (response.status === "success") {
                this.setState({ subrubros: response.data.subrubros })
            }
        } catch (error) {
            message.error(error)
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { fetchingLocalidades, fetchingPropietario, autoCompleteLocalidades, autoCompletePropietarios } = this.state;
        const propietariosOptions = autoCompletePropietarios.map(data => (
            <AutoCompleteOption key={data.value}>{data.text.trim()}</AutoCompleteOption>
        ));
        const localidadesOptions = autoCompleteLocalidades.map(data => (
            <AutoCompleteOption key={data.value}>{data.text.trim()}</AutoCompleteOption>
        ));
        return (
            <div className="container-fluid no-breadcrumb">
                <QueueAnim type="bottom" className="ui-animate">
                    <Breadcrumb>
                        <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/admin/lugares">Lugares</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
                        <PageHeader
                            title={`Editar lugar`}
                            onBack={() => { this.props.history.push("/admin/lugares") }}
                        />
                        <div className="box-body">
                            <div className="steps-content">
                                <Tabs defaultActiveKey="1">
                                    <Tabs.TabPane tab="Datos" key="1">
                                        <Divider>Datos Generales</Divider>
                                        <Form autoComplete="off">
                                            <Row gutter={8}>
                                                <Col span={24}>
                                                    <FormItem label="Fecha vencimiento" {...{
                                                        labelCol: { sm: { span: 4 }, },
                                                        wrapperCol: { sm: { span: 18 }, },
                                                    }}>
                                                        {getFieldDecorator('vencimiento', {
                                                            initialValue: this.state.lugar ? moment.parseZone(this.state.lugar.vencimiento) : '',
                                                            rules: [{ required: true, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <DatePicker format="DD/MM/YYYY" />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={24}>
                                                    <FormItem label="Nombre" {...{
                                                        labelCol: { sm: { span: 4 }, },
                                                        wrapperCol: { sm: { span: 18 }, },
                                                    }}>
                                                        {getFieldDecorator('nombrelugar', {
                                                            initialValue: this.state.lugar ? this.state.lugar.nombrelugar : '',
                                                            rules: [{ required: true, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <Input />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={24}>
                                                    <FormItem label="Propietario" {...{
                                                        labelCol: { sm: { span: 4 }, },
                                                        wrapperCol: { sm: { span: 18 }, },
                                                    }}>
                                                        {getFieldDecorator('idpropietario', {
                                                            initialValue: this.state.lugar ? this.state.lugar.propietario.razonsocial : '',
                                                            rules: [{ required: true, message: "Este campo es Obligatorio" }],
                                                        })(
                                                            <AutoComplete
                                                                dataSource={propietariosOptions}
                                                                onChange={this.handlePropietarios}
                                                                onSelect={(e) => this.onSelectPropietario(e)}
                                                                notFoundContent={fetchingPropietario ? <Spin size="small" /> : null}
                                                            >
                                                                <Input
                                                                    style={{ width: '100%', display: 'inline-block' }}
                                                                />
                                                            </AutoComplete>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Row gutter={8} >
                                                <Col span={12}>
                                                    <FormItem label="Rubro" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('idrubro', {
                                                            initialValue: this.state.lugar ? this.state.lugar.idrubro : '',
                                                            rules: [{ required: true, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <Select
                                                                placeholder="Provincia"
                                                                optionFilterProp="children"
                                                                showSearch
                                                                onChange={(e) => { this.selectRubro(e) }}
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
                                                <Col span={12}>
                                                    <FormItem label="Subrubro" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('idsubrubro', {
                                                            initialValue: this.state.lugar ? this.state.lugar.idsubrubro : '',
                                                            rules: [{ required: true, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <Select
                                                                placeholder="Provincia"
                                                                optionFilterProp="children"
                                                                showSearch
                                                                filterOption={(input, option) =>
                                                                    option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                                                }
                                                            >
                                                                {this.state.subrubros && this.state.subrubros.map((data, index) => {
                                                                    return <Option value={data.id} key={index}>{data.dsubrubro}</Option>
                                                                })}
                                                            </Select>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>

                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <FormItem label="Tipo lugar" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('idtipolugar', {
                                                            initialValue: this.state.lugar ? this.state.lugar.idtipolugar : '',
                                                            rules: [{ required: true, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <Select
                                                                placeholder="Provincia"
                                                                optionFilterProp="children"
                                                                showSearch
                                                                filterOption={(input, option) =>
                                                                    option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                                                }
                                                            >
                                                                {this.state.tiposLugares && this.state.tiposLugares.map((data, index) => {
                                                                    return <Option value={data.id} key={index}>{data.tipolugar}</Option>
                                                                })}
                                                            </Select>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={12}>
                                                    <FormItem label="Tipo convenio" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('idtipoconv', {
                                                            initialValue: this.state.lugar ? this.state.lugar.idtipoconv : '',
                                                            rules: [{ required: true, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <Select
                                                                placeholder="Provincia"
                                                                optionFilterProp="children"
                                                                showSearch
                                                                filterOption={(input, option) =>
                                                                    option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                                                }
                                                            >
                                                                {this.state.convenios && this.state.convenios.map((data, index) => {
                                                                    return <Option value={data.id} key={index}>{data.desctconv}</Option>
                                                                })}
                                                            </Select>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>

                                            <Row gutter={16} >
                                                <Col span={24}>
                                                    {getFieldDecorator('latitud', { initialValue: this.state.latitud ? this.state.latitud : '' })(<Input type="hidden" />)}
                                                    {getFieldDecorator('longitud', { initialValue: this.state.longitud ? this.state.longitud : '' })(<Input type="hidden" />)}
                                                </Col>
                                                <Col span={24}>
                                                    <FormItem  {...{
                                                        labelCol: { sm: { span: 4 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }} label="Buscar en google">
                                                        <Geosuggest
                                                            inputClassName="ant-input"
                                                            country="AR"
                                                            onSuggestSelect={this.onSuggestSelect}
                                                            minLength={7}
                                                            style={{ width: '90%' }}
                                                            placeholder="Buscar en google maps"
                                                        />
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            {(this.state.latitud || this.state.lat) &&
                                                <Map
                                                    flag={this.state.flag}
                                                    lat={this.state.latitud ? this.state.latitud : this.state.lat}
                                                    lng={this.state.longitud ? this.state.longitud : this.state.lng}
                                                    onChangePos={(la, lo) => {
                                                        this.props.form.setFieldsValue({
                                                            latitud: la,
                                                            longitud: lo,
                                                        });
                                                        this.setState({ flag: false })
                                                        this.setState({ latitud: la, longitud: lo })
                                                    }}
                                                    leido={(leido) => { this.setState({ buscando: leido, flag: false }) }}
                                                />
                                            }
                                            <br />

                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <FormItem label="Dirección" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('direccion', {
                                                            initialValue: this.state.lugar ? this.state.lugar.direccion : '',
                                                            rules: [{ required: true, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <Input />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={12}>
                                                    <FormItem label="Localidad" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('idlocalidad', {
                                                            initialValue: this.state.lugar ? this.state.lugar.localidad.nombrelocali : '',
                                                            rules: [{ required: true, message: "Este campo es Obligatorio" }],
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

                                            <Row gutter={8}>
                                                <Col span={10}>
                                                    <FormItem label="Tel" {...{
                                                        labelCol: { sm: { span: 10 }, },
                                                        wrapperCol: { sm: { span: 14 }, },
                                                    }}>
                                                        {getFieldDecorator('telefono', {
                                                            initialValue: this.state.lugar ? this.state.lugar.telefono : '',
                                                        })(
                                                            <Input />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={7}>
                                                    <FormItem label="Cel" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('celular', {
                                                            initialValue: this.state.lugar ? this.state.lugar.celular : '',
                                                        })(
                                                            <Input />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={7}>
                                                    <FormItem label="Email" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('e_mail', {
                                                            initialValue: this.state.lugar ? this.state.lugar.e_mail : '',
                                                        })(
                                                            <Input />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>

                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <FormItem label="Tipo Delivery" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('idtipodelivery', {
                                                            initialValue: this.state.lugar ? this.state.lugar.idtipodelivery : '',
                                                            rules: [{ required: false, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <Select
                                                                placeholder="Provincia"
                                                                optionFilterProp="children"
                                                                showSearch
                                                                filterOption={(input, option) =>
                                                                    option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                                                }
                                                            >
                                                                {this.state.tiposDelivery && this.state.tiposDelivery.map((data, index) => {
                                                                    return <Option value={data.id} key={index}>{data.tipodelivery}</Option>
                                                                })}
                                                            </Select>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={12}>
                                                    <FormItem label="Precio Delivery" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('precdelivery', {
                                                            initialValue: this.state.lugar ? this.state.lugar.precdelivery : '',
                                                            rules: [{ required: false, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <InputNumber />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>

                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <FormItem label="Compra mínima" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('cpraminima', {
                                                            initialValue: this.state.lugar ? this.state.lugar.cpraminima : '',
                                                            rules: [{ required: false, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <InputNumber />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={12}>
                                                    <FormItem label="" {...{
                                                        labelCol: { sm: { span: 0 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('conpddiferido', {
                                                            initialValue: this.state.lugar ? this.state.lugar.conpddiferido : '',
                                                            rules: [{ required: false, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <Checkbox checked={this.state.conpddiferido} onChange={(e) => this.setState({ conpddiferido: e.target.checked })}>Permite compra diferida</Checkbox>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>

                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <FormItem label="Abono" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('impoabono', {
                                                            initialValue: this.state.lugar ? this.state.lugar.impoabono : '',
                                                            rules: [{ required: false, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <InputNumber />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={24}>
                                                    <FormItem label="Sitio Web" {...{
                                                        labelCol: { sm: { span: 4 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('sitioweb', {
                                                            initialValue: this.state.lugar ? this.state.lugar.sitioweb : '',
                                                            rules: [{ required: false, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <Input />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={24}>
                                                    <FormItem label="Descripción" {...{
                                                        labelCol: { sm: { span: 4 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('describreve', {
                                                            initialValue: this.state.lugar ? this.state.lugar.describreve : '',
                                                            rules: [{ required: false, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <Input.TextArea rows={3} />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Form>
                                        <br />
                                        <Row>
                                            <Col span={24}>
                                                <Button type="primary" style={{ float: 'right' }} onClick={() => { this.handleSubmit() }}>
                                                    Finalizar
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Redes" key="2">
                                        <Redes
                                            history={this.props.history}
                                            id={this.props.match.params.id}
                                        />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="IMGs" key="3">
                                        <Imagenes
                                            history={this.props.history}
                                            id={this.props.match.params.id}
                                        />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Horarios" key="4">
                                        <Horarios
                                            history={this.props.history}
                                            id={this.props.match.params.id}
                                        />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Palabras clave" key="5">
                                        <Divider>Palabras Clave</Divider>
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