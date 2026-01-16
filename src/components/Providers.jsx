"use client";

import { SessionProvider } from "next-auth/react";
import { IKContext } from "imagekitio-react";
import { Toaster } from "react-hot-toast";

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

const authenticator = async () => {
    try {
        const response = await fetch("/api/imagekit-auth");
        if (!response.ok) {
            throw new Error("Authentication failed");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("ImageKit auth error:", error);
        throw error;
    }
};

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <IKContext
                urlEndpoint={urlEndpoint}
                publicKey={publicKey}
                authenticator={authenticator}
            >
                {children}
                <Toaster
                    position="bottom-center"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: "#1f2937",
                            color: "#f3f4f6",
                            borderRadius: "12px",
                            padding: "16px",
                        },
                        success: {
                            iconTheme: {
                                primary: "#10b981",
                                secondary: "#f3f4f6",
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: "#ef4444",
                                secondary: "#f3f4f6",
                            },
                        },
                    }}
                />
            </IKContext>
        </SessionProvider>
    );
}
