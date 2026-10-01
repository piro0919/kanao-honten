import { Separator } from "@radix-ui/react-separator";
import store, { storeAddressText, toInternationalPhone } from "libs/store";
import { JSX } from "react";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import styles from "./style.module.scss";

function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <div className={styles.title}>
            <small>有限会社</small>
            <span>金尾本店</span>
          </div>
          <div className={styles.inner2}>
            <span>〒{store.address.postalCode}</span>
            <span>{storeAddressText}</span>
          </div>
          <div className={styles.inner2}>
            <div className={styles.inner2}>
              <span>TEL</span>
              <a href={`tel:${toInternationalPhone(store.tel)}`}>{store.tel}</a>
            </div>
            <Separator
              className={styles.separator}
              decorative={true}
              orientation="vertical"
            />
            <div className={styles.inner2}>
              <span>FAX</span>
              <span>{store.fax}</span>
            </div>
          </div>
          <div className={styles.inner2}>
            <div className={styles.inner2}>
              <span>営業時間</span>
              <span>{store.hours.weekday}</span>
            </div>
            <Separator
              className={styles.separator}
              decorative={true}
              orientation="vertical"
            />
            <div className={styles.inner2}>
              <span>水曜営業日</span>
              <span>{store.hours.wednesday}</span>
            </div>
          </div>
          <div className={styles.inner2}>
            <span>休業日</span>
            <span>{store.closedDays}</span>
          </div>
        </div>
        <div className={styles.inner2}>
          <span>&copy; 2022 金尾本店</span>
          <div className={styles.anchorsWrapper}>
            <a
              className={styles.anchor}
              href="https://www.facebook.com/%E6%9C%89%E9%99%90%E4%BC%9A%E7%A4%BE-%E9%87%91%E5%B0%BE%E6%9C%AC%E5%BA%97-524816214285780/"
              rel="noreferrer"
              target="_blank"
            >
              <AiOutlineFacebook color="#333" size={32} />
            </a>
            <a
              className={styles.anchor}
              href="https://www.instagram.com/kanaohonten/?hl=ja"
              rel="noreferrer"
              target="_blank"
            >
              <AiOutlineInstagram color="#333" size={32} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
