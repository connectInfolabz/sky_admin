import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// const THEME_KEY = "theme";

function Sidebar() {
  // const [isDarkMode, setIsDarkMode] = useState(
  //   localStorage.getItem(THEME_KEY) === "dark"
  // );

  // useEffect(() => {
  //   document.body.classList.toggle("dark", isDarkMode);
  //   document.documentElement.setAttribute(
  //     "data-bs-theme",
  //     isDarkMode ? "dark" : "light"
  //   );
  //   localStorage.setItem(THEME_KEY, isDarkMode ? "dark" : "light");
  // }, [isDarkMode]);

  // const toggleDarkModeHandler = () => {
  //   setIsDarkMode((prevMode) => !prevMode);
  // };

  const closeSidebar = () => {
    const element = document.getElementById("sidebar");
    element.classList.remove("active");
  };

  function dropdownHandler(menuId) {
    const element = document.getElementById(menuId);
    element.classList.toggle("submenu-open");
  }

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_MONGO_BASE_URL}/api/logout`);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <div id="sidebar" className="sidebar-desktop">
        <div className="sidebar-wrapper active">
          <div className="sidebar-header position-relative">
            <div className="d-flex justify-content-between align-items-center">
              <div className="logo">
                <Link to="/">
                  <p className="text-blue text-uppercase text-center mb-0">
                    Admin
                  </p>
                </Link>
              </div>
              {/* <div className="theme-toggle d-flex gap-2 align-items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--system-uicons"
                  width={20}
                  height={20}
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 21 21"
                >
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M10.5 14.5c2.219 0 4-1.763 4-3.982a4.003 4.003 0 0 0-4-4.018c-2.219 0-4 1.781-4 4c0 2.219 1.781 4 4 4zM4.136 4.136L5.55 5.55m9.9 9.9l1.414 1.414M1.5 10.5h2m14 0h2M4.135 16.863L5.55 15.45m9.899-9.9l1.414-1.415M10.5 19.5v-2m0-14v-2"
                      opacity=".3"
                    />
                    <g transform="translate(-210 -1)">
                      <path d="M220.5 2.5v2m6.5.5l-1.5 1.5" />
                      <circle cx="220.5" cy="11.5" r={4} />
                      <path d="m214 5l1.5 1.5m5 14v-2m6.5-.5l-1.5-1.5M214 18l1.5-1.5m-4-5h2m14 0h2" />
                    </g>
                  </g>
                </svg>
                <div className="form-check form-switch fs-6">
                  <input
                    className="form-check-input me-0"
                    type="checkbox"
                    id="toggle-dark"
                    style={{ cursor: "pointer" }}
                    checked={isDarkMode}
                    onChange={toggleDarkModeHandler}
                  />
                  <label className="form-check-label" />
                </div>
                <svg
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--mdi"
                  width={20}
                  height={20}
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m17.75 4.09l-2.53 1.94l.91 3.06l-2.63-1.81l-2.63 1.81l.91-3.06l-2.53-1.94L12.44 4l1.06-3l1.06 3l3.19.09m3.5 6.91l-1.64 1.25l.59 1.98l-1.7-1.17l-1.7 1.17l.59-1.98L15.75 11l2.06-.05L18.5 9l.69 1.95l2.06.05m-2.28 4.95c.83-.08 1.72 1.1 1.19 1.85c-.32.45-.66.87-1.08 1.27C15.17 23 8.84 23 4.94 19.07c-3.91-3.9-3.91-10.24 0-14.14c.4-.4.82-.76 1.27-1.08c.75-.53 1.93.36 1.85 1.19c-.27 2.86.69 5.83 2.89 8.02a9.96 9.96 0 0 0 8.02 2.89m-1.64 2.02a12.08 12.08 0 0 1-7.8-3.47c-2.17-2.19-3.33-5-3.49-7.82c-2.81 3.14-2.7 7.96.31 10.98c3.02 3.01 7.84 3.12 10.98.31Z"
                  />
                </svg>
              </div> */}
              <div className="sidebar-toggler x">
                <Link
                  className="sidebar-hide d-xl-none d-block"
                  onClick={closeSidebar}
                >
                  <i className="bi bi-x bi-middle" />
                </Link>
              </div>
            </div>
          </div>
          <div className="sidebar-menu">
            <ul className="menu">
              <li className="sidebar-title">Menu</li>
              <li className="sidebar-item">
                <Link to="/" className="sidebar-link">
                  <i className="bi bi-grid-fill" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="sidebar-item has-sub ">
                <Link
                  className="sidebar-link"
                  onClick={() => dropdownHandler("components-menu")}
                >
                  <i className="bi bi-bag-fill"></i>
                  <span>Products</span>
                </Link>
                <ul id="components-menu" className="submenu ">
                  <li className="submenu-item">
                    <Link to="/addProduct" className="submenu-link">
                      Add Product
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/viewProduct" className="submenu-link">
                      View Product
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="sidebar-item has-sub ">
                <Link
                  className="sidebar-link"
                  onClick={() => dropdownHandler("banner-menu")}
                >
                  <i className="bi bi-bag-fill"></i>
                  <span>Banner</span>
                </Link>
                <ul id="banner-menu" className="submenu ">
                  <li className="submenu-item">
                    <Link to="/addBanner" className="submenu-link">
                      Add Banner
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/viewBanner" className="submenu-link">
                      View Banner
                    </Link>
                  </li>
                </ul>
              </li>
              <li
                className="sidebar-item has-sub"
                onClick={() => dropdownHandler("category-menu")}
              >
                <Link className="sidebar-link">
                  <i class="bi bi-tags-fill"></i>

                  <span>Category</span>
                </Link>
                <ul id="category-menu" className="submenu">
                  <li className="submenu-item">
                    <Link to="/addCategory" className="submenu-link">
                      Add Category
                    </Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/viewCategory" className="submenu-link">
                      View Category
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="sidebar-item">
                <Link to="/editContact" className="sidebar-link">
                  <i className="bi bi-pin"></i>
                  <span>Edit Contact Detail</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/contactUs" className="sidebar-link">
                  <i className="bi bi-send-fill"></i>
                  <span>Contact Us</span>
                </Link>
              </li>

              <li className="sidebar-item">
                <Link onClick={handleLogout} className="sidebar-link">
                  <i className="bi bi-box-arrow-left"></i>
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
