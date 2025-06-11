import { getGenders } from "@/src/services/player";
import { Gender } from "@/src/types";
import { useEffect, useState } from "react";

export default function useGenders(filterBoth: boolean = false) {
  const [data, setData] = useState<Gender[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getGenders(filterBoth)
      .then((res) => {
        if (mounted) setData(res.data?.genders || []);
      })
      .catch((err) => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [filterBoth]);

  return { data, loading, error };
}
