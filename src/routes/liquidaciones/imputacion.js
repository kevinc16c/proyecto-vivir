import React from 'react';
import { connect } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
  message,
  Divider,
  Table,
  Button,
  Row,
  Col,
  Modal,
  Input,
  Select,
  InputNumber,
  DatePicker,
} from 'antd';
import _ from 'lodash'
import { api } from './api';
import { utils } from 'utils';
import moment from 'moment';
import PropTypes from 'prop-types';
import queryString from 'query-string';
const FormItem = Form.Item;
const Option = Select.Option;
class Imputacion extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      cheques: [],
      visible: false,
      searchText: '',
      data: [],
      totalimporte:0,
      montoacobrar: 0,
      saldoacobrar: 0,
      importeimputado: 0,
      openCheque: false,
      openPago: false,
      openTransf: false,
      openTarjeta: false,
      openRet: false,
      loading: false,
      columns: [
        {
          title: 'Forma de pago',
          dataIndex: 'desforpago',
          key: 'desforpago',
          width: 100,
        },
        {
          title: 'N° de operación',
          dataIndex: 'num_cupon',
          key: 'num_cupon',
          width: 200,
        },
        {
          title: 'Importe',
          dataIndex: 'importetot',
          key: 'importetot',
          width: 100,
          align: 'right',
          render: (col, row) => `${utils.currency(row.importetot)}`,
        },
        {
          title: '',
          key: 'delete',
          dataIndex: 'delete',
          render: (col,row,index) => (
            <Button icon={<DeleteOutlined />} style={{ color: '#c90a0a' }} onClick={()=>this.borrar(row,index)}></Button>
          ),
          width: 10,
        }
      ],
      columnsC: [
        {
          title: 'Hecho el',
          dataIndex: 'feemi_ct',
          key: 'feemi_ct',
          width: 100,
        },
        {
          title: 'Cobrar el',
          dataIndex: 'fecobro_ct',
          key: 'fecobro_ct',
          width: 100,
        },
        {
          title: 'Banco',
          dataIndex: 'nombco_ct',
          key: 'nombco_ct',
          width: 100,
        },
        {
          title: 'N° Cuenta',
          dataIndex: 'nucta_ct',
          key: 'nucta_ct',
          width: 100,
        },
        {
          title: 'N° Serie',
          dataIndex: 'nuseri_ct',
          key: 'nuseri_ct',
          width: 100,
        },
        {
          title: 'N° Cheque',
          dataIndex: 'numero_ct',
          key: 'numero_ct',
          width: 100,
        },
        {
          title: 'CUIT Emisor',
          dataIndex: 'cuitemi_ct',
          key: 'cuitemi_ct',
          width: 100,
        },
        {
          title: 'A la orden',
          dataIndex: 'destina_ct',
          key: 'destina_ct',
          width: 100,
        },
        {
          title: 'Importe',
          dataIndex: 'importe_ct',
          key: 'importe_ct',
          width: 100,
          align: 'right',
          render: (col, row) => `${utils.currency(row.importe_ct)}`,
        },
        {
          title: '',
          key: 'delete',
          dataIndex: 'delete',
          render: (col,row,index) => (
            <Button icon={<DeleteOutlined />} style={{ color: '#c90a0a' }} onClick={()=>this.borrarcheque(row,index)}></Button>
          ),
          width: 10,
        }
      ],
    }
  }
  borrar=(row,index)=>{
    var newdata = []
    var importe = 0
    try {
      this.state.data.map((data, i)=>{
        if(i !== index){
          newdata.push(data)
        }
      })
      this.setState({data:newdata})
      var importe = 0
      newdata.map((data)=>{
        importe = importe + data.importetot
      })
    this.setState({totalimporte:importe})
    } catch (error) {
      message.error(error)
    }
    
  }
  borrarcheque=(row,index)=>{
    var newdata = []
    var newcheque = []
    var importe = 0
    try {
      this.state.cheques.map((data, i)=>{
        if(i !== index){
          newcheque.push(data)
        }
      })
      const found = this.state.data.findIndex(item => item.num_cupon == `${row.nombco_ct}-${row.nuseri_ct}-${row.nombco_ct}`);
      this.state.data.map((data, indes)=>{
        if(found !== indes){
          newdata.push(data)
        }
      })

      this.setState({cheques:newcheque, data:newdata})
      var importe = 0
      newdata.map((data)=>{
        importe = importe + data.importetot
      })
    this.setState({totalimporte:importe})
    } catch (error) {
      message.error(error)
    }
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

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }
  componentDidMount() {
    this.fetch()
  }
  fetch = async () => {
    try {
      const response = await api.fpago.getAll(queryString.stringify({
        query: this.state.q
      }))
      if (response.status === "success") {
        this.setState({
          fpago: response.data.formasPago,
        });
      } else {
        this.setState({
          fpago: [],
        });
        message.error(response.message, 5);
      }
    } catch (e) {
      this.setState({
        fpago: [],
      });
      message.error(e.toString(), 5);
    }
  }

  handleDelete = async (row) => {
    const dataSource = [...this.state.data];
    await this.setState({ data: dataSource.filter(function (r) { return r !== row }) })
    this.suma();
  }
  importetotal = () => {
    var importe = 0
    this.state.data.map((data)=>{
      importe = importe + data.importetot
    })
    this.setState({totalimporte:importe})
  }
  suma() {
    var totalrecibo = 0;
    for (var item in this.state.data) {
      totalrecibo += this.state.data[item].total;
    }
    this.setState({ importeimputado: totalrecibo })
  }

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  hide() {
    this.setState({
      visible: true,
    });
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }

  controlPago() {
    let monto = this.state.montoacobrar;
    let acobrar = this.props.acobrar;
    if (monto !== acobrar) {
      message.warning('Debe igualar los montos');
    }
  }

  handleSubmit = async (e) => {
    const _this = this;
    Modal.confirm({
      title: '¿Está seguro de que desea continuar?',
      okText: 'Aceptar',
      width: "500px",
      okType: 'danger',
      cancelText: 'Cancelar',
      async onOk() {
        _this.handleSubmit1();
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  handleSubmit1 = async (e) => {
    if (this.props.acobrar !== this.state.importeimputado) {
      message.warning('Los montos son distintos, debe igualarlos.', 6)
      if (this.props.acobrar > this.props.saldo) {
        message.warning('Los montos son distintos, debe igualarlos.', 6)
      }
    } else if (this.props.acobrar === this.state.importeimputado & this.props.acobrar > this.props.saldo) {
      message.error('El monto a cobrar no debe superar el saldo. Cambie el monto a cobrar en la pestaña de Detalle.')
    } else if (this.props.acobrar === 0 || this.state.importeimputado === 0) {
      message.error('No puede guardar montos iguales a cero.')
    } else {
      this.setState({ disabledLogin: true })
      try {
        let factura = []
        let mediodepago = []
        /*eslint-disable-next-line */
        factura.push(...this.props.facturas.filter(function (r) {
          if (typeof r.importe !== "undefined" && r.importe > 0) {
            return r
          }
        }));
        mediodepago.push(...this.state.data);
        const response = await api.pagos.create({
          facturas: factura,
          mediodepago: mediodepago,
          proveedores_id: parseInt(this.props.proveedor.id),
        })
        if (response.status === "success") {

        } else {
          this.setState({ disabledLogin: true })
          message.error(response.message, 7)
        }
      } catch (e) {
        this.setState({ disabledLogin: true })
        message.error(e.toString(), 7);
      }
    }
  }
  handleAgregar = async () => {
    this.props.form.validateFields(['codforpago', 'num_cupon', 'importetot'], (err, values) => {
      if (!err) {
        try {
          this.state.data.push({
            codforpago: this.state.formapago.codigofpag,
            desforpago: this.state.formapago.descrifpag,
            num_cupon: values.num_cupon,
            importetot: values.importetot,
          })
        } catch (error) {
          message.error(error)
        }finally{
          this.props.form.setFieldsValue({
            codforpago: '',
            num_cupon: '',
            importetot: '',
          })
          this.importetotal()
        }
      }
    })
  }
  handleAgregarCheque = async () => {
    this.props.form.validateFields(['feemi_ct', 'fecobro_ct', 'nuseri_ct', 'nucta_ct', 'numero_ct', 'cuitemi_ct', 'nombco_ct', 'sucursa_ct', 'destina_ct', 'importe_ct'], (err, values) => {
      if (!err) {
        try {
          this.state.cheques.push({
            feemi_ct: moment.parseZone(values.feemi_ct).format("DD/MM/YYYY"),
            fecobro_ct: moment.parseZone(values.fecobro_ct).format("DD/MM/YYYY"),
            nuseri_ct: values.nuseri_ct,
            nucta_ct: values.nucta_ct,
            numero_ct: values.numero_ct,
            cuitemi_ct: values.cuitemi_ct,
            nombco_ct: values.nombco_ct,
            sucursa_ct: values.sucursa_ct,
            destina_ct: values.destina_ct,
            importe_ct: values.importe_ct,
          })
          this.state.data.push({
            codforpago: this.state.formapago.codigofpag,
            desforpago: this.state.formapago.descrifpag,
            num_cupon: `${values.nombco_ct}-${values.nuseri_ct}-${values.nombco_ct}`,
            importetot: values.importe_ct,
          })
        } catch (error) {
          message.error(error)
        } finally {
          this.props.form.setFieldsValue({
            feemi_ct: '',
            fecobro_ct: '',
            nuseri_ct: '',
            nucta_ct: '',
            numero_ct: '',
            cuitemi_ct: '',
            nombco_ct: '',
            sucursa_ct: '',
            destina_ct: '',
            importe_ct: '',
          })
          this.importetotal()
        }
      }
    })
  }

  cargarPag = () => {
    return (
      this.props.history.push(`/app/pagos/${this.state.pag}`)
    )
  }
  async delete() {
    await this.setState({ data: [] })
    this.suma();
  }
  handleTableChange = (filters, text, sorter) => {
    if (sorter.order === "ascend") {
      this.setState({
        data: _.sortBy(this.state.data, sorter.field)
      })
    } else {
      this.setState({
        data: _.sortBy(this.state.data, sorter.field).reverse()
      })
    }
  }
  cargarfpago = async (id) => {
    this.state.fpago.map((data, index) => {
      if (id === data.codigofpag) {
        this.setState({ formapago: data })
      }
    })
  }

  render() {
    let columns = [...this.state.columns];
    columns = columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
      }),
    }));
    const { getFieldDecorator } = this.props.form;
    let monto = 0;
    monto += this.props.acobrar;
    let dif = 0;
    dif = 1 * (this.props.acobrar - this.state.importeimputado);
    return (
      <div >
        <Row gutter={16}>
          <Col span={6}>
            <FormItem label="Forma de pago" {...{
              labelCol: { sm: { span: 24 }, },
              wrapperCol: { sm: { span: 24 }, },
            }}>
              {getFieldDecorator('codforpago', {
                initialValue: '',
                rules: [{ required: true, message: '' }],
              })(
                <Select
                  placeholder="Seleccionar estados"
                  optionFilterProp="children"
                  showSearch
                  style={{ width: '100%' }}
                  onSelect={(e) => { this.cargarfpago(e) }}
                  filterOption={(input, option) =>
                    option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : true
                  }
                >
                  {this.state.fpago && this.state.fpago.map((data, index) => {
                    return <Option value={data.codigofpag} key={index}>{data.descrifpag}</Option>
                  })}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="N° de Operación" {...{
              labelCol: { sm: { span: 24 }, },
              wrapperCol: { sm: { span: 24 }, },
            }}>
              {getFieldDecorator('num_cupon', {
                rules: [{ required: (this.state.formapago ? this.state.formapago.conopefpag === "1" ? true : false : false), message: '' }],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="Importe" {...{
              labelCol: { sm: { span: 24 }, },
              wrapperCol: { sm: { span: 24 }, },
            }}>
              {getFieldDecorator('importetot', {
                rules: [{ required: true, message: '' }],
              })(
                <InputNumber
                  style={{ width: "90%", textAlign: "right" }}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  min={0}
                />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <br />
            <FormItem {...{
              labelCol: { sm: { span: 24 }, },
              wrapperCol: { sm: { span: 24 }, },
            }}>
              <Button
                style={{ width: 120, marginTop: 17, float: "left" }}
                type="primary"
                onClick={() => this.handleAgregar()}
                loading={this.state.disabledLogin}
              >
                Agregar
          </Button>
            </FormItem>

          </Col>

        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <Table
              pagination={false}
              columns={columns}
              rowKey={(record, index) => index}
              dataSource={this.state.data}
              loading={this.state.loading}
              footer={() => (
                <Row gutter={8}>
                  <Col span={12}>
                    <h4></h4>
                  </Col>
                  <Col span={12}>
                    <h4 style={{ textAlign: 'right' }}>Total:  <b> $ {this.state.totalimporte && utils.currency(this.state.totalimporte)}</b></h4>
                  </Col>
                </Row>
              )}
            />
          </Col>
        </Row>


        <div style={{ display: this.state.formapago ? this.state.formapago.codigofpag === "2" ? 'inline-block' : 'none' : 'none' }}>
          <Row gutter={16}>
            <Col span={4}>
              <FormItem label="Emisión" {...{
                labelCol: { sm: { span: 24 }, },
                wrapperCol: { sm: { span: 24 }, },
              }}>
                {getFieldDecorator('feemi_ct', {
                  rules: [{ required: this.state.formapago ? this.state.formapago.codigofpag === "2" ? true : false : false, message: '' }],
                })(
                  <DatePicker style={{ width: '100%' }}
                  format="DD/MM/YYYY"
                  />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem label="Cobro" {...{
                labelCol: { sm: { span: 24 }, },
                wrapperCol: { sm: { span: 24 }, },
              }}>
                {getFieldDecorator('fecobro_ct', {
                  rules: [{ required: this.state.formapago ? this.state.formapago.codigofpag === "2" ? true : false : false, message: '' }],
                })(
                  <DatePicker
                    style={{ width: '100%' }}
                    format="DD/MM/YYYY"
                  />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem label="Banco" {...{
                labelCol: { sm: { span: 24 }, },
                wrapperCol: { sm: { span: 24 }, },
              }}>
                {getFieldDecorator('nombco_ct', {
                  rules: [{ required: this.state.formapago ? this.state.formapago.codigofpag === "2" ? true : false : false, message: '' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem label="Sucursal" {...{
                labelCol: { sm: { span: 24 }, },
                wrapperCol: { sm: { span: 24 }, },
              }}>
                {getFieldDecorator('sucursa_ct', {
                  rules: [{ required: this.state.formapago ? this.state.formapago.codigofpag === "2" ? true : false : false, message: '' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem label="N° Cuenta" {...{
                labelCol: { sm: { span: 24 }, },
                wrapperCol: { sm: { span: 24 }, },
              }}>
                {getFieldDecorator('nucta_ct', {
                  rules: [{ required: this.state.formapago ? this.state.formapago.codigofpag === "2" ? true : false : false, message: '' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem label="Serie" {...{
                labelCol: { sm: { span: 24 }, },
                wrapperCol: { sm: { span: 24 }, },
              }}>
                {getFieldDecorator('nuseri_ct', {
                  rules: [{ required: this.state.formapago ? this.state.formapago.codigofpag === "2" ? true : false : false, message: '' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4}>
              <FormItem label="N° cheque" {...{
                labelCol: { sm: { span: 24 }, },
                wrapperCol: { sm: { span: 24 }, },
              }}>
                {getFieldDecorator('numero_ct', {
                  rules: [{ required: this.state.formapago ? this.state.formapago.codigofpag === "2" ? true : false : false, message: '' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem label="CUIT" {...{
                labelCol: { sm: { span: 24 }, },
                wrapperCol: { sm: { span: 24 }, },
              }}>
                {getFieldDecorator('cuitemi_ct', {
                  rules: [{ required: this.state.formapago ? this.state.formapago.codigofpag === "2" ? true : false : false, message: '' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem label="A la orden de" {...{
                labelCol: { sm: { span: 24 }, },
                wrapperCol: { sm: { span: 24 }, },
              }}>
                {getFieldDecorator('destina_ct', {
                  rules: [{ required: this.state.formapago ? this.state.formapago.codigofpag === "2" ? true : false : false, message: '' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem label="Importe" {...{
                labelCol: { sm: { span: 24 }, },
                wrapperCol: { sm: { span: 24 }, },
              }}>
                {getFieldDecorator('importe_ct', {
                  rules: [{ required: this.state.formapago ? this.state.formapago.codigofpag === "2" ? true : false : false, message: '' }],
                })(
                  <InputNumber
                    style={{ width: '100%' }}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <br />
              <FormItem {...{
                labelCol: { sm: { span: 24 }, },
                wrapperCol: { sm: { span: 24 }, },
              }}>
                <Button
                  style={{ width: 120, marginTop: 17, float: "left" }}
                  type="primary"
                  onClick={() => this.handleAgregarCheque()}
                >
                  Agregar
                </Button>
              </FormItem>
            </Col>
          </Row>
        </div>
        <br />
        <Row gutter={8}>
          <Col span={24}>
            <Table
              pagination={false}
              style={{ fontSize: '8px' }}
              columns={this.state.columnsC}
              rowKey={(record, index) => index}
              dataSource={this.state.cheques}
              loading={this.state.loading}
            />
          </Col>
        </Row>
        <Divider></Divider>
        <div className="box-footer">
          <Button
            style={{ width: 120, float: "right" }}
            type="primary"
            onClick={this.handleSubmit}
            loading={this.state.disabledLogin}
            disabled={this.state.cliente}
          >
            Finalizar
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const WrappedImputacion = Form.create()(Imputacion);

export default connect(
  mapStateToProps
)(WrappedImputacion);
