import React from 'react';
import { connect } from 'react-redux';
import './styles.scss'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Table, Breadcrumb, Input, Button, Dropdown, Menu, Modal } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { Resizable } from 'react-resizable';
import queryString from 'query-string';
import {api} from './api';
import {utils} from 'utils';
import NuevoUser from './components/Nuevo';
import EditarUser from './components/Editar';
import BlanqueoClave from './components/BlanqueoClave';

const ResizeableTitle = (props) => { 
  const { onResize, width, ...restProps } = props;
 
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

class Users extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            q: '',
            searchText: '',
            pagination: {showSizeChanger:true,pageSizeOptions:['10','25','50','100']},
            loading: false,
            columns: [{
                title: 'Id',
                dataIndex: 'id',
                sorter: true,
                key: 'id',
                width: 100,
            },{
                title: 'Usuario',
                dataIndex: 'usuario',
                sorter: true,
                key: 'usuario',
                width: 100,
            },{
                title: 'Nombre',
                dataIndex: 'nombre',
                sorter: true,
                key: 'nombre',
            
                width: 200,
            },{
                title: 'Email',
                dataIndex: 'mail',
                sorter: true,
                key: 'mail',
                width: 150,
        },{
            title: 'Acción',
            key: 'action',
            width: 1,
            render: (text, record) => {
                return (
                    <Dropdown trigger={['click']} overlay={
                        <Menu>
                            {this.props.user && utils.checkRol(1, this.props.user.roles) && !record.baja &&
                                <Menu.Item key="1" onClick={()=>{
                                    this.setState({userUpdate: record, openEditar: true,})
                                }}>Editar</Menu.Item>
                            }
                            {this.props.user && utils.checkRol(1, this.props.user.roles) && !record.baja &&
                                <Menu.Item key="2" onClick={()=>this.showDeleteConfirm(record.id)}>Desactivar</Menu.Item>
                            }
                            {this.props.user && utils.checkRol(1, this.props.user.roles) && record.baja &&
                                <Menu.Item key="2" onClick={()=>this.showActiveConfirm(record.id)}>Activar</Menu.Item>
                            }
                            {this.props.user && utils.checkRol(1,this.props.user.roles) && !record.baja &&
                                <Menu.Item key="3" onClick={()=>this.openBlanquearClave(record)}>Blanqueo de Clave</Menu.Item>
                            }
                        </Menu>
                    }>
                        <Button size="small">
                            <EllipsisOutlined />
                        </Button>
                    </Dropdown>
                );
            },
          }],
      }
    }

    componentDidMount() {
      this.fetch();
    }

    showDeleteConfirm = async (id) => {
        const _this = this;
        Modal.confirm({
            title: '¿Esta seguro que desea desactivar el usuario?',
            okText: 'Aceptar',
            okType: 'danger',
            cancelText: 'Cancelar',
            async onOk() {
                await api.user.baja(id);
                _this.fetch();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    showActiveConfirm = async (id) => {
        const _this = this;
        Modal.confirm({
            title: '¿Esta seguro que desea activar el usuario?',
            okText: 'Aceptar',
            okType: 'danger',
            cancelText: 'Cancelar',
            async onOk() {
                await api.user.alta(id);
                _this.fetch();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

  components = {
    header: {
      cell: ResizeableTitle,
    },
  }

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      limit: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order === "ascend" ? "ASC" : "DESC",
      ...filters,
    });
  }

  fetch = async (params = {}) => {
    this.setState({ loading: true });

    try {
        const response = await api.user.getAll(queryString.stringify({
          ...params,
          q: this.state.q ? this.state.q : '',
        }))

        const pagination = { ...this.state.pagination };

        if (response.status === "success") {
            pagination.total = response.data.totalDataSize;

            this.setState({
              loading: false,
              data: response.data.usuarios,
              pagination,
            });
        }else {
            this.setState({
              loading: false,
              data: [],
              pagination,
            });
            message.error(response.message, 5);
        }
    } catch (e) {
        this.setState({
          loading: false,
          data: [],
        });
        message.error(e.toString(), 5);
    }
  }

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  openBlanquearClave = (user) => {
      this.setState({
          openBlanquearClave: true,
          userPass: user,
      })
  }

  search = (text) => {
    this.setState({q:text}, ()=>{
        this.fetch();
    })
  }

  render() {
    let columns = [...this.state.columns];
    columns = columns.map((col, index) => ({
        ...col,
        onHeaderCell: column => ({
            width: column.width,
            onResize: this.handleResize(index),
        }),
    }));

    return (
        <div className="container-fluid no-breadcrumb">
            <QueueAnim type="bottom" className="ui-animate">
                <Breadcrumb>
                    <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
                </Breadcrumb>



                <Button type="primary" icon={<PlusOutlined />}
                    style={{ marginTop:-25, float:'right' }}
                    onClick={()=>{
                    this.setState({openNuevo:true})
                }}>
                    Nuevo
                </Button>

                <section className="box box-default box-ant-table-v1" style={{marginTop:15}}>
                    <div className="box-body">
                        <h4 style={{marginBottom:15, display: 'inline-block'}}>Usuarios</h4>
                        <Input.Search
						  placeholder="Buscar..."
						  onSearch={value => this.search(value)}
						  style={{ width: 400, marginTop: 0, float:'right', display: 'inline-block' }}
						/>
                        <Table
                            bordered
                            components={this.components}
                            columns={columns}
                            rowKey={record => record.id}
                            dataSource={this.state.data}
                            pagination={this.state.pagination}
                            loading={this.state.loading}
                            onChange={this.handleTableChange}
                            rowClassName={ (record, index) => record.baja ? 'deleteRow' : ''}
                            onRow={(record, rowIndex) => {
                                return {
                                  onDoubleClick: (e) => {
                                      if (this.props.user && utils.checkRol(1, this.props.user.roles) && !record.baja) {
                                          this.setState({openEditar:true, userUpdate: record,})
                                      }
                                  },
                                };
                            }}
                        />
                    </div>
                </section>
            </QueueAnim>

            {this.state.openNuevo &&
                <NuevoUser
                    closeModal={()=>this.setState({openNuevo:false,})}
                    onCreate={()=>this.fetch()}
                />
            }
            {this.state.openEditar &&
                <EditarUser
                    closeModal={()=>this.setState({openEditar:false,})}
                    onUpdate={()=>this.fetch()}
                    idusuario={this.state.userUpdate.id}
                    history={this.props.history}
                    
                />
            }
            {this.state.openBlanquearClave &&
                <BlanqueoClave
                    closeModal={()=>this.setState({openBlanquearClave:false})}
                    userPass={this.state.userPass}
                />
            }
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
    }
};

export default connect(
  mapStateToProps
)(Users);
