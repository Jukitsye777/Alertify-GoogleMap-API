import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, InfoWindow, Marker } from '@react-google-maps/api';
import useMarkfinder from './Markfinder'; // Import the hook

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 0,
  lng: 0,
};

const initialLocations = [
  { lat: 48.8584, lng: 2.2945, title: "Eiffel Tower" },
  { lat: 40.7128, lng: -74.0060, title: "New York City" },
  { lat: 51.5074, lng: -0.1278, title: "London" },
  { lat: 35.6895, lng: 139.6917, title: "Tokyo" },
];

const MyGoogleMap = () => {
  const [locations, setLocations] = useState(initialLocations);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [title, setTitle] = useState('');
  const [activeMarker, setActiveMarker] = useState(null); // Track the currently active marker

  const { reports } = useMarkfinder(); // Use the hook

  useEffect(() => {
    if (reports) {
      const newLocations = reports.map(report => ({
        lat: report.latitude, // Ensure the field names match
        lng: report.longitude,
        upvote: report.upVotes || 0,
        downvote: report.downVotes || 0,
        title: report.title || 'No Title',
        imageUrl: report.imageUrl || '' // Include imageUrl
      }));
      setLocations(newLocations);
    }
  }, [reports]);

  const addMarker = () => {
    if (lat && lng && title) {
      const newLocation = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        title: title,
        upvote: 0, // Default upvote value
        downvote: 0 // Default downvote value
      };
      setLocations([...locations, newLocation]);
      setLat('');
      setLng('');
      setTitle('');
    }
  };

  return (
    <div>
      {/* <div>
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addMarker}>Add Marker</button>
      </div> */}

      <LoadScript googleMapsApiKey="AIzaSyA76M2Wj_xY6o8rbkeJ4S-8GSaUPcZmF04">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
        >
          <div className='relative w-[100vw] h-[8%] bg-white flex flex-row font-bold justify-center items-center text-red-400'>
            <h1>Alertify Non Registration hosting !</h1>
          </div>

          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => setActiveMarker(location)}
            />
          ))}

          {activeMarker && (
            <InfoWindow
              position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
              onCloseClick={() => setActiveMarker(null)}
            >
              <div className='font-bold flex flex-row justify-between  items-center gap-2' style={{ color: 'black' }}>
                <div className='textcontainer flex flex-col gap-1 '>
                <h2 className='text-[1.4em]'>{activeMarker.title}</h2>
                <p><strong className='text-green-500'>Upvote:</strong> {activeMarker.upvote}</p>
                <p><strong className='text-red-500'>Downvote:</strong> {activeMarker.downvote}</p>
                </div>
                {activeMarker.imageUrl && (
                  <img
                    src={activeMarker.imageUrl}
                    alt={activeMarker.title}
                    style={{ width: '100px', height: '100px', borderRadius: '8px' }}
                  />
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MyGoogleMap;
