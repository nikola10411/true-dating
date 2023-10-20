import PropTypes from "prop-types";
import Head from "next/head";
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import { ThemeProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";

import "./style.css";

import { routes } from "../src/routes";

import AuthProvider from "../src/contexts/AuthProvider";
import NavBar from "../src/components/NavBar";

const CssBaseline = dynamic(() => import('@mui/material/CssBaseline'), {
  ssr: false,
});

// const NavBar = dynamic(() => import('../src/components/NavBar'), {
//   ssr: false,
// });

const Footer = dynamic(() => import('../src/components/Footer'), {
  ssr: false,
});

// const AuthProvider = dynamic(() => import('../src/contexts/AuthProvider'), {
//   ssr: false,
// });

const EventsProvider = dynamic(() => import('../src/contexts/EventsProvider'), {
  ssr: false,
});
const BlogsProvider = dynamic(() => import('../src/contexts/BlogsProvider'), {
  ssr: false,
});
const UsersProvider = dynamic(() => import('../src/contexts/UsersProvider'), {
  ssr: false,
});
const SubscribersProvider = dynamic(() => import('../src/contexts/SubscribersProvider'), {
  ssr: false,
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>TrueDating</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Speed Dating London | Singles Parties | True Dating</title>
        <meta
          name="description"
          content="Explore London's best speed dating with the leading dating site in London. Join our platform to enjoy fantastic London venues for speed Dating London."
        />
        <meta
          name="keywords"
          content="speed Dating, speed Dating London, dating in London, dating site in london, online speed dating, single Parties"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {
            router.pathname == '/' ? (
              <>
                <AuthProvider pathname={router.pathname}>
                  <NavBar />
                </AuthProvider>
                <Component {...pageProps} />
                <Footer />
              </>
            ) : (
              <AuthProvider pathname={router.pathname}>
                {
                  router.pathname.includes('/admin') ? (
                    <EventsProvider>
                      <BlogsProvider>
                        <UsersProvider>
                          <SubscribersProvider>
                            <NavBar />
                            <Component {...pageProps} />
                            <Footer />
                          </SubscribersProvider>
                        </UsersProvider>
                      </BlogsProvider>
                    </EventsProvider>
                  ) : (
                    <>
                      {
                        router.pathname == '/matches' ? (
                          <UsersProvider>
                            <NavBar />
                            <Component {...pageProps} />
                            <Footer />
                          </UsersProvider>
                        ) : router.pathname.includes('/blog') ? (
                          <BlogsProvider>
                            <NavBar />
                            <Component {...pageProps} />
                            <Footer />
                          </BlogsProvider>
                        ) : (
                          <>
                            {![
                              routes.login,
                              routes.signUp,
                              routes.passwordReset,
                            ].includes(router.pathname) && <NavBar />}
                            <Component {...pageProps} />
                            {![
                              routes.login,
                              routes.signUp,
                              routes.passwordReset,
                            ].includes(router.pathname) && <Footer />}
                          </>
                        )
                      }
                    </>
                  )
                }
              </AuthProvider>
            )
          }
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
