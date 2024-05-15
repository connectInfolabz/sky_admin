import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../Common/Sidebar";
import Header from "../Common/Header";
import axios from "axios";

function Feedback() {
  const [records, setRecords] = useState([]);
  // eslint-disable-next-line
  const [sensorName, setSensorName] = useState("soilSensorData");
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MONGO_BASE_URL}/user/gethistory`
      );
      setRecords(response.data.data);
      setOriginalData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  const column = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Sensor Value",
      selector: (row) => row.sensorValue,
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
      const newData = originalData[sensorName].filter((row) =>
        Object.entries(row).some(([key, value]) =>
          key === "timestamp"
            ? new Date(value)
                .toLocaleString()
                .toLowerCase()
                .includes(filterValue)
            : String(value).toLowerCase().includes(filterValue)
        )
      );
      setRecords({ ...originalData, [sensorName]: newData });
    }
  };
  return (
    <>
      <div id="app">
        <Sidebar />
        <div id="main">
          <Header />
          <div className="page-heading">
            <h3>Feedbacks</h3>
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
              className="table table-striped"
              id="table1"
              columns={column}
              data={records[sensorName]}
              pagination
            ></DataTable>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
