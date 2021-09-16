import React from 'react';
import { connect } from 'react-redux';

class Dashboard extends React.Component {

  render() {
    return (
      <body className="grad">
        <div className="centered container-fluid" >
          <div className="row"  >
            <img src="assets/Vivir-Carlos-Paz-Logo-Color-1.png" class="img-fluid" style={{ display: 'block', marginRight: 'auto', marginLeft: 'auto' }} />
          </div>
          <div className="row" class="d-flex justify-content-center">
            <div className="col-auto" className="pr-1">
              <a href="https://play.google.com/store/apps/details?id=com.girqta.vivircarlospaz" target="noopener noreferrer"><img src="assets/store/google-play.png" class="img-fluid" /></a>
            </div>
            <div className="col-auto" className="p-0">
              <a href="https://apps.apple.com/us/app/vivir-carlos-paz/id1552617132" target="noopener noreferrer"><img src="assets/store/ios.png" class="img-fluid" /></a>
            </div>
          </div>
        </div>
      </body>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    layout: state.settings.layout,
    user: state.user,
  }
};

export default connect(
  mapStateToProps
)(Dashboard);

