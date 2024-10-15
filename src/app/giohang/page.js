import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import bootstrap icons
import "../globals.css";

export default function donhang() {
  return (
    <>
      <div className="container mt-5 kShopping">
      <div className="row">
          {/* Shopping Cart Items */}
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center Shopping-Cart">
              <h4>Shopping Cart</h4>
              <span>Items: 3</span>
            </div>
            <div className="cart-item">
              <div>
                <img src="./images/sp1.jpg" alt="Shirt" />
              </div>
              <div>
                <span>áo thun phong cách<br /><small>áo thun - M</small></span>
              </div>
              <div>
                <input type="number" className="form-control" defaultValue={1} min={1} style={{width: '60px'}} />
              </div>
              <div>€44.00</div>
              <div><a href="#" className="text-danger"><i className="bi bi-trash"></i></a></div> 
            </div>
            <div className="cart-item">
              <div>
                <img src="./images/sp2.jpg" alt="Shirt" />
              </div>
              <div>
                <span>Shirt <br /><small>Cotton T-shirt</small></span>
              </div>
              <div>
                <input type="number" className="form-control" defaultValue={1} min={1} style={{width: '60px'}} />
              </div>
              <div>€44.00</div>
              <div><a href="#" className="text-danger"><i className="bi bi-trash"></i></a></div>
            </div>
            <div className="cart-item">
              <div>
                <img src="./images/sp1.jpg" alt="Shirt" />
              </div>
              <div>
                <span>Shirt <br /><small>Cotton T-shirt</small></span>
              </div>
              <div>
                <input type="number" className="form-control" defaultValue={1} min={1} style={{width: '60px'}} />
              </div>
              <div>€44.00</div>
              <div><a href="#" className="text-danger"><i className="bi bi-trash"></i></a></div> 
            </div>
          </div>
          {/* Summary */}
          <div className="col-md-4">
            <div className="cart-summary">
              <h4>Summary</h4>
              <p>Items: <span className="float-end">€132.00</span></p>
              <p>Shipping: 
                <select className="form-select">
                  <option selected>Standard Delivery - €5.00</option>
                  <option>Express Delivery - €10.00</option>
                </select>
              </p>
              <p>Give code: 
                <input type="text" className="form-control" placeholder="Enter your code" />
              </p>
              <hr />
              <p>Total Price: <span className="float-end">€137.00</span></p>
              <button className="btn btn-dark">Checkout</button>
            </div>
          </div>
        </div>
      </div>

      <script src="/bootstrap/js/bootstrap.bundle.js"></script>
    </>
  );
}
