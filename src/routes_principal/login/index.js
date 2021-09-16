import React from 'react';
import Header from '../../components/LayoutPrincipal/Header'
import { Layout } from 'antd'; import './styles.scss';

class Page extends React.Component {
  render() {

    return (
      <div>
        <Layout >
          <Header />
        </Layout>
        <body className="grad" >
          <div className="centered container-fluid">
            <div className="row"  >
              <img alt="logo-vcp" src="assets/Vivir-Carlos-Paz-Logo-Color-1.png" className="img-fluid" style={{ display: 'block', marginRight: 'auto', marginLeft: 'auto' }} />
            </div>
            <div className="row" class="d-flex justify-content-center">
              <div className="col-auto pr-1">
                <a href="https://play.google.com/store/apps/details?id=com.girqta.vivircarlospaz" target="noopener noreferrer"><img alt="GPlay-VCP" src="assets/store/google-play.png" className="img-fluid" /></a>
              </div>
              <div className="col-auto p-0" >
                <a href="https://apps.apple.com/us/app/vivir-carlos-paz/id1552617132" target="noopener noreferrer"><img alt="Itu-VCP" src="assets/store/ios.png" className="img-fluid" /></a>
              </div>
            </div>
          </div>
        </body>

      </div>
    )
  }
}

export default Page;
