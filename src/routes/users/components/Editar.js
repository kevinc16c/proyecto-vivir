import React from 'react';
import {api} from '../api';
import { connect } from 'react-redux';
import { message, Modal, Form, Icon, Input, Select, Tabs, Transfer } from 'antd';
import queryString from 'query-string';

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

class EditarUser extends React.Component {

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

    async componentDidMount(){
        try {
            const responseUser = await api.user.get(this.props.idusuario);
            if (responseUser.status === "success") {
                this.setState({
                    userUpdate: responseUser.data.usuario,
                    targetKeysFranquicias: responseUser.data.usuario.franquicias ? responseUser.data.usuario.franquicias.map((data)=>{return JSON.stringify(data)}) : [],
                    targetKeysRoles: responseUser.data.usuario.roles ? responseUser.data.usuario.roles.map((data)=>{return JSON.stringify(data)}) : [],
                    targetKeysSistemas: responseUser.data.usuario.sistemas ? responseUser.data.usuario.sistemas.map((data)=>{return JSON.stringify(data)}) : [],
                })
            }else {
                message.error(responseUser.message, 7);
            }

            const responseFranquicias = await api.franquicias.getAll(queryString.stringify({page:1, limit: 50000}));
            if (responseFranquicias.status === "success") {
                this.setState({
                    franquiciasall: responseFranquicias.data.franquicias,
                })
            }else {
                message.error(responseFranquicias.message, 7);
            }

            const responseUserFranquicias = await api.user.getAllFranquicias();
            if (responseUserFranquicias.status === "success") {
                this.setState({
                    franquicias: responseUserFranquicias.data.franquicias,
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

            if (!this.state.targetKeysFranquicias || this.state.targetKeysFranquicias.length === 0) {
                message.warning('Asigne al menos una franquicia al usuario.',10);
                return
            }

            if (!this.state.targetKeysRoles || this.state.targetKeysRoles.length === 0) {
                message.warning('Asigne al menos un rol al usuario.',10);
                return
            }

            if (!this.state.targetKeysSistemas || this.state.targetKeysSistemas.length === 0) {
                message.warning('Asigne al menos un acceso de sistema.',10);
                return
            }

            if (!err) {
                try {
                    this.setState({
                        confirmLoading: true,
                    })
                    const response = await api.user.update({
                        id: this.state.userUpdate.id,
                        ...values,
                        franquicias: this.state.targetKeysFranquicias ? this.state.targetKeysFranquicias.map((data)=> JSON.parse(data)) : [],
                        roles: this.state.targetKeysRoles ? this.state.targetKeysRoles.map((data)=> JSON.parse(data)) : [],
                        sistemas: this.state.targetKeysSistemas ? this.state.targetKeysSistemas.map((data)=> JSON.parse(data)) : [],
                    });
                    if (response.status === "success") {
                        await this.props.onUpdate();
                    }else {
                        message.error(response.message, 7);
                    }

                } catch (e) {
                    message.error(e.toString(), 7);
                } finally {
                    await this.setState({
                        confirmLoading: false,
                    })
                    if(this.props.user.usuario === this.state.userUpdate.usuario){
                        this.props.history.push('/login')
                    }else{
                        this.props.closeModal()
                    }
                }
            }
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
              okText="Guardar"
              width={600}
            >
                <section className="form-v1-container">

                    <h4 style={{marginBottom:15}}><Icon type="user"/> Editar usuario</h4>
                    <Form layout="inline">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Datos" key="1">
                                <FormItem label="Usuario" {...formItemLayout} style={{width:"100%"}} >
                                    {getFieldDecorator('usuario', {
                                        initialValue: this.state.userUpdate ? this.state.userUpdate.usuario : '',
                                        rules: [{ required: true, message: 'El campo es obligatorio.' }],
                                        })(
                                        <Input size="default" placeholder="Usuario" disabled />
                                    )}
                                </FormItem>
                                <FormItem label="Nombre" {...formItemLayout} style={{width:"100%"}}>
                                    {getFieldDecorator('nombre', {
                                        initialValue: this.state.userUpdate ? this.state.userUpdate.nombre : '',
                                        rules: [{ required: true, message: 'El campo es obligatorio.' }],
                                        })(
                                        <Input size="default" type="clave" placeholder="Nombre" />
                                    )}
                                </FormItem>
                                <FormItem label="Email" {...formItemLayout} style={{width:"100%"}}>
                                    {getFieldDecorator('mail', {
                                        initialValue: this.state.userUpdate ? this.state.userUpdate.mail : '',
                                        rules: [{ required: true, message: 'El campo es obligatorio.' }],
                                        })(
                                        <Input size="default" type="clave" htmltype="email" placeholder="Email" />
                                    )}
                                </FormItem>
                                <FormItem label="Franquicia" {...formItemLayout} style={{width:"100%"}}>
                                    {getFieldDecorator('franquicias_id', {
                                        initialValue: this.state.userUpdate ? this.state.userUpdate.franquicias_id : '',
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
                                  dataSource={this.state.franquicias && this.state.franquicias.map((data,index)=>{
                                      return {
                                        key: JSON.stringify(data),
                                        title: data.codigo + ' - ' +data.franquicia,
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
                                        width: 250,
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
                                      width: 250,
                                      height: 220,
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

const WrappedEditarUser = Form.create()(EditarUser);

export default connect(
  mapStateToProps,
)(WrappedEditarUser);
