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
                                            <h2 style={{ fontWeight: 'bold' }}>POLITICA DE PRIVACIDAD</h2>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 16 }}>
                                                En cumplimiento del artículo 6° de la ley Nº 25.326 (Ley de Protección de Datos Personales) el titular de los datos toma conocimiento que los datos facilitados a VIVIR CARLOS PAZ, son necesarios para establecer la relación contractual entre los Usuarios Compradores y Usuarios Vendedores y para que VIVIR CARLOS PAZ pueda brindar el servicio de encuentro digital entre los usuarios, y serán tratados únicamente para las operaciones relativas al cumplimiento de las operaciones celebradas entre los usuarios, encuestas, suscripciones, ofertas de servicios, y cualquier otra ACCIÓN comercial, en total cumplimiento a las normativas aplicables.
                                                <br />
                                                El titular de los datos toma conocimiento de la existencia de un Banco de Datos donde se almacena su información personal, en sede de ________ S.R.L., titular de VIVIR CARLOS PAZ, único responsable del mismo, siendo dicha información totalmente confidencial, entre el Usuario y VIVIR CARLOS PAZ.
                                                <br />
                                                Toda la información que el usuario proporciona se considerará verdadera, exacta y completa. El titular de los datos es único y exclusivo responsable de la información que brinda. En tal sentido, será único y exclusivo responsable respecto de las consecuencias que genere cualquier inexactitud o falsedad de la información brindada.
                                                <br />
                                                El Titular de los datos toma conocimiento de la facultad de ejercer el derecho de acceso a sus datos personales en forma gratuita a intervalos no inferiores a seis meses, salvo que acredite un interés legítimo al efecto, y asimismo que tiene derecho, de ser procedente, a rectificar y/o suprimir dichos datos (arts. 14, 15 y 16 de la Ley Nº 25.326).
                                                <br />
                                                •	Los Servicios de VIVIR CARLOS PAZ sólo están disponibles para aquellas personas que tengan capacidad legal para contratar conforme la normativa aplicable. Por lo tanto, si el usuario no cumple con esta condición, no deberá suministrar su Información Personal.
                                                <br />
                                                •	VIVIR CARLOS PAZ permite a los usuarios un acceso limitado a ciertos datos (como nombre, correo electrónico, otros datos de contacto e información para facturación y envíos) del resto de los usuarios para facilitar la interacción entre ellos. Bajo ninguna circunstancia otros usuarios podrán comunicar la Información Personal a terceros sin el consentimiento del titular de los datos y/o el consentimiento de VIVIR CARLOS PAZ, según corresponda.
                                                <br />
                                                •	Cuando un usuario vendedor recibe información personal de sus compradores, se constituye en responsable por el tratamiento de esos datos y adquiere las obligaciones que ello implica. Por ello, no puede usar los datos para una finalidad distinta o incompatible a la que originó la recolección: completar una transacción en la aplicación VIVIR CARLOS PAZ. Por esta razón, sólo podrán utilizar la Información Personal de otros usuarios obtenida mediante la aplicación: a) fines relacionados con transacciones en la aplicación VIVIR CARLOS PAZ, b) reclamos sobre incumplimientos y fraude ocurridos en el uso de la aplicación, y c) cualquier otra finalidad a la que el usuario correspondiente consienta expresamente una vez le haya sido comunicada previamente la información legalmente requerida.
                                                <br />
                                                •	VIVIR CARLOS PAZ no acepta conductas consideradas "spamming". Queda absolutamente prohibido el envío indiscriminado de mensajes de cualquier naturaleza entre los usuarios de VIVIR CARLOS PAZ.
                                                <br />
                                                •	VIVIR CARLOS PAZ no controla, almacena ni tiene acceso a los mensajes y contenidos enviados por los usuarios a través de medios diferentes a la aplicación, por lo que no asume ninguna responsabilidad respecto a los daños que pudiera ocasionar su uso. Para el caso de que los usuarios celebren operaciones y lleven adelante negociaciones por fuera de los canales que brinda la aplicación quedan bajo la propia responsabilidad de dichos usuarios.
                                                <br />
                                                <b>•	VIVIR CARLOS PAZ no es responsable del uso que cualquier usuario u otra persona pudieran hacer de la información publicada en la aplicación. Los usuarios aceptan que VIVIR CARLOS PAZ no será responsable de las pérdidas ni daños e incumplimientos que se puedan generar como resultado de las negociaciones entre usuarios. En consecuencia, VIVIR CARLOS PAZ queda expresamente eximida de todo tipo de responsabilidad en caso de que exista conflicto entre usuarios, sin perjuicio de las sanciones que pudieren corresponderle a los usuarios como por ejemplo la suspensión de su cuenta.</b>
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h3 style={{ fontWeight: 'bold' }}><u>Cambios en la Declaración de Privacidad</u></h3>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 16 }}>
                                                Si VIVIR CARLOS PAZ realizara cambios en la forma en que la Información Personal sea administrada, notificaremos a los usuarios por nuestros canales habituales, como el correo electrónico o mensajes a través de la aplicación. En los términos permitidos por la normativa vigente, para el caso de usuarios que no acepten esos nuevos términos, el vínculo con VIVIR CARLOS PAZ quedará disuelto y la Información Personal de dicho usuario no será usada de otra forma que la que fue informada al momento de recabarse.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <h3 style={{ fontWeight: 'bold' }}><u>Ley Aplicable y Jurisdicción</u></h3>
                                        </div>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 16 }}>
                                                La Declaración de Privacidad se regirá por las leyes aplicables en la República Argentina. Ante cualquier controversia o divergencia relacionada con la interpretación, validez, celebración o cumplimiento de la presente Declaración de Privacidad, las partes se someten a la jurisdicción de los tribunales ordinarios de la ciudad de Villa Carlos Paz, Provincia de Córdoba, renunciando las partes a cualquier otro fuero o jurisdicción que les pudiere corresponder, inclusive la federal.
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <div className="row" style={{ textAlign: 'justify' }}>
                                            <p style={{ fontSize: 16 }}>
                                                <b>La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, Órgano de Control de la Ley Nº 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las normas sobre protección de datos personales”. Para contactar a la AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA: Av. Pte. Gral. Julio A. Roca 710, Piso 3, Ciudad Autónoma de Buenos Aires (C1067ABP), Tel (54- 11) 3988-3968- www.argentina.gob.ar/aaip - datospersonales@aaip.gob.ar</b>
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