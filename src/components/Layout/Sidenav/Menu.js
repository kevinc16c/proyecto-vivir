import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import APPCONFIG from 'constants/appConfig';
import { toggleOffCanvasMobileNav } from 'actions/settings';

const SubMenu = Menu.SubMenu;

class AppMenu extends React.Component {

  componentDidMount() {
  }
  // list for AccordionNav

  rootMenuItemKeys = [ // without submenu
    '/app/configuracion',
    '/app/administracion',
  ]
  rootSubmenuKeys = [
    '/app/usuarios',
  ];
  state = { openKeys: ['/app/gestion',], };

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

  onMenuItemClick = (item) => {
    // AccordionNav
    const itemKey = item.key;
    if (this.rootMenuItemKeys.indexOf(itemKey) >= 0) {
      this.setState({ openKeys: [itemKey] });
    }

    //
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

  //
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
    
    const { collapsedNav, location } = this.props;
    const currentPathname = location.pathname;

    const menuProps = collapsedNav
      ? {}
      : {
        openKeys: this.state.openKeys
      }

    return (
      <Menu
        // inlineCollapsed={collapsedNav}
        {...menuProps}
        onOpenChange={this.onOpenChange}
        onClick={this.onMenuItemClick}
        selectedKeys={[currentPathname]}
        mode="inline"
        theme="light"
      >

        <Menu.Item key="/admin/operadores">
          <a href="#/admin/operadores">
            <span>
              <Icon type="user" /><span className="nav-text">Operadores</span>
            </span>
          </a>
        </Menu.Item>
        <Menu.Item key="/admin/propietarios">
          <a href="#/admin/propietarios">
            <span>
              <Icon type="team" /><span className="nav-text">Personas jurídicas</span>
            </span>
          </a>
        </Menu.Item>
        <Menu.Item key="/admin/lugares">
          <a href="#/admin/lugares">
            <span>
              <Icon type="shop" /><span className="nav-text">Lugares</span>
            </span>
          </a>
        </Menu.Item>
        <Menu.Item key="/admin/promociones">
          <a href="#/admin/promociones">
            <span>
              <Icon type="tags" /><span className="nav-text">Promociones</span>
            </span>
          </a>
        </Menu.Item>
        <Menu.Item key="/admin/rubros">
          <a href="#/admin/rubros">
            <span>
              <Icon type="profile" /><span className="nav-text">Rubros</span>
            </span>
          </a>
        </Menu.Item>
        <Menu.Item key="/admin/subrubros">
          <a href="#/admin/subrubros">
            <span>
              <Icon type="profile" /><span className="nav-text">Subrubros</span>
            </span>
          </a>
        </Menu.Item>
        <Menu.Item key="/admin/palabrasclaves">
          <a href="#/admin/palabrasclaves">
            <span>
              <Icon type="file-ppt" /><span className="nav-text">Palabras claves</span>
            </span>
          </a>
        </Menu.Item>
        <Menu.Item key="/admin/productoscategorias">
          <a href="#/admin/productoscategorias">
            <span>
              <Icon type="bars" /><span className="nav-text">Categorías de productos</span>
            </span>
          </a>
        </Menu.Item>
        <Menu.Item key="/admin/farmacias">
          <a href="#/admin/farmacias">
            <span>
              <Icon type="plus-circle" /><span className="nav-text">Farmacias de turno</span>
            </span>
          </a>
        </Menu.Item>
        <Menu.Item key="/admin/eventos">
          <a href="#/admin/eventos">
            <span>
              
              <span className="nav-text">Eventos</span>
            </span>
          </a>
        </Menu.Item>
        <SubMenu
          key="/admin/localidad"
          title={<span><Icon type="environment" /><span className="nav-text">Localidades</span></span>}
        >
          <Menu.Item key="/admin/localidades">
            <a href="#/admin/localidades">
              <span>
                <span className="nav-text">Localidades</span>
              </span>
            </a>
          </Menu.Item>
          <Menu.Item key="/admin/localprovinciasidades">
            <a href="#/admin/provincias">
              <span>
                <span className="nav-text">Provincias</span>
              </span>
            </a>
          </Menu.Item>
          <Menu.Item key="/admin/paises">
            <a href="#/admin/paises">
              <span>
                <span className="nav-text">Países</span>
              </span>
            </a>
          </Menu.Item>
        </SubMenu>
      </Menu>

    )
  }
}

const mapStateToProps = state => {
  return ({
    collapsedNav: state.settings.collapsedNav,
    colorOption: state.settings.colorOption,
    location: state.routing.location
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
