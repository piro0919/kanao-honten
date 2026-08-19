import HolidayTop, { HolidayTopProps } from "components/HolidayTop";
import Layout from "components/Layout";
import Seo from "components/Seo";
import SubLayout from "components/SubLayout";
import { Entry } from "contentful";
import dayjs, { Dayjs } from "dayjs";
import client from "libs/client";
import { GetStaticProps } from "next";
import { ReactElement, useMemo } from "react";

export type HolidayProps = {
  calendarItems: Entry<Contentful.ICalendarFields>[];
};

function Holiday({ calendarItems }: HolidayProps): JSX.Element {
  const { sundays, wednesdays } = useMemo(() => {
    let date = dayjs().startOf("year");
    let sundays: Dayjs[] = [];
    let wednesdays: Dayjs[] = [];

    do {
      if (date.day() === 0) {
        sundays = [...sundays, date];
      }

      if (date.day() === 3) {
        wednesdays = [...wednesdays, date];
      }

      date = date.add(1, "day");
    } while (date.year() === dayjs().year());

    return { sundays, wednesdays };
  }, []);
  const holidays = useMemo<HolidayTopProps["holidays"]>(
    () =>
      [
        ...sundays,
        ...wednesdays,
        ...calendarItems
          .filter(({ fields: { isHoliday } }) => isHoliday)
          .map(({ fields: { date } }) => dayjs(date)),
      ].filter(
        (date) =>
          !calendarItems
            .filter(({ fields: { isHoliday } }) => !isHoliday)
            .some(({ fields: { date: fieldDate } }) =>
              date.isSame(fieldDate, "date")
            )
      ),
    [calendarItems, sundays, wednesdays]
  );

  return (
    <>
      <Seo
        description="有限会社 金尾本店の休業日をカレンダーでご案内します。通常は水曜・日曜・祝日が休業日です。"
        title="休業日"
      />
      <HolidayTop holidays={holidays} />
    </>
  );
}

Holiday.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return (
    <Layout>
      <SubLayout heading="休業日">{page}</SubLayout>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<HolidayProps> = async () => {
  const { items: calendarItems } =
    await client.getEntries<Contentful.ICalendarFields>({
      content_type: "calendar" as Contentful.CONTENT_TYPE,
    });

  return {
    props: {
      calendarItems,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Holiday;
