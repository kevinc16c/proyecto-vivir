import React from 'react';
import './styles.scss';
import { api } from 'api';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import DEMO from 'constants/demoData';
import { message, Layout, Menu, Dropdown, Avatar, Icon, Tooltip } from 'antd';
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
        this.props.handleSetUser(response.data.operador);
      } else {
        this.props.history.push('/login');
      }
    } catch (e) {
      message.error(e.toString(), 10);
    }
  }

    salir = async () => {
    try {
      var token = sessionStorage.getItem('token_admin');

			if(token && token.length > 0){
				const response = await api.token.baja({
					token: token
				});
				if (response.status === "success") {
				} else {
					message.error(response.message, 7);
				}
			}
      this.props.history.push('/login');
		} catch (e) {
			message.error(e.toString(), 7);
		} finally {
			this.setState({
				confirmLoading: false,
			})
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

  render() {
    const { collapsedNav, offCanvasMobileNav } = this.props;

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
              <a href={DEMO.link} className="list-inline-item d-none d-md-inline-block" onClick={this.onToggleCollapsedNav}>
                <Icon type={collapsedNav ? 'menu-unfold' : 'menu-fold'} style={{ color: 'white' }} className="list-icon" />
              </a>
              <a href={DEMO.link} className="list-inline-item d-md-none" onClick={this.onToggleOffCanvasMobileNav}>
                <Icon type={offCanvasMobileNav ? 'menu-unfold' : 'menu-fold'} style={{ color: 'white' }} className="list-icon" />
              </a>
              <Tooltip placement="bottom" title="Notificar">
                <a href="#/admin/notificaciones" className="list-inline-item d-md-inline-block">
                  <Icon type="notification" className="list-icon" style={{ color: 'white' }} />
                </a>
              </Tooltip>
            </div>
          </div>

          <div className="header-right">
            <div className="list-unstyled list-inline">
              <Dropdown className="list-inline-item" overlay={
                <Menu className="app-header-dropdown">
                  <Menu.Item key="4" className="d-block d-md-none"> Signed in as <strong>{this.props.user && this.props.user.apynombres}</strong> </Menu.Item>
                  <Menu.Divider className="d-block d-md-none" />
                  <Menu.Item key="1" onClick={() => {
                    this.props.history.push(this.props.user && '/app/config/' + this.props.user.id);
                  }}> <Icon type="setting" />Configuración </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="3" onClick={() => this.salir()}> <a href={DEMO.link} ><Icon type="logout" />Salir</a> </Menu.Item>
                </Menu>
              } trigger={['click']} placement="bottomRight">
                <a className="ant-dropdown-link no-link-style" href={DEMO.link} >
                  <Avatar src={this.state.url || ''} size="small">{this.props.user && this.props.user.nickoperador[0]}</Avatar>
                  <span className="avatar-text d-none d-md-inline">{this.props.user && this.props.user.nickoperador}</span>
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
