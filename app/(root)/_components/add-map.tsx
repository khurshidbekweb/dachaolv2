import { useState, useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";

const mapContainerStyle = { height: "500px", width: "100%" };
const defaultCenter = { lat: 41.2995, lng: 69.2401 }; // Toshkent koordinatalari

const DachaMap = () => {
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const autocompleteRef = useRef(null);

  // Qidiruv inputdan joy tanlanganda ishlaydi
  const onPlaceSelected = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        setCoordinates({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCOoxM7bD8Eg8G0lvGlE_xJOo1D5Yj5odY" libraries={["places"]}>
      <div>
        {/* 🔎 Qidiruv input */}
        <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={onPlaceSelected}>
          <input type="text" placeholder="Dacha joyini qidiring..." style={{ width: "100%", padding: "10px", fontSize: "16px" }} />
        </Autocomplete>

        {/* 🗺 Google Map */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={coordinates}
          zoom={14}
          onClick={(e) => setCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
        >
          {/* 📍 Marker */}
          <Marker position={coordinates} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default DachaMap;
