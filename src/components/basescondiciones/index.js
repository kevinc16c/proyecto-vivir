import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Form } from 'antd';
import QueueAnim from 'rc-queue-anim';


class Bases extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    render() {
        return (
            <div className="container-fluid no-breadcrumb">
                <QueueAnim type="bottom" className="ui-animate">
                    <div className="box box-default box-ant-table-v1" style={{ marginTop: 15 }}>
                        <div className="box-body">
                            <div className="container-fluid no-breadcrumb container-mw-lg chapter mb-8" style={{ backgroundColor: 'white' }}>
                            <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ fontWeight: 'bold' }}><u>TERMINOS Y CONDICIONES VIVIR CARLOS PAZ</u></h2>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Este contrato describe los términos y condiciones generales (los Términos y Condiciones Generales) aplicables al uso de los servicios ofrecidos por <b>VIVIR CARLOS PAZ</b>,  (los Servicios) dentro de la aplicación Cualquier persona (en adelante Usuario o en plural Usuarios) que desee acceder y/o usar la aplicación o los servicios podrá hacerlo sujetándose a los Términos y Condiciones Generales, junto con todas las demás políticas y principios que rigen <b>VIVIR CARLOS PAZ</b>  y que son incorporados al presente por referencia.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                <b>
                                                CUALQUIER PERSONA QUE NO ACEPTE ESTOS TÉRMINOS Y CONDICIONES GENERALES, LOS CUALES TIENEN UN CARÁCTER OBLIGATORIO Y VINCULANTE, DEBERÁ ABSTENERSE DE UTILIZAR LA APLICACIÓN Y/O LOS SERVICIOS.
                                                </b>
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El Usuario debe leer, entender y aceptar todas las condiciones establecidas en los Términos y Condiciones Generales, en las Políticas de Privacidad y confidencialidad de la información Seguridad así como en los demás documentos incorporados a los mismos por referencia, previo a su registración como Usuario de <b>VIVIR CARLOS PAZ</b>.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El registro del usuario para el uso del Servicio aquí especificado será considerado como expreso consentimiento a cumplir con este Contrato, incluido cualquier material disponible en la aplicación incorporado como referencia en este documento.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los Servicios sólo están disponibles para personas que tengan capacidad legal para contratar. No podrán utilizar los servicios las personas que no tengan esa capacidad, los menores de edad o Usuarios de VIVIR CARLOS PAZ que hayan sido suspendidos temporalmente o inhabilitados definitivamente. Si estás registrando como Empresa, debes tener capacidad para contratar a nombre de tal entidad y de obligar a la misma en los términos de este Acuerdo.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Es obligatorio completar el formulario de registración en todos sus campos con datos válidos para poder utilizar los servicios que brinda <b>VIVIR CARLOS PAZ</b>. El futuro Usuario deberá completarlo con su información personal de manera exacta, precisa y verdadera (Datos Personales) y asume el compromiso de actualizar los Datos Personales conforme resulte necesario. <b>VIVIR CARLOS PAZ</b> podrá utilizar diversos medios para identificar a sus Usuarios, pero <b>VIVIR CARLOS PAZ</b> NO se responsabiliza por la certeza de los Datos Personales provistos por sus Usuarios. Los Usuarios garantizan y responden, en cualquier caso, de la veracidad, exactitud, vigencia y autenticidad de los Datos personal elegida (Clave de Seguridad). El Usuario se obliga a mantener la confidencialidad de su Clave de Seguridad. La Cuenta es personal, única e intransferible, y está prohibido que un mismo Usuario registre o posea más de una Cuenta. En caso que <b>VIVIR CARLOS PAZ</b> detecte distintas Cuentas que contengan datos coincidentes o relacionados, podrá cancelar, suspender o inhabilitarlas. El Usuario será responsable por todas las operaciones efectuadas en su Cuenta, <mark style={{backgroundColor:'#fcfc03'}}>pues el acceso a la misma está restringido al ingreso y uso de su Clave de Seguridad, de conocimiento exclusivo del Usuario</mark>. El Usuario se compromete a notificar a <b>VIVIR CARLOS PAZ</b> en forma inmediata y por medio idóneo y fehaciente, cualquier uso no autorizado de su Cuenta, así como el ingreso por terceros no autorizados a la misma. Se aclara que está prohibida la venta, cesión o transferencia de la Cuenta. Los Usuarios garantizan y responden, en cualquier caso, de la veracidad, exactitud, vigencia y autenticidad de los Información Personal ingresados.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                <b>VIVIR CARLOS PAZ</b> podrá modificar los Términos y Condiciones Generales en cualquier momento haciendo públicos en la aplicación los términos modificados. Todos los términos modificados entrarán en vigor a los 10 (diez) días de su publicación. Dentro de los 5 (cinco) días siguientes a la publicación de las modificaciones introducidas, el Usuario deberá comunicar por email a Info@vivircarlospaz.com si no acepta las mismas; en ese caso será inhabilitado como Usuario siempre que no tenga deudas pendientes. Vencido este plazo, se considerará que el Usuario acepta los nuevos términos y el contrato continuará vinculando a ambas partes.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Para utilizar los Servicios ofrecidos por <b>VIVIR CARLOS PAZ</b>, los Usuarios deberán facilitar determinados datos de carácter personal o comercial. Esta Información se procesa y almacena en servidores o medios magnéticos que mantienen altos estándares de seguridad y protección tanto física como tecnológica. Para mayor información sobre la privacidad de la Información Personal o Comercial y casos en los que será revelada dicha Información, se puede consultar nuestra Política de privacidad y confidencialidad de la información.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                <b>VIVIR CARLOS PAZ</b> sólo pone a disposición de los Usuarios un espacio virtual que les permite comunicarse mediante Internet para encontrar una forma de comprar comidas, bebidas, plazas hoteleras  u otros artículos o servicios relacionado. VIVIR CARLOS PAZ no tiene participación alguna en el proceso de negociación y perfeccionamiento del contrato definitivo entre las partes. Por eso, VIVIR CARLOS PAZ no es responsable por el efectivo cumplimiento de las obligaciones fiscales o impositivas establecidas por la ley vigente. Dado que VIVIR CARLOS PAZ es un punto de encuentro entre comprador y Comercio y no participa de las operaciones que se realizan entre ellos, el Comercio será responsable por todas las obligaciones y cargas impositivas que correspondan por la venta de sus comidas, bebidas u otros artículos y servicios, sin que pudiera imputársele a VIVIR CARLOS PAZ algún tipo de responsabilidad por incumplimientos en tal sentido.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                No está permitida ninguna acción o uso de dispositivo, software, u otro medio tendiente a interferir tanto en las actividades y operatoria de <b>VIVIR CARLOS PAZ</b> como en las ofertas, descripciones, cuentas o bases de datos de <b>VIVIR CARLOS PAZ</b>. Cualquier intromisión, tentativa o actividad violatoria o contraria a las leyes sobre derecho de propiedad intelectual y/o a las prohibiciones estipuladas en este contrato harán pasible a su responsable de las acciones legales pertinentes, y a las sanciones previstas por este acuerdo, así como lo hará responsable de indemnizar los daños ocasionados.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Sin perjuicio de otras medidas, <b>VIVIR CARLOS PAZ</b> advertirá, suspenderá temporal o inhabilitará definitivamente la Cuenta de un Usuario e iniciará las acciones que estime pertinentes, y no le prestará sus Servicios si (a) se quebrantara alguna ley, o cualquiera de las estipulaciones de los Términos y Condiciones Generales y demás políticas de <b>VIVIR CARLOS PAZ</b>; (b) si incumpliera sus compromisos como Usuario; (c) si se incurriera a criterio de <b>VIVIR CARLOS PAZ</b> en conductas o actos dolosos o fraudulentos; (d) no pudiera verificarse la identidad del Usuario o cualquier información proporcionada por el mismo fuere errónea. Asimismo <b>VIVIR CARLOS PAZ</b> podrá decidir a su exclusivo criterio no prestar el servicio, sin generar esto responsabilidad alguna.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                <b>VIVIR CARLOS PAZ</b> sólo pone a disposición de los Usuarios un espacio virtual que les permite ponerse en comunicación mediante Internet para encontrar una forma de comprar comidas, bebidas, plazas hoteleras u otros artículos, bienes o servicios <b>VIVIR CARLOS PAZ</b> no es el propietario de los artículos ofrecidos, no tiene posesión de ellos ni los ofrece en venta. <b>VIVIR CARLOS PAZ</b> no interviene en el perfeccionamiento de las operaciones realizadas entre los Usuarios ni en las condiciones por ellos estipuladas para las mismas, por ello no será responsable respecto de la existencia, calidad, cantidad, estado, integridad o legitimidad de los bienes ofrecidos, adquiridos o enajenados por los Usuarios, así como de la capacidad para contratar de los Usuarios o de la veracidad de los Información Personal por ellos ingresados. Cada Comercio conoce y es el exclusivo responsable por las ofertas de productos y servicios que publica para su venta, por su existencia, calidad, cantidad, precio, estado, integridad o legitimidad. Asimismo el Usuario o cliente asume y reconoce la anterior responsabilidad mencionada por las compras que realiza.
                                                <br/>
                                                <b>VIVIR CARLOS PAZ</b> no será responsable por el efectivo cumplimiento de las obligaciones asumidas por los Usuarios en el perfeccionamiento de la operación de venta. El Usuario conoce y acepta que al realizar operaciones, lo hace bajo su propio riesgo. En ningún caso VIVIR CARLOS PAZ será responsable por lucro cesante, o por cualquier otro daño y/o perjuicio que haya podido sufrir el Usuario, debido a las compras realizadas o frustradas en su venta.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                En caso que uno o más Usuarios inicien cualquier tipo de reclamo o acciones legales contra un Comercio, todos y cada uno de los Usuarios involucrados en dichos reclamos o acciones eximen de toda responsabilidad a <b>VIVIR CARLOS PAZ</b> y a sus empleados, agentes, operarios, representantes y apoderados.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Este acuerdo no crea ningún contrato de sociedad, de mandato, de franquicia, o relación laboral entre <b>VIVIR CARLOS PAZ</b> y el Usuario. El Usuario reconoce y acepta que <b>VIVIR CARLOS PAZ</b> no es parte en ninguna operación, ni tiene control alguno sobre la calidad, seguridad o legalidad de productos o servicios adquiridos, o sobre la veracidad o exactitud de las ofertas.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                <b>VIVIR CARLOS PAZ</b> no se responsabiliza por cualquier daño, perjuicio o pérdida al Usuario causados por fallas en el sistema, en el servidor o en Internet. <b>VIVIR CARLOS PAZ</b> tampoco será responsable por cualquier virus que pudiera infectar el equipo del Usuario como consecuencia del acceso, uso o examen de su sitio web o a raíz de cualquier transferencia de datos, archivos, imágenes, textos, o audio contenidos en el mismo. Los Usuarios NO podrán imputarle responsabilidad alguna ni exigir pago por lucro cesante, en virtud de perjuicios resultantes de dificultades técnicas o fallas en los sistemas o en Internet. <b>VIVIR CARLOS PAZ</b> no garantiza el acceso y uso continuado o ininterrumpido de la aplicación. El sistema puede eventualmente no estar disponible debido a dificultades técnicas o fallas de Internet, o por cualquier otra circunstancia ajena a <b>VIVIR CARLOS PAZ</b>; en tales casos se procurará restablecerlo con la mayor celeridad posible sin que por ello pueda imputársele algún tipo de responsabilidad. <b>VIVIR CARLOS PAZ</b> no será responsable por ningún error u omisión contenidos en la aplicación.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Usuarios. La registración y el uso de <b>VIVIR CARLOS PAZ</b> son gratuitos para los Usuarios. <b>VIVIR CARLOS PAZ</b> se reserva el derecho de modificar, cambiar, agregar, o eliminar las tarifas vigentes, en cualquier momento, lo cual será notificado a los Usuarios. Sin embargo, <b>VIVIR CARLOS PAZ</b> podrá modificar temporalmente la Política de Tarifas y las tarifas por sus servicios por razón de promociones, siendo efectivas estas modificaciones cuando se haga pública la promoción o se realice el anuncio.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los contenidos de las pantallas relativas a los servicios de <b>VIVIR CARLOS PAZ</b> como así también los programas, bases de datos, redes, archivos que permiten al Usuario acceder y usar su Cuenta, son de propiedad de <b>VIVIR CARLOS PAZ</b> y están protegidas por las leyes y los tratados internacionales de derecho de autor, marcas, patentes, modelos y diseños industriales. El uso indebido y la reproducción total o parcial de dichos contenidos quedan prohibidos, salvo autorización expresa y por escrito de <b>VIVIR CARLOS PAZ</b>.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'left' }}>
                                            <b>Obligaciones de los Usuarios</b>
                                        </div>
                                    </Col>
                                </Row>


                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                <b>Obligaciones del Usuario Comprador</b>. Para poder adquirir la calidad de Usuario Comprador este de realizar un procedimiento de validación on line mediante la descarga de la aplicación a sus dispositivos,  completando en forma precisa y veráz todos los campos obligatorios del formulario de Alta de Usuario provisto por <b>VIVIR CARLOS PAZ</b>.  Durante la vigencia de las ofertas de sus productos o servicios por parte del Usuario Vendedor, los Usuarios interesados podrán realizar sus pedidos; la operación queda concretada una vez que el Usuario Vendedor acepte el pedido formulado; en ese caso el Usuario Comprador queda obligado completar la operación, lo que incluye la recepción de las productos y/o servicios en las condiciones de venta especificadas por el Usuario Vendedor y a abonar en la forma convenida esos productos o servicios.-  
                                                <br/>
                                                Una vez aceptado el pedido por el Usuario Vendedor la operación queda concretada y es irrevocable salvo en circunstancias excepcionales, tales como que el vendedor no cumpla con las características de los productos o servicios ofrecidos, o que no pueda verificar la identidad del vendedor.
                                                <br/>
                                                Obligaciones del Usuario Vendedor. El Usuario Vendedor debe tener capacidad legal para vender o prestar el o los bienes o servicios  objeto de su oferta.
                                                <br/>
                                                Para poder adquirir la calidad de Usuario Vendedor este de realizar un procedimiento de validación on line o físico, completando en forma precisa y veráz todos los campos obligatorios del formulario de Alta de Usuario provisto por <b>VIVIR CARLOS PAZ</b>.
                                                <br/>
                                                Si el Usuario Vendedor ha recibido al menos un pedido sobre las mercaderías, bienes o servicios ofrecidos, queda obligado  con el Usuario Comprador a completar la operación, lo que incluye el traslado de las mercaderías o bienes al lugar indicado por el Usuario Comprador en tiempo oportuno y en perfectos estado para su consumo, debiendo cumplir además con los requisitos establecidos por <b>VIVIR CARLOS PAZ</b> relativos a la identificación del producto con <b>VIVIR CARLOS PAZ</b>. Asimismo el Usuario Vendedor deberá indicar en forma precisa el radio de cobertura de su servicio.- El Usuario Vendedor podrá controlar on line el listado de su cuenta, debiendo liquidar en forma semanal a <b>VIVIR CARLOS PAZ</b> los montos correspondientes al  porcentaje establecido por cada operación concretada. Para el caso de que el Usuario Vendedor no cumpliere con la obligación mencionada precedentemente y o cualquiera relativa al cumplimiento efectivo de sus obligaciones podrá ser suspendido en el uso de los servicios de <b>VIVIR CARLOS PAZ</b> hasta tanto no regularice su situación.-
                                                <br/>
                                                Pago de los servicios: La utilización del servicio es sin costo para el Usuario Comprador. El Usuario Vendedor podrá optar por uno de los tres planes de inversión: 
                                                <br/>
                                                a)	<b>PLAN BASIC</b>: Este contempla la publicación de la empresa en la app; información de contacto, geolocalización a través de Google Maps, vinculación con redes sociales:
                                                <br/>
                                                b)	<b>PLAN PLUS</b>: Este contempla la publicación de la empresa en la app; información de contacto, geolocalización a través de Google Maps, vinculación con redes sociales, venta de productos mediante el pago de una comisión del 15% del valor de las operaciones, cuponera automático con generación de promociones y  sistema de acumulación de puntos para canjear por premios.
                                                <br/>
                                                c)	<b>PLAN PREMIUM</b>: Este contempla la publicación de la empresa en la app; información de contacto, geolocalización a través de Google Maps, vinculación con redes sociales, venta de productos mediante el pago de una comisión del 15% del valor de las operaciones, cuponera automático con generación de promociones, sección exclusiva de promociones destacadas y camapañas especiales y sistema de notificaciones push exclusivas.
                                                <br/>
                                                Los precios para cada uno de los planes des establecen de la siguiente manera:
                                                <br/>
                                                PLAN BASIC $ 500 mensuales; PLAN PLUS $1.100 mensuales y PLAN PREMIUM $1.800 mensuales, estos valores podrán ser actualizados por <b>VIVIR CARLOS PAZ</b> con la sola obligación de  notificar las nuevas tarifas con 10 días de anticipación, para el caso de que no sean rechazadas expresamente se repurán aceptadas por los Usuarios Vendedores. 
                                                <br/>
                                                Los usuarios vendedores que opten por los planes PLUS Y PREMIUM deberán abonar a  <b>VIVIR CARLOS PAZ</b> un porcentaje que asciende al 15% de cada operación concretada mediante la interacción de <b>VIVIR CARLOS PAZ</b>, la cual deberá ser liquidada por este en forma semanal. El Usuario Vendedor, a través de su panel de control podrá acceder al estado de su cuenta, la cual reflejará las operaciones solicitadas y las efectivamente concretadas.-
                                                <br/>
                                                Solamente en casos excepcionales el Usuario Vendedor podrá retractarse de las operaciones solicitadas, tales como cuando por razones de fuerza mayor no se pudiere acceder al lugar donde debe efectivizarse la entrega, no haya podido acordar con el Usuario Comprador sobre la forma de pago, de entrega o no sea posible verificar la verdadera identidad o demás información del Usuario Comprador.
                                                <br/>
                                                <b>VIVIR CARLOS PAZ</b> tendrá el derecho de requerir, conforme los criterios que considere pertinentes, que ciertos Usuarios Vendedores solamente anuncien sus bienes o servicios en la Aplicación mediante la utilización de los Servicios de Gestión de Pagos online de <b>VIVIR CARLOS PAZ</b>  y/o otras herramientas que para este fin pueda ofrecer  <b>VIVIR CARLOS PAZ</b> para el cobro de los bienes, servicios o mercaderías vendidas.
                                                <br/>
                                                Dado que <b>VIVIR CARLOS PAZ</b> es un punto de encuentro entre comprador y vendedor y no participa de las operaciones que se realizan entre ellos, el Usuario Vendedor será responsable por todas las obligaciones y cargas impositivas que correspondan por la venta de sus bienes, servicios o mercaderías, sin que pudiera imputársele a <b>VIVIR CARLOS PAZ</b> algún tipo de responsabilidad por incumplimientos en tal sentido.
                                                <br/>
                                                Impuestos. Como se menciona anteriormente <b>VIVIR CARLOS PAZ</b> sólo pone a disposición de los Usuarios un espacio virtual que les permite comunicarse mediante Internet para encontrar una forma de concretar sus operaciones. <b>VIVIR CARLOS PAZ</b> no tiene participación alguna en el proceso de negociación y perfeccionamiento del contrato definitivo entre las partes. Por eso, <b>VIVIR CARLOS PAZ</b> no es responsable por el efectivo cumplimiento de las obligaciones fiscales o impositivas establecidas por la ley vigente, debiendo el Usuario Comprador exigir factura o ticket al Usuario Vendedor como comprobante de la operación.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                <b>Impuestos</b>. Como se menciona anteriormente <b>VIVIR CARLOS PAZ</b> sólo pone a disposición de los Usuarios un espacio virtual que les permite comunicarse mediante Internet para encontrar una forma de concretar sus operaciones. <b>VIVIR CARLOS PAZ</b> no tiene participación alguna en el proceso de negociación y perfeccionamiento del contrato definitivo entre las partes. Por eso, <b>VIVIR CARLOS PAZ</b> no es responsable por el efectivo cumplimiento de las obligaciones fiscales o impositivas establecidas por la ley vigente, debiendo el Usuario Comprador exigir factura o ticket al Usuario Vendedor como comprobante de la operación. 
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                La Aplicación puede contener enlaces a otros sitios web u aplicaciones lo cual no indica ni significa que sean propiedad u operados por <b>VIVIR CARLOS PAZ</b>. En virtud que <b>VIVIR CARLOS PAZ</b> no tiene control sobre tales sitios u aplicaciones NO será responsable por los contenidos, materiales, acciones y/o servicios prestados por los mismos, ni por daños o pérdidas ocasionadas por la utilización de los mismos, sean causadas directa o indirectamente. La presencia de enlaces a otros sitios web u aplicaciones no implica una sociedad, relación, aprobación, respaldo de <b>VIVIR CARLOS PAZ</b> a dichos sitios y sus contenidos.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                La Aplicación puede contener enlaces a otros sitios web u aplicaciones lo cual no indica ni significa que sean propiedad u operados por <b>VIVIR CARLOS PAZ</b>. En virtud que <b>VIVIR CARLOS PAZ</b> no tiene control sobre tales sitios u aplicaciones NO será responsable por los contenidos, materiales, acciones y/o servicios prestados por los mismos, ni por daños o pérdidas ocasionadas por la utilización de los mismos, sean causadas directa o indirectamente. La presencia de enlaces a otros sitios web u aplicaciones no implica una sociedad, relación, aprobación, respaldo de <b>VIVIR CARLOS PAZ</b> a dichos sitios y sus contenidos.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Forman parte integral e inseparable de los Términos y Condiciones Generales, los siguientes documentos y/o secciones de <b>VIVIR CARLOS PAZ</b> incorporados por referencia. Los mismos se podrán consultar dentro de la aplicación sitio mediante el enlace abajo provisto o accediendo directamente a las páginas correspondientes: - <a href="https://www.vivircarlospaz.com/#/politicas">Políticas de privacidad y confidencialidad de la información</a>
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Este acuerdo estará regido en todos sus puntos por las leyes vigentes en la República Argentina.
                                                <br/>
                                                Cualquier controversia derivada del presente acuerdo, su existencia, validez, interpretación, alcance o cumplimiento, será sometida a los tribunales Ordinarios de la Ciudad de Córdoba, República Argentina y los procedimientos se llevarán a cabo en idioma castellano. VIVIR CARLOS PAZ es propiedad de ________ S.R.L. y se fija como domicilio de VIVIR CARLOS PAZ, la calle ______________________, Ciudad de Villa Carlos Paz, código postal _________, República Argentina.
                                                <br/>
                                                Si tiene alguna duda sobre los Términos y Condiciones Generales o demás políticas y principios que rigen a VIVIR CARLOS PAZ, consulte nuestra página de Ayuda o envíe un email a <b>Info@vivrcarlospaz.com</b>
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