export default function Resign() {
  return (
    <>
      <div className="row m-auto w-100 text-center">
        <div className="col border border-dark p-5">
          <h1>Đăng ký</h1>
          <form action="">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              ></input>
              <label for="floatingInput">Email</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingPhoneNumber"
                placeholder="Password"
              ></input>
              <label for="floatingPhoneNumber">Số điện thoại</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
              ></input>
              <label for="floatingPassword">Password</label>
            </div>
            <button
              type="submit"
              className="w-100 py-3 rounded mb-3"
              style={{ backgroundColor: "#FFE08B", color: "#324B4D" }}
            >
              Tạo tài khoản
            </button>
          </form>
          <div className="row mb-3">
            <div className="col">
              <hr />
            </div>
            <div className="col-auto text-secondary">or</div>
            <div className="col">
              <hr />
            </div>
          </div>
          <a type="submit" className="w-100 py-3 rounded mb-3 border border">
            Tôi đã có tài khoản
          </a>
        </div>
        <div className="col border border-dark">
          <img src="/images/logo4x.png" alt="" className="w-50 m-auto" />
        </div>
      </div>
    </>
  );
}
