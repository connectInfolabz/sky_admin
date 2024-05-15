// Import the useState hook to manage state
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { toast } from "react-toastify";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function AddProduct() {
  const navigate = useNavigate();

  const [isLoaded, setLoaded] = useState(true);
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: "",
    productDesc: "",
    productImgs: [],
    categoryId: "", // New state to store the selected category ID
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories when the component mounts
    axios
      .post(`${process.env.REACT_APP_MONGO_BASE_URL}/api/viewCategories`)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (fileItems) => {
    const fileArray = fileItems.map((fileItem) => fileItem.file);
    setProductData((prevData) => ({
      ...prevData,
      productImgs: fileArray,
    }));
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setProductData((prevData) => ({
      ...prevData,
      categoryId: categoryId,
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    setLoaded(false);

    const data = new FormData();

    productData.productImgs.forEach((file, index) => {
      data.append(`productImgs`, file);
    });

    for (const key in productData) {
      if (key !== "productImgs") {
        data.append(key, productData[key]);
      }
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/admin/addProducts`,
        data
      );

      if (response.data.success) {
        toast.success("Product Added Successfully!!", {
          autoClose: 1500,
          onClose: () => navigate("/viewProduct"),
        });
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error(error.response.data.message, {
        autoClose: 1500,
      });
    } finally {
      setLoaded(true);
    }
  };

  return (
    <>
      <div id="app">
        <Sidebar />
        <div id="main">
          <Header />
          <div className="page-heading">
            <h3>Add Product</h3>
          </div>
          <div className="page-content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content">
                    <form
                      className="card-body"
                      encType="multipart/form-data"
                      onSubmit={handleProductSubmit}
                    >
                      <div className="row">
                        <div className="col-lg-6 mb-1">
                          <div className="input-group mb-3">
                            <span className="input-group-text">
                              Product Name
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Product Name"
                              name="productName"
                              onChange={handleProductChange}
                              value={productData.productName}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mb-1">
                          <div className="input-group mb-3">
                            <span className="input-group-text">₹</span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Product Price"
                              name="productPrice"
                              onChange={handleProductChange}
                              value={productData.productPrice}
                              required
                            />
                            <span className="input-group-text">.00</span>
                          </div>
                        </div>

                        <div className="col-lg-6 mb-3">
                          <select
                            className="form-select"
                            onChange={handleCategoryChange}
                            value={productData.categoryId}
                            required
                          >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <div className="form-group with-title mb-3">
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows={3}
                              onChange={handleProductChange}
                              name="productDesc"
                              value={productData.productDesc}
                              required
                            />
                            <label>Product Description</label>
                          </div>
                        </div>

                        <h5 className="card-title">Product Images</h5>
                        <p>Select maximum 4 Images</p>
                        <FilePond
                          allowMultiple
                          types={["image/*"]}
                          maxFiles={4}
                          name="productImgs"
                          credits={false}
                          className="multiple-files-filepond"
                          onupdatefiles={handleFileChange}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-5 w-50 d-block mx-auto"
                        disabled={!isLoaded}
                      >
                        {isLoaded ? "Submit" : "Loading..."}
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

export default AddProduct;
