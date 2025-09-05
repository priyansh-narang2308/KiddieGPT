import BestStories from "@/app/_components/BestStories";

export default function TestStoriesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-purple-800">
          🌟 KiddieGPT - Best Stories Test
        </h1>
        <div className="flex justify-center">
          <BestStories />
        </div>
      </div>
    </div>
  );
}