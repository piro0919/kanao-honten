import Image from "next/image";
import { JSX, useMemo } from "react";
import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./style.module.scss";

type Article = {
  background: string;
  descriptions: string[];
  title: string;
};

export type BusinessContentProps = {
  articles: Article[];
};

function BusinessContent({ articles }: BusinessContentProps): JSX.Element {
  const items = useMemo(
    () =>
      articles.map(({ background, descriptions, title }) => (
        <article className={styles.article} key={title}>
          <Image
            alt={title}
            fill={true}
            quality={100}
            src={background}
            style={{ objectFit: "cover" }}
          />
          <div className={styles.inner}>
            <h2 className={styles.heading2}>{title}</h2>
            <Swiper
              className={styles.swiper}
              loop={true}
              modules={[A11y, Pagination]}
              pagination={{
                clickable: true,
              }}
              slidesPerView={1}
              spaceBetween={0}
            >
              {descriptions.map((description, index) => (
                <SwiperSlide className={styles.swiperSlide} key={index}>
                  <p>{description}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </article>
      )),
    [articles]
  );

  return <div className={styles.wrapper}>{items}</div>;
}

export default BusinessContent;
