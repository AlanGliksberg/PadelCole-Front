import { getPositions } from "@/src/services/player";
import { Position } from "@/src/types";
import { useEffect, useState } from "react";

export default function usePositions(enabled = true) {
  const [data, setData] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!enabled) return;

    setLoading(true);
    getPositions()
      .then((res) => {
        if (mounted) setData(res.data?.positions || []);
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
  }, [enabled]);

  return { data, loading, error };
}
