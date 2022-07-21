import React from 'react';
import {api} from '../api';
import { connect } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Modal, Input, Select, Tabs, Transfer } from 'antd';
import queryString from 'query-string';

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

class NuevoUser extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            disabledLogin: false,
            confirmLoading: false,
            targetKeysRoles: [],
            targetKeysFranquicias: [],
            targetKeysSistemas: [],
            selectedKeysRoles: [],
            selectedKeysFranquicias: [],
            selectedKeysSistemas: [],
        }
    }

    onChange = (value) => {
        this.setState({ value });
    }

    async componentDidMount(){
        try {
            const responseFranquicias = await api.franquicias.getAll(queryString.stringify({page:1, limit: 500}));
            if (responseFranquicias.status === "success") {
                this.setState({
                    franquicias: responseFranquicias.data.franquicias,
                })
            }else {
                message.error(responseFranquicias.message, 7);
            }

            
            const responseUserFranquicias = await api.user.getAllFranquicias();
            if (responseUserFranquicias.status === "success") {
                this.setState({
                    franquiciasUsuario: responseUserFranquicias.data.franquicias,
                })
            }else {
                message.error(responseUserFranquicias.message, 7);
            }

          
            const responseUserRoles = await api.user.getAllRoles();
            if (responseUserRoles.status === "success") {
                this.setState({
                    roles: responseUserRoles.data.roles ? responseUserRoles.data.roles : [],
                })
            }else {
                message.error(responseUserRoles.message, 7);
            }

            
            const responseUserSistemas = await api.user.getAllSistemas();
            if (responseUserSistemas.status === "success") {
                this.setState({
                    sistemas: responseUserSistemas.data.sistemas ? responseUserSistemas.data.sistemas : [],
                })
            }else {
                message.error(responseUserSistemas.message, 7);
            }

        } catch (e) {
            message.error(e.toString(), 7);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields(async (err, values) => {
            this.setState({
                confirmLoading: true,
            })

            if (!err) {
                try {

                    if (!this.state.targetKeysFranquicias || this.state.targetKeysFranquicias.length === 0) {
                        message.warning('Asigne al menos una franquicia al usuario.',10);
                        this.setState({
                            confirmLoading: false,
                        })
                        return
                    }

                    if (!this.state.targetKeysRoles || this.state.targetKeysRoles.length === 0) {
                        message.warning('Asigne al menos un rol al usuario.',10);
                        this.setState({
                            confirmLoading: false,
                        })
                        return
                    }

                    if (!this.state.targetKeysSistemas || this.state.targetKeysSistemas.length === 0) {
                        message.warning('Asigne al menos un acceso de sistema.',10);
                        this.setState({
                            confirmLoading: false,
                        })
                        return
                    }

                    const response = await api.user.create({
                        ...values,
                        franquicias: this.state.targetKeysFranquicias ? this.state.targetKeysFranquicias.map((data)=> JSON.parse(data)) : [],
                        roles: this.state.targetKeysRoles ? this.state.targetKeysRoles.map((data)=> JSON.parse(data)) : [],
                        sistemas: this.state.targetKeysSistemas ? this.state.targetKeysSistemas.map((data)=> JSON.parse(data)) : [],
                    });

                    if (response.status === "success") {
                        this.props.onCreate();
                        this.props.closeModal();
                    }else {
                        message.error(response.message, 7);
                    }
                } catch (e) {
                    message.error(e.toString(), 7);
                    this.setState({
                        confirmLoading: false,
                    })
                }
            }

            this.setState({
                confirmLoading: false,
            })

        })
    }

    handleChangeRoles = (nextTargetKeys, direction, moveKeys) => {
        this.setState({ targetKeysRoles: nextTargetKeys });
    }

    handleSelectChangeRoles = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeysRoles: [...sourceSelectedKeys, ...targetSelectedKeys] });
    }

    handleScrollRoles = (direction, e) => {
    }

    handleChangeFranquicias = (nextTargetKeys, direction, moveKeys) => {
        this.setState({ targetKeysFranquicias: nextTargetKeys });
    }

    handleSelectChangeFranquicias = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeysFranquicias: [...sourceSelectedKeys, ...targetSelectedKeys] });
    }

    handleScrollFranquicias = (direction, e) => {
    }

    handleChangeSistemas = (nextTargetKeys, direction, moveKeys) => {
        this.setState({ targetKeysSistemas: nextTargetKeys });
    }

    handleSelectChangeSistemas = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeysSistemas: [...sourceSelectedKeys, ...targetSelectedKeys] });
    }

    handleScrollSistemas = (direction, e) => {
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };
        const {
            selectedKeysRoles,
            selectedKeysFranquicias,
            selectedKeysSistemas
        } = this.state;
        return (
            <Modal
              visible={true}
              confirmLoading={this.state.confirmLoading}
              onOk={this.handleSubmit}
              onCancel={this.props.closeModal}
              cancelText="Cancelar"
              okText="Crear"
              width={620}
            >
                <section className="form-v1-container col-md-12">

                    <h4 style={{marginBottom:15}}><UserOutlined /> Nuevo usuario</h4>
                    <Form  layout="inline">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Datos" key="1">
                                <FormItem label="Usuario" {...formItemLayout} style={{width:"100%"}}>
                                    {getFieldDecorator('usuario', {
                                        rules: [{ required: true, message: 'El campo es obligatorio.' }],
                                        })(
                                        <Input size="default" placeholder="Usuario" />
                                    )}
                                </FormItem>
                                <FormItem label="Nombre" {...formItemLayout} style={{width:"100%"}}>
                                    {getFieldDecorator('nombre', {
                                        rules: [{ required: true, message: 'El campo es obligatorio.' }],
                                        })(
                                        <Input size="default" placeholder="Nombre" />
                                    )}
                                </FormItem>
                                <FormItem label="Clave" {...formItemLayout} style={{width:"100%"}}>
                                    {getFieldDecorator('clave', {
                                        rules: [{ required: true, message: 'El campo es obligatorio.' }],
                                        })(
                                        <Input size="default" htmltype="password" placeholder="Clave" />
                                    )}
                                </FormItem>
                                <FormItem label="Email" {...formItemLayout} style={{width:"100%"}}>
                                    {getFieldDecorator('mail', {
                                        rules: [{ required: true, message: 'El campo es obligatorio.' }],
                                        })(
                                        <Input size="default" type="clave" htmltype="email" placeholder="Email" />
                                    )}
                                </FormItem>
                                <FormItem label="Franquicia" {...formItemLayout} style={{width:"100%"}}>
                                    {getFieldDecorator('franquicias_id', {
                                        rules: [{ required: true, message: ' ' }],
                                        })(
                                            <Select
                                            style={{width:"100%"}}
                                            optionFilterProp="children"
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                                            }
                                            >
                                                {this.state.franquicias && this.state.franquicias.map((data, index)=>{
                                                    let usu= data.codigo + ' - ' + data.franquicia
                                                    return <Option value={data.id} key={index}>{usu}</Option>
                                                })}
                                            </Select>
                                    )}
                                </FormItem>
                            </TabPane>
                            <TabPane tab="Franquicias" key="2">
                                <Transfer
                                  dataSource={this.state.franquiciasUsuario && this.state.franquiciasUsuario.map((data,index)=>{
                                      return {
                                        key: JSON.stringify(data),
                                        title: data.franquicia,
                                        description: 'okok',
                                      }
                                  })}
                                    titles={['Franquicias', 'Franquicias asignadas']}
                                    targetKeys={this.state.targetKeysFranquicias ? this.state.targetKeysFranquicias : []}
                                    selectedKeys={selectedKeysFranquicias}
                                    onChange={this.handleChangeFranquicias}
                                    onSelectChange={this.handleSelectChangeFranquicias}
                                    onScroll={this.handleScrollFranquicias}
                                    render={item => item.title}
                                    listStyle={{
                                        width: 240,
                                        height: 210,
                                    }}
                                />
                            </TabPane>
                            <TabPane tab="Roles" key="3">
                                <Transfer
                                  dataSource={this.state.roles && this.state.roles.map((data,index)=>{
                                      return {
                                        key: JSON.stringify(data),
                                        title: data.rol,
                                        description: 'okok',
                                      }
                                  })}
                                  titles={['Roles', 'Roles asignados']}
                                  targetKeys={this.state.targetKeysRoles ? this.state.targetKeysRoles : []}
                                  selectedKeys={selectedKeysRoles}
                                  onChange={this.handleChangeRoles}
                                  onSelectChange={this.handleSelectChangeRoles}
                                  onScroll={this.handleScrollRoles}
                                  render={item => item.title}
                                  listStyle={{
                                      width: 240,
                                      height: 210,
                                  }}
                                />
                            </TabPane>
                            <TabPane tab="Sistemas" key="4">
                                <Transfer
                                  dataSource={this.state.sistemas && this.state.sistemas.map((data,index)=>{
                                      return {
                                        key: JSON.stringify(data),
                                        title: data.sistema,
                                        description: 'okok',
                                      }
                                  })}
                                  titles={['Sistemas', 'Sistemas asignados']}
                                  targetKeys={this.state.targetKeysSistemas ? this.state.targetKeysSistemas : []}
                                  selectedKeys={selectedKeysSistemas}
                                  onChange={this.handleChangeSistemas}
                                  onSelectChange={this.handleSelectChangeSistemas}
                                  onScroll={this.handleScrollSistemas}
                                  render={item => item.title}
                                  listStyle={{
                                      width: 240,
                                      height: 210,
                                  }}
                                />
                            </TabPane>
                        </Tabs>
                    </Form>
                </section>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const WrappedNuevoUser = Form.create()(NuevoUser);

export default connect(
  mapStateToProps,
)(WrappedNuevoUser);
