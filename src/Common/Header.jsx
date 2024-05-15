import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const openSidebar = () => {
    const element = document.getElementById("sidebar");
    element.classList.add("active");
  };
  return (
    <header className="mb-3">
      <Link
        className="burger-btn d-block d-xl-none"
        onClick={openSidebar}
      >
        <i className="bi bi-justify fs-3" />
      </Link>
    </header>
  );
}

export default Header;
