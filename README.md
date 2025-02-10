# ![ResumeGenie](public/images/resumeGenieLogo_DarkBg.png)

**ResumeGenie** is a free and user-friendly online resume builder that allows users to create professional resumes effortlessly. Pick from beautifully designed templates, fill in your details, and download your resume instantly — at no cost!

### ❤️ Support

If you find this project helpful, please consider giving this repository a ⭐️ on GitHub, and don't forget to **like**, **share**, and **subscribe** to support our journey!

## 🌟 Features

- **Elegant Templates**: Select from a variety of professionally designed templates.
- **Customizable Fields**: Add and edit your details with ease.
- **Instant Download**: Generate and download resumes in PDF format for free.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **AI-Powered Resume Generation**: Automatically generate resumes using AI.
- **Authentication with Kinde**: Google Sign-In for secure access.
- **Real-Time Editing**: Edit your resume in real-time with live previews.
- **Resume Theme Colors**: Customize your resume's color scheme.
- **Shareable Resume Link**: Share your resume with a unique link.
- **Preview Mode**: View your resume before downloading.
- **Resume Thumbnail**: Generate a thumbnail for your resume.
- **Search Trash Resume**: Recover deleted resumes from the trash.
- **Built with Next.js 14**: Fast, SEO-friendly frontend and backend.
- **Styled with TailwindCSS and Shadcn UI**: Modern and responsive UI components.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (Frontend + Backend)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) and [ShadCN UI](https://shadcn.dev/)
- **PDF Generation**: [React-Pdf](https://react-pdf.org/)
- **AI Integration**: [Gemini AI](https://gemini.google.com/) for smarter resume generation.
- **Backend API**: [Hono](https://hono.dev/) for lightweight and efficient APIs.
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) for database management.
- **State Management**: [React Query](https://tanstack.com/query/latest) for data fetching and caching.
- **Deployment**: [Vercel](https://vercel.com/home) for seamless hosting.

## 🛠️ Getting Started

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. Clone the repository:

```
git clone https://github.com/kgaurav152/resumegenie.git
cd resumegenie
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:
   Create a .env.local file in the root directory and add the key-pair values available in .env.example, some of them are shown below:

```
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_GEMINI_API_KEY=ABcdEfGHijk98Lm76No5pQRstUvw43x2Y1zQwEr
```

4. Start the development server:

```
npm run dev
```

5. Open your browser and navigate to:

```
http://localhost:3000
```

## 🔄 Deploy to Vercel

To deploy this project to Vercel, follow these steps:

### 1. Add Environment Variables

After deploying, navigate to **Vercel > Project Settings > Environment Variables** and add the necessary environment variables for production.

Replace all occurrences of `localhost` with your Vercel domain URL, as shown below:

```plaintext
KINDE_SITE_URL=https://resume-genie-mu.vercel.app/
KINDE_POST_LOGOUT_REDIRECT_URL=https://resume-genie-mu.vercel.app/
KINDE_POST_LOGIN_REDIRECT_URL=https://resume-genie-mu.vercel.app/dashboard
NEXT_PUBLIC_APP_URL=https://resume-genie-mu.vercel.app/
```

These variables ensure that the app functions properly on your Vercel deployment.

### 2. Initialize and Deploy

Run the following command to initialize the deployment:

```bash
vercel
```

This command will prompt you to configure the project for the first time if it hasn't been linked to Vercel.

Once configured, deploy the project to production using:

```bash
vercel --prod
```

This will push your latest changes live on Vercel.

## 🔍 Versions & Packages

To view all packages and dependencies used, check out the [Versions](versions/version.md) file.

---
