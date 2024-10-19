import Menu from "./components/menu";

export const metadata = {
  title: "Admin",
  description: "this is admin layout",
};

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="row w-100">
        <div className="col-md-2">
          <Menu></Menu>
        </div>
        <div className="col-md-10 bg-body-secondary">{children}</div>
      </div>
    </>
  );
}
