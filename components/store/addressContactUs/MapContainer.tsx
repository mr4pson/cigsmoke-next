import styled from 'styled-components';
import color from '../lib/ui.colors';
import Map, { Marker, GeolocateControl, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_TOKEN } from './constant';
import { devices } from 'components/store/lib/Devices';

const MapContainer = (props: any) => {
  const { viewport, viewportUser, setViewPortUser } = props;
  return (
    <MapContianer>
      <Map
        {...viewportUser}
        onMove={(evt) => setViewPortUser(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker
          longitude={viewport.longitude}
          latitude={viewport.latitude}
          color={color.btnPrimary}
        />

        <GeolocateControl positionOptions={{ enableHighAccuracy: true }} />

        <NavigationControl />
      </Map>
    </MapContianer>
  );
};

const MapContianer = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-contente: center;
  align-items: flex-end;
  box-shadow: 0px 2px 6px ${color.boxShadowBtn};
  border-radius: 20px;

  @media ${devices.mobileL} {
    height: 40vh;
  }
`;

export default MapContainer;
