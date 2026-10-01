import NoSSR from "@mpth/react-no-ssr";
import Drawer from "components/Drawer";
import Footer from "components/Footer";
import noScroll from "no-scroll";
import { ReactNode, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useBoolean, useWindowSize } from "usehooks-ts";
import styles from "./style.module.scss";

export type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps): JSX.Element {
  const { height = 0 } = useWindowSize({ initializeWithValue: false });
  const {
    setFalse: offIsOpen,
    setTrue: onIsOpen,
    value: isOpen,
  } = useBoolean();

  useEffect(() => {
    if (isOpen) {
      noScroll.on();

      return;
    }

    noScroll.off();
  }, [isOpen, offIsOpen, onIsOpen]);

  return (
    <>
      <div className={styles.wrapper} style={{ minHeight: height }}>
        <div>{children}</div>
        <Footer />
        <button className={styles.button} onClick={onIsOpen}>
          <AiOutlineMenu color="#333" size={32} />
        </button>
      </div>
      <div className={styles.drawerWrapper}>
        <NoSSR>
          <Drawer onClose={offIsOpen} open={isOpen} />
        </NoSSR>
      </div>
    </>
  );
}

export default Layout;
