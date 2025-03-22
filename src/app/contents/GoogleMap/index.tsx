import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Location1, Location2 } from "@/utils/types";
import { getPrice, getTotalLandSize } from "@/contents/CarouselCards";

// Define container style for the map
const containerStyle = {
  width: "100%",
  height: "280px",
  borderRadius: "16px",
};

// Google Maps API key
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const GoogleMapComponent: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // State for locations and selected marker
  const [locations, setLocations] = useState<Location2[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location2 | null>(
    null
  );
  const mapRef = useRef<google.maps.Map | null>(null);

  // Fetch locations from API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/lands/landmaps/?seller_id=211`
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        console.log("data", data?.results?.[0]);
        const filteredLocations: Location2[] = data?.results?.map(
          (item: Location1) => ({
            id: item.id,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.long),
            price: getPrice(item?.land_price),
            land_size: getTotalLandSize(item?.land_size),
          })
        );

        setLocations(filteredLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // Handle map load
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Handle map unmount
  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Automatically fit bounds to include all markers
  useEffect(() => {
    if (locations.length > 0 && mapRef.current) {
      const bounds = new google.maps.LatLngBounds();
      locations.forEach((location) =>
        bounds.extend(new google.maps.LatLng(location.lat, location.lng))
      );
      mapRef.current.fitBounds(bounds);
    }
  }, [locations]);

  // Memoized map options to prevent re-renders
  const mapOptions = useMemo(
    () => ({
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeId: "satellite",
    }),
    []
  );

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={10} // Default zoom (overridden by fitBounds)
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
    >
      {/* Render Markers */}
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={{ lat: location.lat, lng: location.lng }}
          onClick={() => setSelectedLocation(location)}
        />
      ))}

      {/* Render InfoWindow when marker is clicked */}
      {selectedLocation && (
        <InfoWindow
          position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          onCloseClick={() => setSelectedLocation(null)}
        >
          <div className="flex flex-col">
            <p className="text-sm text-black font-medium">
              {selectedLocation?.land_size} - {selectedLocation.price}
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-lg cursor-pointer text-black font-medium mt-2">
              View Details
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : null;
};

export default React.memo(GoogleMapComponent);
