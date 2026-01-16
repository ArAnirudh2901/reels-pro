# Reels Pro 🎬

Reels Pro is a modern, mobile-first social media platform designed for sharing short-form video content. Built with **Next.js 16**, **MongoDB**, and **ImageKit**, it offers a seamless experience for creators to upload, discover, and share amazing reels with the world.

## 🚀 Features

-   **Infinite Video Feed**: Smooth, vertically scrolling feed of user-generated content.
-   **Video Upload**: Seamless video uploading with integrated media management via ImageKit.
-   **User Authentication**: Secure sign-up and login system using NextAuth.js v5.
-   **Modern UI/UX**: Sleek, glassmorphic design with a white/neutral theme, powered by Tailwind CSS v4 and shadcn/ui.
-   **Responsive Design**: Optimized for both mobile and desktop experiences.
-   **AI-Ready**: Architecture ready for AI-powered video editing features.

## 🛠️ Tech Stack

-   **Frontend**: [Next.js 16](https://nextjs.org/) (App Router), [React](https://react.dev/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) (via [Mongoose](https://mongoosejs.com/))
-   **Authentication**: [NextAuth.js v5](https://authjs.dev/)
-   **Media Storage**: [ImageKit](https://imagekit.io/)
-   **Video Player**: `imagekitio-react`

## 🏁 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   MongoDB Atlas account
-   ImageKit account

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/reels-pro.git
    cd reels-pro
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables**
    Create a `.env.local` file in the root directory and add the following variables:

    ```env
    # MongoDB Connection
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/reels-pro?retryWrites=true&w=majority

    # NextAuth Configuration
    NEXTAUTH_SECRET=your_generated_secret_key
    NEXTAUTH_URL=http://localhost:3000

    # ImageKit Configuration (Server-side)
    IMAGEKIT_PUBLIC_KEY=your_public_key
    IMAGEKIT_PRIVATE_KEY=your_private_key
    IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

    # ImageKit Configuration (Client-side)
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open the app**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```bash
reels-pro/
├── src/
│   ├── app/              # Next.js App Router pages and API routes
│   │   ├── api/          # API endpoints (auth, videos, imagekit)
│   │   ├── login/        # Login page
│   │   ├── register/     # Registration page
│   │   ├── upload/       # Video upload page
│   │   ├── globals.css   # Global styles
│   │   ├── layout.js     # Root layout with providers
│   │   └── page.js       # Home page (Video Feed)
│   ├── components/       # Reusable React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── ...           # Custom components (Header, VideoCard, etc.)
│   ├── lib/              # Utility functions and configurations
│   └── models/           # Mongoose database models (User, Video)
├── public/               # Static assets
└── ...config files       # Next.js, Tailwind, ESLint, etc.
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
