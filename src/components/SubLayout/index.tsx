import Navigation from "components/Navigation";
import SubHeader from "components/SubHeader";
import { JSX, ReactNode } from "react";
import styles from "./style.module.scss";

export type SubLayoutProps = {
  children: ReactNode;
  heading: string;
};

function SubLayout({ children, heading }: SubLayoutProps): JSX.Element {
  return (
    <div>
      <SubHeader heading={heading} />
      <aside className={styles.navigationWrapper}>
        <Navigation />
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default SubLayout;
