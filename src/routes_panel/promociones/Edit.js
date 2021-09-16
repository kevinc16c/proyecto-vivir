import React from 'react';
import { api } from './api';
import { connect } from 'react-redux';
import { message, Modal, Form, Input, InputNumber, Row, Col, Divider, Upload, Button, DatePicker, Icon } from 'antd';
import { config } from '../../config';
import moment from 'moment';

const FormItem = Form.Item;

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
        this.fetch({
            limite: 10,
            pagina: 1,
        });
    }

    fetch = async () => {
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })
                    const response = await api.promociones.update({
                        id: this.props.data.id,
                        idlugar: this.props.data && this.props.data.idlugar,
                        vencimiento: values.vencimiento,
                        titulo: values.titulo,
                        descripcion: values.descripcion,
                        terminos: values.terminos,
                        canticupos: values.cuposdispon,
                        cuposdispon: values.cuposdispon,
                        idtipopromo: 3,
                    });
                    if (response.status === "success") {

                        if (this.state.imageUrl.includes('jpeg') === true) {
                            let imageUrlCut = this.state.imageUrl.substring(23)
                            await this.setState({ imageUrlCut: imageUrlCut })
                        } else {
                            let imageUrlCut = this.state.imageUrl.substring(22)
                            await this.setState({ imageUrlCut: imageUrlCut })
                        }
                            let Rutaimgold = this.props.data  && this.props.data.rutaimg
                            const responseUpload = await api.promociones.cambiarImagen({
                                id: this.props.data.id,
                                Rutaimgold: Rutaimgold,
                                imagen: this.state.imageUrlCut && this.state.imageUrlCut,
                            });
                            if(responseUpload.status === "success"){
                                message.success("Actualizado con exito.")
                            }
                    } else {
                        message.error(response.message, 7);
                    }
                } catch (e) {
                    message.error(e.toString(), 7);
                } finally {
                    this.setState({
                        confirmLoading: false,
                    })
                    this.props.closeModal();
                }
            }
        })
    }

    beforeUpload = async (file) => {
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
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }

    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { imageUrl  } = this.state;

        const uploadButton = (
            <div>
                <img src={`${config.URL_IMG}${this.props.data  && this.props.data.rutaimg}`} className="img-fluid pb-2" alt="resp-imagen"/>

                <Button><Icon type="upload" />Cambiar</Button>
            </div>
        );
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
                    <h4 style={{ marginBottom: 15 }}>Editar</h4>
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
                                        // rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Título..." maxLength={15} />
                                    )}
                                    <Col>
                                        <div className="ant-form-item-control has-warning">
                                            <div className="ant-form-explain">Solo hasta 15 carácteres</div>
                                        </div>
                                    </Col>
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
                                        // rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Descripción..." maxLength={70} />
                                    )}
                                    <Col>
                                        <div className="ant-form-item-control has-warning">
                                            <div className="ant-form-explain">Solo hasta 70 carácteres</div>
                                        </div>
                                    </Col>
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
                                        // rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <Input placeholder="Términos..." />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={24}>
                                <FormItem label="Vencimiento" {...{
                                    labelCol: { sm: { span: 5 }, },
                                    wrapperCol: { sm: { span: 8 }, },
                                }}>
                                    {getFieldDecorator('vencimiento', {
                                        initialValue: this.props.data ? moment(this.props.data.vencimiento) : '',
                                        // rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <DatePicker />
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
                                        // rules: [{ required: true, message: "Este campo es obligatorio." }],
                                    })(
                                        <InputNumber placeholder="Cantidad de cupos..." />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={8} >
                            <Col span={8}>
                                <FormItem label="Imágen" {...{
                                    labelCol: { xs: { span: 0 }, sm: { span: 0 }, },
                                    wrapperCol: { xs: { span: 24 }, sm: { span: 24 }, },
                                }}>
                                    {getFieldDecorator('imagen', {
                                        initialValue: "",
                                        // rules: [{ required: this.state.required, message: "Debe cargar una imagen" }],
                                    })(
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            // accept=".png"
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            beforeUpload={(e) => this.beforeUpload(e)}
                                            onChange={this.handleChange}
                                        >
                                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                        </Upload>
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