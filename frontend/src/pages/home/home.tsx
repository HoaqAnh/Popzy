import styles from "./home.module.css";
import Hero from "@/features/home/components/hero/hero";
import FeaturedListings from "@/features/home/components/featured/FeaturedListings";
import MarketInsights from "@/features/home/components/insights/MarketInsights";
import SellCTA from "@/features/home/components/cta/SellCTA";
import FeatureTiles from "@/features/home/components/featured/FeatureTiles";
import Footer from "@/features/home/components/footer/Footer";

const Home = () => {
  return (
    <main className={styles.main}>
      <Hero />
      <FeaturedListings />
      <MarketInsights />
      <SellCTA />
      <FeatureTiles />
      <Footer />
    </main>
  );
};

export default Home;
