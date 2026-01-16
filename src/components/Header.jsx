"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16">

                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-white/30 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                            <div className="relative flex items-center gap-2 px-3 py-1.5 bg-black border border-white/20 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm4.5 2.5l6 3.5-6 3.5v-7z" />
                                </svg>
                                <span className="font-bold text-lg text-white">
                                    Reels Pro
                                </span>
                            </div>
                        </div>
                    </Link>


                    <div className="flex items-center gap-3">
                        {isLoading ? (
                            <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse"></div>
                        ) : session ? (
                            <>

                                <Link
                                    href="/upload"
                                    className="group relative inline-flex items-center gap-2 px-4 py-2 overflow-hidden rounded-full bg-white text-black font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-white/25 hover:scale-105"
                                >
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
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    <span className="hidden sm:inline">Upload</span>
                                </Link>


                                <div className="relative group">
                                    <button className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                            <span className="text-sm font-bold text-black">
                                                {session.user.email?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <svg className="w-4 h-4 text-white/60 mr-2 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>


                                    <div className="absolute right-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                        <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-2xl">
                                            <div className="px-3 py-2 border-b border-white/10">
                                                <p className="text-xs text-white/40">Signed in as</p>
                                                <p className="text-sm text-white truncate">{session.user.email}</p>
                                            </div>
                                            <button
                                                onClick={() => signOut({ callbackUrl: "/login" })}
                                                className="w-full mt-1 flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
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
                                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                    />
                                                </svg>
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 text-sm font-medium bg-white text-black rounded-full hover:shadow-lg hover:shadow-white/25 hover:scale-105 transition-all duration-300"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
