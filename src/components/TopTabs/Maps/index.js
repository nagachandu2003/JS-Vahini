import React,{useState,useEffect} from 'react';
import Footer from  '../../Footer'

const GoogleMap = () => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadMap = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
        script.async = true;
        script.onload = initMap;
        document.head.appendChild(script);
      } else {
        initMap();
      }
    };

    const initMap = () => {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
      setMap(mapInstance);

      // Get initial live location
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        mapInstance.setCenter(currentLocation);
        markPosition(mapInstance, currentLocation); // Mark initial live location
      });
    };

    loadMap();

    return () => {
      // Cleanup code if needed
    };
  }, [googleMapsApiKey]);

  useEffect(() => {
    if (map) {
      const updateLiveLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(currentLocation);
          markPosition(map, currentLocation); // Mark updated live location
        });
      };

      const interval = setInterval(updateLiveLocation, 5000);

      return () => clearInterval(interval);
    }
  }, [map]);

  const markPosition = (mapInstance, position) => {
    if (mapInstance && position) {
      new window.google.maps.Marker({
        position: position,
        map: mapInstance,
        title: 'My Location',
      });
    }
  };

  return (
    <div>
      <div id="map" style={{ height: '84vh', width: '100%' }}></div>
    </div>
  );
};

const Maps = () => {
  return (
    <>
    <div>
      <div className='main-header-container'>
        <h1 className='main-heading'>Maps </h1>
      </div>
      <GoogleMap />
      <Footer/>
    </div>
    </>
  );
};

export default Maps;
