import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { toast } from "react-toastify";
// Register FilePond plugins
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Initialize FilePond plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();

  const { product } = location.state;

  const [isLoaded, setLoaded] = useState(true);
  const [productData, setProductData] = useState({
    productId: product._id,
    productName: product.productName,
    productPrice: product.productPrice,
    productDesc: product.productDesc,
    productImgs: [],
  });

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (fileItems) => {
    // Convert the FilePond file items array to a regular file array
    const fileArray = fileItems.map((fileItem) => fileItem.file);

    // Store the array of files in state
    setProductData((prevData) => ({
      ...prevData,
      productImgs: fileArray,
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    setLoaded(false);

    const data = new FormData();

    // Append each file to the FormData object
    productData.productImgs.forEach((file, index) => {
      data.append(`productImgs`, file);
    });

    // Append other data fields to the FormData object
    for (const key in productData) {
      if (key !== "productImgs") {
        data.append(key, productData[key]);
      }
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/admin/EditProducts`,
        data
      );

      if (response.data.success) {
        toast.success("Product Edited Successfully!!", {
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
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Product Name
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Product Name"
                              name="productName"
                              onChange={handleProductChange}
                              value={productData.productName}
                              aria-describedby="basic-addon1"
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
                            />
                            <span className="input-group-text">.00</span>
                          </div>
                        </div>
                        <div>
                          <div className="form-group with-title mb-3">
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows={3}
                              defaultValue={""}
                              onChange={handleProductChange}
                              name="productDesc"
                              value={productData.productDesc}
                            />
                            <label>Product Description</label>
                          </div>
                        </div>
                        <h5 className="card-title">Product Images</h5>
                        <p>Select maximum 3 Images</p>
                        <FilePond
                          allowMultiple
                          types={["image/*"]}
                          maxFiles={3}
                          name="productImgs"
                          credits={false}
                          className="multiple-files-filepond"
                          onupdatefiles={handleFileChange} // Make sure this is correctly set
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

export default EditProduct;
