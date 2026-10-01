import store, { storeAddressText, toInternationalPhone } from "libs/store";
import { JSX } from "react";
import styles from "./style.module.scss";

function AccessTop(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <iframe
        allowFullScreen={false}
        className={styles.iframe}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={store.mapEmbedUrl}
        title={`${store.name}の地図`}
      />
      <div className={styles.listWrapper}>
        <dl className={styles.list}>
          <dt>住所</dt>
          <dd>
            <div>{store.name}</div>
            <div>
              〒{store.address.postalCode} {storeAddressText}
            </div>
          </dd>
          <dt>TEL</dt>
          <dd>
            <a href={`tel:${toInternationalPhone(store.tel)}`}>{store.tel}</a>
          </dd>
          <dt>FAX</dt>
          <dd>{store.fax}</dd>
          <dt>営業時間</dt>
          <dd>
            <div>{store.hours.weekday}</div>
            <div>水曜営業日 {store.hours.wednesday}</div>
          </dd>
          <dt>休業日</dt>
          <dd>{store.closedDays}</dd>
        </dl>
      </div>
    </div>
  );
}

export default AccessTop;
