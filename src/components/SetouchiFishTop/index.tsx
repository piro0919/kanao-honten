import dayjs from "dayjs";
import Image from "next/image";
import { JSX, useMemo } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { useWindowSize } from "usehooks-ts";
import styles from "./style.module.scss";

type Fish = {
  description?: string;
  name: string;
  seasons: number[];
  thumbnail?: string;
};

export type SetouchiFishTopProps = {
  fishes: Fish[];
};

function SetouchiFishTop({ fishes }: SetouchiFishTopProps): JSX.Element {
  const { width = 0 } = useWindowSize({ initializeWithValue: false });
  const currentMonth = useMemo(() => dayjs().get("month") + 1, []);
  const allMonth = useMemo(
    () =>
      Array(12)
        .fill(undefined)
        .map(
          (_, index) =>
            index + currentMonth - (index + currentMonth > 12 ? 12 : 0)
        ),
    [currentMonth]
  );
  const items = useMemo(
    () =>
      fishes
        .sort(({ seasons: seasonsA }, { seasons: seasonsB }) => {
          const indexA = allMonth.findIndex((month) =>
            seasonsA.includes(month)
          );
          const indexB = allMonth.findIndex((month) =>
            seasonsB.includes(month)
          );

          if (indexA === indexB) {
            if (seasonsA[0] === seasonsB[0]) {
              return seasonsA[seasonsA.length - 1] >
                seasonsB[seasonsB.length - 1]
                ? 1
                : -1;
            }

            return seasonsA[0] > seasonsB[0] ? 1 : -1;
          }

          return indexA > indexB ? 1 : -1;
        })
        .map(({ description, name, seasons, thumbnail }) => (
          <VerticalTimelineElement
            contentArrowStyle={{
              background: "#333",
              border: 0,
              height: "1px",
              width: width >= 1170 ? "14%" : "40px",
            }}
            date={`${dayjs()
              .startOf("month")
              .set("month", seasons[0] - 1)
              .format("M月")} 〜 ${dayjs()
              .startOf("month")
              .set("month", seasons[seasons.length - 1] - 1)
              .format("M月")}`}
            dateClassName={styles.date}
            iconClassName={styles.icon}
            key={`${name}${seasons[0]}`}
            textClassName={styles.verticalTimelineElement}
          >
            <div className={styles.inner}>
              {thumbnail ? (
                <div className={styles.imageWrapper}>
                  <Image
                    alt={name}
                    fill={true}
                    quality={100}
                    src={thumbnail}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : null}
              <div className={styles.textsWrapper}>
                <div className={styles.topWrapper}>
                  {seasons.includes(currentMonth) ? (
                    <Image
                      alt="今が旬"
                      height={64}
                      src="/2607726.png"
                      width={64}
                    />
                  ) : null}
                  <span className={styles.name}>{name}</span>
                </div>
                {description ? (
                  <p className={styles.description}>{description}</p>
                ) : null}
              </div>
            </div>
          </VerticalTimelineElement>
        )),
    [allMonth, currentMonth, fishes, width]
  );

  return (
    <div className={styles.wrapper}>
      <VerticalTimeline
        animate={false}
        className={styles.verticalTimeline}
        lineColor="#333"
      >
        {items}
      </VerticalTimeline>
    </div>
  );
}

export default SetouchiFishTop;
