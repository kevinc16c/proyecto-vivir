import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Input, Divider, Form } from 'antd';
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
                                                Para facilitar la navegación del sitio, los usuarios podrán encontrar los términos y condiciones generales aquí descriptos en forma resumida, al final de la página de inicio, clickeando en los ítems correspondientes.
                                            <br />
                                            El sitio Mi DoraDa es propiedad del Grupo <b>LCDD</b>.
                                            <br />
                                            Se entenderá la palabra Sitio como sinónimo de sitioweb y/o website y/o APP
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Aceptación y conocimiento de los Téminos y Condiciones</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los presentes Términos y Condiciones tienen carácter obligatorio y vinculante. Se aplican a todas las compras y actividades realizadas mediante el Sitio. El uso del sitio implica el conocimiento y la aceptación de ellos. Si usted no está de acuerdo con los Términos y Condiciones, deberá abstenerse de utilizar el Sitio y/o los servicios por él ofrecidos. Por “Usuario” del Sitio se entiende tanto a los registrados como a los visitantes.
                                            <br />
                                            Para permitirles a los Usuarios una más rápida familiarización con estos Términos y Condiciones podrán consultar también todas las demás instrucciones para operar en el Sitio, como, por ejemplo, la página de ayuda que también forman parte de estos Términos y Condiciones.
                                            <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Modificación de los Términos y Condiciones</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los Términos y Condiciones podrán ser sustituidos o sufrir modificaciones en cualquier momento y a exclusivo criterio de Grupo <b>LCDD</b>, y no se requerirá a los Usuarios su consentimiento. Para las transacciones en curso que hayan comenzado con anterioridad a dichas modificaciones, subsistirán las condiciones vigentes al momento de su concertación, a menos que las nuevas modificaciones introducidas fueran más convenientes para el Usuario.
                                                <br />
                                                Grupo <b>LCDD</b> pondrá un aviso en el Sitio alertando a los Usuarios sobre estos cambios, durante un tiempo razonable. Sin perjuicio de lo anterior, los Usuarios son responsables de leer estos Términos y Condiciones cada vez que ingresen al Sitio para ver si han sufrido modificaciones.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Interrupción del Servicio – Exclusión de responsabilidad.</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Grupo <b>LCDD</b> se reserva el derecho de interrumpir, suspender o modificar en cualquier momento los servicios ofrecidos en el presente Sitio, ya sea en forma permanente o transitoria. No se requerirá la conformidad de los Usuarios, ni será necesario aviso previo alguno.
                                            <br />
                                            Asimismo, Grupo <b>LCDD</b> no garantiza el acceso o uso permanente del Sitio, ya que éste podría interrumpirse por cuestiones técnicas ajenas a Grupo <b>LCDD</b>.
                                            <br />
                                            No obstante lo mencionado anteriormente, si la suspensión o interrupción mencionada no obedeciere a razones de fuerza mayor o caso fortuito, Grupo <b>LCDD</b> se compromete a cumplir las prestaciones que estuvieran pendientes al momento de la suspensión o interrupción.
                                            <br />
                                            Grupo <b>LCDD</b> no garantiza que el Sitio se encuentre libre de virus, gusanos o cualquier otro elemento que pueda llegar a dañar o alterar el normal funcionamiento de un ordenador. Es responsabilidad y obligación exclusiva del Usuario contar con las herramientas adecuadas para detectar, desinfectar y/o prevenir cualquier tipo de elementos y/o posibles daños de esta naturaleza.
                                            <br />
                                            Grupo <b>LCDD</b> no se responsabiliza por cualquier daño que pueda producirse en los equipos informáticos de los Usuarios o de terceros como consecuencia de la navegación del presente Sitio.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Registración</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los Usuarios pueden navegar libremente por el Sitio, pero deberán estar registrados para poder realizar alguna compra o utilizar los servicios ofrecidos en él.
                                                <br />
                                                La registración de los Usuarios se realiza ingresando al Sitio, y no tiene costo alguno.
                                                <br />
                                                Es obligatorio completar el formulario en todos los campos con datos válidos y verdaderos, de manera exacta y precisa. Para un correcto funcionamiento del sistema, es necesario que los Usuarios mantengan sus datos actualizados. Grupo <b>LCDD</b> podrá proceder a verificar la identidad del Usuario y/o de los datos consignados por éste.
                                                <br />
                                                Grupo <b>LCDD</b> no se responsabiliza por la veracidad o certeza de los datos provistos por los Usuarios. Asimismo, Grupo <b>LCDD</b> se reserva el derecho de suspender temporal o definitivamente a los Usuarios en caso de incumplimiento de los Términos y Condiciones, como así también de rechazar solicitudes.
                                                <br />
                                                Los Usuarios accederán a su Cuenta Personal (la “Cuenta”) mediante un nombre de Usuario (número de cliente) y una clave personal que en este caso es el número de DNI. En caso de que estos datos sean olvidados por el Usuario, Grupo <b>LCDD</b> cuenta con un servicio de ayuda para recuperarlos. Para esto se deberán ponerse en contacto con nuestros locales y se le enviará de manera confidencial al medio que elijan su nombre de Usuario y la clave personal.
                                                <br />
                                                Así como Grupo <b>LCDD</b> se compromete a mantener la confidencialidad de los datos aportados por los Usuarios para su registro, los Usuarios se comprometen a mantener la confidencialidad de su nombre y clave de acceso. De conformidad con lo expresado en el párrafo anterior, los Usuarios son responsables del uso que se haga de su clave y deberán tener presente que si otras personas tienen o pueden tener en el futuro acceso a la cuenta de e-mail consignada como propia en el formulario de registración, éstas también podrían solicitar su clave de acceso y nombre de Usuario. Es obligación exclusiva del Usuario tomar las medidas pertinentes para que esto no suceda. El Usuario se compromete a notificar inmediatamente y de manera fehaciente a Grupo <b>LCDD</b> cualquier uso no autorizado de su Cuenta de Usuario, y a mantenerlo indemne en el caso de que se esto produzca algún daño a la Empresa o a terceros.
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
                                                Para utilizar los servicios del Sitio se requiere tener capacidad legal para contratar. No podrán acceder a los servicios quienes carezcan de ella, los que hayan sido suspendidos o inhabilitados, ni los menores de edad. Los padres, tutores o responsables de los menores de edad o incapaces que utilicen el Sitio serán responsables por dicho uso, incluyendo cualquier cargo, facturación o daño que se derive de él.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Política de Privacidad de los datos personales suministrados por el Usuario. Seguridad y tratamiento</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Para poder utilizar el Sitio de manera eficiente y segura, los Usuarios deberán aportar ciertos datos, entre ellos, su nombre y apellido, domicilio, cuenta de e-mail, documento de identidad, sin los cuales se tornaría imposible brindar los servicios. Por eso se requiere que éstos sean verdaderos y exactos. Los datos recabados por los formularios correspondientes serán incorporados a la Base General Clientes de Grupo <b>LCDD</b>
                                                <br />
                                                Cuando se ingresan datos y números correspondientes a tarjetas de crédito estos son encriptados, asegurando así que se mantengan en total confidencialidad y no puedan ser vistos por otras personas.
                                                <br />
                                                En consonancia con lo prescripto por la Ley de Protección de Datos Personales, Nº 25,326, los Usuarios tendrán el derecho de acceder, actualizar y rectificar los datos ingresados cuando lo deseen. Si se solicitara la supresión de los datos, la misma implicará dejar de ser usuario del sistema y deberá hacerse por carta documento o presentación con firma certificada nombre de Grupo <b>LCDD</b> al domicilio indicado en el punto 32.
                                                <br />
                                                Cualquier Usuario del Sitio tendrá derecho a solicitar y obtener información sobre los datos personales que Grupo <b>LCDD</b> tenga en su base, quedando la Empresa obligada a proporcionar la información solicitada dentro de los diez días corridos de haber sido intimada fehacientemente. Los Usuarios también podrán ejercer el derecho de rectificación, cuando los datos que se posean fueran incorrectos.
                                                <br />
                                                Asimismo, los Usuarios podrán requerir en cualquier momento la baja de su solicitud y la eliminación de su Cuenta de la base de datos.
                                                <br />
                                                Grupo <b>LCDD</b> garantiza a sus Usuarios que utilizará los datos dentro de las pautas establecidas por la Ley 25.326 de Protección de los Datos Personales.
                                                <br />
                                                En caso de que los datos sean requeridos por la vía legal, administrativa o judicial correspondiente, Grupo <b>LCDD</b> se verá compelida a revelar los mismos a la autoridad solicitante. En la medida en que la legislación y normas de procedimiento lo permitan, Grupo <b>LCDD</b> informará a los Usuarios sobre estos requerimientos.
                                                <br />
                                                Al registrarse en el Sitio y formar parte de la Base General de Clientes, los Usuarios aceptan que Grupo <b>LCDD</b> se comunique con ellos por vía postal, telefónica o electrónica para enviar información que la Empresa considere, a su exclusivo criterio, que pueda ser de su interés, incluyendo publicidad e información sobre ofertas y promociones. En caso de que los Usuarios no deseen ser contactados con estos fines, podrán manifestárselo fehacientemente a Grupo <b>LCDD</b>, quien procederá a interrumpir este tipo de comunicaciones en el menor tiempo que le sea posible.
                                                <br />
                                                El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley Nº 25.326. La DIRECCION NACIONAL DE PROTECCION DE DATOS PERSONALES, Órgano de Control de la Ley Nº 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las normas sobre protección de datos personales.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Veracidad de la Información suministrada</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                En caso de que la información o los datos suministrados por el Usuario no sea verdadera, éste será responsable por los daños que este hecho pudiera ocasionar.
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
                                                Todas las sugerencias y comentarios que realice el Usuario podrán ser tenidas en cuenta, implementadas o adaptadas por Grupo <b>LCDD</b> sin que ello genere derecho alguno a favor de tal Usuario.
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
                                                El Sitio puede utilizar un sistema de seguimiento mediante "cookies", para que el acceso a la información, al pasar de página en página, se realice con mayor rapidez. También ayuda en algunos casos a identificar a los Usuarios, sin necesidad de solicitarles la clave de acceso una y otra vez.
                                                <br />
                                                Estas cookies son pequeños archivos que envía la página visitada y se alojan en el disco duro del ordenador, ocupando poco espacio.
                                                <br />
                                                Se hace saber a los Usuarios que utilizando las opciones de su navegador podrán limitar o restringir según su voluntad el alojamiento de estas “cookies”, aunque es desaconsejable restringirlas totalmente.
                                                <br />
                                                El sistema podrá recoger información sobre sus preferencias e intereses. En el caso de que esto ocurra, la información será utilizada exclusivamente con fines estadísticos para mejorar los servicios que se prestan en el Sitio. Grupo <b>LCDD</b> aplicará, en la mayor medida en que sea posible, procedimientos de disociación de la información de modo que los titulares de los datos sean inidentificables.
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
                                                Antes de comprar, el Usuario deberá tener en cuenta que los productos seleccionados pueden no encontrarse en stock. Toda compra se encuentra sujeta a disponibilidad Mi DoraDa solamente opera vía Internet. Por este motivo, puede ocurrir que, por más que sea posible ordenar la compra del producto en el Sitio, no haya existencias de éste, por una cuestión de movimiento diario en los locales de las firmas que proveen los productos a Mi DoraDa
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
                                                En concordancia con el punto anterior, en caso de que el o los productos seleccionados se encontraren agotados o demorados, Grupo <b>LCDD</b> se comunicará con el Usuario y lo invitará a que elija una de las siguientes opciones:
                                                <br />
                                                <b>●</b> Esperando la entrega del producto elegido (en caso de demora);
                                                <br />
                                                <b>●</b> Cancelación de la compra y devolución del importe por el medio de pago original;
                                                <br />
                                                <b>●</b> Cancelación de la compra y devolución del importe por el medio de pago original;
                                                <br />
                                                Cuando el Usuario opte por cancelar la compra, se devolverá el importe abonado según el medio de pago que se haya elegido oportunamente. En caso de que se haya pagado en dólares estadounidenses, se devolverá el importe al tipo de cambio del día de la cancelación.
                                                <br />
                                                En el caso de que el Usuario opte por el producto alternativo que le ofrece Grupo <b>LCDD</b>, éste deberá contener características iguales o superiores. En ningún caso se le pedirá al Usuario que abone sumas suplementarias o que se haga cargo de las diferencias, salvo que el producto alternativo ofrecido por Grupo <b>LCDD</b> y escogido por el Usuario sea de características ampliamente superiores y costosas al solicitado originalmente por el Usuario.
                                                <br />
                                                IMPORTANTE: para las situaciones contempladas en este apartado, el Usuario tendrá un plazo de diez días para elegir una de las opciones mencionadas. En caso de que el Usuario guarde silencio al respecto, Grupo <b>LCDD</b> podrá presumir que ha optado por la cancelación de la compra, y procederá a la devolución del importe abonado, ya sea por el medio de pago original.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Devolución del importe abonado</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                En los casos mencionados en el punto anterior en que el Usuario haya optado por la devolución del importe abonado, deberá tener en cuenta que el reintegro puede demorar algunos días, debido a plazos y cuestiones administrativas.
                                                <br />
                                                Para los casos de devolución vía depósito bancario, la cuenta bancaria deberá estar a nombre del titular de la Cuenta de Usuario desde donde se haya realizado la operación. En caso de que no coincidan las titularidades, se requerirá la expresa autorización del titular de la Cuenta de Usuario como condición indispensable previa al depósito.
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
                                                En el caso de que se realicen ofertas y promociones de productos, éstas tendrán validez para las compras efectuadas desde la fecha de comienzo de las mismas, hasta la de finalización de la oferta. Los términos y condiciones de las mismas serán comunicados en el Sitio, y estarán siempre sujetas a la existencia en stock de los productos ofrecidos.
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
                                            <h2 style={{ fontWeight: 'bold' }}>Garantía de los productos</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                La venta de los productos se realiza por cuenta y orden del proveedor. La garantía de los productos que se adquieren a través de Grupo <b>LCDD</b> es la que ofrecen los fabricantes y/o proveedores de los mismos, que son los únicos responsables directos. Una vez transcurrido el plazo establecido en el segundo párrafo del punto 16 de estos Términos y Condiciones Generales, cualquier reclamo deberá ser dirigido contra el fabricante y/o proveedor del producto.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Derecho de arrepentimiento. Devolución de los productos</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El Usuario tendrá derecho a devolver los productos adquiridos en el Sitio durante el plazo de cinco días corridos, contados a partir de la entrega de la cosa, sin responsabilidad alguna. Para esto deberá notificar de manera fehaciente a Grupo <b>LCDD</b>, dentro del plazo señalado, y poner a su disposición el o los productos adquiridos. Los productos deberán estar en el mismo estado en que fueron recibidos, sin haber sido utilizados, y con el embalaje original. Grupo <b>LCDD</b> devolverá al Usuario todos los importes recibidos. Los gastos de devolución correrán por cuenta del cliente.
                                                <br />
                                                Asimismo, si el o los productos presentaren algún defecto de fabricación, hubieren sufrido roturas o deterioros en tránsito, o fueren despachados equivocadamente, el Usuario deberá comunicarse con cualquiera de nuestros locales dentro del plazo mencionado en el párrafo anterior, para que Grupo <b>LCDD</b> proceda, según corresponda, a gestionar el re-despacho de la compra, o pasar a retirar la orden.
                                                <br />
                                                Los productos no deben haber sido utilizados, y deben encontrarse en las mismas condiciones en que fueron recibidos, con sus embalajes y etiquetas. Por ejemplo, y a mero título ilustrativo, si el producto se encuentra en un envoltorio (“blíster”) plástico, éste debe ser abierto prolija y cuidadosamente, pues de lo contrario no podrá realizarse el cambio.
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
                                                Todos los precios en el Sitio están expresados en pesos argentinos, moneda de curso legal de la República Argentina.
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
                                                Los pagos podrán realizarse con tarjeta. Grupo <b>LCDD</b> podrá habilitar otras opciones, para facilitar las compras de sus clientes.
                                                <br />
                                                También se puede pagar por medio de tarjeta de crédito en cuotas, según se indique en el Sitio. El Usuario podrá ver el importe de las cuotas haciendo “click” en “Planes de Pago”, dentro de la página en que se encuentra el producto.
                                                <br />
                                                Todos los medios de pago están sujetos a que el importe sea debidamente acreditado y/o verificado.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Pago con tarjeta de crédito</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los pagos podrán ser realizados on-line mediante las tarjetas, Visa, Diners, Mastercard y American Express. Toda la información ingresada por el Usuario está protegida por el sistema SSL (ver punto 6).
                                                <br />
                                                La confirmación de la compra con tarjeta de crédito estará sujeta a la autorización del emisor de la misma.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Envío de productos dentro del país. Tiempo de entrega</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Las entregas se realizarán en la dirección que el Usuario indique. La validez de la misma es de su exclusiva responsabilidad. No se entregarán órdenes a casillas de correo (P.O. Box).
                                                <br />
                                                El tiempo de entrega depende de la disponibilidad del producto, del tiempo de envío y de la aprobación del medio de pago. Los días que se indiquen son estimativos. Los envíos se realizan en toda la República Argentina, sin excepción.
                                                <br />
                                                Al realizar una compra, el Usuario recibe en la APP o su casilla de correo electrónico una confirmación de que la orden de pedido ha sido aceptada, junto a un número de pedido (factura de compra).
                                                <br />
                                                Para asegurar la máxima eficacia en las entregas, éstas se realizan mediante empresas especializadas.
                                                <br />
                                                El tiempo de aprobación varía según el medio de pago. En el caso de las tarjetas de crédito, el Usuario deberá verificar que los datos proporcionados para la autorización sean correctos.
                                                <br />
                                                El tiempo de disponibilidad es el que demora el proveedor en entregar a Grupo <b>LCDD</b> el producto para su envío.
                                                <br />
                                                El tiempo de envío varía según el destino, nacional, donde se solicite la entrega.
                                                <br />
                                                El tiempo de entrega de la totalidad de la orden, así como su costo, será informado al Usuario antes de aceptar la compra.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Gastos de envío</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El Usuario será claramente informado de los costos de entrega antes de realizar la compra. Estos costos son calculados en función del peso total y/o el volumen total del envío, y también dependen de la zona del domicilio de entrega.
                                                <br />
                                                Los costos de envío serán discriminados como ítem separado dentro de la factura. Grupo <b>LCDD</b> está siempre trabajando para mejorar la calidad y el costo de entrega para sus clientes. Por este motivo, dichos costos y las políticas de envío se hallan sujetos a cambio sin previo aviso.
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
                                                Los productos serán entregados de lunes a viernes, entre las 9:00 y las 18:00 horas, con excepción de los feriados nacionales. Los Usuarios no podrán elegir ni el horario ni el día en que se entregarán el o los productos adquiridos, por lo que se recomienda seleccionar su domicilio laboral como punto de entrega para mayor seguridad. De todos modos, podrán hacerse sugerencias en el campo de observaciones al momento de realizar la compra, las que quedarán supeditadas al circuito de la empresa que tenga a su cargo el envío de los productos.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Dirección de la entrega</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                La dirección en donde se entregará el producto será la que el Usuario indique. Podrá no coincidir con su domicilio particular. Es responsabilidad del Usuario completar y revisar cuidadosamente la información relacionada con la entrega, para que el envío de la compra se haga de manera efectiva y puntual. Como ya ha sido mencionado, no se realizan envíos a casillas de correo (P.O. Box).
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Facturación</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El usuario tendrá a su disposición la factura tipo "B" con la información clara y precisa de los productos comprados, el método y plan de pago, y la moneda para la transacción en las oficinas de Grupo <b>LCDD</b>. En caso de necesitar dicha documentación podrá contactarse a través de lacasadedora407@gmail.com o bien comunicarse al 3482-524528 y se le enviará la factura solicitada.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Cancelación de órdenes de compra</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Sin perjuicio de lo establecido en el punto 16, el Usuario podrá cancelar una orden, siempre y cuando ésta no haya sido aún despachada. Para esto deberá ponerse en contacto con Grupo <b>LCDD</b> dentro de las 24 horas de realizada la compra enviando un e-mail a lacasadedora407@gmail.com
                                                <br />
                                                Si la cancelación de la compra es total, se reintegrará el importe mediante el medio de pago que se utilizó para abonar, o se le podrá dejar como crédito para realizar la compra de otro producto. El Usuario reconoce que en este caso, Grupo <b>LCDD</b> deberá realizar otro envío, motivo por el cual deberá cobrar al usuario los costos producidos por esta modificación.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Utilización del servicio "Recomienda Este Producto a un Amigo"</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                En el marco de su Política de Privacidad, Grupo <b>LCDD</b> se compromete a mantener la absoluta confidencialidad de los datos personales enviados por los Usuarios. El envío de comentarios de nuestros productos por e-mail se realiza a partir del expreso consentimiento del remitente, y bajo ningún concepto podrá ser considerado como “spam” (envío masivo de mensajes de correo electrónico con publicidad no solicitada).
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
                                                Se les prohíbe terminantemente a los Usuarios lo siguiente:
                                                <br />
                                                a) enviar archivos o cualquier tipo de información cuyo contenido sea ilegal, obsceno, abusivo, difamatorio, injurioso o contrario a las buenas costumbres;
                                                <br />
                                                b) enviar archivos que contengan virus o cualquier otra característica capaz de dañar el funcionamiento de una computadora, ya sea del Sitio o del sistema;
                                                <br />
                                                c) utilizar el Sitio para violar cualquier tipo de norma vigente;
                                                <br />
                                                d) registrarse bajo datos falsos y realizar una compra. Brindar datos falsos en cualquier otro momento en que les sea requerid cualquier otro tipo de información o datos personales;
                                                <br />
                                                e) ofrecer productos o servicios;
                                                <br />
                                                f) usar programas, software o aparatos automáticos o manuales para monitorear o copiar la información o cualquier tipo de contenido del Sitio sin previo consentimiento de Grupo <b>LCDD</b>.
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
                                                Grupo <b>LCDD</b> no se hace responsable por la veracidad de la información incorporada al Sitio por terceros. Tampoco se hace responsable en cuanto haya sido reproducida o comunicada directamente por los Usuarios del Sitio sin verificación por parte de Grupo <b>LCDD</b>. Si algún Usuario se viera afectado por la información a la que se alude en el párrafo anterior, deberá comunicárselo a Grupo <b>LCDD</b>, por mail o correo postal, a fin de que se proceda a la supresión de la misma.
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
                                            Todos los derechos del presente Sitio están reservados y corresponden a Grupo <b>LCDD</b>.
                                                <br />
                                                El contenido del presente Sitio, incluyendo, aunque no limitado al texto, logos, gráficos, y todo el diseño en general, así como su base de datos y software, es de propiedad de Grupo <b>LCDD</b> o tiene derecho a usarlo en virtud de licencias de uso otorgadas. Se encuentra protegido por las legislación nacional e internacional vigente sobre propiedad intelectual.
                                                <br />
                                                Si el Usuario considera que en el Sitio se viola o atenta de algún modo contra derechos de propiedad intelectual de terceros deberá notificarlo a Grupo <b>LCDD</b> en la dirección indicada en los presentes Términos y Condiciones Generales, acompañando toda la información y documentación necesaria que respalde la mencionada consideración.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}>Razón social y domicilio</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                La razón social de la empresa es Corina Priscila Vignolo, con domicilio en Freyre 407, Reconquista, Santa Fe, Argentina. CUIT Nº 27-29529410-3.
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
                                                Todas las notificaciones y/o comunicaciones que deban efectuarse por el uso de Sitio bajo estos Términos y Condiciones Generales, deberán realizarse por escrito:
                                                <br />
                                                (i) al Usuario: mediante correo electrónico, a la cuenta de correo consignada por éste, o por carta documento, al domicilio declarado en el formulario de registración.
                                                <br />
                                                (ii) a Grupo <b>LCDD</b>: a la cuenta de correo electrónico lacasadedora407@gmail.com, o a su domicilio legal indicado en el punto anterior Freyre 407, Reconquista, Santa Fe, Argentina.
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
                                                Cuando el Usuario hace "click" en avisos publicitarios o links de terceros e ingresa en otros sitios que no pertenecen a Grupo <b>LCDD</b> estará sujeto a los términos y condiciones de dichos sitios. El Usuario deberá leer detenidamente sus políticas de acceso y uso.
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
                                            <h2 style={{ fontWeight: 'bold' }}>Jurisdicción y Ley aplicable</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los presentes Términos y Condiciones se encuentran regidos sin excepción y en todos sus puntos por las leyes de la República Argentina y serán interpretados de acuerdo a ellas.
                                                <br />
                                                Ante cualquier diferencia, desacuerdo o conflicto derivado de la interpretación, validez, alcance y/o aplicación de los presentes Términos y Condiciones Generales, los Usuarios se comunicarán con Grupo <b>LCDD</b> de manera fehaciente, haciéndole llegar su reclamo, para que las partes traten de arribar a un acuerdo.
                                                <br />
                                                En caso de que no sea posible arribar a una solución, y para garantizar a los consumidores el pleno acceso a la justicia, los Usuarios podrán elegir y someter su reclamo a una de las siguientes opciones e instancias:
                                                <br />
                                                <b>●</b>a) Sistema Nacional de Arbitraje de Consumo del Ministerio de Economía y Producción de la Nación. Los procedimientos ante este Sistema son gratuitos, y no es necesario contar con patrocinio letrado. Asimismo, se garantiza el equilibrio entre las partes y la transparencia del proceso, y los laudos emitidos por dicho Tribunal tienen autoridad de cosa juzgada y son irrecurribles (para saber más sobre este sistema ingresar en <a href="http://www.mecon.gov.ar/snac" target="noopener noreferrer">http://www.mecon.gov.ar/snac</a>)
                                                <br />
                                                <b>●</b>b) Dirección General de Defensa y Protección del Consumidor de la Ciudad Reconquista, Santa Fe
                                                <br />
                                                <b>●</b>c) Tribunales ordinarios de la ciudad de Reconquista, Santa Fe con competencia en la materia.
                                                <br />
                                                Una vez elegida una de las opciones, se excluyen las demás alternativas.
                                                <br />
                                                Para el caso de que cualesquiera de las opciones anteriores fuesen gravosas o económicamente inviables para Usuarios domiciliados en el exterior, las partes, a pedido del Usuario, determinarán de común acuerdo un mecanismo mutuamente conveniente para resolver sus diferencias.
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