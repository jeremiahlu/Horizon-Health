import React, {
  useMemo,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import styles from "./Maps.module.css";
import Search from "./Maps";

const libraries = ["places"];
const Maps = () => {
  const google = window.google;
  const user = useSelector((state) => state.session.user);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API;
  const placesKey = process.env.REACT_APP_PLACES_API;

  const [map, setMap] = useState(null);
  const [address, setAddress] = useState("");
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState({});

  const getNearbyHealthcareFacilities = ({ lat, lng }) => {
    // console.log(typeof lat, lat, typeof lng, lng, "HERE");
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    let search_center = new google.maps.LatLng(lat, lng);
    // console.log(center, "CENTER");
    const request = {
      location: search_center,
      radius: 32093.4, // 5 miles in meters
      types: [
        "drugstore",
        "hospital",
        "pharmacy",
        "physiotherapist",
        "dentist",
        "doctor",
        "convenience store",
      ],
    };
    // console.log(request, "REQUEST");
    service?.nearbySearch(request, (results, status) => {
      if (status === "OK") {
        // console.log(results[0].opening_hours, "RESULTS");
        setMarkers(
          results?.map((result) => ({
            result,
            icon: result?.photos[0]?.getUrl({ maxWidth: 200, maxHeight: 200 }),
            position: result.geometry.location,
            title: result.name,
            rating: result.rating,
            user_ratings: result.user_ratings_total,
            address: result.vicinity,
            open: result.opening_hours,
          }))
        );
      } else {
        console.error("There was a problem with the nearby search: " + status);
      }
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      // console.log(typeof lat, typeof lng, "HERA");
      setCenter({ lat, lng });
      // setMarkers({ lat, lng });
      // Search({ lat, lng });
      getNearbyHealthcareFacilities({ lat, lng });
      console.log(lat, lng, "HERE");
    });
  }, []);

  const mapRef = useRef();
  // console.log(mapRef, "MAPREF");
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // This is the equivalent to a script tag
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    // googlePlacesKey: process.env.REACT_APP_PLACES_API,
    libraries,
  });

  if (!isLoaded) {
    return (
      <>
        <div>This page can't load Google Maps correctly.</div>;
      </>
    );
  }

  return (
    <>
      {isLoaded && (
        <div className={styles.searchBar}>
          <Search
            panTo={panTo}
            getNearbyHealthcareFacilities={getNearbyHealthcareFacilities}
            setCenter={setCenter}
            className={styles.search}
          />
        </div>
      )}
      <div className={styles.container}>
        {isLoaded ? (
          <div className={styles.marker}>
            {markers?.map((marker, idx) => {
              return (
                <div key={idx} className={styles.places}>
                  <img className={styles.icon} src={marker.icon}></img>
                  <div className={styles.storeDetails}>
                    <div className={styles.title}>
                      <div className={styles.index}>{idx + 1}.</div>
                      {marker.title}
                    </div>
                    <div className={styles.address}>{marker.address}</div>
                    Rating: {marker.rating} / 5{/* {marker.user_ratings} */}
                    {marker.open ? (
                      <div className={styles.open}> Open </div>
                    ) : (
                      <div className={styles.closed}> Closed </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.noSearch}>
            Unable to find nearby healthcare facilities, please try another
            address
          </div>
        )}

        <div className={styles.mapDiv} style={{ height: "800px" }}>
          {isLoaded && (
            <div className={styles.mapSearch}>
              <GoogleMap
                mapContainerStyle={{
                  width: "508px",
                  height: "90vh",
                }}
                zoom={13}
                center={center}
                onUnmount={onUnmount}
                className={styles.map}
                key={apiKey}
                onLoad={onMapLoad}
              >
                {markers.map((marker, idx) => (
                  // console.log(marker.position, "marker")
                  <Marker
                    key={idx}
                    position={marker.position}
                    onClick={() => {
                      setSelected(marker);
                    }}
                    // icon={{
                    //   // label: `${idx + 1}`,
                    //   origin: new window.google.maps.Point(0, 0),
                    //   scaledSize: new window.google.maps.Size(20, 20),
                    // }}
                    // icon={{
                    //   origin: new window.google.maps.Point(0, 0),
                    //   anchor: new window.google.maps.Point(15, 15),
                    //   scaledSize: new window.google.maps.Size(30, 30),
                    // }}
                  />
                ))}
              </GoogleMap>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Maps;
