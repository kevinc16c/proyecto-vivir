import React from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { Tabs } from 'antd';
import DatosPersonales from './components/DatosPersonales'

const TabPane = Tabs.TabPane;

class Profile extends React.Component {

    render(){
        return (
            <div className="container-fluid no-breadcrumb">
              <QueueAnim type="bottom" className="ui-animate">
                  <div className="box box-default">
                    <div className="box-body">
                      <Tabs
                        defaultActiveKey="1"
                        size="small"
                      >
                        <TabPane tab="Datos personales" key="1">
                            <DatosPersonales id={this.props.match.params.id}/>
                        </TabPane>

                      </Tabs>
                    </div>
                  </div>
              </QueueAnim>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
    }
};

export default connect(
  mapStateToProps
)(Profile);
