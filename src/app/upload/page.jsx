"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/FileUpload";
import { apiClient } from "@/lib/api-client";
import toast from "react-hot-toast";

export default function UploadPage() {
    const router = useRouter();
    const [uploadedFile, setUploadedFile] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        controls: true,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleUploadSuccess = (fileData) => {
        setUploadedFile(fileData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!uploadedFile) {
            toast.error("Please upload a video first");
            return;
        }

        if (!formData.title.trim()) {
            toast.error("Please enter a title");
            return;
        }

        setIsSubmitting(true);

        try {
            await apiClient.post("/videos", {
                title: formData.title.trim(),
                description: formData.description.trim(),
                videoUrl: uploadedFile.url,
                thumbnailUrl: uploadedFile.thumbnailUrl || "",
                controls: formData.controls,
                transformation: {
                    height: 1920,
                    width: 1080,
                    quality: 80,
                },
            });

            toast.success("Reel published successfully!");
            router.push("/");
            router.refresh();
        } catch (error) {
            toast.error(error.message || "Failed to publish reel");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Upload New Reel</h1>
                <p className="text-base-content/60">
                    Share your creativity with the world
                </p>
            </div>

            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Video</span>
                                {uploadedFile && (
                                    <span className="label-text-alt text-success flex items-center gap-1">
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
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        Uploaded
                                    </span>
                                )}
                            </label>
                            <FileUpload
                                onUploadSuccess={handleUploadSuccess}
                                fileType="video"
                            />
                        </div>


                        {uploadedFile && (
                            <div className="rounded-xl overflow-hidden bg-base-300">
                                <video
                                    src={uploadedFile.url}
                                    controls
                                    className="w-full max-h-[300px] object-contain"
                                />
                            </div>
                        )}


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Title</span>
                                <span className="label-text-alt">
                                    {formData.title.length}/100
                                </span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Give your reel a catchy title..."
                                className="input input-bordered w-full focus:input-primary"
                                maxLength={100}
                                required
                            />
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">
                                    Description (optional)
                                </span>
                                <span className="label-text-alt">
                                    {formData.description.length}/500
                                </span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Tell viewers what your reel is about..."
                                className="textarea textarea-bordered w-full h-24 focus:textarea-primary resize-none"
                                maxLength={500}
                            />
                        </div>


                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-4">
                                <input
                                    type="checkbox"
                                    name="controls"
                                    checked={formData.controls}
                                    onChange={handleChange}
                                    className="checkbox checkbox-primary"
                                />
                                <span className="label-text">Show video controls</span>
                            </label>
                        </div>


                        <button
                            type="submit"
                            disabled={isSubmitting || !uploadedFile}
                            className="btn btn-primary w-full"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
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
                                    Publish Reel
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
