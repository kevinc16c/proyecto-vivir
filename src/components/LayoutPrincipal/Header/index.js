import React from 'react';
import './styles.scss';
import { api } from '../../../api_panel';
import { config } from '../../../config';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { message, Layout } from 'antd';
import { toggleCollapsedNav, toggleOffCanvasMobileNav } from 'actions/settings';
import { setUser } from 'actions/user';
import ChangePassword from '../../../routes/usuarios/components/ChangePassword';

const { Header } = Layout;

class AppHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      openChangePassword: false,
      disabledLogin: false,
      confirmLoading: false,
      url: '',
    }
  }

  async componentDidMount() {
    try {

    } catch (e) {
      message.error(e.toString(), 10);
    }
  }

  onToggleCollapsedNav = () => {
    const { handleToggleCollapsedNav, collapsedNav } = this.props;
    handleToggleCollapsedNav(!collapsedNav);
  }

  onToggleOffCanvasMobileNav = () => {
    const { handleToggleOffCanvasMobileNav, offCanvasMobileNav } = this.props;
    handleToggleOffCanvasMobileNav(!offCanvasMobileNav);
  }

  onClick = async () => {
    try {
      if (sessionStorage.getItem('token_notification') && sessionStorage.getItem('token_notification').length > 0) {
        const response = await api.token.tokenBaja({
          idlugar: parseInt(sessionStorage.getItem('lugar_id')),
          token: sessionStorage.getItem('token_notification')
        });
        if (response.status === "success") {
        } else {
          message.error(response.message, 7);
        }
      }
      this.props.history.push('/login_panel');
    } catch (e) {
      message.error(e.toString(), 7);
    } finally {
      this.setState({
        confirmLoading: false,
      })
    }
  }

  MercadoPago = async () => {
    this.setState({ isLoading: true })
    try {
      this.setState({ openModal: true })
      window.open(`https://auth.mercadopago.com.ar/authorization?client_id=${config.APP_ID_MP}&response_type=code&platform_id=mp&redirect_uri=https://www.vivircarlospaz.com`, "_self")
    } catch (error) {
      message.error(error)
    }
  }

  render() {  
    return (
      <Header className="app-header">
        {this.state.openChangePassword &&
          <ChangePassword
            open={this.state.openChangePassword}
            closeModal={() => { this.setState({ openChangePassword: false }) }}
          />}

        <div className='app-header-inner' style={{ backgroundColor: '#00C6B7' }}>
          <div className="header-left">
            <div className="list-unstyled list-inline">
              <img alt="vcp" src="assets/Vivir-Carlos-Paz-Logo-Blanco.png" className="pl-3 pb-1" />
            </div>
          </div>

          <div className="header-right">
            <div className="list-unstyled list-inline">
              <a href={`${config.URL_SV}#/contact`} about='_self' style={{ color: 'white', marginLeft: 10, marginRight: 10, fontSize: '18px' }}>
                CONTACTANOS
              </a>
              <a href={`${config.URL_SV}#/login_panel`} style={{ color: 'white', marginRight: 10, fontSize: '18px' }}>
                ESTOY ADHERIDO
              </a>
            </div>
          </div>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  offCanvasMobileNav: state.settings.offCanvasMobileNav,
  collapsedNav: state.settings.collapsedNav,
  colorOption: state.settings.colorOption,
  user: state.user,
  lugar: state.lugar,
});

const mapDispatchToProps = dispatch => ({
  handleToggleCollapsedNav: (isCollapsedNav) => {
    dispatch(toggleCollapsedNav(isCollapsedNav));
  },
  handleToggleOffCanvasMobileNav: (isOffCanvasMobileNav) => {
    dispatch(toggleOffCanvasMobileNav(isOffCanvasMobileNav));
  },
  handleSetUser: (user) => {
    dispatch(setUser(user));
  },
});


const WrappedAppHeader = withRouter(AppHeader);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedAppHeader);
