import { formatPrice } from "@/utils/format";
import styles from "./PropertyHeader.module.css";

type Props = {
  title: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  address: string;
};

const PropertyHeader = ({
  title,
  price,
  beds,
  baths,
  area,
  address,
}: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.price}>
        {formatPrice(price)}
        <div className={styles.mainSpecs}>
          <span>{beds}</span> PN &nbsp;
          <span>{baths}</span> PT &nbsp;
          <span>{area}</span> m²
        </div>
      </div>
      <div className={styles.address}>{address}</div>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};

export default PropertyHeader;
