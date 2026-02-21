import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export function DebugMap() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Debug Map</h1>
            <p className="mb-4">If you can see the map tiles below, Leaflet is working correctly.</p>

            <div style={{ height: '500px', width: '100%', border: '2px solid red' }}>
                <MapContainer
                    center={[38.87, -76.98]}
                    zoom={12}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[38.87, -76.98]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
}
