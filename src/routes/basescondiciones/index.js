import React from 'react';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Col, Row } from 'antd';
import QueueAnim from 'rc-queue-anim';
import './css.css';


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
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Reglamento de Uso del Portal Móvil (Personas Naturales y Personas Jurídicas)</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El presente documento establece las condiciones mediante las cuales se regirá el uso de la aplicación móvil: DORADA (en adelante la aplicación), la cual es operada por <b>LA CASA DE DORA (en adelante LCDD)</b>, empresa constituida en Reconquista, Santa Fe y domiciliada en la calle Freyre 407 y que actúa en representación de las tiendas AMAPOLA XL y LOLITA MIA.
                                <br />
                                La aplicación funcionará como un nuevo canal para la realización de ciertas actividades descritas más adelante con el objeto de facilitar el acceso a los clientes de las tiendas de <b>LCDD</b>.
                                <br />
                                El usuario se compromete a leer los términos y condiciones aquí establecidas, previamente a la descarga de la aplicación, por tanto, en caso de realizar la instalación se entiende que cuenta con el conocimiento integral de este documento y la consecuente aceptación de la totalidad de sus estipulaciones.
                                <br />
                                El Usuario reconoce que el ingreso de su información personal, y los datos que contiene la aplicación a su disposición respecto a los productos activos con las tiendas de LCDD, la realizan de manera voluntaria, quienes optan por acceder a esta aplicación en Argentina o desde fuera del territorio nacional, lo hacen por iniciativa propia y son responsables del cumplimiento de las leyes locales, en la medida en que dichas leyes sean aplicables en su correspondiente país. En caso de que se acceda por parte de menores de edad, deben contar con la supervisión de un adulto en todo momento desde la descarga y durante el uso de la aplicación, en el evento en que no se cumpla esta condición, le agradecemos no hacer uso de la aplicación.
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
                                                El usuario de la aplicación entiende y acepta que no obstante es operada por <b>LCDD.</b>, la información contenida en la misma será la referente a su vínculo comercial o contractual con las siguientes tiendas: <b>LA CASA DE DORA, AMAPOLA XL Y LOLITA MIA OUTLET</b>, por tanto, las funcionalidades ofrecidas por la aplicación serán entregadas por cada tienda de acuerdo con su vinculación.
                                                <br />
                                                En la aplicación se pondrá a disposición del CLIENTE información y/o permitirá la realización de las transacciones determinadas o habilitadas por <b>LCDD</b> para cada producto en particular. <b>LCDD</b> podrá adicionar, modificar o eliminar las funcionalidades en cualquier momento, lo cual acepta el usuario mediante la instalación de la aplicación. En todo caso, al momento de realizar dichas modificaciones se notificarán al usuario a través de la misma aplicación móvil una vez inicie sesión.
                                                <br />
                                                Los tiempos de respuesta, tramites y demás solicitudes efectuadas por el usuario mediante la aplicación serán procesadas de conformidad con las especificaciones de cada producto activo con <b>LCDD.</b>
                                                                <br />
                                                El usuario acepta y autoriza que los registros electrónicos de las actividades mencionadas, que realice en la aplicación constituyen plena prueba de los mismos.
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
                                                El usuario deberá contar con un dispositivo móvil inteligente (Smartphone) o Tableta con sistema operativo Android, cualquiera de estos con acceso a internet, ambos seguros y confiables. <b>LCDD</b>, no será responsable por la seguridad de los equipos Smartphone propiedad de los usuarios utilizados para el acceso al canal, ni por la disponibilidad del servicio en los dispositivos en los cuales se descargue la aplicación.
                                                <br />
                                                En la forma permitida por la ley, los materiales de la aplicación se suministran sin garantía de ningún género, expresa o implícita, incluyendo sin limitación las garantías de calidad satisfactoria, comerciabilidad, adecuación para un fin particular o no infracción, por tanto, <b>LCDD</b> no garantiza el funcionamiento adecuado en los distintos sistemas operativos o dispositivos en los cuales se haga uso de la aplicación.
                                                <br />
                                                Para acceder al portal, EL CLIENTE contará con Usuario y Clave, que lo identifica en su relación con <b>LCDD</b>, los cuales serán los mismos utilizados en el portal web. Adicional a lo anterior se requerirá a EL CLIENTE, registrar preguntas de seguridad, las cuales serán solicitadas al momento de intentar ingresar el portal, sólo cuando el cliente ingrese desde un equipo registrado no se solicitará responder las preguntas definidas con anterioridad.
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
                                                El Usuario se obliga a usar la aplicación y los contenidos encontrados en ella de una manera diligente, correcta, lícita y en especial, se compromete a NO realizar las conductas descritas a continuación:
                                                <br />
                                                <b>●</b>(a) Utilizar los contenidos de forma, con fines o efectos contrarios a la ley, a la moral y a las buenas costumbres generalmente aceptadas o al orden público;
                                                <br />
                                                <b>●</b>(b) Reproducir, copiar, representar, utilizar, distribuir, transformar o modificar los contenidos de la aplicación, por cualquier procedimiento o sobre cualquier soporte, total o parcial, o permitir el acceso del público a través de cualquier modalidad de comunicación pública;
                                                <br />
                                                <b>●</b>(c) Utilizar los contenidos de cualquier manera que entrañen un riesgo de daño o inutilización de la aplicación o de los contenidos o de terceros;
                                                <br />
                                                <b>●</b>(d) Suprimir, eludir o manipular el derecho de autor y demás datos identificativos de los derechos de autor incorporados a los contenidos, así como los dispositivos técnicos de protección, o cualesquiera mecanismos de información que pudieren tener los contenidos;
                                                <br />
                                                <b>●</b>(e) Emplear los contenidos y, en particular, la información de cualquier clase obtenida a través de la aplicación para distribuir, transmitir, remitir, modificar, rehusar o reportar la publicidad o los contenidos de esta con fines de venta directa o con cualquier otra clase de finalidad comercial, mensajes no solicitados dirigidos a una pluralidad de personas con independencia de su finalidad, así como comercializar o divulgar de cualquier modo dicha información;
                                                <br />
                                                <b>●</b>(f) No permitir que terceros ajenos a usted usen la aplicación móvil con su clave;
                                                <br />
                                                <b>●</b>g) Utilizar la aplicación y los contenidos con fines lícitos y/o ilícitos, contrarios a lo establecido en estos Términos y Condiciones, o al uso mismo de la aplicación, que sean lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar o deteriorar la aplicación y los contenidos o impedir la normal utilización o disfrute de esta y de los contenidos por parte de los usuarios.
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
                                            Todo el material informático, gráfico, publicitario, fotográfico, de multimedia, audiovisual y de diseño, así como todos los contenidos, textos y bases de datos puestos a su disposición en esta aplicación están protegidos por derechos de autor y/o propiedad industrial cuyo titular es <b>LCDD.</b>, o sus compañías filiales, vinculadas o subsidiarias, en algunos casos, de terceros que han autorizado su uso o explotación. Igualmente, el uso en la aplicación de algunos materiales de propiedad de terceros se encuentra expresamente autorizado por la ley o por dichos terceros. Todos los contenidos en la aplicación están protegidos por las normas sobre derecho de autor y por todas las normas nacionales e internacionales que le sean aplicables.
                                                <br />
                                                Exceptuando lo expresamente estipulado en estos Términos y Condiciones, queda prohibido todo acto de copia, reproducción, modificación, creación de trabajos derivados, venta o distribución, exhibición de los contenidos de esta aplicación, de manera o por medio alguno, incluyendo, más no limitado a, medios electrónicos, mecánicos, de fotocopiado, de grabación o de cualquier otra índole, sin el permiso previo y por escrito de <b>LCDD</b> o del titular de los respectivos derechos.
                                                <br />
                                                En ningún caso estos Términos y Condiciones confieren derechos, licencias ni autorizaciones para realizar los actos anteriormente prohibidos. Cualquier uso no autorizado de los contenidos constituirá una violación del presente documento y a las normas vigentes sobre derechos de autor, a las normas vigentes nacionales e internacionales sobre Propiedad Industrial, y a cualquier otra que sea aplicable.
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
                                                Usted podrá leer, visualizar, imprimir y descargar el material de sus productos.
                                                <br/>
                                                Ninguna parte de la aplicación podrá ser reproducida o transmitida o almacenada en otro sitio web o en otra forma de sistema de recuperación electrónico.
                                                <br />
                                                Ya sea que se reconozca específicamente o no, las marcas comerciales, las marcas de servicio y los logos visualizados en esta aplicación pertenecen al grupo de Tiendas <b>LCDD</b>, sus socios promocionales u otros terceros.
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
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Integración con Otras Aplicaciones</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Los links de Facebook®, Instagram®, twitter® en esta aplicación pueden mostrar contenido que no están bajo el control de <b>LCDD</b>.
                                                <br />
                                                Aunque esta aplicación de <b>LCDD</b> trata de suministrar links solamente a sitios y aplicaciones de terceros que cumplan con las leyes y regulaciones aplicables y las normas de <b>LCDD</b>, el Usuario debe entender que <b>LCDD</b> no tiene control sobre la naturaleza y el contenido de esos sitios y no está recomendando estos sitios, la información que contienen ni los productos o servicios de terceros.
                                                <br />
                                                <b>LCDD</b> no acepta responsabilidad por el contenido del sitio de un tercero con el cual existe un link de hipertexto y no ofrece garantía (explícita o implícita) en cuanto al contenido de la información en esos sitios, ya que no recomienda estos sitios.
                                                <br />
                                                Usted debe verificar las secciones de términos y condiciones, política legal y de privacidad de algunos otros sitios de <b>LCDD</b> o de un tercero con los cuales se enlaza.
                                                <br />
                                                <b>LCDD</b> no asume ninguna responsabilidad por pérdida directa, indirecta o consecuencial por el uso de un sitio de un tercero.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Uso de Información y Privacidad</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                Con la descarga de la APP usted acepta y autoriza que <b>LCDD</b>, utilice sus datos en calidad de responsable del tratamiento para fines derivados de la ejecución de la APP. <b>LCDD</b> informa que podrá ejercer sus derechos a conocer, actualizar, rectificar y suprimir su información personal; así como el derecho a revocar el consentimiento otorgado para el tratamiento de datos personales previstos en la Ley Nº 25.326 de Protección de Datos Personales y sus normas complementarias y demás normativa de la República Argentina, siendo voluntario responder preguntas sobre información sensible o de menores de edad.
                                                <br />
                                                <b>LCDD</b> podrá dar a conocer, transferir y/o trasmitir sus datos personales dentro y fuera del país a cualquier empresa miembro del grupo <b>LCDD</b>, así como a terceros a consecuencia de un contrato, ley o vínculo lícito que así lo requiera, para todo lo anterior otorgo mi autorización expresa e inequívoca.
                                                <br />
                                                De conformidad a lo anterior autoriza el tratamiento de su información en los términos señalados, y transfiere a <b>LCDD</b> de manera total, y sin limitación mis derechos de imagen y patrimoniales de autor, de manera voluntaria, previa, explicita, informada e inequívoca. 
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
                                            <b>LCDD</b> procurará garantizar disponibilidad, continuidad o buen funcionamiento de la aplicación. <b>LCDD podrá bloquear, interrumpir o restringir el acceso a esta cuando lo considere necesario para el mejoramiento de la aplicación</b> o por dada de baja de la misma.
                                                <br />
                                                Se recomienda al Usuario tomar medidas adecuadas y actuar diligentemente al momento de acceder a la aplicación, como, por ejemplo, contar con programas de protección, antivirus, para manejo de malware, spyware y herramientas similares.
                                                <br />
                                                <b>LCDD</b> no será responsable por: a) Fuerza mayor o caso fortuito; b) Por la pérdida, extravío o hurto de su dispositivo móvil que implique el acceso de terceros a la aplicación móvil; c) Por errores en la digitación o accesos por parte del cliente; d) Por los perjuicios, lucro cesante, daño emergente, morales, y en general sumas a cargo de LCDD, por los retrasos, no procesamiento de información o suspensión del servicio del operador móvil o daños en los dispositivos móviles.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Denegación y Retirada del Acceso a la Aplicación</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                En el Evento en que un Usuario incumpla estos Términos y Condiciones, o cualesquiera otras disposiciones que resulten de aplicación, <b>LCDD</b> podrá suspender su acceso a la aplicación.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Términos y Condiciones</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                El Usuario acepta expresamente los Términos y Condiciones, siendo condición esencial para la utilización de la aplicación. En el evento en que se encuentre en desacuerdo con estos Términos y Condiciones, solicitamos abandonar la aplicación inmediatamente. <b>LCDD</b> podrá modificar los presentes términos y condiciones, avisando a los usuarios de la aplicación mediante publicación en la página web <a style={{color:'#00c83c'}}>www.lacasadedora.com.ar</a> o mediante la difusión de las modificaciones por algún medio electrónico, redes sociales, SMS y/o correo electrónico, lo cual se entenderá aceptado por el usuario si éste continua con el uso de la aplicación. 
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Jurisdicción</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                            Los Términos y Condiciones de Uso aquí presentados se rigen por las leyes de la República Argentina. En caso de surgir cualquier controversia respecto de la interpretación o cumplimiento de los presentes, el Administrador y el Usuario se someten a los Tribunales Nacionales en lo Contencioso Administrativo.
                                                <br />
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h2 style={{ color: '#00c83c', fontWeight: 'bold' }}>Uso de Información no Personal</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 14 }}>
                                                <b>LCDD</b> también recolecta información no personal en forma agregada para seguimiento de datos como el número total de descargas de la aplicación. Utilizamos esta información, que permanece en forma agregada, para entender el comportamiento de la aplicación.
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
                                                Una dirección de Protocolo de Internet (IP) es un conjunto de números que se asigna automáticamente a su o dispositivo móvil cuando usted accede a su proveedor de servicios de internet, o a través de la red de área local (LAN) de su organización o la red de área amplia (WAN). Los servidores web automáticamente identifican su dispositivo móvil por la dirección IP asignada a él durante su sesión en línea.
                                                <br />
                                                <b>LCDD</b> podrán recolectar direcciones IP para propósitos de administración de sistemas y para auditar el uso de nuestro sitio, todo lo anterior de acuerdo con la autorización de protección de datos que se suscribe para tal efecto. Normalmente no vinculamos la dirección IP de un usuario con la información personal de ese usuario, lo que significa que cada sesión de usuario se registra, pero el usuario sigue siendo anónimo para nosotros. Sin embargo, podemos usar las direcciones IP para identificar a los usuarios de nuestro sitio cuando sea necesario con el objeto de para exigir el cumplimiento de los términos de uso del sitio, o para proteger nuestro servicio, sitio u otros usuarios.
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
                                                <b>LCDD</b> está comprometido en la protección de la seguridad de su información personal. <b>LCDD</b> tiene implementados mecanismos de seguridad que aseguran la protección de la información personal, así como los accesos únicamente al personal y sistemas autorizados, también contra la pérdida, uso indebido y alteración de sus datos de usuario bajo nuestro control.
                                                <br />
                                                Excepto como se indica a continuación, sólo personal autorizado tiene acceso a la información que nos proporciona. Además, hemos impuesto reglas estrictas a los empleados de <b>LCDD</b> con acceso a las bases de datos que almacenan información del usuario o a los servidores que hospedan nuestros servicios.
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