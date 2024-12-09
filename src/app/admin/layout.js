import Menu from "./components/menu";

import "../admin-main.css";

export const metadata = {
  title: "Admin",
  description: "this is admin layout",
};

export default function AdminLayout({ children }) {
  return (
    <>
      <Menu></Menu>
      <main className="app-content overflow-auto">{children}</main>
    </>
  );
}
