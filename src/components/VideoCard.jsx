"use client";

import { useRef, useState } from "react";
import { IKVideo } from "imagekitio-react";

export default function VideoCard({ video }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        controls = true,
        transformation = {},
    } = video;


    const getFilePath = (url) => {
        if (!url) return "";
        const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "";
        if (url.startsWith(urlEndpoint)) {
            return url.replace(urlEndpoint, "");
        }
        return url;
    };

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleMuteToggle = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="card bg-base-200 shadow-xl overflow-hidden group">

            <div className="video-container relative bg-base-300">
                <IKVideo
                    ref={videoRef}
                    path={getFilePath(videoUrl)}
                    transformation={[
                        {
                            height: transformation.height || "1920",
                            width: transformation.width || "1080",
                            quality: transformation.quality || "80",
                        },
                    ]}
                    controls={controls}
                    loop
                    muted={isMuted}
                    playsInline
                    poster={thumbnailUrl || undefined}
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />


                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {!isPlaying && !controls && (
                        <button
                            onClick={handlePlayPause}
                            className="btn btn-circle btn-lg btn-primary pointer-events-auto"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                />
                            </svg>
                        </button>
                    )}
                </div>


                <button
                    onClick={handleMuteToggle}
                    className="absolute bottom-4 right-4 btn btn-circle btn-sm btn-ghost bg-base-100/50 hover:bg-base-100/80 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    {isMuted ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                            />
                        </svg>
                    )}
                </button>
            </div>


            <div className="card-body p-4">
                <h2 className="card-title text-base line-clamp-1">{title}</h2>
                {description && (
                    <p className="text-sm text-base-content/70 line-clamp-2">
                        {description}
                    </p>
                )}
                <div className="text-xs text-base-content/50 mt-2">
                    {video.createdAt &&
                        new Date(video.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                </div>
            </div>
        </div>
    );
}
