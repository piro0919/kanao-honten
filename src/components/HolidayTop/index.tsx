import dayjs, { Dayjs } from "dayjs";
import { JSX, useMemo } from "react";
import Calendar from "react-calendar";
import styles from "./style.module.scss";

export type HolidayTopProps = {
  holidays: Dayjs[];
};

function HolidayTop({ holidays }: HolidayTopProps): JSX.Element {
  const items = useMemo(
    () =>
      Array(12)
        .fill(undefined)
        .map((_, index) => (
          <li className={styles.item} key={index}>
            <div className={styles.monthWrapper}>{index + 1}</div>
            <Calendar
              calendarType="gregory"
              className={styles.calendar}
              defaultActiveStartDate={dayjs().set("month", index).toDate()}
              formatDay={(_, date): string => `${dayjs(date).date()}`}
              locale="ja"
              navigationLabel={({ date }): string =>
                `${dayjs(date).month() + 1}`
              }
              showNavigation={false}
              showNeighboringMonth={false}
              tileClassName={({ date }): string =>
                `${styles.tile} ${
                  holidays.some((holiday) => holiday.isSame(date))
                    ? styles.holiday
                    : styles.businessDay
                }`
              }
              value={dayjs().toDate()}
              view="month"
            />
          </li>
        )),
    [holidays]
  );

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>{items}</ul>
      <div className={styles.textWrapper}>
        <p>
          日曜、祝日、および福山地方卸売市場の臨時休市日である水曜が休業日となります。
        </p>
      </div>
    </div>
  );
}

export default HolidayTop;
