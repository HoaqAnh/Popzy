import Hero from "@/features/home/components/hero/hero";
import styles from "./home.module.css";
import CardRow from "@/features/home/components/card/CardRow";
import FeatureTiles from "@/features/home/components/feature/FeatureTiles";
import Footer from "@/features/home/components/footer/Footer";

const Home = () => {
  return (
    <main className={styles.main}>
      <Hero />
      <CardRow />
      <FeatureTiles />
      <Footer />
    </main>
  );
};

export default Home;
