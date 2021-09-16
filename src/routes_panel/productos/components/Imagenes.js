import React from 'react';
import { connect } from 'react-redux';
import { message, Form, Icon, Upload, Modal } from 'antd';
import { api } from '../api';
import { config } from '../../../config';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class Imagenes extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            q: '',
            searchText: '',
            data: [],
            loadingGuardar: false,
            totalDataSize: 100,
            previewVisible: false,
            previewImage: '',
            fotos: [],
            loading: false,
        }
    }

    componentDidMount() {
        this.fetch();
    }

    showEstadoBaja = async (record) => {
        const _this = this;
        Modal.confirm({
            title: '¿Esta seguro que desea dar de baja?',
            okText: 'Aceptar',
            okType: 'danger',
            cancelText: 'Cancelar',
            async onOk() {
                const response = await api.perchero.estado({ id: record.id, estado: "B" });
                _this.fetch();
                if (response.status === "success") {
                    message.success(response.message)
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    showDelete = async (record) => {
        const _this = this;
        Modal.confirm({
            title: '¿Esta seguro que desea eliminar?',
            okText: 'Aceptar',
            okType: 'danger',
            cancelText: 'Cancelar',
            async onOk() {
                const response = await api.stock.baja({ id: record.id });
                _this.fetch();
                if (response.status === "success") {
                    message.success(response.message)
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    showEstadoConfirm = async (record) => {
        const _this = this;
        Modal.confirm({
            title: '¿Esta seguro que desea dar de alta?',
            okText: 'Aceptar',
            okType: 'danger',
            cancelText: 'Cancelar',
            async onOk() {
                const response = await api.perchero.estado({ id: record.id, estado: "" });
                _this.fetch();
                if (response.status === "success") {
                    message.success(response.message)
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            limit: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order === "ascend" ? "ASC" : "DESC",
            ...filters,
        });
    }

    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Solo puedes subir archivos JPG/PNG!');
        }
        const isLt2M = file.size <= 2000000;
        if (!isLt2M) {
            message.error('La imagen debe ser más pequeña que 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    handleChange = async (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        } else {
            getBase64(info.file.originFileObj, imageUrl =>
                this.cargarImagen(imageUrl, info)
            );
        }
    };

    cargarImagen = async (imageurl, info) => {
        var fotos = []

        var imagen = imageurl.toString()
        var img = ""
        img = imagen

        img = img.replace('data:image/png;base64,', '')
        img = img.replace('data:image/jpg;base64,', '')
        img = img.replace('data:image/jpeg;base64,', '')

        const response = await api.imagenes.create({
            idproducto: parseInt(this.props.id),
            imagen: img,
        })
        
        if (response.status === "success") {
            const responseFotos = await api.imagenes.getAll(this.props.id)
            if (responseFotos.status === "success") {
                responseFotos.data.imagenes && responseFotos.data.imagenes.forEach(data => {
                    fotos.push({
                        uid: data.id,
                        name: data.rutaimgprod,
                        status: 'done',
                        url: config.URL_IMG + data.rutaimgprod,
                        rutafoto: data.rutaimgprod,
                    })
                })
                this.setState({ fotos: fotos, loading: false })
            }
        }
    }

    fetch = async (params = {}) => {

        try {
            var fotos = []
            const response = await api.imagenes.getAll(this.props.id)
            if (response.status === "success") {
                response.data.imagenes && response.data.imagenes.forEach(data => {
                    fotos.push({
                        uid: data.id,
                        name: data.rutaimgprod,
                        status: 'done',
                        url: config.URL_IMG + data.rutaimgprod,
                        rutafoto: data.rutaimgprod,
                    })
                })
                this.setState({ fotos: fotos })
            }
        } catch (e) {
            this.setState({
                articulo: [],
            });
            message.error(e.toString(), 5);
            console.log(e)
        }
    }


    search = (text) => {

        this.setState({ q: text }, () => {
            this.fetch();
        })

    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    onRemove = async file => {
        var fotos = []
        const _this = this;
        try {

            Modal.confirm({
                title: '¿Está seguro de que desea borrar?',
                okText: 'Aceptar',
                okType: 'danger',
                cancelText: 'Cancelar',
                async onOk() {
                    const response = await api.imagenes.delete(file.uid)
                    if (response.status === "success") {
                        const responseFotos = await api.imagenes.getAll(_this.props.id)
                        if (responseFotos.status === "success") {
                            responseFotos.data.imagenes && responseFotos.data.imagenes.forEach(data => {
                                fotos.push({
                                    uid: data.id,
                                    name: data.rutaimgprod,
                                    status: 'done',
                                    url: config.URL_IMG + data.rutaimgprod,
                                    rutafoto: data.rutaimgprod,
                                })
                            })
                            _this.setState({ fotos: fotos })
                        }
                    } else {
                        message.error(response.message, 7)
                    }
                },
                onCancel() {
                    console.log('Cancel');
                },
            });

        } catch (error) {
            message.error(error, 7)
        }
    };


    render() {
        const { previewVisible, previewImage, } = this.state;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Subir</div>
            </div>
        );
        return (
            <div>
                <Modal
                    visible={previewVisible}
                    title={'Producto'}
                    width={600}
                    height={600}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={(e) => this.beforeUpload(e)}
                    onChange={this.handleChange}
                >
                    {uploadButton}
                </Upload>
                <Upload
                    name="avatar2"
                    listType="picture-card"
                    className="avatar-uploader"
                    fileList={this.state.fotos && this.state.fotos}
                    onPreview={this.handlePreview}
                    onRemove={this.onRemove}
                >
                    {null}
                </Upload>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
    }
};

const WrappedImagenes = Form.create()(Imagenes);

export default connect(
    mapStateToProps
)(WrappedImagenes);
