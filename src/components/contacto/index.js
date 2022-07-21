import React from 'react';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import QueueAnim from 'rc-queue-anim';
const FormItem = Form.Item;
const TextArea = Input.TextArea;


class Bases extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.fetch();

    }

    fetch = async (params = {}) => {
    }

    handleSubmit = (e) => {
    }



    render() {
        return (
            <div className="container-fluid no-breadcrumb" style={{ background: '#e0e0e0' }}>
                <QueueAnim type="bottom" className="ui-animate">
                    <div className="row"  >
                        <img src="assets/Vivir-Carlos-Paz-Logo-Color-1.png" class="img-fluid" style={{ display: 'block', marginRight: 'auto', marginLeft: 'auto' }} />
                    </div>
                </QueueAnim>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const WrappedBases = Form.create()(Bases);

export default connect(
    mapStateToProps,
)(WrappedBases);