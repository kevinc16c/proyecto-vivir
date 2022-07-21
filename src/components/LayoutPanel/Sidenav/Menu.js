import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  ContainerOutlined,
  EnvironmentOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TagsOutlined,
} from '@ant-design/icons';

import { Menu, Tooltip, Badge } from 'antd';
import APPCONFIG from 'constants/appConfig';
import { toggleOffCanvasMobileNav } from 'actions/settings';

const SubMenu = Menu.SubMenu;

class AppMenu extends React.Component {

  rootMenuItemKeys = [ // without submenu
    '/app/configuracion',
    '/app/administracion',
  ]
  rootSubmenuKeys = [
    '/app/usuarios',
  ];
  state = { openKeys: ['/app/gestion',], notificationTitle: '' };

  onOpenChange = (openKeys) => {
    // AccordionNav
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  onMenuItemClick = async (item) => {
    // AccordionNav
    const itemKey = item.key;
    if (this.rootMenuItemKeys.indexOf(itemKey) >= 0) {
      this.setState({ openKeys: [itemKey] });
    }

    const { isMobileNav } = this.props;
    if (isMobileNav) {
      this.closeMobileSidenav();
    }
  }

  closeMobileSidenav = () => {
    if (APPCONFIG.AutoCloseMobileNav) {
      const { handleToggleOffCanvasMobileNav } = this.props;
      handleToggleOffCanvasMobileNav(true);
    }
  }

  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      // hide submenu if there's no children items
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={item.name}
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return <Menu.Item key={item.path}><Link to={item.path}><span>{item.menuName || item.name}</span></Link></Menu.Item>;
    }
  };

  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item);
        return ItemDom;
      })
      .filter(item => item);
  }

  render() {
    const { collapsedNav, colorOption, location, user } = this.props;
    const menuTheme = ['31', '32', '33', '34', '35', '36'].indexOf(colorOption) >= 0 ? 'light' : 'light';
    const currentPathname = location.pathname;

    const menuProps = collapsedNav
      ? {}
      : {
        openKeys: this.state.openKeys
      }

    return (
      <Menu
        theme={menuTheme}
        mode="inline"
        {...menuProps}
        onOpenChange={this.onOpenChange}
        onClick={this.onMenuItemClick}
        selectedKeys={[currentPathname]}
      >
        <Menu.Item key="/panel/lugares_panel">
          <a href={`#/panel/lugares/${user && user.id}`} onClick={() => { sessionStorage.setItem("lugar_id", null) }}>
            <span>
              <EnvironmentOutlined /><span className="nav-text">Lugares</span>
            </span>
          </a>
        </Menu.Item>
        {currentPathname.includes('panel/lugares') === false &&
          <Menu.Item key="/panel/pedidos">
            <a href={'#/panel/pedidos'} onClick={() => this.setState({ primerPlano: '' })}>
              <span>
                <ShoppingCartOutlined /><span className="nav-text">Pedidos</span>
                <Tooltip placement="bottom">
                  <a
                    href="#/panel/pedidos" className="list-inline-item pl-5">
                    <Badge count={this.state.primerPlano && this.state.primerPlano.data && this.state.primerPlano.data.title}></Badge>
                  </a>
                </Tooltip>
              </span>
            </a>
          </Menu.Item>
        }
        {currentPathname.includes('panel/lugares') === false &&
          <Menu.Item key="/panel/productos">
            <a href={`#/panel/productos`} >
              <span>
                <ShoppingOutlined /><span className="nav-text">Productos</span>
              </span>
            </a>
          </Menu.Item>
        }
        {currentPathname.includes('panel/lugares') === false &&
          <Menu.Item key="/panel/sabores_variedades">
            <a href={`#/panel/sabores_variedades`} >
              <span>
                <ContainerOutlined /><span className="nav-text">Sabores / variedades</span>
              </span>
            </a>
          </Menu.Item>
        }
        {currentPathname.includes('panel/lugares') === false &&
          <Menu.Item key="/panel/promociones">
            <a href={`#/panel/promociones`} >
              <span>
                <TagsOutlined /><span className="nav-text">Promociones</span>
              </span>
            </a>
          </Menu.Item>
        }
        {currentPathname.includes('panel/lugares') === false &&
          <Menu.Item key="/panel/cuentas">
            <a href={`#/panel/cuentas`} >
              <span>
                <ShopOutlined /><span className="nav-text">MarketPlace</span>
              </span>
            </a>
          </Menu.Item>
        }
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return ({
    collapsedNav: state.settings.collapsedNav,
    colorOption: state.settings.colorOption,
    location: state.routing.location,
    user: state.user,
  })
};

const mapDispatchToProps = dispatch => ({
  handleToggleOffCanvasMobileNav: (isOffCanvasMobileNav) => {
    dispatch(toggleOffCanvasMobileNav(isOffCanvasMobileNav));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMenu);
