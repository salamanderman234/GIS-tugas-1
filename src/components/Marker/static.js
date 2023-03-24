import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

export function StaticMarker({ position, onRemoveLocation }) {
	const defaultIcon = new L.Icon({
		iconUrl: require("../../assets/icons/kekw.png"),
		iconSize: new L.Point(55, 40),
	});
	// event ketika tombol pada pop up diklik
	const onPopUpButtonClick = () => {
		if (onRemoveLocation) {
			onRemoveLocation(position.id);
		}
	};

	// jsx
	return (
		<Marker position={position} icon={defaultIcon}>
			<Popup minWidth={90}>
				<span>{`${position.lat},${position.lng}`}</span>
				<button onClick={onPopUpButtonClick}>Hapus Lokasi </button>
			</Popup>
		</Marker>
	);
}
