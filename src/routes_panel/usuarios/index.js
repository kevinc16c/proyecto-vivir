import React from 'react';
import { connect } from 'react-redux';
import './styles.scss'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import {
  message,
  Table,
  PageHeader,
  Divider,
  Breadcrumb,
  Input,
  Button,
  Dropdown,
  Menu,
  Modal,
} from 'antd';
import QueueAnim from 'rc-queue-anim';
import { Resizable } from 'react-resizable';
import queryString from 'query-string';
import { api } from './api';
import { utils } from 'utils';
import NuevoUser from './Nuevo';
import EditarUser from './Editar';
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
  _isMounted = false;
  constructor(props) {
    super(props)
    this.state = {
      q: '',
      searchText: '',
      data: [],
      pagination: {
        showSizeChanger: true,
        current: 1,
        pageSize: 10,
        sortField: "id",
        sortOrder: "desc",
        showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} usuarios`,
        pageSizeOptions: ['10', '25', '50', '100']
      },
      openIndex: true,
      loading: false,
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        key: 'id',
        width: 100,
      }, {
        title: 'Usuario',
        dataIndex: 'usuario',
        sorter: true,
        key: 'usuario',
        width: 100,
      }, {
        title: 'Nombre',
        dataIndex: 'nombre',
        sorter: true,
        key: 'nombre',
        //render: name => `${name.first} ${name.last}`,
        width: 200,
      }, {
        title: 'Email',
        dataIndex: 'mail',
        sorter: true,
        key: 'mail',
        width: 150,
      }, {
        title: 'Activo',
        dataIndex: 'baja',
        key: 'baja',
        width: 50,
        render: (text, record) => <div style={{ textAlign: 'center', color: (record.baja === null ? '' : '#ff0000') }}>{record.baja === null ? "SI" : "NO"}</div>,

      }, {
        title: 'Acci??n',
        key: 'action',
        width: 1,
        render: (text, record) => {
          return (
            <Dropdown trigger={['click']} overlay={
              <Menu>
                {this.props.user && utils.checkRol(1, this.props.user.roles) && !record.baja &&
                  <Menu.Item key="1" onClick={() => {
                    this.setState({ userUpdate: record, openEditar: true, openIndex: false })
                  }}>Editar Usuario</Menu.Item>
                }
                {this.props.user && utils.checkRol(1, this.props.user.roles) && !record.baja &&
                  <Menu.Item key="2" onClick={() => this.showDeleteConfirm(record.id)}>Desactivar</Menu.Item>
                }
                {this.props.user && utils.checkRol(1, this.props.user.roles) && record.baja &&
                  <Menu.Item key="3" onClick={() => this.showActiveConfirm(record.id)}>Activar</Menu.Item>
                }
                {this.props.user && utils.checkRol(1, this.props.user.roles) && !record.baja &&
                  <Menu.Item key="4" onClick={() => this.openBlanquearClave(record)}>Blanqueo de Clave</Menu.Item>
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
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    this.fetch({
			limite: 10,
			pagina: 1,
		});
  }

  showDeleteConfirm = async (id) => {
    const _this = this;

    Modal.confirm({
      title: '??Est?? seguro de que desea desactivar el usuario?',
      okText: 'Si',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        await api.user.baja(id);
        _this.fetch({
			limite: 10,
			pagina: 1,
		});
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  showActiveConfirm = async (id) => {
    const _this = this;
    Modal.confirm({
      title: '??Est?? seguro que desea activar el usuario?',
      okText: 'Aceptar',
      okType: 'danger',
      cancelText: 'Cancelar',
      async onOk() {
        await api.user.alta(id);
        _this.fetch({
			limite: 10,
			pagina: 1,
		});
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
    if (this._isMounted) {
      this.setState(({ columns }) => {
        const nextColumns = [...columns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };
        return { columns: nextColumns };
      });
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    if (this._isMounted) {
      this.setState({
        pagination: pager,
      });
    }
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
        if (this._isMounted) {
          this.setState({
            loading: false,
            data: response.data.usuarios,
            pagination,
          });
        }
      } else {
        if (this._isMounted) {
          this.setState({
            loading: false,
            data: [],
            pagination,
          });
        }
        message.error(response.message, 5);
      }
    } catch (e) {
      if (this._isMounted) {
        this.setState({
          loading: false,
          data: [],
        });
      }
      message.error(e.toString(), 5);
    }
  }
  openBlanquearClave = (user) => {
    if (this._isMounted) {
      this.setState({
        openBlanquearClave: true,
        userPass: user,
        idu: user.id
      })
    }
  }
  search = (text) => {
    if (this._isMounted) {
      this.setState({ q: text }, () => {
        this.fetch({
			limite: 10,
			pagina: 1,
		});
      })
    }
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
        {this.state.openIndex &&
          <QueueAnim type="bottom" className="ui-animate">
            <Breadcrumb>
              <Breadcrumb.Item>Inicio</Breadcrumb.Item>
              <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
            </Breadcrumb>
            <section className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
              <div className="box-header">
                <PageHeader
                  onBack={this.props.closeModal}
                  title="Usuarios"
                  extra={[
                    <Button icon={<PlusOutlined />}
                      type="primary"
                      onClick={() => {
                        this.setState({ openNuevo: true })
                      }}>Nuevo</Button>,
                  ]}
                />
                <Divider />
                <Input.Search
                  placeholder="Buscar..."
                  onSearch={value => this.search(value)}
                  style={{ width: 400, marginTop: 5, marginBottom: 10, float: 'right', display: 'inline-block' }}
                  enterButton
                />
              </div>
              <div className="box-body">
                <Table
                  bordered
                  components={this.components}
                  columns={columns}
                  rowKey={record => record.id}
                  dataSource={this.state.data}
                  pagination={this.state.pagination}
                  loading={this.state.loading}
                  onChange={this.handleTableChange}
                  rowClassName={(record, index) => record.baja ? 'deleteRow' : ''}
                  onRow={(record, rowIndex) => {
                    return {
                      onDoubleClick: (e) => {
                        if (this.props.user && utils.checkRol(1, this.props.user.roles) && !record.baja) {
                          this.setState({ openEditar: true, openIndex: false, userUpdate: record, })
                        }
                      },
                    };
                  }}
                />
              </div>
            </section>
          </QueueAnim>
        }
        {this.state.openNuevo &&
          <NuevoUser
            closeModal={() => this.setState({ openNuevo: false, openIndex: true })}
            onCreate={() => this.fetch({
			limite: 10,
			pagina: 1,
		})}
          />
        }
        {this.state.openEditar &&
          <EditarUser
            closeModal={() => this.setState({ openEditar: false, openIndex: true })}
            onUpdate={() => this.fetch({
			limite: 10,
			pagina: 1,
		})}
            idusuario={this.state.userUpdate.id}
            data= {this.state.data}
          />
        }
        {this.state.openBlanquearClave &&
          <BlanqueoClave
            closeModal={() => this.setState({ openBlanquearClave: false, })}
            userPass={this.state.userPass}
            id={this.state.idu}
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
