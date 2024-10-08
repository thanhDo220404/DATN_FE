import Image from "next/image";
import styles from "./page.module.css";
import HomePage from "./trang-chu/page";

export default function Home() {
  return (
    <>
      <div className="text-center">
        <HomePage />
      </div>
    </>
  );
}
