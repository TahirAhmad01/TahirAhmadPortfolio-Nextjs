function SocialBtn({ icon, hover, link }) {
  return (
    <>
      <a href={link} target="_blank" rel="noreferrer">
        <button className={`${hover} customButton duration-300`}>
          <i
            aria-hidden
            className={`${icon}  hover:scale-110`}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            aria-hidden="true"
          ></i>
        </button>
      </a>
    </>
  );
}

export default SocialBtn;
