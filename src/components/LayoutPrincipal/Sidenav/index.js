import React from 'react';
import Sidenav from './Sidenav';
import { connect } from 'react-redux';
import MobileSidenav from './MobileSidenav';

class AppSidenav extends React.Component {

  render() {

    return (
      <div className="app-sidenav-container">
        <MobileSidenav user={this.props.user} lugar={this.props.lugar} />
        <Sidenav user={this.props.user} lugar={this.props.lugar} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  location: state.routing.location,
  user: state.user,
  lugar: state.lugar,
});

export default connect(
  mapStateToProps,
)(AppSidenav);