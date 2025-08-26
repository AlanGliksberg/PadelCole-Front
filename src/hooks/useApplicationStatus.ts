import { useEffect, useState } from "react";
import { ApplicationStatus } from "../types/application/Status";
import { getApplicationStatus } from "../services/application";

export default function useApplicationStatus() {
  const [data, setData] = useState<ApplicationStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getApplicationStatus()
      .then((res) => {
        if (mounted) setData(res.data?.status || []);
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
  }, []);

  return { data, loading, error };
}
