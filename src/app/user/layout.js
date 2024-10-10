import Menu from "./components/menu";

export default function RootLayout({ children }) {
  return (
    <>
      <div className="container m-auto my-5">
        <div className="row">
          <div className="col col-lg-auto">
            <Menu></Menu>
          </div>
          <div className="col">{children}</div>
        </div>
      </div>
    </>
  );
}
