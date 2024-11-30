import React from "react";

function PageLayout({ children }) {
  return (
    <div className="pt-[4.2rem]">
      <div>{children}</div>
    </div>
  );
}

export default PageLayout;
