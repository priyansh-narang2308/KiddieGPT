"use client";

import React, { useState, useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { toast } from "react-toastify";

const BuyCreditsMock = () => {
  const Options = [
    { id: 1, credits: 10, quote: "Cheaper than your lunchbox 🍱" },
    { id: 2, credits: 30, quote: "More stories than bedtime 🛌" },
    { id: 3, credits: 75, quote: "Like magic beans but better 🫘✨" },
    { id: 4, credits: 150, quote: "Story explosion incoming 💥📚" },
  ];

  const [selectedOptionId, setSelectedOptionId] = useState<number>(0);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onPaymentApprovedMock = () => {
    const selected = Options.find((opt) => opt.id === selectedOptionId);
    if (!selected) return;

    // Update credits locally (no DB)
    setUserDetail((prev: any) => ({
      ...prev,
      credits: (prev?.credits || 0) + selected.credits,
    }));

    toast.success(`🎉 Added ${selected.credits} credits (mock)!`);
  };

  return (
    <div className="min-h-screen bg-purple-100 p-10">
      <h2 className="text-3xl font-bold mb-6">🎁 Add More Credits (Mock)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Options.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelectedOptionId(option.id)}
            className={`p-4 rounded-lg cursor-pointer shadow-lg ${
              selectedOptionId === option.id
                ? "border-4 border-yellow-700 bg-purple-300"
                : "border-2 border-purple-400 bg-purple-400"
            }`}
          >
            <h3 className="font-bold text-xl text-center">{option.credits} Stories</h3>
            <p className="italic text-center">{option.quote}</p>
          </div>
        ))}
      </div>

      {selectedOptionId > 0 && (
        <button
          onClick={onPaymentApprovedMock}
          className="mt-6 bg-yellow-500 px-6 py-2 rounded-lg font-bold hover:bg-yellow-600"
        >
          Add Credits (Mock)
        </button>
      )}
    </div>
  );
};

export default BuyCreditsMock;

