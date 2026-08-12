/* eslint-disable jsx-a11y/aria-unsupported-elements */
import "@/assets/css/global.scss";
import LayoutComponent from "@/components/LayoutComponent";
import AppThemeProvider from "@/context/ThemeProvider";
import { cookies } from "next/headers";

export const metadata = {
  metadataBase: new URL("https://tahirahmad.qubartech.com"),
  title: {
    default: "Tahir Ahmad | Senior Full-Stack Engineer",
    template: "%s | Tahir Ahmad",
  },
  description:
    "Tahir Ahmad is a Senior Full-Stack Software Engineer with expertise in Next.js 14, React 18, Ruby on Rails, Node.js, and AI System Integration. Lead Code Reviewer & Architect at Nascenia Ltd. (Uddogi VAT Platform).",
  author: "Tahir Ahmad",
  keywords: [
    "Tahir Ahmad",
    "Tahir Ahmad Portfolio",
    "Software Engineer Bangladesh",
    "Senior Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Ruby on Rails Engineer",
    "Uddogi VAT Software",
    "Nascenia Engineer",
    "QubarTech",
    "AI System Integration",
    "Frontend Developer Dhaka",
  ],
  authors: [{ name: "Tahir Ahmad", url: "https://github.com/TahirAhmad01" }],
  creator: "Tahir Ahmad",
  publisher: "QubarTech",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tahirahmad.dev",
    siteName: "Tahir Ahmad - Developer Portfolio",
    title: "Tahir Ahmad | Senior Full-Stack Engineer",
    description:
      "Full-stack software engineer specializing in Next.js, React, Ruby on Rails, and AI Automation Systems.",
    images: [
      {
        url: "https://tahirahmad.dev/images/profile.png",
        width: 1200,
        height: 630,
        alt: "Tahir Ahmad - Senior Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tahir Ahmad | Senior Full-Stack Engineer",
    description:
      "Full-stack software engineer specializing in Next.js, React, Ruby on Rails, and AI Automation Systems.",
    creator: "@tahir_ahmad01",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Tahir Ahmad",
  "jobTitle": "Senior Full-Stack Software Engineer",
  "url": "https://tahirahmad.dev",
  "sameAs": [
    "https://github.com/TahirAhmad01",
    "https://github.com/qubartech",
    "https://www.linkedin.com/in/tahirahmad01/",
    "https://twitter.com/tahir_ahmad01",
    "https://wa.me/+8801610881871/"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Nascenia Ltd."
  },
  "knowsAbout": [
    "JavaScript",
    "TypeScript",
    "Next.js",
    "React",
    "Ruby on Rails",
    "Node.js",
    "Tailwind CSS",
    "AI Systems Integration",
    "Redux Toolkit"
  ],
  "description": "Senior Full-Stack Software Engineer with expertise in Next.js, React, and Ruby on Rails. Lead Code Reviewer for Uddogi VAT platform."
};

export default function RootLayout({ children }) {
  const theme = cookies().get("__theme__")?.value || "dark";

  return (
    <html className={theme} lang="en" style={{ colorScheme: theme }}>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <meta
          name="google-site-verification"
          content="KeGYsmT-gRaWpvGnbyqjjx0dyF5hMFJHj5Piue9WcYI"
        />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <script
          src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"
          async
        ></script>
        <script
          src="https://kit.fontawesome.com/b4ed653758.js"
          aria-hidden
          async
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WM7R43S8');
            `,
          }}
        />
      </head>

      <body className="relative">
        <AppThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LayoutComponent>{children}</LayoutComponent>
        </AppThemeProvider>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WM7R43S8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      </body>
    </html>
  );
}
