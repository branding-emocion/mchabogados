"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

const Main = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      {pathname.includes("/Admin") ? (
        <>{children}</>
      ) : (
        <div className="public-site">
          <Header />
          {children}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Main;
