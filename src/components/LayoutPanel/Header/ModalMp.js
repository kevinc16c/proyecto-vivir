// import React from 'react';
// import { api } from './api';
// import { connect } from 'react-redux';
// import { message, Form, Input, Row, Col, Modal, Divider, InputNumber } from 'antd';
// import _ from 'lodash';

// const FormItem = Form.Item;
// class Nuevo extends React.Component {

//     state = {
//         confirmLoading: false,
//         totalDataSize: 10000,
//     }

//     async componentDidMount() {
//         this.fetch({
//             limite: 10,
//             pagina: 1,
//         });
//     }

//     fetch = async (params = {}) => {

//     }

//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.form.validateFields(async (err, values) => {
//             if (!err) {
//                 try {
//                     this.setState({
//                         confirmLoading: true,
//                     })
//                     const response = await api.rubros.create({
//                         ...values,
//                     });
//                     if (response.status === "success") {
//                         this.props.closeModal();
//                     } else {
//                         message.error(response.message, 7);
//                     }
//                 } catch (e) {
//                     message.error(e.toString(), 7);
//                 } finally {
//                     this.setState({
//                         confirmLoading: false,
//                     })
//                 }
//             }
//         })
//     }

//     render() {
//         const { getFieldDecorator } = this.props.form;
//         return (
//             <Modal
//                 visible={true}
//                 confirmLoading={this.state.confirmLoading}
//                 onOk={this.handleSubmit}
//                 onCancel={this.props.closeModal}
//                 cancelText="Cancelar"
//                 okText="Aceptar"
//                 width={700}
//             >
//                 <section className="form-v1-container col-md-12">
//                     <
//                 </section>
//             </Modal>
//         );
//     }
// }


// const mapStateToProps = (state) => ({
//     user: state.user,
// });

// const WrappedNuevo = Form.create()(Nuevo);

// export default connect(
//     mapStateToProps,
// )(WrappedNuevo);