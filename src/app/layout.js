// import "../../public/bootstrap/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/main";

export const metadata = {
  title: "Dreamers",
  description: "Dreamers fashion's store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header></Header>
        <Main>{children}</Main>
        <Footer></Footer>
        <script src="/bootstrap/js/bootstrap.bundle.js"></script>
        <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
      </body>
    </html>
  );
}
