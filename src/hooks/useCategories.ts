import { getCategories } from "@/src/services/player";
import { Category } from "@/src/types";
import { useEffect, useState } from "react";

export default function useCategories(filterBoth: boolean = false) {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getCategories(filterBoth)
      .then((res) => {
        if (mounted) setData(res.data?.categories || []);
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
