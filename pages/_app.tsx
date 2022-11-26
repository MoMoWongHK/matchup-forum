import "../styles/globals.css";
import React, { useLayoutEffect } from "react";
import type { AppProps } from "next/app";
import { useDispatch, useSelector, useStore } from "react-redux";
import { wrapper } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Header } from "../components/Header";
import {
  NavButtonGroup,
  NavButtonGroupDir,
} from "../components/NavButtonGroup";
import { Footer } from "../components/Footer";
import { ForumCate } from "../components/ForumCate";
import { appWithTranslation } from "next-i18next";
import { SUPPORTED_REDUX_FUNCTIONS } from "../redux/SUPPORTED_REDUX_FUNCTION";
import { ModalProvider } from "../provider/ModalProvider";
import "../config/i18n";

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore();
  const dispatch = useDispatch();
  const p = persistStore(store);

  useLayoutEffect(() => {
    function updateSize() {
      dispatch({
        type: SUPPORTED_REDUX_FUNCTIONS.SET_SCREEN_WIDTH,
        screenWidth: window.innerWidth,
      });
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <PersistGate persistor={p} loading={<></>}>
      <ModalProvider />
      <main>
        <header>
          <Header />
        </header>
        <div className="md:grid" style={{ gridTemplateColumns: "200px auto" }}>
          <div className="hidden md:inline-block mt-15">
            {/* forum cate*/}
            <div>
              <ForumCate />
            </div>
          </div>
          <div
            className="w-full min-h-1/2 mt-2 mx-auto overflow-x-hidden overflow-y-scroll"
            style={{ maxHeight: "calc( 100vh - 80px)" }}
          >
            <Component {...pageProps} />
          </div>
        </div>
        <footer>
          <div className="lg:hidden fixed bottom-0 w-screen">
            <NavButtonGroup dir={NavButtonGroupDir.ROW} />
          </div>
          <Footer />
        </footer>
      </main>
    </PersistGate>
  );
}

export default wrapper.withRedux(appWithTranslation(MyApp));
