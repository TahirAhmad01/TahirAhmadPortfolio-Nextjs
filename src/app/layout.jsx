import "@/assets/css/global.css";
import LayoutComponent from "@/components/LayoutComponent";
import AppThemeProvider from "@/context/ThemeProvider";
// import { Inter } from "next/font/google";
import { cookies } from 'next/headers';

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tahir Ahmad - Portfolio",
  description: `Hello! I Am ${process.env.name}. I am web developer.....`,
  icons: {
    icon: [
      {
        href: "/favicon.ico",
        url: "/favicon.ico",
      },
      {
        sizes: "16x16",
        href: "/favicon.ico",
        url: "/favicon.ico",
      },
      {
        sizes: "32x32",
        href: "/favicon.ico",
        url: "/favicon.ico",
      },
      {
        sizes: "192x192",
        href: "/favicon.ico",
        url: "/favicon.ico",
      },
      {
        sizes: "512x512",
        href: "/favicon.ico",
        url: "/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        sizes: "apple-touch-icon",
        href: "/favicon.ico",
        url: "/favicon.ico",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  const theme = cookies().get("__theme__")?.value || "system";

  return (
    <html
      className={theme}
      lang="en"
      style={theme !== "system" ? { colorScheme: theme } : {}}
    >
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <meta name="author" content={`Qubartech ${process.env.name}`} />
        <meta
          name="description"
          content={`Hello! I Am ${process.env.name}. I am web developer.....`}
        />
        <meta
          name="keywords"
          content={`Qubartech, tech, tech company, technology, Tahir Ahmad, ${process.env.name}, ${process.env.fullName} portfolio`}
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
          src="https://kit.fontawesome.com/f70f4c2534.js"
          aria-hidden
          async
        ></script>
      </head>

      <body>
        <AppThemeProvider attribute="class" defaultTheme={theme} enableSystem>
          <LayoutComponent theme={theme}>{children}</LayoutComponent>
        </AppThemeProvider>
      </body>
    </html>
  );
}
