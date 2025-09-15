import CartInfo from "@/app/cart/cart-info";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <CartInfo />
      <Footer />
    </div>
  );
}
