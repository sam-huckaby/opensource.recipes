import { ReactNode, FC } from "react";
import Footer from "./Footer";
import Header from "./Header";

type HeaderProps = {
	children: ReactNode;
};

export const Layout: FC<HeaderProps> = ({ children }: HeaderProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout;
