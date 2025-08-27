import { UserDetailContext } from "@/context/UserDetailContext";
import { useState, useEffect, useContext, useMemo } from "react";
import { IoMdPlayCircle } from "react-icons/io";

const StoryPages = ({ storyChapters }: any) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const { userDetail } = useContext(UserDetailContext);

    // ✅ Toast state
    const [toast, setToast] = useState<string | null>(null);

    const playSpeech = (text: string) => {
        if (!text) return;

        const synth = window.speechSynthesis;
        if (synth.speaking) synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        synth.speak(utterance);
    };

    const saveWord = async (word: string) => {
        if (!word.trim() || !userDetail?.id) return;

        const note = prompt(`Add a note for "${word}" (optional):`) || null;

        try {
            const response = await fetch("/api/vocabulary-words", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: userDetail.id,
                    word,
                    note,
                }),
            });

            if (!response.ok) throw new Error("Failed to save word");

            // ✅ Show toast instead of blocking alert
            setToast(`Word "${word}" saved successfully!`);
            setTimeout(() => setToast(null), 2000);
        } catch (error) {
            console.error(error);
            setToast("Failed to save word.");
            setTimeout(() => setToast(null), 2000);
        }
    };

    // ✅ Split words only once
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
                <IoMdPlayCircle
                    onClick={() => !isSpeaking && playSpeech(storyChapters?.chapterText)}
                    className={`ml-3 cursor-pointer transition-colors duration-200 ${
                        isSpeaking ? "text-purple-400" : "text-purple-600 hover:text-purple-800"
                    }`}
                    size={35}
                    aria-label="Play chapter"
                    role="button"
                    title={isSpeaking ? "Speaking..." : "Play chapter"}
                />
            </h2>

            <p className="text-lg mt-6 text-gray-800 bg-slate-100 rounded-lg p-6 shadow-inner leading-relaxed tracking-wide">
                {words.map((word: string, idx: number) => (
                    <span
                        key={idx}
                        className="cursor-pointer hover:bg-yellow-200 rounded px-1"
                        onClick={() => saveWord(word.replace(/[^a-zA-Z]/g, ""))}
                        title="Click to save this word"
                    >
                        {word}{" "}
                    </span>
                ))}
            </p>

            {/* ✅ Quick Toast Popup */}
            {toast && (
                <div className="fixed bottom-5 right-5 bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
                    {toast}
                </div>
            )}
        </div>
    );
};

export default StoryPages;
