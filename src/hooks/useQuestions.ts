import { useEffect, useState } from "react";
import { getQuestions } from "../services/player";
import { Question } from "../types/player/Question";

export default function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getQuestions()
      .then((res) => {
        if (mounted) setQuestions(res.data?.questions || []);
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

  return { questions, loading, error };
}
