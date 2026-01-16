import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/db";
import Video from "@/models/Video";


export async function GET() {
    try {
        await dbConnect();

        const videos = await Video.find({})
            .sort({ createdAt: -1 })
            .populate("user", "email")
            .lean();

        return NextResponse.json({
            success: true,
            videos,
        });
    } catch (error) {
        console.error("Error fetching videos:", error);
        return NextResponse.json(
            { error: "Failed to fetch videos" },
            { status: 500 }
        );
    }
}


export async function POST(request) {
    try {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { title, description, videoUrl, thumbnailUrl, controls, transformation } = body;


        if (!title || !videoUrl) {
            return NextResponse.json(
                { error: "Title and video URL are required" },
                { status: 400 }
            );
        }

        await dbConnect();

        const video = await Video.create({
            title,
            description: description || "",
            videoUrl,
            thumbnailUrl: thumbnailUrl || "",
            controls: controls !== undefined ? controls : true,
            transformation: transformation || {
                height: 1920,
                width: 1080,
                quality: 80,
            },
            user: token.id,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Video created successfully",
                video,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating video:", error);
        return NextResponse.json(
            { error: "Failed to create video" },
            { status: 500 }
        );
    }
}
