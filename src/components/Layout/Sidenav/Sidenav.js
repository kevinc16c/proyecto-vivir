import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Logo from 'components/Logo';
import { toggleCollapsedNav, toggleOffCanvasNav } from 'actions/settings';
import AppMenu from './Menu';
const { Sider } = Layout;

class AppSidenav extends React.Component {
  render() {
    const { collapsedNav, offCanvasNav, sidenavWidth } = this.props;
    const collapsedWidth = offCanvasNav ? 0 : 80;

    return (

      <Sider
        collapsible
        collapsed={collapsedNav || offCanvasNav}
        collapsedWidth={collapsedWidth}
        trigger={null}
        width={sidenavWidth}
        id="app-sidenav"
        className={classnames('app-sidenav d-none d-md-flex sidenav-bg-light')}
      >
        <section
          className={'sidenav-header'}
          style={{ backgroundColor: '#00C6B7' }}
        >
          
          {collapsedNav && <Logo />}
          <a href="#/admin/inicio" className="brand" style={{ fontSize: 28 }}>
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
  colorOption: state.settings.colorOption
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
