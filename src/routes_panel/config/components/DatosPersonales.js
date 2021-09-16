import React from 'react';
import { connect } from 'react-redux';
import { api } from '../../../api_panel';
import { setUser } from 'actions/user';
import { message, Col, Row, Modal, Divider, Form, Input, Button } from 'antd';
import ChangePassword from '../../usuarios/components/ChangePassword'

const FormItem = Form.Item;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
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
  componentDidMount() {
    this._isMounted = true;
    this.fetch({
      limite: 10,
      pagina: 1,
    });
  }
  fetch = async () => {
    try {
      this.setState({
        loading: true
      })
      const response = await api.auth.getAuthenticatedUser(this.props.id);
      if (response.status === "success") {
        if (this._isMounted) {
          this.setState({
            ...response.data.propietario,
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
            imageUrl: this.state.url
          });

          this.props.handleSetUser(response.data.usuario);
          if (response.status === "success") {
            Modal.info({ title: "Informacion del sistema", content: response.message })
          } else {
            Modal.error({ title: "Informacion del sistema", content: response.message })
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
          url: file.name
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
    return (
      <div>
        <Row>
          <Col span={4}>
          </Col>
          <Col span={18}>
            <Form onSubmit={this.handleSubmit} layout={'horizontal'} style={{ marginTop: 20 }}>
              <FormItem
                label="Nombre:"
                {...{
                  labelCol: { sm: { span: 5 }, sx: { span: 24 } },
                  wrapperCol: { sm: { span: 15 }, sx: { span: 24 } },
                }}
              >
                {getFieldDecorator('nombre', {
                  initialValue: this.props.user ? this.props.user.razonsocial : '',
                })(
                  <Input size="default" type="text" disable="true" readOnly/>
                )}
              </FormItem>

              <FormItem
                label="Email:"
                {...{
                  labelCol: { sm: { span: 5 }, sx: { span: 24 } },
                  wrapperCol: { sm: { span: 15 }, sx: { span: 24 } },
                }}
              >
                {getFieldDecorator('mail', {
                  rules: [{ required: true, message: 'Campo obligatorio!' }],
                  initialValue: this.props.user ? this.props.user.email : '',
                })(
                  <Input size="default" type="text" readOnly/>
                )}
              </FormItem>
            </Form>
          </Col>

        </Row>

        <Divider></Divider>
        <Button type="default"
          style={{ marginTop: 5, float: 'left' }}
          icon="lock"
          onClick={
            () => this.setState({ openChangePassword: true, })
          }
        >Cambiar clave</Button>

        {this.state.openChangePassword &&
          <ChangePassword
            open={this.state.openChangePassword}
            closeModal={() => { this.setState({ openChangePassword: false }) }}
            id={this.props.id}
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
