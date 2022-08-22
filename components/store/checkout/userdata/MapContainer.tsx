import styled from 'styled-components';
import color from '../../lib/ui.colors';
import Map, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { coordToAddress } from './helpers';
import { MAPBOX_TOKEN } from './constant';
import { devices } from 'components/store/lib/Devices';

const MapContainer = (props: any) => {
  const { viewport, setViewPort, setAddress, setPostCode } = props;
  return (
    <MapContianer>
      <Map
        {...viewport}
        onMove={(evt) => setViewPort(evt.viewState)}
        onDragEnd={() => {
          coordToAddress(viewport, 'drag', 0, 0, setAddress, setPostCode);
        }}
        style={{ width: '75%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker
          longitude={viewport.longitude}
          latitude={viewport.latitude}
          color={color.btnPrimary}
        />

        <GeolocateControl
          onGeolocate={(position) => {
            coordToAddress(
              viewport,
              'geo',
              position.coords.longitude,
              position.coords.latitude,
              setAddress,
              setPostCode,
            );
            setViewPort({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          }}
          positionOptions={{ enableHighAccuracy: true }}
        />

        <NavigationControl />
      </Map>
    </MapContianer>
  );
};

const MapContianer = styled.div`
  width: 100%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-contente: center;
  align-items: flex-end;
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  border-radius: 20px;

  @media ${devices.mobileL} {
    display: none;
  }
`;

export default MapContainer;
