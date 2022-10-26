import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useStore } from "react-redux";
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

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore();

  const p = persistStore(store);
  return (
    <PersistGate persistor={p} loading={<></>}>
      <main>
        <header>
          <Header />
        </header>
        <div className="lg:grid" style={{ gridTemplateColumns: "300px auto" }}>
          <div className="hidden lg:inline-block mt-15">
            {/* forum cate*/}
            <div>
              <ForumCate />
            </div>
            <NavButtonGroup dir={NavButtonGroupDir.COL} />
          </div>
          <div
            className="w-full min-h-1/2 mt-2 mx-auto overflow-x-hidden overflow-y-scroll"
            style={{ maxHeight: "calc( 100vh - 150px)" }}
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
