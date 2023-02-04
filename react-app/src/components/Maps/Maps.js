import React, { useMemo, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styles from "./Maps.module.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
// import { getNearbyHealthcareFacilities } from "./index";

function Search({ panTo, getNearbyHealthcareFacilities, setCenter, lat, lng }) {
  // const [center, setCenter] = useState({});
  const [default_center, setDefault] = useState({ lat, lng });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
      componentRestrictions: { country: "US" },
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    // console.log(address, "ADDRESS");
    try {
      const results = await getGeocode({ address });
      // console.log(results, "RESULTS");
      const { lat, lng } = await getLatLng(results[0]);
      setCenter({ lat, lng });
      // console.log(typeof lat, typeof lng, "HREER");
      panTo({ lat, lng });
      getNearbyHealthcareFacilities({ lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className={styles.searchDiv}>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter your address"
          className={styles.searchInput}
        />
        <ComboboxPopover>
          <ComboboxList className={styles.searchData}>
            {status === "OK" &&
              data.map(({ description }, idx) => (
                <ComboboxOption
                  key={idx}
                  value={description}
                  className={styles.data}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
export default Search;
