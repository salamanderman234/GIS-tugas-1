import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { DefaultMarker } from "../Marker";
import { StaticMarker } from "../Marker/static";

export const Map = ({ startPosition }) => {
	const [defaultMarkerPosition, setDefaultMarkerPosition] = useState(startPosition || { lat: 52, lng: 0 });
	// posisi yang tersimpan
	const [positionList, setPositionList] = useState([]);

	// event pada marker untuk menyimpan posisi
	const markerAddLocation = (position) => {
		position.id = new Date().getTime() - Math.ceil(position.lat + position.lng);
		setPositionList((positionList) => [...positionList, position]);
	};
	// event pada marker untuk menghapus posisi yang tersimpan
	const markerRemoveLocation = (id) => {
		setPositionList((positionList) => positionList.filter((value) => value.id !== id));
	};
	// event handler untuk map
	const MyMap = () => {
		useMapEvents({
			click: (e) => {
				setDefaultMarkerPosition(e.latlng);
			},
		});
		return null;
	};

	// mapping semua posisi yang tersimpan ke bentuk marker
	const positionListMap = positionList.map((element) => <StaticMarker key={element.id} position={element} onRemoveLocation={markerRemoveLocation} />);

	// jsx
	return (
		<>
			<MapContainer center={defaultMarkerPosition} zoom={13}>
				<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<DefaultMarker position={defaultMarkerPosition} setPosition={setDefaultMarkerPosition} onAddLocation={markerAddLocation} />
				{positionListMap}
				{/* event handler */}
				<MyMap />
			</MapContainer>
		</>
	);
};
