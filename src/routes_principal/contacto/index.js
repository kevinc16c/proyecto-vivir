import React from 'react';
import { connect } from 'react-redux';
import {api} from './api'
import { Col, Row, Input, Divider, Form, Layout, Card, Button, message } from 'antd';
import Header from '../../components/LayoutPrincipal/Header';
import Footer from '../../components/LayoutPrincipal/Footer';
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
        try {
            const response = await api.provincias.getLista()
            if(response.status === "success"){
                this.setState({provincias:response.data.provincias})
            }
            this.setState({
                data:this.props.data
            })
        } catch (e) {
            message.error(e.toString(), 7);
        }
    }

    handleSubmit = (e) => {

    }



    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div style={{backgroundColor:'#019489'}}>
                <Layout >
                    <Header />
                </Layout>
                <body className="grad" style={{backgroundColor:'#019489', marginBottom:20}}>
                    <div className="centered container-fluid" >
                        <div className="row">
                            <img alt="vcp-logo" src="assets/Vivir-Carlos-Paz-Logo-Color-1.png" class="img-fluid" style={{ display: 'block', marginRight: 'auto', marginLeft: 'auto' }} />
                        </div>

                        <div className="row">
                            <Card style={{ display: 'block', marginRight: 'auto', marginLeft: 'auto', width:'50%', borderRadius:5 }}>
                                <Form style={{ marginTop: 10 }}>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <FormItem label="Nombre:" {...{
                                                labelCol: { sm: { span: 5 }, },
                                                wrapperCol: { sm: { span: 19 }, },
                                            }}>
                                                {getFieldDecorator('nombre', {
                                                    rules: [{ required: true, message: 'Este campo es requerido' }],
                                                })(
                                                    <Input placeholder="Nombre y apellido" />
                                                )}
                                            </FormItem>

                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <FormItem label="Provincia" {...{
                                                labelCol: { sm: { span: 5 }, },
                                                wrapperCol: { sm: { span: 19 }, },
                                            }}>
                                                {getFieldDecorator('provincia', {
                                                    rules: [{ required: true, message: 'Este campo es requerido' }],
                                                })(

                                                    <Input placeholder="Provincia" />
                                                    // <Select
                                                    //     placeholder="Provincia"
                                                    //     optionFilterProp="children"
                                                    //     showSearch
                                                    //     filterOption={(input, option) =>
                                                    //         option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                                    //     }
                                                    // >
                                                    //     {this.state.provincias && this.state.provincias.map((data, index) => {
                                                    //         return <Select.Option value={data.idprovincia} key={index}>{data.nombrepcia}</Select.Option>
                                                    //     })}
                                                    // </Select>
                                                )}
                                            </FormItem>

                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <FormItem label="Localidad" {...{
                                                labelCol: { sm: { span: 5 }, },
                                                wrapperCol: { sm: { span: 19 }, },
                                            }}>
                                                {getFieldDecorator('localidad', {
                                                    rules: [{ required: true, message: 'Este campo es requerido' }],
                                                })(
                                                    <Input placeholder="Localidad" />
                                                )}
                                            </FormItem>

                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <FormItem label="Asunto" {...{
                                                labelCol: { sm: { span: 5 }, },
                                                wrapperCol: { sm: { span: 19 }, },
                                            }}>
                                                {getFieldDecorator('asunto', {
                                                    rules: [{ required: false, message: 'Este campo es requerido' }],
                                                })(
                                                    <Input placeholder="Asunto..." />
                                                )}
                                            </FormItem>

                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <FormItem label="Mensaje" {...{
                                                labelCol: { sm: { span: 5 }, },
                                                wrapperCol: { sm: { span: 19 }, },
                                            }}>
                                                {getFieldDecorator('mensaje', {
                                                    rules: [{ required: false, message: ' ' }],
                                                })(
                                                    <TextArea placeholder="Mensaje breve" />
                                                )}
                                            </FormItem>

                                        </Col>
                                    </Row>
                                    <Divider />
                                    <Button type="primary" htmlType="submit" icon="save"
                                        style={{ marginTop: 5, float: 'right', marginBottom: 10 }}
                                        onClick={this.handleSubmit}>
                                        Enviar
							        </Button>
                                </Form>
                            </Card>
                        </div>
                    </div>
                </body>
                <Footer/>
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