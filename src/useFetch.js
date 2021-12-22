import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPendig] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch data");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data)
          setData(data);
          setIsPendig(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            setIsPendig(false);
            setError(err.message);
          }
        });
    });

    return () => abortCont.abort();
  }, []);
    console.log(data)
  return { data, isPending, error };
};

export default useFetch;
