import React, { useState, useEffect} from 'react';
import { APIProvider, Map, useMap, AdvancedMarker } from '@vis.gl/react-google-maps';
import personMarker from '../img/marker.png';


const center = { lat: 39.9087, lng: 116.3974 };

const usePanTo = (location) => {
  const map = useMap();
  console.log("what's the map?")
  console.log(map);

  useEffect(() => {
    if (map && location) {
      map.panTo(location);
    }
  }, [map, location]);
};


const MapComponent = ({ panToLocation, pois, onSelected }) => {
  usePanTo(panToLocation);
  return (
      <Map
        defaultZoom={15}
        defaultCenter={center}
        mapContainerStyle={{ height: "266px", width: "800px" }}
        mapId='da37f3254c6a6d1c'
        mapTypeId='satellite'
        reuseMaps={true}
      >
        {pois.map((poi, index) => (
          <AdvancedMarker
            key={index}
            position={{ lat: poi.lat, lng: poi.lng }}
            onClick={() => onSelected(index)}
          >
          <img src={personMarker} alt="Gravestone Icon" style={{ width: '45px', height: '45px' }} />
          </AdvancedMarker>
        ))}
      </Map>
  );
};

export default MapComponent;