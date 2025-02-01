import { useState, useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";

const mapContainerStyle = { height: "500px", width: "100%" };
const defaultCenter = { lat: 41.2995, lng: 69.2401 }; // Toshkent koordinatalari

const DachaMap = ({ onLocationSelect }) => {
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const autocompleteRef = useRef(null);

  // Foydalanuvchi joy tanlaganda
  const onPlaceSelected = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const newCoordinates = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setCoordinates(newCoordinates);
        onLocationSelect(newCoordinates); // 📡 Ota komponentaga jo‘natish
      }
    }
  };

  // Hozirgi joylashuvni olish
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(newCoordinates);
          onLocationSelect(newCoordinates); // 📡 Ota komponentaga jo‘natish
        },
        (error) => console.error("Geolocation error:", error)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCOoxM7bD8Eg8G0lvGlE_xJOo1D5Yj5odY" libraries={["places"]}>
      <div>
        <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={onPlaceSelected}>
          <input type="text" placeholder="Dacha joyini qidiring..." style={{ width: "100%", padding: "10px", fontSize: "16px" }} />
        </Autocomplete>

        <button onClick={getCurrentLocation} type="button" style={{ margin: "10px", padding: "8px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
          📍 Mening joylashuvimni olish
        </button>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={coordinates}
          zoom={14}
          onClick={(e) => {
            const newCoordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
            setCoordinates(newCoordinates);
            onLocationSelect(newCoordinates); // 📡 Ota komponentaga jo‘natish
          }}
        >
          <Marker
            position={coordinates}
            draggable={true}
            onDragEnd={(e) => {
              const newCoordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
              setCoordinates(newCoordinates);
              onLocationSelect(newCoordinates); // 📡 Ota komponentaga jo‘natish
            }}
          />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default DachaMap;
