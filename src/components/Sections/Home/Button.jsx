import React from "react";

function Button({ name, key, ...rest }) {
  return (
    <button
      key={key}
      type="button"
      className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:bg-gradient-to-bl font-semibold rounded-3xl text-sm px-6 py-3.5 text-center text-white inline-flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
      {...rest}
    >
      {name}
    </button>
  );
}

export default Button;
