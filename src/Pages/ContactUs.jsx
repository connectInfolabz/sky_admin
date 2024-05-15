// ContactUs.js
import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Header from "../Common/Header";
import axios from "axios";
import DataTable from "react-data-table-component";

function ContactUs() {
  const [records, setRecords] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    fetchData();

    // Listen for the custom event to handle theme changes
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem("theme") === "dark");
    };

    document.addEventListener("themeChanged", handleThemeChange);

    // Update theme periodically
    const themeInterval = setInterval(() => {
      setIsDarkMode(localStorage.getItem("theme") === "dark");
    }, 100); // check every 100 milisecond

    return () => {
      document.removeEventListener("themeChanged", handleThemeChange);
      clearInterval(themeInterval);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/admin/getContactUs`
      );
      setRecords(response.data.contactUs);
      setOriginalData(response.data.contactUs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const column = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
    },
    {
      name: "Date & Time",
      selector: (row) => new Date(row.timestamp).toLocaleString(),
      sortable: true,
    },
  ];

  const handleFilter = (event) => {
    const filterValue = event.target.value.toLowerCase();
    if (filterValue === "") {
      setRecords(originalData);
    } else {
      const newData = originalData.filter((row) =>
        Object.entries(row).some(([key, value]) =>
          key === "timestamp"
            ? new Date(value)
                .toLocaleString()
                .toLowerCase()
                .includes(filterValue)
            : String(value).toLowerCase().includes(filterValue)
        )
      );
      setRecords(newData);
    }
  };

  return (
    <>
      <div id="app">
        <Sidebar />
        <div id="main">
          <Header />
          <div className="page-heading">
            <h3>Contact Us</h3>
          </div>
          <div>
            <div className="form-group col-3">
              <input
                type="text"
                onChange={handleFilter}
                className="form-control"
                id="basicInput"
                placeholder="Search..."
              />
            </div>

            <DataTable
              id="table1"
              columns={column}
              data={records}
              pagination
              highlightOnHover
              progressPending={loading}
              customStyles={{
                pagination: {
                  rowsPerPageOptions: {
                    main: {
                      color: isDarkMode ? "white" : "black",
                      backgroundColor: isDarkMode ? "#333" : "white",
                    },
                  },
                },
              }}
              theme={isDarkMode ? "dark" : "light"}
            ></DataTable>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
