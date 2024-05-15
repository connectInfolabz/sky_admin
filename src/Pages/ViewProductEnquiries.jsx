import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Header from "../Common/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useLocation } from "react-router-dom";

function ViewProductEnquiries() {
  const location = useLocation();
  const product = location.state?.product; // Use optional chaining to access product

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (product) {
      fetchData();
    }

    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem("theme") === "dark");
    };

    document.addEventListener("themeChanged", handleThemeChange);

    const themeInterval = setInterval(() => {
      setIsDarkMode(localStorage.getItem("theme") === "dark");
    }, 100);

    return () => {
      document.removeEventListener("themeChanged", handleThemeChange);
      clearInterval(themeInterval);
    };
    // eslint-disable-next-line
  }, [product]); // Update effect when product changes

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/admin/getEnquiries`,
        {
          productId: product._id,
        }
      );
      setRecords(response.data.enquiries);
      setOriginalData(response.data.enquiries);
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
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Enquiry",
      selector: (row) => row.enquiry,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleString(),
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
          key === "date"
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
            <h3>Enquiries</h3>
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

export default ViewProductEnquiries;
