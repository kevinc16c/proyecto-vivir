import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null,
      flag: this.props.flag,
    }
  }
  componentDidMount() {
    this.setState({ lat: this.props.lat, lng: this.props.lng })
    this.props.leido(false)
  }

  onMarkerDragEnd = (evt) => {
    this.props.onChangePos(evt.latLng.lat(), evt.latLng.lng());
    this.setState({ lat: evt.latLng.lat(), lng: evt.latLng.lng() })
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.flag;
  }
  // One-shot position request.

  render() {

    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
        defaultZoom={15}
        defaultOptions={{ streetViewControl: true, mapTypeControl: true }}
      >
        <Marker
          defaultDraggable={true}
          defaultPosition={{ lat: this.props.lat, lng: this.props.lng }}
          defaultClickable={true}
          clickable={true}
          onClickableChanged={this.onMarkerDragEnd}
          position={{ lat: this.props.lat, lng: this.props.lng }}
          onDragEnd={this.onMarkerDragEnd}
        />

      </GoogleMap>
    ));
    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `400px`, width: '100%' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
};
export default Map;
