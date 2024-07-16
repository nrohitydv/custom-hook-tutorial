import React from "react";
import { sortPlacesByDistance } from "../loc.js";

export function useFetch(fetchFn, initialValue) {
  const [fetchedData, setFetchedData] = React.useState(initialValue);
  const [error, setError] = React.useState();
  const [isFetching, setIsFetching] = React.useState();

  React.useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            data,
            position.coords.latitude,
            position.coords.longitude
          );

          setFetchedData(sortedPlaces);
        });
      } catch (error) {
        setError({ message: error.message || "Failed to fetch user places." });
      }
      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);
  return { fetchedData, error, isFetching, setFetchedData };
}
