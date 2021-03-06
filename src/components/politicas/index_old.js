import React from 'react';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Col, Row, Input, Divider } from 'antd';
// import { api } from './api';
// import { isMobile } from 'react-device-detect';
import QueueAnim from 'rc-queue-anim';
// import './css.css';
// import './styless.scss';
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
        // try {
        // 	const response = await api.articulos.get()
        // 	if (response.status === "success") {
        // 		this.setState({
        // 			loading: false,
        // 			data: response.data.articulo, 
        // 		});
        // 	}
        // } catch (e) {
        // 	message.error(e.toString(), 5);
        // }
    }

    handleSubmit = (e) => {
        // this.props.form.validateFields(async (err, values) => {
        // 	if (!err) {
        // 		try {
        // 			this.setState({
        // 				confirmLoading: true,
        // 			})
        // 			const response = await api.mail.enviarMail({
        // 				...values,
        // 			});
        // 			if (response.status === "success") {
        // 				this.props.history.push('/app/page/home')
        // 			} else {
        // 				message.error(response.message, 7);
        // 			}
        // 		} catch (e) {
        // 			message.error(e.toString(), 7);
        // 		} finally {
        // 			this.setState({
        // 				confirmLoading: false,
        // 			})
        // 		}
        // 	}
        // })
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="container-fluid no-breadcrumb">
                <QueueAnim type="bottom" className="ui-animate">
                    <div className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
                        <div className="box-body">
                            <div className="container-fluid no-breadcrumb container-mw-lg chapter mb-8" style={{ backgroundColor: 'white' }}>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h1 style={{ fontWeight: 'bold' }}>Bienvenidos a Mi DoraDa</h1>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Para facilitar la navegaci??n del sitio, los usuarios podr??n encontrar los t??rminos y condiciones generales aqu?? descriptos en forma resumida, al final de la p??gina de inicio, clickeando en los ??tems correspondientes.
                                            <br />
                                            El sitio Mi DoraDa es propiedad del Grupo <b>LCDD</b>.
                                            <br />
                                            Se entender?? la palabra Sitio como sin??nimo de sitioweb y/o website y/o APP
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Aceptaci??n y conocimiento de los T??minos y Condiciones</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los presentes T??rminos y Condiciones tienen car??cter obligatorio y vinculante. Se aplican a todas las compras y actividades realizadas mediante el Sitio. El uso del sitio implica el conocimiento y la aceptaci??n de ellos. Si usted no est?? de acuerdo con los T??rminos y Condiciones, deber?? abstenerse de utilizar el Sitio y/o los servicios por ??l ofrecidos. Por ???Usuario??? del Sitio se entiende tanto a los registrados como a los visitantes.
                                            <br />
                                            Para permitirles a los Usuarios una m??s r??pida familiarizaci??n con estos T??rminos y Condiciones podr??n consultar tambi??n todas las dem??s instrucciones para operar en el Sitio, como, por ejemplo, la p??gina de ayuda que tambi??n forman parte de estos T??rminos y Condiciones.
                                            <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Modificaci??n de los T??rminos y Condiciones</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los T??rminos y Condiciones podr??n ser sustituidos o sufrir modificaciones en cualquier momento y a exclusivo criterio de Grupo <b>LCDD</b>, y no se requerir?? a los Usuarios su consentimiento. Para las transacciones en curso que hayan comenzado con anterioridad a dichas modificaciones, subsistir??n las condiciones vigentes al momento de su concertaci??n, a menos que las nuevas modificaciones introducidas fueran m??s convenientes para el Usuario.
                                                <br />
                                                Grupo <b>LCDD</b> pondr?? un aviso en el Sitio alertando a los Usuarios sobre estos cambios, durante un tiempo razonable. Sin perjuicio de lo anterior, los Usuarios son responsables de leer estos T??rminos y Condiciones cada vez que ingresen al Sitio para ver si han sufrido modificaciones.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Interrupci??n del Servicio ??? Exclusi??n de responsabilidad.</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Grupo <b>LCDD</b> se reserva el derecho de interrumpir, suspender o modificar en cualquier momento los servicios ofrecidos en el presente Sitio, ya sea en forma permanente o transitoria. No se requerir?? la conformidad de los Usuarios, ni ser?? necesario aviso previo alguno.
                                            <br />
                                            Asimismo, Grupo <b>LCDD</b> no garantiza el acceso o uso permanente del Sitio, ya que ??ste podr??a interrumpirse por cuestiones t??cnicas ajenas a Grupo <b>LCDD</b>.
                                            <br />
                                            No obstante lo mencionado anteriormente, si la suspensi??n o interrupci??n mencionada no obedeciere a razones de fuerza mayor o caso fortuito, Grupo <b>LCDD</b> se compromete a cumplir las prestaciones que estuvieran pendientes al momento de la suspensi??n o interrupci??n.
                                            <br />
                                            Grupo <b>LCDD</b> no garantiza que el Sitio se encuentre libre de virus, gusanos o cualquier otro elemento que pueda llegar a da??ar o alterar el normal funcionamiento de un ordenador. Es responsabilidad y obligaci??n exclusiva del Usuario contar con las herramientas adecuadas para detectar, desinfectar y/o prevenir cualquier tipo de elementos y/o posibles da??os de esta naturaleza.
                                            <br />
                                            Grupo <b>LCDD</b> no se responsabiliza por cualquier da??o que pueda producirse en los equipos inform??ticos de los Usuarios o de terceros como consecuencia de la navegaci??n del presente Sitio.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Registraci??n</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los Usuarios pueden navegar libremente por el Sitio, pero deber??n estar registrados para poder realizar alguna compra o utilizar los servicios ofrecidos en ??l.
                                                <br />
                                                La registraci??n de los Usuarios se realiza ingresando al Sitio, y no tiene costo alguno.
                                                <br />
                                                Es obligatorio completar el formulario en todos los campos con datos v??lidos y verdaderos, de manera exacta y precisa. Para un correcto funcionamiento del sistema, es necesario que los Usuarios mantengan sus datos actualizados. Grupo <b>LCDD</b> podr?? proceder a verificar la identidad del Usuario y/o de los datos consignados por ??ste.
                                                <br />
                                                Grupo <b>LCDD</b> no se responsabiliza por la veracidad o certeza de los datos provistos por los Usuarios. Asimismo, Grupo <b>LCDD</b> se reserva el derecho de suspender temporal o definitivamente a los Usuarios en caso de incumplimiento de los T??rminos y Condiciones, como as?? tambi??n de rechazar solicitudes.
                                                <br />
                                                Los Usuarios acceder??n a su Cuenta Personal (la ???Cuenta???) mediante un nombre de Usuario (n??mero de cliente) y una clave personal que en este caso es el n??mero de DNI. En caso de que estos datos sean olvidados por el Usuario, Grupo <b>LCDD</b> cuenta con un servicio de ayuda para recuperarlos. Para esto se deber??n ponerse en contacto con nuestros locales y se le enviar?? de manera confidencial al medio que elijan su nombre de Usuario y la clave personal.
                                                <br />
                                                As?? como Grupo <b>LCDD</b> se compromete a mantener la confidencialidad de los datos aportados por los Usuarios para su registro, los Usuarios se comprometen a mantener la confidencialidad de su nombre y clave de acceso. De conformidad con lo expresado en el p??rrafo anterior, los Usuarios son responsables del uso que se haga de su clave y deber??n tener presente que si otras personas tienen o pueden tener en el futuro acceso a la cuenta de e-mail consignada como propia en el formulario de registraci??n, ??stas tambi??n podr??an solicitar su clave de acceso y nombre de Usuario. Es obligaci??n exclusiva del Usuario tomar las medidas pertinentes para que esto no suceda. El Usuario se compromete a notificar inmediatamente y de manera fehaciente a Grupo <b>LCDD</b> cualquier uso no autorizado de su Cuenta de Usuario, y a mantenerlo indemne en el caso de que se esto produzca alg??n da??o a la Empresa o a terceros.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Capacidad</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Para utilizar los servicios del Sitio se requiere tener capacidad legal para contratar. No podr??n acceder a los servicios quienes carezcan de ella, los que hayan sido suspendidos o inhabilitados, ni los menores de edad. Los padres, tutores o responsables de los menores de edad o incapaces que utilicen el Sitio ser??n responsables por dicho uso, incluyendo cualquier cargo, facturaci??n o da??o que se derive de ??l.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Pol??tica de Privacidad de los datos personales suministrados por el Usuario. Seguridad y tratamiento</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Para poder utilizar el Sitio de manera eficiente y segura, los Usuarios deber??n aportar ciertos datos, entre ellos, su nombre y apellido, domicilio, cuenta de e-mail, documento de identidad, sin los cuales se tornar??a imposible brindar los servicios. Por eso se requiere que ??stos sean verdaderos y exactos. Los datos recabados por los formularios correspondientes ser??n incorporados a la Base General Clientes de Grupo <b>LCDD</b>
                                                <br />
                                                Cuando se ingresan datos y n??meros correspondientes a tarjetas de cr??dito estos son encriptados, asegurando as?? que se mantengan en total confidencialidad y no puedan ser vistos por otras personas.
                                                <br />
                                                En consonancia con lo prescripto por la Ley de Protecci??n de Datos Personales, N?? 25,326, los Usuarios tendr??n el derecho de acceder, actualizar y rectificar los datos ingresados cuando lo deseen. Si se solicitara la supresi??n de los datos, la misma implicar?? dejar de ser usuario del sistema y deber?? hacerse por carta documento o presentaci??n con firma certificada nombre de Grupo <b>LCDD</b> al domicilio indicado en el punto 32.
                                                <br />
                                                Cualquier Usuario del Sitio tendr?? derecho a solicitar y obtener informaci??n sobre los datos personales que Grupo <b>LCDD</b> tenga en su base, quedando la Empresa obligada a proporcionar la informaci??n solicitada dentro de los diez d??as corridos de haber sido intimada fehacientemente. Los Usuarios tambi??n podr??n ejercer el derecho de rectificaci??n, cuando los datos que se posean fueran incorrectos.
                                                <br />
                                                Asimismo, los Usuarios podr??n requerir en cualquier momento la baja de su solicitud y la eliminaci??n de su Cuenta de la base de datos.
                                                <br />
                                                Grupo <b>LCDD</b> garantiza a sus Usuarios que utilizar?? los datos dentro de las pautas establecidas por la Ley 25.326 de Protecci??n de los Datos Personales.
                                                <br />
                                                En caso de que los datos sean requeridos por la v??a legal, administrativa o judicial correspondiente, Grupo <b>LCDD</b> se ver?? compelida a revelar los mismos a la autoridad solicitante. En la medida en que la legislaci??n y normas de procedimiento lo permitan, Grupo <b>LCDD</b> informar?? a los Usuarios sobre estos requerimientos.
                                                <br />
                                                Al registrarse en el Sitio y formar parte de la Base General de Clientes, los Usuarios aceptan que Grupo <b>LCDD</b> se comunique con ellos por v??a postal, telef??nica o electr??nica para enviar informaci??n que la Empresa considere, a su exclusivo criterio, que pueda ser de su inter??s, incluyendo publicidad e informaci??n sobre ofertas y promociones. En caso de que los Usuarios no deseen ser contactados con estos fines, podr??n manifest??rselo fehacientemente a Grupo <b>LCDD</b>, quien proceder?? a interrumpir este tipo de comunicaciones en el menor tiempo que le sea posible.
                                                <br />
                                                El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un inter??s leg??timo al efecto conforme lo establecido en el art??culo 14, inciso 3 de la Ley N?? 25.326. La DIRECCION NACIONAL DE PROTECCION DE DATOS PERSONALES, ??rgano de Control de la Ley N?? 25.326, tiene la atribuci??n de atender las denuncias y reclamos que se interpongan con relaci??n al incumplimiento de las normas sobre protecci??n de datos personales.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Veracidad de la Informaci??n suministrada</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                En caso de que la informaci??n o los datos suministrados por el Usuario no sea verdadera, ??ste ser?? responsable por los da??os que este hecho pudiera ocasionar.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Sugerencias y comentarios</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Todas las sugerencias y comentarios que realice el Usuario podr??n ser tenidas en cuenta, implementadas o adaptadas por Grupo <b>LCDD</b> sin que ello genere derecho alguno a favor de tal Usuario.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Cookies</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El Sitio puede utilizar un sistema de seguimiento mediante "cookies", para que el acceso a la informaci??n, al pasar de p??gina en p??gina, se realice con mayor rapidez. Tambi??n ayuda en algunos casos a identificar a los Usuarios, sin necesidad de solicitarles la clave de acceso una y otra vez.
                                                <br />
                                                Estas cookies son peque??os archivos que env??a la p??gina visitada y se alojan en el disco duro del ordenador, ocupando poco espacio.
                                                <br />
                                                Se hace saber a los Usuarios que utilizando las opciones de su navegador podr??n limitar o restringir seg??n su voluntad el alojamiento de estas ???cookies???, aunque es desaconsejable restringirlas totalmente.
                                                <br />
                                                El sistema podr?? recoger informaci??n sobre sus preferencias e intereses. En el caso de que esto ocurra, la informaci??n ser?? utilizada exclusivamente con fines estad??sticos para mejorar los servicios que se prestan en el Sitio. Grupo <b>LCDD</b> aplicar??, en la mayor medida en que sea posible, procedimientos de disociaci??n de la informaci??n de modo que los titulares de los datos sean inidentificables.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Disponibilidad y precio de los productos ofrecidos</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Antes de comprar, el Usuario deber?? tener en cuenta que los productos seleccionados pueden no encontrarse en stock. Toda compra se encuentra sujeta a disponibilidad Mi DoraDa solamente opera v??a Internet. Por este motivo, puede ocurrir que, por m??s que sea posible ordenar la compra del producto en el Sitio, no haya existencias de ??ste, por una cuesti??n de movimiento diario en los locales de las firmas que proveen los productos a Mi DoraDa
                                                <br />
                                                Del mismo modo, el precio de los productos que ofrecemos en el Sitio, puede no coincidir con el de los distintos locales o proveedores que abastecen a Grupo <b>LCDD</b>.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Opciones del Usuario ante productos agotados o demorados</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                En concordancia con el punto anterior, en caso de que el o los productos seleccionados se encontraren agotados o demorados, Grupo <b>LCDD</b> se comunicar?? con el Usuario y lo invitar?? a que elija una de las siguientes opciones:
                                                <br />
                                                <b>???</b> Esperando la entrega del producto elegido (en caso de demora);
                                                <br />
                                                <b>???</b> Cancelaci??n de la compra y devoluci??n del importe por el medio de pago original;
                                                <br />
                                                <b>???</b> Cancelaci??n de la compra y devoluci??n del importe por el medio de pago original;
                                                <br />
                                                Cuando el Usuario opte por cancelar la compra, se devolver?? el importe abonado seg??n el medio de pago que se haya elegido oportunamente. En caso de que se haya pagado en d??lares estadounidenses, se devolver?? el importe al tipo de cambio del d??a de la cancelaci??n.
                                                <br />
                                                En el caso de que el Usuario opte por el producto alternativo que le ofrece Grupo <b>LCDD</b>, ??ste deber?? contener caracter??sticas iguales o superiores. En ning??n caso se le pedir?? al Usuario que abone sumas suplementarias o que se haga cargo de las diferencias, salvo que el producto alternativo ofrecido por Grupo <b>LCDD</b> y escogido por el Usuario sea de caracter??sticas ampliamente superiores y costosas al solicitado originalmente por el Usuario.
                                                <br />
                                                IMPORTANTE: para las situaciones contempladas en este apartado, el Usuario tendr?? un plazo de diez d??as para elegir una de las opciones mencionadas. En caso de que el Usuario guarde silencio al respecto, Grupo <b>LCDD</b> podr?? presumir que ha optado por la cancelaci??n de la compra, y proceder?? a la devoluci??n del importe abonado, ya sea por el medio de pago original.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Devoluci??n del importe abonado</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                En los casos mencionados en el punto anterior en que el Usuario haya optado por la devoluci??n del importe abonado, deber?? tener en cuenta que el reintegro puede demorar algunos d??as, debido a plazos y cuestiones administrativas.
                                                <br />
                                                Para los casos de devoluci??n v??a dep??sito bancario, la cuenta bancaria deber?? estar a nombre del titular de la Cuenta de Usuario desde donde se haya realizado la operaci??n. En caso de que no coincidan las titularidades, se requerir?? la expresa autorizaci??n del titular de la Cuenta de Usuario como condici??n indispensable previa al dep??sito.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Validez de las promociones</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                En el caso de que se realicen ofertas y promociones de productos, ??stas tendr??n validez para las compras efectuadas desde la fecha de comienzo de las mismas, hasta la de finalizaci??n de la oferta. Los t??rminos y condiciones de las mismas ser??n comunicados en el Sitio, y estar??n siempre sujetas a la existencia en stock de los productos ofrecidos.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Impuesto al valor agregado (IVA)</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Todos los precios expresados en el Sitio incluyen IVA, salvo que se indique lo contrario.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Garant??a de los productos</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                La venta de los productos se realiza por cuenta y orden del proveedor. La garant??a de los productos que se adquieren a trav??s de Grupo <b>LCDD</b> es la que ofrecen los fabricantes y/o proveedores de los mismos, que son los ??nicos responsables directos. Una vez transcurrido el plazo establecido en el segundo p??rrafo del punto 16 de estos T??rminos y Condiciones Generales, cualquier reclamo deber?? ser dirigido contra el fabricante y/o proveedor del producto.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Derecho de arrepentimiento. Devoluci??n de los productos</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El Usuario tendr?? derecho a devolver los productos adquiridos en el Sitio durante el plazo de cinco d??as corridos, contados a partir de la entrega de la cosa, sin responsabilidad alguna. Para esto deber?? notificar de manera fehaciente a Grupo <b>LCDD</b>, dentro del plazo se??alado, y poner a su disposici??n el o los productos adquiridos. Los productos deber??n estar en el mismo estado en que fueron recibidos, sin haber sido utilizados, y con el embalaje original. Grupo <b>LCDD</b> devolver?? al Usuario todos los importes recibidos. Los gastos de devoluci??n correr??n por cuenta del cliente.
                                                <br />
                                                Asimismo, si el o los productos presentaren alg??n defecto de fabricaci??n, hubieren sufrido roturas o deterioros en tr??nsito, o fueren despachados equivocadamente, el Usuario deber?? comunicarse con cualquiera de nuestros locales dentro del plazo mencionado en el p??rrafo anterior, para que Grupo <b>LCDD</b> proceda, seg??n corresponda, a gestionar el re-despacho de la compra, o pasar a retirar la orden.
                                                <br />
                                                Los productos no deben haber sido utilizados, y deben encontrarse en las mismas condiciones en que fueron recibidos, con sus embalajes y etiquetas. Por ejemplo, y a mero t??tulo ilustrativo, si el producto se encuentra en un envoltorio (???bl??ster???) pl??stico, ??ste debe ser abierto prolija y cuidadosamente, pues de lo contrario no podr?? realizarse el cambio.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Moneda</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Todos los precios en el Sitio est??n expresados en pesos argentinos, moneda de curso legal de la Rep??blica Argentina.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Medios de pago</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los pagos podr??n realizarse con tarjeta. Grupo <b>LCDD</b> podr?? habilitar otras opciones, para facilitar las compras de sus clientes.
                                                <br />
                                                Tambi??n se puede pagar por medio de tarjeta de cr??dito en cuotas, seg??n se indique en el Sitio. El Usuario podr?? ver el importe de las cuotas haciendo ???click??? en ???Planes de Pago???, dentro de la p??gina en que se encuentra el producto.
                                                <br />
                                                Todos los medios de pago est??n sujetos a que el importe sea debidamente acreditado y/o verificado.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Pago con tarjeta de cr??dito</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los pagos podr??n ser realizados on-line mediante las tarjetas, Visa, Diners, Mastercard y American Express. Toda la informaci??n ingresada por el Usuario est?? protegida por el sistema SSL (ver punto 6).
                                                <br />
                                                La confirmaci??n de la compra con tarjeta de cr??dito estar?? sujeta a la autorizaci??n del emisor de la misma.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Env??o de productos dentro del pa??s. Tiempo de entrega</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Las entregas se realizar??n en la direcci??n que el Usuario indique. La validez de la misma es de su exclusiva responsabilidad. No se entregar??n ??rdenes a casillas de correo (P.O. Box).
                                                <br />
                                                El tiempo de entrega depende de la disponibilidad del producto, del tiempo de env??o y de la aprobaci??n del medio de pago. Los d??as que se indiquen son estimativos. Los env??os se realizan en toda la Rep??blica Argentina, sin excepci??n.
                                                <br />
                                                Al realizar una compra, el Usuario recibe en la APP o su casilla de correo electr??nico una confirmaci??n de que la orden de pedido ha sido aceptada, junto a un n??mero de pedido (factura de compra).
                                                <br />
                                                Para asegurar la m??xima eficacia en las entregas, ??stas se realizan mediante empresas especializadas.
                                                <br />
                                                El tiempo de aprobaci??n var??a seg??n el medio de pago. En el caso de las tarjetas de cr??dito, el Usuario deber?? verificar que los datos proporcionados para la autorizaci??n sean correctos.
                                                <br />
                                                El tiempo de disponibilidad es el que demora el proveedor en entregar a Grupo <b>LCDD</b> el producto para su env??o.
                                                <br />
                                                El tiempo de env??o var??a seg??n el destino, nacional, donde se solicite la entrega.
                                                <br />
                                                El tiempo de entrega de la totalidad de la orden, as?? como su costo, ser?? informado al Usuario antes de aceptar la compra.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Gastos de env??o</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El Usuario ser?? claramente informado de los costos de entrega antes de realizar la compra. Estos costos son calculados en funci??n del peso total y/o el volumen total del env??o, y tambi??n dependen de la zona del domicilio de entrega.
                                                <br />
                                                Los costos de env??o ser??n discriminados como ??tem separado dentro de la factura. Grupo <b>LCDD</b> est?? siempre trabajando para mejorar la calidad y el costo de entrega para sus clientes. Por este motivo, dichos costos y las pol??ticas de env??o se hallan sujetos a cambio sin previo aviso.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Horarios de entrega</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los productos ser??n entregados de lunes a viernes, entre las 9:00 y las 18:00 horas, con excepci??n de los feriados nacionales. Los Usuarios no podr??n elegir ni el horario ni el d??a en que se entregar??n el o los productos adquiridos, por lo que se recomienda seleccionar su domicilio laboral como punto de entrega para mayor seguridad. De todos modos, podr??n hacerse sugerencias en el campo de observaciones al momento de realizar la compra, las que quedar??n supeditadas al circuito de la empresa que tenga a su cargo el env??o de los productos.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Direcci??n de la entrega</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                La direcci??n en donde se entregar?? el producto ser?? la que el Usuario indique. Podr?? no coincidir con su domicilio particular. Es responsabilidad del Usuario completar y revisar cuidadosamente la informaci??n relacionada con la entrega, para que el env??o de la compra se haga de manera efectiva y puntual. Como ya ha sido mencionado, no se realizan env??os a casillas de correo (P.O. Box).
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Facturaci??n</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El usuario tendr?? a su disposici??n la factura tipo "B" con la informaci??n clara y precisa de los productos comprados, el m??todo y plan de pago, y la moneda para la transacci??n en las oficinas de Grupo <b>LCDD</b>. En caso de necesitar dicha documentaci??n podr?? contactarse a trav??s de lacasadedora407@gmail.com o bien comunicarse al 3482-524528 y se le enviar?? la factura solicitada.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Cancelaci??n de ??rdenes de compra</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Sin perjuicio de lo establecido en el punto 16, el Usuario podr?? cancelar una orden, siempre y cuando ??sta no haya sido a??n despachada. Para esto deber?? ponerse en contacto con Grupo <b>LCDD</b> dentro de las 24 horas de realizada la compra enviando un e-mail a lacasadedora407@gmail.com
                                                <br />
                                                Si la cancelaci??n de la compra es total, se reintegrar?? el importe mediante el medio de pago que se utiliz?? para abonar, o se le podr?? dejar como cr??dito para realizar la compra de otro producto. El Usuario reconoce que en este caso, Grupo <b>LCDD</b> deber?? realizar otro env??o, motivo por el cual deber?? cobrar al usuario los costos producidos por esta modificaci??n.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Utilizaci??n del servicio "Recomienda Este Producto a un Amigo"</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                En el marco de su Pol??tica de Privacidad, Grupo <b>LCDD</b> se compromete a mantener la absoluta confidencialidad de los datos personales enviados por los Usuarios. El env??o de comentarios de nuestros productos por e-mail se realiza a partir del expreso consentimiento del remitente, y bajo ning??n concepto podr?? ser considerado como ???spam??? (env??o masivo de mensajes de correo electr??nico con publicidad no solicitada).
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Prohibiciones</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Se les proh??be terminantemente a los Usuarios lo siguiente:
                                                <br />
                                                a) enviar archivos o cualquier tipo de informaci??n cuyo contenido sea ilegal, obsceno, abusivo, difamatorio, injurioso o contrario a las buenas costumbres;
                                                <br />
                                                b) enviar archivos que contengan virus o cualquier otra caracter??stica capaz de da??ar el funcionamiento de una computadora, ya sea del Sitio o del sistema;
                                                <br />
                                                c) utilizar el Sitio para violar cualquier tipo de norma vigente;
                                                <br />
                                                d) registrarse bajo datos falsos y realizar una compra. Brindar datos falsos en cualquier otro momento en que les sea requerid cualquier otro tipo de informaci??n o datos personales;
                                                <br />
                                                e) ofrecer productos o servicios;
                                                <br />
                                                f) usar programas, software o aparatos autom??ticos o manuales para monitorear o copiar la informaci??n o cualquier tipo de contenido del Sitio sin previo consentimiento de Grupo <b>LCDD</b>.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Declaraciones</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Grupo <b>LCDD</b> no se hace responsable por la veracidad de la informaci??n incorporada al Sitio por terceros. Tampoco se hace responsable en cuanto haya sido reproducida o comunicada directamente por los Usuarios del Sitio sin verificaci??n por parte de Grupo <b>LCDD</b>. Si alg??n Usuario se viera afectado por la informaci??n a la que se alude en el p??rrafo anterior, deber?? comunic??rselo a Grupo <b>LCDD</b>, por mail o correo postal, a fin de que se proceda a la supresi??n de la misma.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Derechos reservados. Propiedad Intelectual.</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                            Todos los derechos del presente Sitio est??n reservados y corresponden a Grupo <b>LCDD</b>.
                                                <br />
                                                El contenido del presente Sitio, incluyendo, aunque no limitado al texto, logos, gr??ficos, y todo el dise??o en general, as?? como su base de datos y software, es de propiedad de Grupo <b>LCDD</b> o tiene derecho a usarlo en virtud de licencias de uso otorgadas. Se encuentra protegido por las legislaci??n nacional e internacional vigente sobre propiedad intelectual.
                                                <br />
                                                Si el Usuario considera que en el Sitio se viola o atenta de alg??n modo contra derechos de propiedad intelectual de terceros deber?? notificarlo a Grupo <b>LCDD</b> en la direcci??n indicada en los presentes T??rminos y Condiciones Generales, acompa??ando toda la informaci??n y documentaci??n necesaria que respalde la mencionada consideraci??n.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Raz??n social y domicilio</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                La raz??n social de la empresa es Corina Priscila Vignolo, con domicilio en Freyre 407, Reconquista, Santa Fe, Argentina. CUIT N?? 27-29529410-3.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Notificaciones</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Todas las notificaciones y/o comunicaciones que deban efectuarse por el uso de Sitio bajo estos T??rminos y Condiciones Generales, deber??n realizarse por escrito:
                                                <br />
                                                (i) al Usuario: mediante correo electr??nico, a la cuenta de correo consignada por ??ste, o por carta documento, al domicilio declarado en el formulario de registraci??n.
                                                <br />
                                                (ii) a Grupo <b>LCDD</b>: a la cuenta de correo electr??nico lacasadedora407@gmail.com, o a su domicilio legal indicado en el punto anterior Freyre 407, Reconquista, Santa Fe, Argentina.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Avisos publicitarios y links</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Cuando el Usuario hace "click" en avisos publicitarios o links de terceros e ingresa en otros sitios que no pertenecen a Grupo <b>LCDD</b> estar?? sujeto a los t??rminos y condiciones de dichos sitios. El Usuario deber?? leer detenidamente sus pol??ticas de acceso y uso.
                                                <br />
                                                Grupo <b>LCDD</b> no garantiza la legalidad, actualidad, calidad ni utilidad de los contenidos, operaciones e informaciones que se comuniquen, reproduzcan y/o realicen en sitios enlazados de terceros ni la ausencia de nocividad de tales contenidos o servicios, por lo que el Usuario exime de toda responsabilidad a Grupo <b>LCDD</b> por los contenidos incluidos en los referidos sitios o los servicios que en ellos se brindan o promocionan.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Jurisdicci??n y Ley aplicable</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los presentes T??rminos y Condiciones se encuentran regidos sin excepci??n y en todos sus puntos por las leyes de la Rep??blica Argentina y ser??n interpretados de acuerdo a ellas.
                                                <br />
                                                Ante cualquier diferencia, desacuerdo o conflicto derivado de la interpretaci??n, validez, alcance y/o aplicaci??n de los presentes T??rminos y Condiciones Generales, los Usuarios se comunicar??n con Grupo <b>LCDD</b> de manera fehaciente, haci??ndole llegar su reclamo, para que las partes traten de arribar a un acuerdo.
                                                <br />
                                                En caso de que no sea posible arribar a una soluci??n, y para garantizar a los consumidores el pleno acceso a la justicia, los Usuarios podr??n elegir y someter su reclamo a una de las siguientes opciones e instancias:
                                                <br />
                                                <b>???</b>a) Sistema Nacional de Arbitraje de Consumo del Ministerio de Econom??a y Producci??n de la Naci??n. Los procedimientos ante este Sistema son gratuitos, y no es necesario contar con patrocinio letrado. Asimismo, se garantiza el equilibrio entre las partes y la transparencia del proceso, y los laudos emitidos por dicho Tribunal tienen autoridad de cosa juzgada y son irrecurribles (para saber m??s sobre este sistema ingresar en??<a href="http://www.mecon.gov.ar/snac" target="noopener noreferrer">http://www.mecon.gov.ar/snac</a>)
                                                <br />
                                                <b>???</b>b) Direcci??n General de Defensa y Protecci??n del Consumidor de la Ciudad Reconquista, Santa Fe
                                                <br />
                                                <b>???</b>c) Tribunales ordinarios de la ciudad de Reconquista, Santa Fe con competencia en la materia.
                                                <br />
                                                Una vez elegida una de las opciones, se excluyen las dem??s alternativas.
                                                <br />
                                                Para el caso de que cualesquiera de las opciones anteriores fuesen gravosas o econ??micamente inviables para Usuarios domiciliados en el exterior, las partes, a pedido del Usuario, determinar??n de com??n acuerdo un mecanismo mutuamente conveniente para resolver sus diferencias.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
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