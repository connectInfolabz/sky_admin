import React, { useState } from "react";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function EditBanner() {
  const location = useLocation();
  const banner = location.state?.banner || {};
  console.log(banner);
  const [data, setData] = useState({
    bannerId: banner._id || "",
    bannerTitle: banner.bannerTitle || "",
    bannerDesc: banner.bannerDesc || "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/admin/editBanner`,
        data
      );
      if (response.data.success) {
        toast.success("Banner updated Successfully!!", {
          autoClose: 1500,
          onClose: () => navigate("/viewBanner"),
        });
      } else {
        toast.error("Banner Not updated!!", {
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <div id="app">
        <Sidebar />
        <div id="main">
          <Header />
          <div className="page-heading">
            <h3>Edit Banner</h3>
          </div>
          <div className="page-content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content">
                    <form className="card-body" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-12 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Banner Title
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Banner Title"
                              aria-label="title"
                              name="bannerTitle"
                              value={data.bannerTitle}
                              onChange={handleChange}
                              aria-describedby="basic-addon1"
                              required
                            />
                          </div>
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Banner Desctiption
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Banner Desctiption"
                              aria-label="title"
                              name="bannerDesc"
                              onChange={handleChange}
                              value={data.bannerDesc}
                              aria-describedby="basic-addon1"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-5 w-50 d-block mx-auto"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBanner;
