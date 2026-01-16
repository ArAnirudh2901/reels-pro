import VideoFeed from "@/components/VideoFeed";
import dbConnect from "@/lib/db";
import Video from "@/models/Video";
import User from "@/models/User";
import Link from "next/link";

async function getVideos() {
  try {
    await dbConnect();
    const videos = await Video.find({})
      .sort({ createdAt: -1 })
      .populate("user", "email")
      .lean();

    return videos.map((video) => ({
      ...video,
      _id: video._id.toString(),
      user: video.user
        ? {
          ...video.user,
          _id: video.user._id.toString(),
        }
        : null,
      createdAt: video.createdAt?.toISOString(),
      updatedAt: video.updatedAt?.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

export default async function HomePage() {
  const videos = await getVideos();

  return (
    <div className="min-h-screen bg-black">

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-800/30"></div>


        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-400/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>


        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>


        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-white bg-white/10 border border-white/20 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Now with AI-powered editing
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">
              Create. Share.
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
              Go Viral.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            The next-generation platform for short-form video content.
            Create stunning reels, connect with creators, and share your story with the world.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-black bg-white rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-105"
            >
              <span className="relative z-10">Start Creating</span>
              <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>

            <Link
              href="#explore"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-black bg-white rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Explore Reels
            </Link>
          </div>


          <div className="flex items-center justify-center gap-8 mt-16 pt-8 border-t border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-sm text-white/50">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500K+</div>
              <div className="text-sm text-white/50">Videos Shared</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50M+</div>
              <div className="text-sm text-white/50">Views Daily</div>
            </div>
          </div>
        </div>
      </section>


      <section id="explore" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trending Right Now
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Discover the hottest content from our community of creators
            </p>
          </div>

          <VideoFeed videos={videos} />
        </div>
      </section>
    </div>
  );
}
