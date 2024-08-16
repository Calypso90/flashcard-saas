import Footer from "./components/Footer";
import getStripe from "./utils/get-stripe";

export default function Home() {
  return (
    <>
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Flash Wave</h1>
        <p className="text-xl mb-8"></p>
      </section>
      <div className="flex items-center justify-center fixed bottom-0 w-full py-4">
        <Footer />
      </div>
    </>
  );
}
