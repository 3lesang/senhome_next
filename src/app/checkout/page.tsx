import Footer from "@/components/footer";
import Header from "@/components/header";
import Checkout from "./checkout";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-background flex-1 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Checkout />
        </div>
      </div>
      <Footer />
    </div>
  );
}
