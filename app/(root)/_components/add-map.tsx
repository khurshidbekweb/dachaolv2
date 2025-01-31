import { useState, useRef } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";

const mapContainerStyle = { height: "500px", width: "100%" };
const defaultCenter = { lat: 41.2995, lng: 69.2401 }; // Toshkent koordinatalari

const DachaMap = () => {
  const [coordinates, setCoordinates] = useState(defaultCenter);
  const autocompleteRef = useRef(null);

  // Foydalanuvchi search qilganda ishlaydi
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

  // Geolocation orqali hozirgi joylashuvni olish
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Geolocation error:", error)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Tanlangan joyning manzilini chiqarish
  const getAddressFromCoordinates = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results[0]) {
        alert("Siz tanlagan manzil: " + results[0].formatted_address);
      } else {
        alert("Manzil topilmadi");
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCOoxM7bD8Eg8G0lvGlE_xJOo1D5Yj5odY" libraries={["places"]}>
      <div>
        {/* 🔎 Qidiruv input */}
        <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={onPlaceSelected}>
          <input type="text" placeholder="Dacha joyini qidiring..." style={{ width: "100%", padding: "10px", fontSize: "16px" }} />
        </Autocomplete>

        <button onClick={getCurrentLocation} style={{ margin: "10px", padding: "8px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
          📍 Mening joylashuvimni olish
        </button>

        {/* 🗺 Google Map */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={coordinates}
          zoom={14}
          onClick={(e) => {
            setCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
            getAddressFromCoordinates(e.latLng.lat(), e.latLng.lng());
          }}
        >
          {/* 📍 Drag qilib harakatlantiriladigan marker */}
          <Marker
            position={coordinates}
            draggable={true}
            onDragEnd={(e) => {
              const lat = e.latLng.lat();
              const lng = e.latLng.lng();
              setCoordinates({ lat, lng });
              getAddressFromCoordinates(lat, lng);
            }}
          />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default DachaMap;
