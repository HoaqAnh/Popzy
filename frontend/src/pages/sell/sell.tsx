import styles from "./sell.module.css";
import SellHero from "@/features/sell/components/SellHero";
import SellFeatures from "@/features/sell/components/SellFeatures";

const Sell = () => {
  return (
    <div className={styles.pageWrapper}>
      <SellHero />
      <SellFeatures />
    </div>
  );
};

export default Sell;
