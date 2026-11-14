import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import ReservationSection from './components/ReservationSection';
import ReviewsSection from './components/ReviewsSection';
import LocationContact from './components/LocationContact';
import Footer from './components/Footer';
import OrderCartModal from './components/OrderCartModal';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] selection:bg-amber-600 selection:text-white font-sans">
        {/* Navigation Bar */}
        <Navbar />

        <main>
          <Hero onOpenReserve={() => {
            const el = document.getElementById('reserve');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} />

          <MenuSection />

          <ReservationSection />

          <ReviewsSection />

          <LocationContact />
        </main>

        <Footer />

        <OrderCartModal />
      </div>
    </CartProvider>
  );
}
