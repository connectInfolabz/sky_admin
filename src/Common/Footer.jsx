import React from "react";

function Footer() {
  return (
    <footer className="fixed-bottom py-3">
      <div className="container">
        <div className="footer clearfix text-muted">
          <div className="float-start">
            <p>2023 © Mazer</p>
            <p>
              Crafted with{" "}
              <span className="text-danger">
                <i className="bi bi-heart-fill icon-mid" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
