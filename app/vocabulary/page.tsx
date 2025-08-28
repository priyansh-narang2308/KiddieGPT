"use client";

import { useEffect, useState, useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import CountUp from "react-countup";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

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
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [totalWords, setTotalWords] = useState(0);
  const [activeDaysCount, setActiveDaysCount] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string>(new Date().toLocaleDateString());
  const [filteredWords, setFilteredWords] = useState<VocabularyWord[]>([]);

  const fetchWords = async () => {
  if (!userDetail?.id) return;
  setLoading(true);
  try {
    const res = await fetch(`/api/vocabulary-words?userId=${userDetail.id}`);
    const data: VocabularyWord[] = await res.json();

    // Save all words including duplicates
    setWords(data);
    setTotalWords(data.length);

    // Weekly Data
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
    const dailyCounts: Record<string, number> = {};
    const chartDays: string[] = [];

    // Initialize last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(oneWeekAgo.getDate() + i);
      const key = date.toLocaleDateString();
      dailyCounts[key] = 0;
      chartDays.push(key);
    }

    // Count all words per day (including duplicates)
    data.forEach(w => {
      const key = new Date(w.createdAt).toLocaleDateString();
      if (key in dailyCounts) dailyCounts[key] += 1;
    });

    // Prepare chart data
    const chartData = chartDays.map(date => {
      const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
      return { date, dayName, count: dailyCounts[date] };
    });

    setWeeklyData(chartData);

    // Count active days (days with at least 1 word)
    let activeDays = 0;
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toLocaleDateString();
      if (dailyCounts[key] > 0) activeDays++;
    }
    setActiveDaysCount(activeDays);

    // Filter words for selected day
    filterWordsByDay(data, selectedDay);

  } catch (error) {
    console.error("Failed to fetch words", error);
  } finally {
    setLoading(false);
  }
};

  const filterWordsByDay = (wordList: VocabularyWord[], day: string) => {
    const filtered = wordList.filter(
      w => new Date(w.createdAt).toLocaleDateString() === day
    );
    setFilteredWords(filtered);
  };

  const handleDelete = async (wordId: number) => {
    try {
      const res = await fetch(`/api/vocabulary-words?wordId=${wordId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      // Update UI
      const updatedWords = words.filter(w => w.id !== wordId);
      setWords(updatedWords);
      filterWordsByDay(updatedWords, selectedDay);
      setTotalWords(updatedWords.length);

    } catch (error) {
      console.error(error);
      alert("Failed to delete word");
    }
  };

  useEffect(() => {
    fetchWords();
  }, [userDetail, selectedDay]);

  if (!userDetail) return <p>Loading user...</p>;

  // Determine max count for Y-axis
  const maxCount = Math.max(...weeklyData.map(d => d.count), 5);

  return (
    <div className="p-6 bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Vocabulary Dashboard</h1>

      {/* Insights Cards */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        {/* Total Words Learned Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-purple-700 font-semibold mb-2">Total Words Learned</p>
          <h2 className="text-3xl font-bold text-purple-800 mb-2">
            <CountUp end={totalWords} duration={1.5} />
          </h2>
          <p className="text-purple-800 font-medium">
            {totalWords > 0
              ? `Wow! You know ${totalWords} word${totalWords > 1 ? "s" : ""} now! 🌟`
              : "Start learning your first word today! 🎉"}
          </p>
        </div>

      {weeklyData.length > 0 && (
  <div className="bg-white rounded-lg shadow-md p-6 flex-1">
    <p className="text-purple-700 font-semibold mb-2">Words Added (Last 7 Days)</p>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={weeklyData}>
        <XAxis dataKey="dayName" tick={{ fontSize: 12 }} />

        {/* Dynamic Y-axis */}
        <YAxis
          allowDecimals={false}
          ticks={Array.from({ length: Math.max(...weeklyData.map(d => d.count), 1) + 1 }, (_, i) => i)}
        />

        <Tooltip />
        <Legend />
        <Bar dataKey="count" name="Words Added">
          {weeklyData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.date === selectedDay ? "#6b21a8" : entry.count > 0 ? "#8884d8" : "#d3d3d3"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
)}

        <div className="bg-white rounded-lg shadow-md p-6 flex-1 flex flex-col items-center justify-center">
          <p className="text-purple-700 font-semibold mb-2">📅 Active Days</p>
          <h2 className="text-3xl font-bold text-purple-800">Day {activeDaysCount}</h2>
          <p className="text-gray-500 text-sm mt-2">Keep going! 🌟</p>
        </div>
      </div>

      {/* Dropdown to select date */}
      <div className="mb-6">
        <label className="text-purple-800 font-semibold mr-2">Select Date:</label>
        <select
          className="p-2 rounded-md border border-purple-300"
          value={selectedDay}
          onChange={e => setSelectedDay(e.target.value)}
        >
          {weeklyData.map(d => (
            <option key={d.date} value={d.date}>{d.date}</option>
          ))}
        </select>
      </div>

      {/* Words for Selected Date */}
      {filteredWords.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {filteredWords.map(w => (
            <div
              key={w.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 relative"
            >
              <h3 className="text-lg font-bold text-purple-800">{w.word}</h3>
              {w.note && <p className="text-gray-700 text-sm">{w.note}</p>}
              <p className="text-gray-500 text-xs mt-1">
                Added: {new Date(w.createdAt).toLocaleDateString()}
              </p>
              <button
                className="absolute top-2 right-2 text-red-500 font-bold hover:text-red-700 cursor-pointer"
                onClick={() => handleDelete(w.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-purple-800 font-medium">No words added on this date.</p>
      )}
    </div>
  );
};

export default VocabularyDashboard;
