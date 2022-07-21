import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
    message,
    Modal,
    Input,
    InputNumber,
    Row,
    Col,
    Divider,
    Spin,
    AutoComplete,
    DatePicker,
    Select,
} from 'antd';
import queryString from 'query-string';
import moment from 'moment';

const AutoCompleteOption = AutoComplete.Option;
const FormItem = Form.Item;
const Option = Select.Option;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class Editar extends React.Component {

    state = {
        disabledLogin: false,
        confirmLoading: false,
        totalDataSize: 10000,
        imageUrl: "",
        autoCompleteLugares: [],
    }

    async componentDidMount() {
        this.fetch();
    }

    fetch = async () => {
        try {
            const response = await api.lugares.getAll(queryString.stringify({
                query: this.state.q
            }))
            if (response.status === "success") {
                this.setState({
                    lugares: response.data.lugares,
                });
            }

        } catch (e) {
            message.error(e.toString(), 7);
        }
    }

    handleSubmit = async (e) => {

        if (this.state.imageUrl.includes('jpeg') === true) {
            let imageUrlCut = this.state.imageUrl.substring(23)
            await this.setState({ imageUrlCut: imageUrlCut })
        } else {
            let imageUrlCut = this.state.imageUrl.substring(22)
            await this.setState({ imageUrlCut: imageUrlCut })
        }

        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })
                    const response = await api.promociones.update({
                        ...values,
                        id: this.props.data.id,
                        idlugar: isNaN(values.idlugar) ? this.props.data.idlugar : values.idlugar,
                        vencimiento: values.vencimiento,
                        canticupos: values.cuposdispon,
                        cuposdispon: values.cuposdispon,
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

    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Solo puedes subir archivos JPG/PNG!');
        }
        const isLt2M = file.size <= 204800;
        if (!isLt2M) {
            message.error('La imagen debe ser más pequeña que 2KB!');
        }
        return isJpgOrPng && isLt2M;
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

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
                const response = await api.lugares.getLista(queryString.stringify({
                    query: value.trim(),
                    limite: 20,
                    pagina: 1,
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
                width={750}
            >
                <section className="form-v1-container col-md-12">
                    <h4 style={{ marginBottom: 15 }}>Nuevo</h4>
                    <Divider />
                    <Form style={{ marginTop: 10 }}>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Título" {...{
                                    labelCol: { sm: { span: 5 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('titulo', {
                                        initialValue: this.props.data ? this.props.data.titulo : '',
                                    })(
                                        <Input placeholder="Título..." />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={24}>
                                <FormItem label="Lugar" {...{
                                    labelCol: { sm: { span: 5 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('idlugar', {
                                        initialValue: this.props.data ? this.props.data.nombrelugar : "",
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
                            <Col span={24}>
                                <FormItem label="Descripción" {...{
                                    labelCol: { sm: { span: 5 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('descripcion', {
                                        initialValue: this.props.data ? this.props.data.descripcion : '',
                                    })(
                                        <Input placeholder="Descripción..." />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Términos" {...{
                                    labelCol: { sm: { span: 5 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('terminos', {
                                        initialValue: this.props.data ? this.props.data.terminos : '',
                                    })(
                                        <Input placeholder="Términos..." />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Tipo promoción" {...{
                                    labelCol: { sm: { span: 5 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('idtipopromo', {
                                        initialValue: this.props.data ? this.props.data.idtipopromo : '',
                                        rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Select
                                            placeholder="Tipo promoción"
                                            optionFilterProp="children"
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                            }
                                        >
                                            <Option value={1} key={1}>Promoción tradicional</Option>
                                            <Option value={3} key={2}>Promoción aleatoria</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Vencimiento" {...{
                                    labelCol: { sm: { span: 5 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('vencimiento', {
                                        initialValue: this.props.data ? moment(this.props.data.vencimiento) : '',
                                    })(
                                        <DatePicker style={{ width: "100%" }} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Cantidad de cupos" {...{
                                    labelCol: { sm: { span: 5 }, },
                                    wrapperCol: { sm: { span: 16 }, },
                                }}>
                                    {getFieldDecorator('cuposdispon', {
                                        initialValue: this.props.data ? this.props.data.canticupos : '',
                                    })(
                                        <InputNumber placeholder="Cantidad de cupos..." />
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