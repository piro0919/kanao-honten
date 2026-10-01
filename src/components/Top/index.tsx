import Navigation from "components/Navigation";
import TopHeader from "components/TopHeader";
import Image from "next/image";
import { JSX, useMemo } from "react";
import styles from "./style.module.scss";

type Article = {
  description: string;
  thumbnail: string;
  title: string;
};

export type TopProps = {
  articles: Article[];
};

function Top({ articles }: TopProps): JSX.Element {
  const items = useMemo(
    () =>
      articles.map(({ description, thumbnail, title }) => (
        <article className={styles.article} key={title}>
          <div className={styles.imageWrapper}>
            <Image
              alt={title}
              fill={true}
              quality={100}
              src={thumbnail}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.textsWrapper}>
            <h2 className={styles.heading2}>{title}</h2>
            <p className={styles.paragraph}>{description}</p>
          </div>
        </article>
      )),
    [articles]
  );

  return (
    <div>
      <TopHeader />
      <aside className={styles.navigationWrapper}>
        <Navigation />
      </aside>
      <main className={styles.main}>
        <div className={styles.inner}>{items}</div>
      </main>
    </div>
  );
}

export default Top;
