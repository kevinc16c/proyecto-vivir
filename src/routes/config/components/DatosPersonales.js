import React from 'react';
import { connect } from 'react-redux';
import {api} from '../../../api';
import {config} from '../../../config';
import { setUser } from 'actions/user';
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { LockOutlined } from '@ant-design/icons';
import { message, Upload, Col, Row, Modal, Divider, Input, Button } from 'antd';
import ChangePassword from '../../usuarios/components/ChangePassword'

const FormItem = Form.Item;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
class DatosPersonales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: 'horizontal',
      openChangePassword: false,
      confirmLoading: false,
    };
  }
 componentDidMount(){
    this._isMounted = true;
    this.fetch({
			limite: 10,
			pagina: 1,
		});
  }
  fetch = async (params = {}) => {
       try {
         this.setState({
          loading: true
        })
        const response = await api.usuarios.get(this.props.id);
        if (response.status === "success") {
          if (this._isMounted) {
            this.setState({
              ...response.data.usuario,
              url : response.data.usuario.imageurl
            })
          }
        }
        this.setState({
          loading: false
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
                  const response = await api.user.update({
                      ...this.props.user,
                      ...values,
                      imageUrl:this.state.url
                  });

                  this.props.handleSetUser(response.data.usuario);
                  if (response.status === "success") {
                      Modal.info({title:"Informacion del sistema",content:response.message})
                  }else {
                      Modal.error({title:"Informacion del sistema",content:response.message})
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
  state = {
    loading: false,
  };
  handleChange = async info => {
     if (info.file.status === 'uploading') {
       this.setState({ loading: true });
       return;
     }
     if (info.file.status === 'done') {
       // Get this url from response in real world.
        let file = info.file.originFileObj;
        if (file) {

            this.setState({
              uploading: false,
              url:file.name
            })
        }
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
      const uploadButton = (
        <div>
          <LegacyIcon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Subir Imagen</div>
        </div>
      );
      const  imageUrl  = this.state.url ? this.state.url:'';

      return (
        <div>
        <Row>
        <Col span={4}>
          <Upload
             name="avatar"
             listType="picture-card"
             className="avatar-uploader"
             showUploadList={false}
             action={
               api.user.upload()
             }
             headers={{
                   'AUTHORIZATION': `Bearer ${sessionStorage.getItem('token')}`,
                 }}
             beforeUpload={beforeUpload}
             onChange={this.handleChange}
           >
             {imageUrl ? <img src={config.URL_STATIC+'/'+imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Col>
        <Col span={18}>
          <Form onSubmit={this.handleSubmit} layout={'horizontal'} style={{marginTop:20 }}>
              <FormItem
                  label="Nombre:"
                  {...{
                    labelCol: {sm: { span: 5 },sx:{ span: 24 }},
                    wrapperCol: {sm: { span: 15 },sx:{ span: 24 }},
                  }}
              >
                  {getFieldDecorator('nombre', {
                      initialValue: this.props.user ? this.props.user.nombre : '', })(
                      <Input size="default" type="text" disable="true"/>
                  )}
              </FormItem>

              <FormItem
                  label="Usuario:"
                  {...{
                    labelCol: {sm: { span: 5 },sx:{ span: 24 }},
                    wrapperCol: {sm: { span: 10 },sx:{ span: 24 }},
                  }}
              >
                  {getFieldDecorator('usuario', {
                      initialValue: this.props.user ? this.props.user.usuario : '', })(
                      <Input size="default" type="text" disabled={true}/>
                  )}
              </FormItem>

              <FormItem
                  label="Email:"
                  {...{
                    labelCol: {sm: { span: 5 },sx:{ span: 24 }},
                    wrapperCol: {sm: { span: 15 },sx:{ span: 24 }},
                  }}
              >
                  {getFieldDecorator('mail', {
                      rules: [{ required: true, message: 'Campo obligatorio!' }],
                      initialValue: this.props.user ? this.props.user.mail : '', })(
                      <Input size="default" type="text"/>
                  )}
              </FormItem>
          </Form>
        </Col>

        </Row>

              <Divider></Divider>
              <Button type="default"
                      style={{ marginTop:5, float:'left' }}
                      icon={<LockOutlined />}
                      onClick={
                          ()=>this.setState({openChangePassword: true,})
                      }
              >Cambiar clave</Button>
              <Button type="primary"
                      style={{ marginTop:5, float:'right' }}
                      loading={this.state.confirmLoading}
                      onClick={this.handleSubmit}
              >Guardar</Button>


          {this.state.openChangePassword &&
            <ChangePassword
                open={this.state.openChangePassword}
                closeModal={()=>{this.setState({openChangePassword:false})}}
            />
          }
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetUser: (user) => {
      dispatch(setUser(user));
    },
  }
}
const mapStateToProps = (state, ownProps) => ({
    user: state.user,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(DatosPersonales));
