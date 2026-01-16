"use client";

import { useState, useRef } from "react";
import { IKUpload } from "imagekitio-react";
import toast from "react-hot-toast";

// Maximum file size: 100MB for videos
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"];
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export default function FileUpload({ onUploadSuccess, onUploadProgress, fileType = "video" }) {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [dragActive, setDragActive] = useState(false);
    const uploadRef = useRef(null);

    const isVideo = fileType === "video";
    const allowedTypes = isVideo ? ALLOWED_VIDEO_TYPES : ALLOWED_IMAGE_TYPES;
    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

    const validateFile = (file) => {
        if (!file) {
            toast.error("No file selected");
            return false;
        }

        if (!allowedTypes.includes(file.type)) {
            toast.error(`Invalid file type. Please upload a ${isVideo ? "video" : "image"} file.`);
            return false;
        }

        if (file.size > maxSize) {
            const maxMB = maxSize / (1024 * 1024);
            toast.error(`File too large. Maximum size is ${maxMB}MB.`);
            return false;
        }

        return true;
    };

    const handleUploadStart = (evt) => {
        const file = evt.target?.files?.[0];
        if (!validateFile(file)) {
            // Reset upload
            if (uploadRef.current) {
                uploadRef.current.value = "";
            }
            return;
        }
        setIsUploading(true);
        setProgress(0);
    };

    const handleUploadProgress = (progress) => {
        const percent = Math.round((progress.loaded / progress.total) * 100);
        setProgress(percent);
        onUploadProgress?.(percent);
    };

    const handleUploadSuccess = (res) => {
        setIsUploading(false);
        setProgress(100);
        toast.success("Upload successful!");

        onUploadSuccess?.({
            url: res.url,
            fileId: res.fileId,
            name: res.name,
            filePath: res.filePath,
            thumbnailUrl: res.thumbnailUrl || "",
            fileType: res.fileType,
        });

        // Reset after success
        setTimeout(() => setProgress(0), 2000);
    };

    const handleUploadError = (err) => {
        setIsUploading(false);
        setProgress(0);
        console.error("Upload error:", err);
        toast.error(err.message || "Upload failed. Please try again.");
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file && validateFile(file)) {
            // Trigger the IKUpload with the dropped file
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            if (uploadRef.current) {
                uploadRef.current.files = dataTransfer.files;
                uploadRef.current.dispatchEvent(new Event("change", { bubbles: true }));
            }
        }
    };

    return (
        <div
            className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${dragActive
                    ? "border-primary bg-primary/10"
                    : "border-base-300 hover:border-primary/50"
                } ${isUploading ? "pointer-events-none opacity-75" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                {/* Upload Icon */}
                <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${dragActive ? "bg-primary text-primary-content" : "bg-base-200"
                        }`}
                >
                    {isUploading ? (
                        <span className="loading loading-spinner loading-lg"></span>
                    ) : (
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
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                    )}
                </div>

                {/* Text */}
                <div>
                    <p className="font-semibold text-lg">
                        {isUploading
                            ? "Uploading..."
                            : dragActive
                                ? "Drop your file here"
                                : `Drag & drop your ${isVideo ? "video" : "image"} here`}
                    </p>
                    <p className="text-sm text-base-content/60 mt-1">
                        or click to browse
                    </p>
                    <p className="text-xs text-base-content/40 mt-2">
                        {isVideo
                            ? "MP4, WebM, MOV • Max 100MB"
                            : "JPEG, PNG, GIF, WebP • Max 10MB"}
                    </p>
                </div>

                {/* Progress Bar */}
                {isUploading && (
                    <div className="w-full max-w-xs">
                        <progress
                            className="progress progress-primary w-full"
                            value={progress}
                            max="100"
                        ></progress>
                        <p className="text-sm text-center mt-1">{progress}%</p>
                    </div>
                )}

                {/* Hidden IKUpload */}
                <IKUpload
                    ref={uploadRef}
                    fileName={`reel_${Date.now()}`}
                    folder="/reels"
                    useUniqueFileName={true}
                    responseFields={["url", "thumbnailUrl", "fileId", "filePath", "fileType"]}
                    onUploadStart={handleUploadStart}
                    onUploadProgress={handleUploadProgress}
                    onSuccess={handleUploadSuccess}
                    onError={handleUploadError}
                    accept={allowedTypes.join(",")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
}
