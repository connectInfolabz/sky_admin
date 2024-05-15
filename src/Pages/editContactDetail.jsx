import React, { useState } from "react";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditContactDetails() {
  const [data, setData] = useState({
    address: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();
  const maxLength = 100;

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
        `${process.env.REACT_APP_MONGO_BASE_URL}/admin/editContact`,
        data
      );
      if (response.data.success) {
        toast.success("Contact Updated Successfully!!", {
          autoClose: 1500,
          onClose: () => navigate("/"),
        });
      } else {
        toast.error("Contact Not Added!!", {
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
            <h3>Edit Contact Details</h3>
          </div>
          <div className="page-content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content">
                    <form
                      className="card-body"
                      onSubmit={handleSubmit}
                      encType="multipart/form-data"
                    >
                      <div className="row">
                        <div className="col-lg-6 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Email
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Email"
                              aria-label="title"
                              value={data.email}
                              name="email"
                              onChange={handleChange}
                              aria-describedby="basic-addon1"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Phone No
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Phone No"
                              aria-label="title"
                              name="phone"
                              maxLength={10}
                              value={data.phone}
                              onChange={handleChange}
                              aria-describedby="basic-addon1"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <div className="form-group with-title mb-3">
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows={3}
                              name="address"
                              value={data.address}
                              maxLength={maxLength}
                              onChange={handleChange}
                              required
                            />
                            <label>Address</label>
                            <div>
                              {maxLength - data.address.length} characters
                              remaining
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-5 w-50 d-block mx-auto"
                      >
                        Update
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

export default EditContactDetails;
