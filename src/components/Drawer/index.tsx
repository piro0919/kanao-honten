import useNavigations from "hooks/useNavigations";
import Link from "next/link";
import { useRouter } from "next/router";
import { ComponentProps, JSX, useMemo } from "react";
import ReactModernDrawer from "react-modern-drawer";
import styles from "./style.module.scss";

export type DrawerProps = Pick<
  ComponentProps<typeof ReactModernDrawer>,
  "onClose" | "open"
>;

function Drawer({ onClose, open }: DrawerProps): JSX.Element {
  const { pathname } = useRouter();
  const navigations = useNavigations();
  const items = useMemo(
    () =>
      navigations.map(({ href, title }) => (
        <li key={href}>
          <Link
            className={pathname === href ? styles.active : ""}
            href={href}
            onClick={onClose}
          >
            {title}
          </Link>
        </li>
      )),
    [navigations, onClose, pathname]
  );

  return (
    <ReactModernDrawer
      className={styles.drawer}
      direction="left"
      onClose={onClose}
      open={open}
    >
      <nav>
        <ul className={styles.list}>{items}</ul>
      </nav>
    </ReactModernDrawer>
  );
}

export default Drawer;
