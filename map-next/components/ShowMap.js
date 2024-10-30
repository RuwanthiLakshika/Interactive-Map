"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "./placeholder.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon.src, 
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const LocationMarker = ({ isSelecting, onSelectedPosition }) => {
  const [position, setPosition] = useState(null);
  useMapEvents({
    click(event) {
      if (isSelecting) {
        const newPos = event.latlng;
        setPosition(newPos);
        onSelectedPosition(newPos);
      }
    },
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
};

const SetViewOnLocation = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(location, 13);
  }, [location, map]);
  return null;
};

const ShowMap = () => {
  const [location, setLocation] = useState([51.505, -0.09]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleUserCurrentLocation = () => {
    setIsSelecting(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const userLocation = [latitude, longitude];
          setLocation(userLocation);
          setCurrentLocation(userLocation);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  const handleSelectedFromMap = () => {
    setIsSelecting(true);
    setCurrentLocation(null);
  };

  return (
    <div className="container px-10 mx-auto py-6">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-4">
        <div className="left_part bg-cyan-800 p-5 rounded-md h-screen">
          <div className="flex flex-col gap-5">
            <button
              className="bg-white border-0 shadow-sm text-cyan-800 font-semibold rounded-sm py-3 px-5 w-full"
              onClick={handleUserCurrentLocation}
            >
              Turn on location
            </button>
            <button
              className="bg-white border-0 shadow-sm text-cyan-800 font-semibold rounded-sm py-3 px-5 w-full"
              onClick={handleSelectedFromMap}
            >
              Use Custom location
            </button>
          </div>
        </div>
        <div className="map_part h-screen col-span-3">
          <MapContainer
            center={location}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {currentLocation && <Marker position={currentLocation} icon={customIcon}></Marker>}
            <LocationMarker isSelecting={isSelecting} onSelectedPosition={setCurrentLocation} />
            <SetViewOnLocation location={location} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ShowMap;
