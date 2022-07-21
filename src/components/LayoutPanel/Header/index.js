import React from 'react';
import './styles.scss';
import { api } from '../../../api_panel';
import { config } from '../../../config';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import DEMO from 'constants/demoData';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { message, Layout, Menu, Dropdown, Avatar, Divider } from 'antd';
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
      const response = await api.auth.getAuthenticatedUser();
      if (response.status === "success") {
        this.props.handleSetUser(response.data.propietario);
      } else {
        this.props.history.push('/login_panel');
      }
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

  salir = async () => {
    try {
			if(sessionStorage.getItem('token_notification') && sessionStorage.getItem('token_notification').length > 0){
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
    const { collapsedNav, offCanvasMobileNav, showLogo } = this.props;
    return (
      <Header className="app-header">
        {this.state.openChangePassword &&
          <ChangePassword
            open={this.state.openChangePassword}
            closeModal={() => { this.setState({ openChangePassword: false }) }}
          />}

        <div
          className='app-header-inner' style={{ backgroundColor: '#00C6B7' }}
        >
          <div className="header-left">
            <div className="list-unstyled list-inline">
              {showLogo && [
                <Divider type="vertical" key="line" />,
              ]}

              <a href={DEMO.link} className="list-inline-item d-none d-md-inline-block" onClick={this.onToggleCollapsedNav}>
                <LegacyIcon type={collapsedNav ? 'menu-unfold' : 'menu-fold'} style={{ color: 'white' }} className="list-icon" />
              </a>
              <a href={DEMO.link} className="list-inline-item d-md-none" onClick={this.onToggleOffCanvasMobileNav}>
                <LegacyIcon type={offCanvasMobileNav ? 'menu-unfold' : 'menu-fold'} style={{ color: 'white' }} className="list-icon" />
              </a>
            </div>
          </div>

          <div className="header-right">
            <div className="list-unstyled list-inline">
              <Dropdown className="list-inline-item" overlay={
                <Menu className="app-header-dropdown">
                  <Menu.Item key="4" className="d-block d-md-none"> Signed in as <strong>{this.props.user && this.props.user.razonsocial}</strong> </Menu.Item>
                  <Menu.Divider className="d-block d-md-none" />
                  <Menu.Item key="1" onClick={() => {
                    this.props.history.push(this.props.user && '/panel/config/' + this.props.user.id);
                  }}> <SettingOutlined />Configuración </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="3" onClick={() => this.salir()}> <a href={DEMO.link} ><LogoutOutlined />Salir</a> </Menu.Item>
                </Menu>
              } trigger={['click']} placement="bottomRight">
                <a className="ant-dropdown-link no-link-style" href={DEMO.link} >
                  <Avatar src={this.state.url || ''} size="small">{this.props.user && this.props.user.razonsocial[0] ? '1' : '0' }</Avatar>
                </a>
              </Dropdown>
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
