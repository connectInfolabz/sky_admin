import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../Common/Sidebar";
import Header from "../Common/Header";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewCategory() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/api/viewCategories`
      );
      setData(response.data.categories);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setData([]);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/admin/deleteCategories`,
        {
          categoryId,
        }
      );
      toast.success("Category Deleted Successfully!!", {
        autoClose: 1500,
        onClose: () => fetchData(),
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1500,
      });
    }
  };

  const confirmDelete = (categoryId) => {
    const deleteToastId = toast(
      <div>
        <p>Are you sure you want to delete this banner?</p>
        <button
          className="btn btn-primary"
          onClick={() => {
            toast.dismiss(deleteToastId); // Dismiss the confirmation toast
            handleDelete(categoryId); // Handle delete operation
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
                    <img
                      className="card-img-top img-fluid"
                      src={`${process.env.REACT_APP_MONGO_BASE_URL}/images/categoryImage/${item.categoryImg}`}
                      alt={item.categoryImg}
                      style={{ objectFit: "cover", height: "180px" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h4 className="card-title">{item.categoryName}</h4>
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
                            to={`/editCategory`}
                            state={{ category: item }}
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
              <p className="h3 text-center">No Category</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewCategory;
