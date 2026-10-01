import Image from "next/image";
import { JSX } from "react";
import { useWindowSize } from "usehooks-ts";
import styles from "./style.module.scss";

function TopHeader(): JSX.Element {
  const { height = 0 } = useWindowSize({ initializeWithValue: false });

  return (
    <header className={styles.header} style={{ height: height * 0.9 }}>
      <div className={styles.imageWrapper}>
        <Image
          alt="金尾商店"
          fill={true}
          priority={true}
          quality={100}
          src="/10523987_524818304285571_903885718066498357_n.jpg"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.titleWrapper}>
        <h1 className={styles.heading1}>金尾本店</h1>
        <div className={styles.subTitle}>高級鮮魚特化鮮魚卸</div>
      </div>
    </header>
  );
}

export default TopHeader;
