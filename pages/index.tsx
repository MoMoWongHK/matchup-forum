import type {GetStaticPropsContext, NextPage} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useSelector } from "react-redux";
import { isAuth } from "../utils/utiltyHelper";
import {useTranslation} from "next-i18next";

const Home: NextPage = () => {
    const { t } = useTranslation("common");
      const auth = useSelector((state: any) => {
        return state.LoginManager.auth;
      });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{isAuth(auth) ? "welcome back" : "hello world"}
          <span>{t(`BottomAppBar.homepage`)}</span>

      </main>
    </>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await serverSideTranslations(locale || "en", ["common"])),
        }, // will be passed to the page component as props
    };
}

export default Home;
