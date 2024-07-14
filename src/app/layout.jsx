import "@/assets/css/global.css";
import LayoutComponent from "@/components/LayoutComponent";
import AppThemeProvider from "@/context/ThemeProvider";
// import { Inter } from "next/font/google";
import { cookies } from 'next/headers';

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tahir Ahmad - Portfolio",
  description: `Hello! I Am ${process.env.name}. I am a full stack web developer.As a seasoned full-stack web developer, I've embarked on a journey that began in 2020, initially focusing on front-end technologies. Over time, I honed my skills in HTML5, CSS3 (with animations), Bootstrap, JavaScript, jQuery, React.js, Redux, and Next.js. In 2023, driven by a desire to broaden my expertise, I ventured into back-end development, embracing Ruby on Rails and Ruby. This transition allowed me to build robust server-side applications, manage databases, and seamlessly integrate APIs. Throughout my journey, I've remained committed to clean coding practices, ensuring that every project I undertake delivers optimal performance and scalability. My active participation in open-source projects on GitHub reflects my dedication to collaboration and innovation within the development community. With a passion for both front-end creativity and back-end architecture, I strive to exceed expectations and drive progress in every project I undertake.`,
  author: `Qubartech, ${process.env.name}, Tahir Ahmad`,
  keywords: [
    `Qubartech, tech, tech company, technology, Tahir Ahmad, ${process.env.name}, ${process.env.fullName} portfolio, portfolio`,
  ],
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
  const theme = cookies().get("__theme__")?.value || "dark";

  return (
    <html
      className={theme}
      lang="en"
      style={{ colorScheme: theme }}
    >
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <meta name="author" content={`Qubartech ${process.env.name}`} />        
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
        <AppThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LayoutComponent theme={theme}>{children}</LayoutComponent>
        </AppThemeProvider>
      </body>
    </html>
  );
}
