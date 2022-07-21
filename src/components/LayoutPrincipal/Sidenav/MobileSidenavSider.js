import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Logo from 'components/Logo';
import APPCONFIG from 'constants/appConfig';
import DEMO from 'constants/demoData';
import AppMenu from './Menu';
const { Sider } = Layout;

class AppSidenav extends React.Component {
  render() {
    const { sidenavWidth, colorOption } = this.props;

    return (
      <Sider
        trigger={null}
        width={sidenavWidth}
        id="app-sidenav"
        className={classnames('app-sidenav sidenav-bg-light', {
          // 'sidenav-bg-light': ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) >= 0,
          // 'sidenav-bg-dark': ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) < 0
        })}
      >
        <section
          style={{ backgroundColor: '#00C6B7' }}
          className={classnames('sidenav-header')}
        >
          <a href="#/admin/inicio" className="brand" style={{ fontSize: 28 }}>
            <img alt="vcp" src="assets/Vivir-Carlos-Paz-Logo-Blanco.png" className="pl-3 pb-1" />
          </a>
        </section>

        <div className="sidenav-content" ref="sidenavContent">
          <AppMenu isMobileNav={true} />
        </div>
      </Sider>
    );
  }
}

const mapStateToProps = state => ({
  sidenavWidth: state.settings.sidenavWidth,
  colorOption: state.settings.colorOption
});

export default connect(
  mapStateToProps,
)(AppSidenav);
