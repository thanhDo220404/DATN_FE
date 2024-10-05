// import "../../public/bootstrap/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Container from "./components/container";

export const metadata = {
  title: "Dreamers",
  description: "Dreamers fashion's store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header></Header>
        <Container>{children}</Container>
        <Footer></Footer>
        <script src="/bootstrap/js/bootstrap.bundle.js"></script>
      </body>
    </html>
  );
}
