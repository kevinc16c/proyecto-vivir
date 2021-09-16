import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Layout, Row } from 'antd';
import Logo from 'components/Logo';
// import APPCONFIG from 'constants/appConfig';
// import DEMO from 'constants/demoData';
import { toggleCollapsedNav, toggleOffCanvasNav } from 'actions/settings';

import AppMenu from './Menu';
const { Sider } = Layout;

class AppSidenav extends React.Component {
  render() {
    const { collapsedNav, offCanvasNav, sidenavWidth, colorOption } = this.props;
    const collapsedWidth = offCanvasNav ? 0 : 80;
    const id_user = this.props.user && this.props.user.id
    
    return (
      <Sider
        collapsible
        collapsed={collapsedNav || offCanvasNav}
        collapsedWidth={collapsedWidth}
        trigger={null}
        width={sidenavWidth}
        id="app-sidenav"
        className={classnames('app-sidenav d-none d-md-flex sidenav-bg-light', {
          // 'sidenav-bg-light': ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) >= 0,
          // 'sidenav-bg-dark': ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) < 0
        })}
      >
        <section
          className={'sidenav-header'}
          style={{ backgroundColor: '#00C6B7' }}
        // className={classnames('sidenav-header', {
        //   'bg-dark': ['11', '31'].indexOf(colorOption) >= 0,
        //   'bg-white': colorOption === '21',
        //   'bg-primary': ['12', '22', '32'].indexOf(colorOption) >= 0,
        //   'bg-success': ['13', '23', '33'].indexOf(colorOption) >= 0,
        //   'bg-info': ['14', '24', '34'].indexOf(colorOption) >= 0,
        //   'bg-warning': ['15', '25', '35'].indexOf(colorOption) >= 0,
        //   'bg-danger': ['16', '26', '36'].indexOf(colorOption) >= 0
        // })}
        >
          {collapsedNav && <Logo />}
          <a href={"#/panel/lugares/" + id_user} className="brand" style={{ fontSize: 28 }}>
            <img alt="vcp" src="assets/Vivir-Carlos-Paz-Logo-Blanco.png" className="pl-3 pb-1" />
          </a>
        </section>

        <div className="sidenav-content" ref="sidenavContent">
          <AppMenu />
        </div>

        <div className="sidenav-footer">

        </div>
      </Sider>
    );
  }
}

const mapStateToProps = state => ({
  collapsedNav: state.settings.collapsedNav,
  offCanvasNav: state.settings.offCanvasNav,
  sidenavWidth: state.settings.sidenavWidth,
  colorOption: state.settings.colorOption,
  location: state.routing.location,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleToggleCollapsedNav: (isCollapsedNav) => {
      dispatch(toggleCollapsedNav(isCollapsedNav));
    },
    handleToggleOffCanvasNav: (isOffCanvasNav) => {
      dispatch(toggleOffCanvasNav(isOffCanvasNav));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidenav);
