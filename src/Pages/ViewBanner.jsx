import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../Common/Sidebar";
import Header from "../Common/Header";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewBanner() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/api/getBanner`
      );
      setData(response.data.banner);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setData([]);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (bannerId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/admin/deleteBanner`,
        {
          bannerId,
        }
      );
      toast.success("Banner Deleted Successfully!!", {
        autoClose: 1500,
        onClose: () => fetchData(),
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1500,
      });
    }
  };

  const confirmDelete = (bannerId) => {
    const deleteToastId = toast(
      <div>
        <p>Are you sure you want to delete this banner?</p>
        <button
          className="btn btn-primary"
          onClick={() => {
            toast.dismiss(deleteToastId); // Dismiss the confirmation toast
            handleDelete(bannerId); // Handle delete operation
          }}
        >
          Confirm
        </button>
        <button
          className="btn btn-secondary ms-2"
          onClick={() => toast.dismiss(deleteToastId)}
        >
          Cancel
        </button>
      </div>,
      { autoClose: false, closeButton: false, position: "top-center" }
    );
  };

  return (
    <>
      <div id="app" className="d-flex">
        <Sidebar />
        <div id="main" className="flex-grow-1">
          <Header />
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {data.length > 0 ? (
              data.map((item) => (
                <div className="col mb-4" key={item._id}>
                  <div className="card" style={{ height: "100%" }}>
                    <div className="card-body d-flex flex-column">
                      <h4 className="card-title">{item.bannerTitle}</h4>
                      <p className="card-text mb-2 ">{item.bannerDesc}</p>
                      <div className="row mt-auto">
                        <div className="col-3">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => confirmDelete(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                        <div className="col-3 ">
                          <Link
                            to={`/editBanner`}
                            state={{ banner: item }}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="h3 text-center">No Banners</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewBanner;
