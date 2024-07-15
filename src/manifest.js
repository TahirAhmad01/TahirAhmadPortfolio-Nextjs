export default function manifest() {
  return {
    name: "Tahir Ahmad Portfolio - Qubartech",
    short_name: "Portfolio - Qubartech",
    author: "Tahir ahmad, qubartech",
    keywords: [
      `Qubartech, tech, tech company, technology, Tahir Ahmad, ${process.env.name}, ${process.env.fullName} portfolio, portfolio`,
    ],
    description: `Hello! I Am ${process.env.name}. I am a full stack web developer.As a seasoned full-stack web developer, I've embarked on a journey that began in 2020, initially focusing on front-end technologies. Over time, I honed my skills in HTML5, CSS3 (with animations), Bootstrap, JavaScript, jQuery, React.js, Redux, and Next.js. In 2023, driven by a desire to broaden my expertise, I ventured into back-end development, embracing Ruby on Rails and Ruby. This transition allowed me to build robust server-side applications, manage databases, and seamlessly integrate APIs. Throughout my journey, I've remained committed to clean coding practices, ensuring that every project I undertake delivers optimal performance and scalability. My active participation in open-source projects on GitHub reflects my dedication to collaboration and innovation within the development community. With a passion for both front-end creativity and back-end architecture, I strive to exceed expectations and drive progress in every project I undertake.`,
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
