import React, { useState } from "react";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function EditCategory() {
  const location = useLocation();
  const category = location.state?.category || {};
  const [data, setData] = useState({
    categoryId: category._id || "",
    categoryName: category.categoryName || "",
    categoryImg: null,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpdate = (files) => {
    setData((prevData) => ({
      ...prevData,
      categoryImg: files.length > 0 ? files[0].file : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/admin/editCategories`,
        formData
      );
      if (response.data.success) {
        toast.success("Category Edited Successfully!!", {
          autoClose: 1500,
          onClose: () => navigate("/viewCategory"),
        });
      } else {
        toast.error("Category Not Edited!!", {
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong", {
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
            <h3>Edit Category</h3>
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
                        <div className="col-lg-12 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Category Name
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Category Title"
                              aria-label="title"
                              name="categoryName"
                              onChange={handleChange}
                              value={data.categoryName}
                              aria-describedby="basic-addon1"
                            />
                          </div>
                        </div>
                        <h5 className="card-title">Category Image</h5>
                        <FilePond
                          name="categoryImg"
                          credits={false}
                          className="single-file-filepond"
                          allowMultiple={false}
                          onupdatefiles={handleFileUpdate}
                        />
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

export default EditCategory;
