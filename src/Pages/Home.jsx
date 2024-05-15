import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import Header from "../Common/Header";
import axios from "axios";

// Import statements

function Home() {
  const [data, setData] = useState(null); // Initialize data as null
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_MONGO_BASE_URL}/admin/getCounts`)
      .then((res) => {
        setData(res.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData({}); // Set data to an empty object if there's an error
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  return (
    <>
      <div id="app">
        <Sidebar />
        <div id="main">
          <Header />
          <div className="page-heading">
            <h3>Sky Water Pump Dashboard</h3>
          </div>
          <div className="page-content">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <section className="row">
                {data && ( // Check if data is not null or undefined
                  <>
                    <div className="col-12 col-lg-16">
                      <div className="row">
                        <div className="col-6 col-lg-4 col-md-6">
                          <div className="card">
                            <div className="card-body px-4 py-4-5">
                              <div className="row">
                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                                  <div className="stats-icon purple mb-2">
                                    <i className="iconly-boldShow" />
                                  </div>
                                </div>
                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                  <h6 className="text-muted font-semibold">
                                    Products
                                  </h6>
                                  <h6 className="font-extrabold mb-0">
                                    {data.totalProductCount}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 col-lg-4 col-md-6">
                          <div className="card">
                            <div className="card-body px-4 py-4-5">
                              <div className="row">
                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                                  <div className="stats-icon blue mb-2">
                                    <i className="iconly-boldShield-Done" />
                                  </div>
                                </div>
                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                  <h6 className="text-muted font-semibold">
                                    Enquiries
                                  </h6>
                                  <h6 className="font-extrabold mb-0">
                                    {data.totalEnquiryCount}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 col-lg-4 col-md-6">
                          <div className="card">
                            <div className="card-body px-4 py-4-5">
                              <div className="row">
                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                                  <div className="stats-icon green mb-2">
                                    <i className="iconly-boldAdd-User" />
                                  </div>
                                </div>
                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                  <h6 className="text-muted font-semibold">
                                    Contact Us Data
                                  </h6>
                                  <h6 className="font-extrabold mb-0">
                                    {data.totalContactCount}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
