import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../Common/Sidebar";
import Header from "../Common/Header";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  function truncateText(text, maxLength) {
    let words = text.split(" ");
    if (words.length <= maxLength) {
      return text;
    }
    return words.slice(0, maxLength).join(" ") + "...";
  }
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/api/getProducts`
      );
      setData(response.data.products);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setData([]);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/admin/deleteProducts`,
        {
          productId,
        }
      );
      toast.success("Product Deleted Successfully!!", {
        autoClose: 1500,
        onClose: () => fetchData(),
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1500,
      });
    }
  };

  const confirmDelete = (productId) => {
    const deleteToastId = toast(
      <div>
        <p>Are you sure you want to delete this product?</p>
        <button
          className="btn btn-primary"
          onClick={() => {
            toast.dismiss(deleteToastId); // Dismiss the confirmation toast
            handleDelete(productId); // Handle delete operation
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
            {loading ? (
              <p className="h3 text-center">Loading...</p>
            ) : data.length > 0 ? (
              data.map((item) => (
                <div className="col mb-4" key={item._id}>
                  <div className="card" style={{ height: "100%" }}>
                    <img
                      className="card-img-top img-fluid"
                      src={`${process.env.REACT_APP_MONGO_BASE_URL}/images/productImage/${item.productImgs[0]}`}
                      alt={item.productImgs[0]}
                      style={{ objectFit: "cover", height: "180px" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h4 className="card-title">{item.productName}</h4>
                      <p className="card-text mb-2 ">
                        {truncateText(item.productDesc, 20)}
                      </p>
                      <p className="card-text">Price: ₹{item.productPrice}</p>
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
                            to={`/editproduct`}
                            state={{ product: item }}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                        </div>
                        <div className="col-3 ">
                          <Link
                            to={"/viewProductEnquiries"}
                            state={{ product: item }}
                            className="btn btn-primary"
                          >
                            Enquiries
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="h3 text-center">No Products</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewProduct;
