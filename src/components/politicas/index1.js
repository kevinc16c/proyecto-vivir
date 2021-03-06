import React from 'react';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Table, Button, Col, Row, Breadcrumb, message, Input, Divider } from 'antd';
// import { api } from './api';
// import { isMobile } from 'react-device-detect';
import QueueAnim from 'rc-queue-anim';
import './css.css';
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
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Reglamento de Uso del Portal M??vil (Personas Naturales y Personas Jur??dicas)</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El presente documento establece las condiciones mediante las cuales se regir?? el uso de la aplicaci??n m??vil: DORADA (en adelante la aplicaci??n), la cual es operada por <b>LA CASA DE DORA (en adelante LCDD)</b>, empresa constituida en Reconquista, Santa Fe y domiciliada en la calle Freyre 407 y que act??a en representaci??n de las tiendas AMAPOLA XL y LOLITA MIA.
                                <br />
                                La aplicaci??n funcionar?? como un nuevo canal para la realizaci??n de ciertas actividades descritas m??s adelante con el objeto de facilitar el acceso a los clientes de las tiendas de <b>LCDD</b>.
                                <br />
                                El usuario se compromete a leer los t??rminos y condiciones aqu?? establecidas, previamente a la descarga de la aplicaci??n, por tanto, en caso de realizar la instalaci??n se entiende que cuenta con el conocimiento integral de este documento y la consecuente aceptaci??n de la totalidad de sus estipulaciones.
                                <br />
                                El Usuario reconoce que el ingreso de su informaci??n personal, y los datos que contiene la aplicaci??n a su disposici??n respecto a los productos activos con las tiendas de LCDD, la realizan de manera voluntaria, quienes optan por acceder a esta aplicaci??n en Argentina o desde fuera del territorio nacional, lo hacen por iniciativa propia y son responsables del cumplimiento de las leyes locales, en la medida en que dichas leyes sean aplicables en su correspondiente pa??s. En caso de que se acceda por parte de menores de edad, deben contar con la supervisi??n de un adulto en todo momento desde la descarga y durante el uso de la aplicaci??n, en el evento en que no se cumpla esta condici??n, le agradecemos no hacer uso de la aplicaci??n.
                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Alcance y Uso</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El usuario de la aplicaci??n entiende y acepta que no obstante es operada por <b>LCDD.</b>, la informaci??n contenida en la misma ser?? la referente a su v??nculo comercial o contractual con las siguientes tiendas: <b>LA CASA DE DORA, AMAPOLA XL Y LOLITA MIA OUTLET</b>, por tanto, las funcionalidades ofrecidas por la aplicaci??n ser??n entregadas por cada tienda de acuerdo con su vinculaci??n.
                                                <br />
                                                En la aplicaci??n se pondr?? a disposici??n del CLIENTE informaci??n y/o permitir?? la realizaci??n de las transacciones determinadas o habilitadas por <b>LCDD</b> para cada producto en particular. <b>LCDD</b> podr?? adicionar, modificar o eliminar las funcionalidades en cualquier momento, lo cual acepta el usuario mediante la instalaci??n de la aplicaci??n. En todo caso, al momento de realizar dichas modificaciones se notificar??n al usuario a trav??s de la misma aplicaci??n m??vil una vez inicie sesi??n.
                                                <br />
                                                Los tiempos de respuesta, tramites y dem??s solicitudes efectuadas por el usuario mediante la aplicaci??n ser??n procesadas de conformidad con las especificaciones de cada producto activo con <b>LCDD.</b>
                                                                <br />
                                                El usuario acepta y autoriza que los registros electr??nicos de las actividades mencionadas, que realice en la aplicaci??n constituyen plena prueba de los mismos.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Requisitos para Uso</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El usuario deber?? contar con un dispositivo m??vil inteligente (Smartphone) o Tableta con sistema operativo Android, cualquiera de estos con acceso a internet, ambos seguros y confiables. <b>LCDD</b>, no ser?? responsable por la seguridad de los equipos Smartphone propiedad de los usuarios utilizados para el acceso al canal, ni por la disponibilidad del servicio en los dispositivos en los cuales se descargue la aplicaci??n.
                                                <br />
                                                En la forma permitida por la ley, los materiales de la aplicaci??n se suministran sin garant??a de ning??n g??nero, expresa o impl??cita, incluyendo sin limitaci??n las garant??as de calidad satisfactoria, comerciabilidad, adecuaci??n para un fin particular o no infracci??n, por tanto, <b>LCDD</b> no garantiza el funcionamiento adecuado en los distintos sistemas operativos o dispositivos en los cuales se haga uso de la aplicaci??n.
                                                <br />
                                                Para acceder al portal, EL CLIENTE contar?? con Usuario y Clave, que lo identifica en su relaci??n con <b>LCDD</b>, los cuales ser??n los mismos utilizados en el portal web. Adicional a lo anterior se requerir?? a EL CLIENTE, registrar preguntas de seguridad, las cuales ser??n solicitadas al momento de intentar ingresar el portal, s??lo cuando el cliente ingrese desde un equipo registrado no se solicitar?? responder las preguntas definidas con anterioridad.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Obligaciones de los Usuarios</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El Usuario se obliga a usar la aplicaci??n y los contenidos encontrados en ella de una manera diligente, correcta, l??cita y en especial, se compromete a NO realizar las conductas descritas a continuaci??n:
                                                <br />
                                                <b>???</b>(a) Utilizar los contenidos de forma, con fines o efectos contrarios a la ley, a la moral y a las buenas costumbres generalmente aceptadas o al orden p??blico;
                                                <br />
                                                <b>???</b>(b) Reproducir, copiar, representar, utilizar, distribuir, transformar o modificar los contenidos de la aplicaci??n, por cualquier procedimiento o sobre cualquier soporte, total o parcial, o permitir el acceso del p??blico a trav??s de cualquier modalidad de comunicaci??n p??blica;
                                                <br />
                                                <b>???</b>(c) Utilizar los contenidos de cualquier manera que entra??en un riesgo de da??o o inutilizaci??n de la aplicaci??n o de los contenidos o de terceros;
                                                <br />
                                                <b>???</b>(d) Suprimir, eludir o manipular el derecho de autor y dem??s datos identificativos de los derechos de autor incorporados a los contenidos, as?? como los dispositivos t??cnicos de protecci??n, o cualesquiera mecanismos de informaci??n que pudieren tener los contenidos;
                                                <br />
                                                <b>???</b>(e) Emplear los contenidos y, en particular, la informaci??n de cualquier clase obtenida a trav??s de la aplicaci??n para distribuir, transmitir, remitir, modificar, rehusar o reportar la publicidad o los contenidos de esta con fines de venta directa o con cualquier otra clase de finalidad comercial, mensajes no solicitados dirigidos a una pluralidad de personas con independencia de su finalidad, as?? como comercializar o divulgar de cualquier modo dicha informaci??n;
                                                <br />
                                                <b>???</b>(f) No permitir que terceros ajenos a usted usen la aplicaci??n m??vil con su clave;
                                                <br />
                                                <b>???</b>g) Utilizar la aplicaci??n y los contenidos con fines l??citos y/o il??citos, contrarios a lo establecido en estos T??rminos y Condiciones, o al uso mismo de la aplicaci??n, que sean lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan da??ar, inutilizar, sobrecargar o deteriorar la aplicaci??n y los contenidos o impedir la normal utilizaci??n o disfrute de esta y de los contenidos por parte de los usuarios.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Propiedad Intelectual</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                            Todo el material inform??tico, gr??fico, publicitario, fotogr??fico, de multimedia, audiovisual y de dise??o, as?? como todos los contenidos, textos y bases de datos puestos a su disposici??n en esta aplicaci??n est??n protegidos por derechos de autor y/o propiedad industrial cuyo titular es <b>LCDD.</b>, o sus compa????as filiales, vinculadas o subsidiarias, en algunos casos, de terceros que han autorizado su uso o explotaci??n. Igualmente, el uso en la aplicaci??n de algunos materiales de propiedad de terceros se encuentra expresamente autorizado por la ley o por dichos terceros. Todos los contenidos en la aplicaci??n est??n protegidos por las normas sobre derecho de autor y por todas las normas nacionales e internacionales que le sean aplicables.
                                                <br />
                                                Exceptuando lo expresamente estipulado en estos T??rminos y Condiciones, queda prohibido todo acto de copia, reproducci??n, modificaci??n, creaci??n de trabajos derivados, venta o distribuci??n, exhibici??n de los contenidos de esta aplicaci??n, de manera o por medio alguno, incluyendo, m??s no limitado a, medios electr??nicos, mec??nicos, de fotocopiado, de grabaci??n o de cualquier otra ??ndole, sin el permiso previo y por escrito de <b>LCDD</b> o del titular de los respectivos derechos.
                                                <br />
                                                En ning??n caso estos T??rminos y Condiciones confieren derechos, licencias ni autorizaciones para realizar los actos anteriormente prohibidos. Cualquier uso no autorizado de los contenidos constituir?? una violaci??n del presente documento y a las normas vigentes sobre derechos de autor, a las normas vigentes nacionales e internacionales sobre Propiedad Industrial, y a cualquier otra que sea aplicable.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Licencia para Copiar para Uso Personal</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Usted podr?? leer, visualizar, imprimir y descargar el material de sus productos.
                                                <br/>
                                                Ninguna parte de la aplicaci??n podr?? ser reproducida o transmitida o almacenada en otro sitio web o en otra forma de sistema de recuperaci??n electr??nico.
                                                <br />
                                                Ya sea que se reconozca espec??ficamente o no, las marcas comerciales, las marcas de servicio y los logos visualizados en esta aplicaci??n pertenecen al grupo de Tiendas <b>LCDD</b>, sus socios promocionales u otros terceros.
                                                <br />
                                                <b>LCDD</b> no interfiere, no toma decisiones, ni garantiza las relaciones que los usuarios lleguen a sostener o las vinculaciones con terceros que pauten y/o promocionen sus productos y servicios. Estas marcas de terceros se utilizan solamente para identificar los productos y servicios de sus respectivos propietarios y el patrocinio o el aval por parte de <b>LCDD</b> no se deben inferir con el uso de estas marcas comerciales.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Integraci??n con Otras Aplicaciones</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los links de Facebook??, Instagram??, twitter?? en esta aplicaci??n pueden mostrar contenido que no est??n bajo el control de <b>LCDD</b>.
                                                <br />
                                                Aunque esta aplicaci??n de <b>LCDD</b> trata de suministrar links solamente a sitios y aplicaciones de terceros que cumplan con las leyes y regulaciones aplicables y las normas de <b>LCDD</b>, el Usuario debe entender que <b>LCDD</b> no tiene control sobre la naturaleza y el contenido de esos sitios y no est?? recomendando estos sitios, la informaci??n que contienen ni los productos o servicios de terceros.
                                                <br />
                                                <b>LCDD</b> no acepta responsabilidad por el contenido del sitio de un tercero con el cual existe un link de hipertexto y no ofrece garant??a (expl??cita o impl??cita) en cuanto al contenido de la informaci??n en esos sitios, ya que no recomienda estos sitios.
                                                <br />
                                                Usted debe verificar las secciones de t??rminos y condiciones, pol??tica legal y de privacidad de algunos otros sitios de <b>LCDD</b> o de un tercero con los cuales se enlaza.
                                                <br />
                                                <b>LCDD</b> no asume ninguna responsabilidad por p??rdida directa, indirecta o consecuencial por el uso de un sitio de un tercero.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Uso de Informaci??n y Privacidad</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Con la descarga de la APP usted acepta y autoriza que <b>LCDD</b>, utilice sus datos en calidad de responsable del tratamiento para fines derivados de la ejecuci??n de la APP. <b>LCDD</b> informa que podr?? ejercer sus derechos a conocer, actualizar, rectificar y suprimir su informaci??n personal; as?? como el derecho a revocar el consentimiento otorgado para el tratamiento de datos personales previstos en la Ley N?? 25.326 de Protecci??n de Datos Personales y sus normas complementarias y dem??s normativa de la Rep??blica Argentina, siendo voluntario responder preguntas sobre informaci??n sensible o de menores de edad.
                                                <br />
                                                <b>LCDD</b> podr?? dar a conocer, transferir y/o trasmitir sus datos personales dentro y fuera del pa??s a cualquier empresa miembro del grupo <b>LCDD</b>, as?? como a terceros a consecuencia de un contrato, ley o v??nculo l??cito que as?? lo requiera, para todo lo anterior otorgo mi autorizaci??n expresa e inequ??voca.
                                                <br />
                                                De conformidad a lo anterior autoriza el tratamiento de su informaci??n en los t??rminos se??alados, y transfiere a <b>LCDD</b> de manera total, y sin limitaci??n mis derechos de imagen y patrimoniales de autor, de manera voluntaria, previa, explicita, informada e inequ??voca. 
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Responsabilidad de LCDD</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                            <b>LCDD</b> procurar?? garantizar disponibilidad, continuidad o buen funcionamiento de la aplicaci??n. <b>LCDD podr?? bloquear, interrumpir o restringir el acceso a esta cuando lo considere necesario para el mejoramiento de la aplicaci??n</b> o por dada de baja de la misma.
                                                <br />
                                                Se recomienda al Usuario tomar medidas adecuadas y actuar diligentemente al momento de acceder a la aplicaci??n, como, por ejemplo, contar con programas de protecci??n, antivirus, para manejo de malware, spyware y herramientas similares.
                                                <br />
                                                <b>LCDD</b> no ser?? responsable por: a) Fuerza mayor o caso fortuito; b) Por la p??rdida, extrav??o o hurto de su dispositivo m??vil que implique el acceso de terceros a la aplicaci??n m??vil; c) Por errores en la digitaci??n o accesos por parte del cliente; d) Por los perjuicios, lucro cesante, da??o emergente, morales, y en general sumas a cargo de LCDD, por los retrasos, no procesamiento de informaci??n o suspensi??n del servicio del operador m??vil o da??os en los dispositivos m??viles.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Denegaci??n y Retirada del Acceso a la Aplicaci??n</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                En el Evento en que un Usuario incumpla estos T??rminos y Condiciones, o cualesquiera otras disposiciones que resulten de aplicaci??n, <b>LCDD</b> podr?? suspender su acceso a la aplicaci??n.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>T??rminos y Condiciones</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El Usuario acepta expresamente los T??rminos y Condiciones, siendo condici??n esencial para la utilizaci??n de la aplicaci??n. En el evento en que se encuentre en desacuerdo con estos T??rminos y Condiciones, solicitamos abandonar la aplicaci??n inmediatamente. <b>LCDD</b> podr?? modificar los presentes t??rminos y condiciones, avisando a los usuarios de la aplicaci??n mediante publicaci??n en la p??gina web <a style={{color:'#00c83c'}}>www.lacasadedora.com.ar</a> o mediante la difusi??n de las modificaciones por alg??n medio electr??nico, redes sociales, SMS y/o correo electr??nico, lo cual se entender?? aceptado por el usuario si ??ste continua con el uso de la aplicaci??n. 
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Jurisdicci??n</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                            Los T??rminos y Condiciones de Uso aqu?? presentados se rigen por las leyes de la Rep??blica Argentina. En caso de surgir cualquier controversia respecto de la interpretaci??n o cumplimiento de los presentes, el Administrador y el Usuario se someten a los Tribunales Nacionales en lo Contencioso Administrativo.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Uso de Informaci??n no Personal</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                <b>LCDD</b> tambi??n recolecta informaci??n no personal en forma agregada para seguimiento de datos como el n??mero total de descargas de la aplicaci??n. Utilizamos esta informaci??n, que permanece en forma agregada, para entender el comportamiento de la aplicaci??n.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Uso de Direcciones IP</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Una direcci??n de Protocolo de Internet (IP) es un conjunto de n??meros que se asigna autom??ticamente a su o dispositivo m??vil cuando usted accede a su proveedor de servicios de internet, o a trav??s de la red de ??rea local (LAN) de su organizaci??n o la red de ??rea amplia (WAN). Los servidores web autom??ticamente identifican su dispositivo m??vil por la direcci??n IP asignada a ??l durante su sesi??n en l??nea.
                                                <br />
                                                <b>LCDD</b> podr??n recolectar direcciones IP para prop??sitos de administraci??n de sistemas y para auditar el uso de nuestro sitio, todo lo anterior de acuerdo con la autorizaci??n de protecci??n de datos que se suscribe para tal efecto. Normalmente no vinculamos la direcci??n IP de un usuario con la informaci??n personal de ese usuario, lo que significa que cada sesi??n de usuario se registra, pero el usuario sigue siendo an??nimo para nosotros. Sin embargo, podemos usar las direcciones IP para identificar a los usuarios de nuestro sitio cuando sea necesario con el objeto de para exigir el cumplimiento de los t??rminos de uso del sitio, o para proteger nuestro servicio, sitio u otros usuarios.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Seguridad</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                <b>LCDD</b> est?? comprometido en la protecci??n de la seguridad de su informaci??n personal. <b>LCDD</b> tiene implementados mecanismos de seguridad que aseguran la protecci??n de la informaci??n personal, as?? como los accesos ??nicamente al personal y sistemas autorizados, tambi??n contra la p??rdida, uso indebido y alteraci??n de sus datos de usuario bajo nuestro control.
                                                <br />
                                                Excepto como se indica a continuaci??n, s??lo personal autorizado tiene acceso a la informaci??n que nos proporciona. Adem??s, hemos impuesto reglas estrictas a los empleados de <b>LCDD</b> con acceso a las bases de datos que almacenan informaci??n del usuario o a los servidores que hospedan nuestros servicios.
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