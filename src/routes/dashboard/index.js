import React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import Pedidos from './components/Pedidos';

class Dashboard extends React.Component {

  render() {
    return (
      <div className="container-fluid no-breadcrumb page-dashboard">
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><h4>Pedidos</h4><Pedidos /> </div>
        </QueueAnim>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    layout: state.settings.layout,
    boxedLayout: state.settings.boxedLayout,
    fixedSidenav: state.settings.fixedSidenav,
    fixedHeader: state.settings.fixedHeader,
    user: state.user,
  }
};

export default connect(
  mapStateToProps
)(Dashboard);

