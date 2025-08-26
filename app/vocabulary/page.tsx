"use client";

import { useEffect, useState, useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";

type VocabularyWord = {
  id: number;
  userId: number;
  word: string;
  note: string | null;
  createdAt: string;
};

const VocabularyDashboard = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [loading, setLoading] = useState(false);
  const [weeklyCount, setWeeklyCount] = useState(0);

  // Fetch all words for this user
  const fetchWords = async () => {
    if (!userDetail?.id) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/vocabulary-words?userId=${userDetail.id}`);
      const data: VocabularyWord[] = await res.json();
      setWords(data);

      // Calculate weekly new words
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const weekly = data.filter(
        (w) => new Date(w.createdAt) >= oneWeekAgo
      );
      setWeeklyCount(weekly.length);
    } catch (error) {
      console.error("Failed to fetch vocabulary words", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, [userDetail]);

  if (!userDetail) return <p>Loading user...</p>;

  return (
    <div className="p-6 bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">
        Vocabulary Dashboard
      </h1>

      <div className="mb-6">
        <p className="text-lg text-purple-700">
          Weekly Insights: <strong>{weeklyCount}</strong> new word(s) added this week
        </p>
      </div>

      {loading ? (
        <p>Loading words...</p>
      ) : words.length === 0 ? (
        <p>No words saved yet. Start clicking words while reading stories!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {words.map((w) => (
            <div
              key={w.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-purple-800 mb-2">
                {w.word}
              </h2>
              {w.note && <p className="text-gray-700">Note: {w.note}</p>}
              <p className="text-gray-500 text-sm mt-2">
                Added: {new Date(w.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VocabularyDashboard;
