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
import Saved from "../Saved";
import { addSave, fetchSaved, removeSave } from "../../store/saved";

const libraries = ["places"];
const Maps = () => {
  const dispatch = useDispatch();
  const google = window.google;
  const user = useSelector((state) => state.session.user);
  const saved = useSelector((state) => Object.values(state.saved));
  // console.log(saved, "saved");
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API;
  const placesKey = process.env.REACT_APP_PLACES_API;

  const [map, setMap] = useState(null);
  const [address, setAddress] = useState("");
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState({});

  const [favorites, setFavorites] = useState([]);

  const getNearbyHealthcareFacilities = ({ lat, lng }) => {
    // console.log(typeof lat, lat, typeof lng, lng, "HERE");
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    let search_center = new google.maps.LatLng(lat, lng);
    // console.log(center, "CENTER");
    const request = {
      location: search_center,
      radius: 50093.4,
      types: ["doctor"],
      // keyword: "doctor",
    };
    // console.log(request, "REQUEST");
    service?.nearbySearch(request, (results, status) => {
      if (status === "OK") {
        // console.log(results, "RESULTS");
        setMarkers(
          results?.map((result) => ({
            result,
            // icon: result?.photos[0]?.getUrl({ maxWidth: 200, maxHeight: 200 }),
            position: result.geometry.location,
            title: result.name,
            rating: result.rating,
            user_ratings: result.user_ratings_total,
            address: result.vicinity,
            open: result.opening_hours,
            photos: result.photos,
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
      // console.log(lat, lng, "HERE");
    });
  }, [getNearbyHealthcareFacilities]);

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

  useEffect(() => {
    const getSaved = async () => {
      if (user) {
        await dispatch(fetchSaved(user?.id));
      }
    };
    getSaved();
  }, [dispatch, user]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    // googlePlacesKey: process.env.REACT_APP_PLACES_API,
    libraries,
  });

  if (!isLoaded) {
    return (
      <div className={styles.errorPage}>
        <div>This page can't load Google Maps correctly.</div>
        <div> Please turn location services on to enable this feature</div>;
      </div>
    );
  }
  const addToFavorites = async (marker, e) => {
    e.preventDefault();
    setFavorites([...favorites, marker]);
    let payload = {
      userId: user?.id,
      marker,
    };
    // console.log(typeof user.id, "URESRESR&*(#&%!!#*");
    await dispatch(addSave(payload));
  };

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
        {markers.length > 0 ? (
          <div className={styles.marker}>
            {markers?.map((marker, idx) => {
              // console.log(marker, "makrearsa");
              return (
                <div key={idx} className={styles.places}>
                  {/* <img className={styles.icon} src={marker.icon}></img> */}
                  {marker.photos ? (
                    <>
                      <div className={styles.index}>{idx + 1}.</div>
                      <img
                        className={styles.photo}
                        src={marker.photos[0].getUrl({
                          maxWidth: 100,
                          maxHeight: 100,
                        })}
                        alt="Place photo"
                      />
                    </>
                  ) : (
                    <>
                      <div className={styles.index}>{idx + 1}.</div>
                      <img
                        className={styles.photo}
                        src="https://www.pngitem.com/pimgs/m/504-5040528_empty-profile-picture-png-transparent-png.png"
                      />
                    </>
                  )}
                  <div className={styles.storeDetails}>
                    <div className={styles.title}>
                      {/* <div className={styles.index}>{idx + 1}.</div> */}
                      {marker.title}
                    </div>
                    <div className={styles.address}>{marker.address}</div>
                    {marker.rating ? (
                      <div> Rating: {marker.rating} / 5 </div>
                    ) : (
                      <div> No ratings available </div>
                    )}
                    {marker?.open ? (
                      <div className={styles.open}> Open </div>
                    ) : (
                      <div className={styles.closed}> Closed </div>
                    )}
                  </div>

                  <button
                    className={styles.favorites}
                    onClick={(e) => addToFavorites(marker, e)}
                  >
                    {saved.find((save) => save.marker.title == marker.title) !==
                    undefined ? (
                      <i
                        className={`${styles.savedIcon} fa-solid fa-bookmark`}
                      ></i>
                    ) : (
                      <i
                        className={`${styles.icon} fa-regular fa-bookmark`}
                      ></i>
                    )}
                  </button>
                </div>
              );
            })}
            {/* <Saved
              className={styles.saved}
              results={markers}
              favorites={favorites}
            /> */}
          </div>
        ) : (
          <div className={styles.noSearch}>
            <div className={styles.noText}>
              Unable to find nearby healthcare facilities, please try another
              address.
            </div>
            <img
              className={styles.world}
              src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgxLTAwMDktcC1sMWxnZ2hpcS5wbmc.svg?s=bM5sfdfFP5YiswVORuR_V2-16pPxG_cAJNwMoR0jxWk"
              alt="world"
            ></img>
            <div className={styles.noText}>
              If that doesn't work, consider turning on location services and
              turning off ad-blockers.
            </div>
          </div>
        )}

        <div className={styles.mapDiv} style={{ height: "800px" }}>
          {isLoaded && (
            <div className={styles.mapSearch}>
              <GoogleMap
                mapContainerStyle={{
                  width: "608px",
                  height: "90vh",
                }}
                zoom={13}
                center={center}
                onUnmount={onUnmount}
                className={styles.map}
                key={apiKey}
                onLoad={onMapLoad}
              >
                <Marker
                  position={center}
                  // icon={{
                  //   label: "YOU",
                  // }}
                />
                {markers.length ? (
                  markers.map((marker, idx) => (
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
                  ))
                ) : (
                  <div>No results</div>
                )}
              </GoogleMap>
              {/* <Saved /> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Maps;
