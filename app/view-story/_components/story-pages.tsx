import { UserDetailContext } from "@/context/UserDetailContext";
import { useState, useEffect, useContext, useMemo, useRef } from "react";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import { IoStop } from "react-icons/io5";

const StoryPages = ({ storyChapters }: any) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [speechRate, setSpeechRate] = useState(1);
    const [savingWord, setSavingWord] = useState<string | null>(null); // safeguard
    const [highlightIndex, setHighlightIndex] = useState<number | null>(null); // highlight spoken word
    const { userDetail } = useContext(UserDetailContext);

    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    const playSpeech = (text: string, rate: number = speechRate) => {
        if (!text) return;

        const synth = window.speechSynthesis;

        if (synth.speaking) {
            synth.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.rate = rate;
        utterance.pitch = 1;
        utterance.volume = 1;

        // Highlight word as it is spoken
        utterance.onboundary = (event) => {
            if (event.name === "word" || event.charIndex !== undefined) {
                const spokenTextUpToNow = text.slice(0, event.charIndex);
                const currentIndex = spokenTextUpToNow.split(/\s+/).length - 1;
                setHighlightIndex(currentIndex);
            }
        };

        utterance.onstart = () => {
            setIsSpeaking(true);
            setIsPaused(false);
        };
        utterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
            setHighlightIndex(null); // clear highlight after finishing
        };
        utterance.onerror = () => {
            setIsSpeaking(false);
            setIsPaused(false);
            setHighlightIndex(null);
        };

        utteranceRef.current = utterance;
        synth.speak(utterance);
    };

    const togglePlayPause = () => {
        const synth = window.speechSynthesis;

        if (!isSpeaking) {
            // Start speech
            playSpeech(storyChapters?.chapterText, speechRate);
        } else if (isPaused) {
            // ✅ Robust resume hack (works in Chrome)
            const resumeInterval = setInterval(() => {
                if (!synth.paused) {
                    clearInterval(resumeInterval);
                    return;
                }
                synth.resume();
            }, 50);

            setTimeout(() => clearInterval(resumeInterval), 1000); // stop loop after 1s
            setIsPaused(false);
        } else {
            // Pause
            synth.pause();
            setIsPaused(true);
        }
    };

    const stopSpeech = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
        setHighlightIndex(null);
    };

    const saveWord = async (word: string) => {
        if (!word.trim() || !userDetail?.id || savingWord) return;

        setSavingWord(word); // lock this word
        const note = prompt(`Add a note for "${word}" (optional):`) || null;

        try {
            const response = await fetch("/api/vocabulary-words", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: String(userDetail.id),
                    word,
                    note,
                }),
            });

            if (!response.ok) throw new Error("Failed to save word");
            alert(`Word "${word}" saved successfully!`);
        } catch (error) {
            console.error(error);
            alert("Failed to save word.");
        } finally {
            setSavingWord(null); // unlock
        }
    };

    const words = useMemo(
        () => storyChapters?.chapterText?.split(" ") || [],
        [storyChapters?.chapterText]
    );

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    return (
        <div className="h-full flex flex-col justify-start relative">
            <h2 className="flex items-center text-3xl font-bold mb-4 text-purple-800">
                <span>{storyChapters?.chapterTitle}</span>

                <button
                    onClick={togglePlayPause}
                    className="ml-3 text-purple-600 hover:text-purple-800"
                    title={!isSpeaking ? "Play" : isPaused ? "Resume" : "Pause"}
                >
                    {!isSpeaking ? (
                        <IoMdPlay size={35} />
                    ) : isPaused ? (
                        <IoMdPlay size={35} />
                    ) : (
                        <IoMdPause size={35} />
                    )}
                </button>

                {isSpeaking && (
                    <button
                        onClick={stopSpeech}
                        className="ml-3 text-red-600 hover:text-red-800"
                        title="Stop"
                    >
                        <IoStop size={30} />
                    </button>
                )}

                <select
                    className="ml-3 border border-gray-300 rounded px-2 py-1 text-sm"
                    value={speechRate}
                    onChange={(e) => {
                        const newRate = parseFloat(e.target.value);
                        setSpeechRate(newRate);

                        if (isSpeaking) {
                            window.speechSynthesis.cancel();
                            playSpeech(storyChapters?.chapterText, newRate);
                        }
                    }}
                    title="Set narration speed"
                >
                    <option value={0.25}>0.25x</option>
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                </select>
            </h2>

            <p className="text-lg mt-6 text-gray-800 bg-slate-100 rounded-lg p-6 shadow-inner leading-relaxed tracking-wide">
                {words.map((word: string, idx: number) => {
                    const cleanedWord = word.replace(/[^a-zA-Z]/g, "");
                    const isHighlighted = highlightIndex === idx;
                    return (
                        <span
                            key={idx}
                            className={`cursor-pointer rounded px-1 ${
                                isHighlighted
                                    ? "bg-green-300"
                                    : "hover:bg-yellow-200"
                            } ${
                                savingWord === cleanedWord
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                            onClick={() => {
                                if (cleanedWord && savingWord !== cleanedWord) {
                                    saveWord(cleanedWord.toLowerCase());
                                }
                            }}
                            title="Click to save this word"
                        >
                            {word}{" "}
                        </span>
                    );
                })}
            </p>
        </div>
    );
};

export default StoryPages;
