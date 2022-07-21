import React from 'react';
import { api } from 'api_panel';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Input, Button, Card } from 'antd';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { setUser } from 'actions/user';
import '../styles.scss'
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabledLogin: false,
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ disabledLogin: true });
        try {
          const response = await api.auth.login({ ...values });

          if (response.status === "success") {
            this.props.handleSetUser(response.data.propietario);
            sessionStorage.setItem("token_panel", response.data.token);
            this.props.history.push('/panel/lugares/' + response.data.propietario.id);
          } else {
            message.error(response.message, 7);
            this.setState({ disabledLogin: false });
          }
        } catch (e) {
          message.error("Verifique su conexión a internet", 7);
          this.setState({ disabledLogin: false });
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <section className="form-v1-container">

        <Card style={{borderRadius:'6px',}}>
          <h2>Inicio de sesión</h2>
          <p className="lead">Bienvenido, ingrese su usuario y clave</p>
          <Form onSubmit={this.handleSubmit} className="form-v1">
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Por favor ingrese su nombre de usuario!' }],
              })(
                <Input style={{ borderRadius: '25px' }} size="large" prefix={<UserOutlined style={{ fontSize: 13 }} />} placeholder="Usuario" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('clave', {
                rules: [{ required: true, message: 'Por favor ingrese su contraseña!' }],
              })(
                <Input size="large" prefix={<LockOutlined style={{ fontSize: 13 }} />} type="password" placeholder="Contraseña" />
              )}
            </FormItem>

            <FormItem>
              <Button shape="round" type="primary" htmlType="submit" className="btn-cta btn-block" disabled={this.state.disabledLogin}>
                Ingresar
                </Button>
            </FormItem>
          </Form>
        </Card>
      </section>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(withRouter(NormalLoginForm));

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetUser: (user) => {
      dispatch(setUser(user));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
