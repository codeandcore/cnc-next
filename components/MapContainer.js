import React, { useState, useEffect } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import MapIcon from '../public/images/map.png';

const MapContainer = ({ google, latitude, longitude }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapLoaded(true);
  }, []);
  if (!mapLoaded) {
    return null; 
  }

  const darkMapStyle = [
    {
      elementType: 'geometry',
      stylers: [{ color: '#212121' }],
    },
    {
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ color: '#757575' }],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#212121' }],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ color: '#757575' }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#616161' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#37474f' }],
    },
  ];

  const icon = {
    url: MapIcon,
    scaledSize: new google.maps.Size(66, 77), 
  };

  return (
    <div className="map-container">
      <Map
        google={google}
        zoom={20}
        style={{ width: '100%', height: '100%' }}
        initialCenter={{
          lat: latitude,
          lng: longitude,
        }}
        mapTypeControl 
        mapTypeControlOptions={{
          position: google.maps.ControlPosition.TOP_RIGHT, 
          mapTypeIds: ['roadmap', 'satellite', 'terrain', 'hybrid'], 
        }}
        mapTypeId={'hybrid'}
        styles={darkMapStyle}
      >
        <Marker position={{ lat: latitude, lng: longitude }} icon={icon} />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCgyqxIH4ckL8EAkXPisbmcM-5vJJPK5oo',
})(MapContainer);
