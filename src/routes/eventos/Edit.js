import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { message, Form, Input, Row, Col, Select, Button, AutoComplete, Breadcrumb, PageHeader, Divider, Spin, DatePicker, Tabs } from 'antd';
import _ from 'lodash';
import QueueAnim from 'rc-queue-anim';
import queryString from 'query-string';
import moment from 'moment';
import Imagenes from './components/Imagenes';
import Redes from './components/Redes';
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
        tabKey: "1",
    }

    async componentDidMount() {
        this.fetch({
            limite: 10,
            pagina: 1,
        });
    }

    fetch = async (params = {}) => {
        try {

            //eventos
            const responseEvento = await api.eventos.get(this.props.match.params.id)
            if (responseEvento.status === "success") {
                this.setState({
                    evento: responseEvento.data.evento,
                    latitud: responseEvento.data.evento.latitud,
                    longitud: responseEvento.data.evento.longitud,
                })
            }
            //provincias
            const response = await api.provincias.getLista()
            if (response.status === "success") {
                this.setState({ provincias: response.data.provincias })
            }
            //Tipo evento
            const response2 = await api.tiposeventos.getLista(queryString.stringify({
                query: ''
            }))
            if (response2.status === "success") {
                this.setState({ eventostipos: response2.data.tiposEventos })
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
            this.props.form.setFieldsValue({
                idsubrubro: '',
            })
        } catch (error) {
            message.error(error)
        }
    }

    onSuggestSelect = (suggest) => {
        if (suggest && suggest.gmaps) {

            this.setState({
                localidad: null,
                calle: null,
                altura: null,
                cp: null,
                latitud: '',
                longitud: '',
                direccion: '',
                provincias_id: null,
                idprovincia: null,
                domiciliotipos_id: 2,
            }, () => {
                if (suggest && suggest.gmaps && suggest.gmaps.address_components) {
                    for (var i = 0; i < suggest.gmaps.address_components.length; i++) {
                        if (suggest.gmaps.address_components[i].types.indexOf('route') !== -1) {
                            this.props.form.setFieldsValue({ calle: suggest.gmaps.address_components[i].long_name })
                            this.setState({
                                localidad: suggest.gmaps.address_components[i].long_name,
                                direccion: suggest.gmaps.address_components[i].long_name,
                            })
                            
                        }
                        if (suggest.gmaps.address_components[i].types.indexOf('locality') !== -1) {
                        }
                        if (suggest.gmaps.address_components[i].types.indexOf('street_number') !== -1) {
                            this.props.form.setFieldsValue({ calle: " " + suggest.gmaps.address_components[i].long_name })
                            this.props.form.setFieldsValue({ altura: suggest.gmaps.address_components[i].long_name })
                            this.setState({
                                altura: suggest.gmaps.address_components[i].long_name,
                                direccion: this.state.direccion + suggest.gmaps.address_components[i].long_name
                            })
                            
                        }
                        if (suggest.gmaps.address_components[i].types.indexOf('administrative_area_level_1') !== -1) {
                            let prov = _.deburr(suggest.gmaps.address_components[i].short_name)
                            prov = prov.replace('Provincia de ', '')
                        }
                    }

                    this.props.form.setFieldsValue({
                        latitud: suggest.location.lat,
                        longitud: suggest.location.lng,
                    });
                    this.props.form.setFieldsValue({
                        direccion: this.state.direccion + " " + this.state.altura,
                    })
                    this.setState({
                        latitud: suggest.location.lat,
                        longitud: suggest.location.lng,
                        flag: true
                    });
                }
            });
        }
        if (this.state.direccion) {
            this.props.form.setFieldsValue({
                direccion: this.state.direccion + " " + this.state.altura,
            })
        }
    }


    selectSubrubro = async (id) => {
        var index = this.state.subrubros.findIndex(item => item.id === id)
        if (index >= 0) {
            this.props.form.setFieldsValue({
                porcomision: this.state.subrubros[index].porcomision
            })
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
       const { fetchingLocalidades, autoCompleteLocalidades } = this.state;
       
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
                            title="Editar evento"
                            onBack={() => { this.props.history.push("/admin/eventos") }}
                        />
                        <div className="box-body">
                            <div className="steps-content">
                                <Tabs defaultActiveKey={this.state.tabKey} onChange={(e) => this.setState({ tabKey: e })}>
                                    <Tabs.TabPane tab="Datos" key="1">
                                        <Divider>Datos Generales</Divider>
                                        <Form autoComplete="off">
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <FormItem label="Inicio del evento" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('inicioevento', {
                                                            initialValue: this.state.evento ? moment.parseZone(this.state.evento.inicioevento) : '',
                                                            rules: [{ required: true, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <DatePicker format="DD/MM/YYYY    HH:mm" showTime />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={12}>
                                                    <FormItem label="Final del evento" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('finalevento', {
                                                            initialValue: this.state.evento ? moment.parseZone(this.state.evento.finalevento) : '',
                                                            rules: [{ required: true, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <DatePicker format="DD/MM/YYYY    HH:mm" showTime />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    <FormItem label="Nombre evento" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('evento', {
                                                            initialValue: this.state.evento ? this.state.evento.evento : '',
                                                            rules: [{ required: true, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <Input />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={12}>
                                                    <FormItem label="Tipo evento" {...{
                                                        labelCol: { sm: { span: 8 }, },
                                                        wrapperCol: { sm: { span: 16 }, },
                                                    }}>
                                                        {getFieldDecorator('idtipoeven', {
                                                            initialValue: this.state.lugar ? this.state.lugar.idrubro : this.state.evento ? this.state.evento.idtipoeven : '',
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
                                                                {this.state.eventostipos && this.state.eventostipos.map((data, index) => {
                                                                    return <Option value={data.id} key={index}>{data.tipo}</Option>
                                                                })}
                                                            </Select>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>

                                            <Row gutter={16} >
                                                <Col span={24}>
                                                    {getFieldDecorator('latitud', { initialValue: this.state.domicilio ? this.state.domicilio.latitud : '' })(<Input type="hidden" />)}
                                                    {getFieldDecorator('longitud', { initialValue: this.state.domicilio ? this.state.domicilio.longitud : '' })(<Input type="hidden" />)}
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
                                                            style={{ width: '100%' }}
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
                                                            initialValue: this.state.evento ? this.state.evento.direccion : '',
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
                                                            initialValue: this.state.domicilio ? this.state.domicilio.localidad : this.state.evento ? this.state.evento.idlocalidad : '',
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
                                                            initialValue: this.state.evento ? this.state.evento.telefono : '',
                                                            rules: [{ required: false, message: "Este campo es obligatorio." }],
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
                                                            initialValue: this.state.evento ? this.state.evento.celular : '',
                                                            rules: [{ required: false, message: "Este campo es obligatorio." }],
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
                                                            initialValue: this.state.evento ? this.state.evento.e_mail : '',
                                                            rules: [{ required: false, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <Input />
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
                                                            initialValue: this.state.evento ? this.state.evento.sitioweb : '',
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
                                                        {getFieldDecorator('descripcion', {
                                                            initialValue: this.state.evento ? this.state.evento.describreve : '',
                                                            rules: [{ required: true, message: "Este campo es obligatorio." }],
                                                        })(
                                                            <Input.TextArea rows={3} />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Redes" key="2">
                                        {this.state.tabKey === "2" ?
                                            <Redes
                                                history={this.props.history}
                                                id={this.props.match.params.id}
                                            />
                                            : ''}
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Imágenes" key="3">
                                        {this.state.tabKey === "3" ?
                                            <Imagenes
                                                history={this.props.history}
                                                id={this.props.match.params.id}
                                            />
                                            : ''}
                                    </Tabs.TabPane>
                                </Tabs>
                            </div>
                            <br />
                            <Row>
                                <Col span={24}>
                                    <Button type="primary" style={{ float: 'right' }} onClick={() => { this.handleSubmit() }}>
                                        Finalizar
                                    </Button>
                                </Col>
                            </Row>
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