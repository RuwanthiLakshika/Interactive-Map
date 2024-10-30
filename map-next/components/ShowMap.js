"use client"
import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet"

function ShowMap() {
    const [location, setLocation]=useState([51.505, -0.09]);
  return (
    <>
        <div className='container px-10 mx-auto py-6'>
            <div className='grid gap-8 grid-cols-1 md:grid-cols-4'>
                <div className='left_part bg-cyan-800 p-5 rounded-md h-screen'>
                    <div className='flex flex-col gap-5'>
                        <button className='bg-white border-0 shadow-sm text-cyan-800 font-semibold rounded-sm py-3 px-5 w-full'>
                            Turn on location
                            </button>
                            <button className='bg-white border-0 shadow-sm text-cyan-800 font-semibold rounded-sm py-3 px-5 w-full'>
                            Use Custom location
                            </button>
                    </div>
                </div>
                <div className='map_part h-screen col-span-3'>
                <MapContainer 
                center={location} 
                zoom={13} 
                scrollWheelZoom={false}
                style={{ height:"100%", width:"100%"}}
                >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                </MapContainer>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default ShowMap