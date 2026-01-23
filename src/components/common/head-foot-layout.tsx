import Footer from "@/lms-pages/landing-page/Footer";
import Navbar from "@/lms-pages/landing-page/NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const HeadFootLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
};

export default HeadFootLayout;
