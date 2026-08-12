import { Fade } from "react-reveal";

function SocialContact({ link, name, icon, delay }) {
  return (
    <Fade up delay={delay}>
      <li>
        <a
          href={link}
          target="_blank"
          className="flex items-center justify-between p-3.5 text-sm font-semibold text-gray-800 dark:text-gray-100 rounded-xl bg-gray-50 dark:bg-[#16223b]/60 border border-gray-200/60 dark:border-[#1e2d4a]/60 hover:border-cyan-500/40 hover:bg-cyan-500/10 group transition-all duration-300 shadow-sm"
          rel="noreferrer"
        >
          <div className="flex items-center gap-3">
            <i aria-hidden className={`${icon} text-lg text-cyan-500 group-hover:scale-110 transition-transform`}></i>
            <span className="capitalize">{name}</span>
          </div>
          <i className="fa-solid fa-chevron-right text-xs text-gray-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all"></i>
        </a>
      </li>
    </Fade>
  );
}

export default SocialContact;
