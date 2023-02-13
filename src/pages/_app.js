import { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import ThemeProvider from "theme";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "theme/createEmotionCache";
import { SnackbarProvider } from "notistack";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import AuthProvider from "feature/auth/context";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider initialSession={pageProps.initialSession}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider>
          <CssBaseline />
          <SnackbarProvider
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {getLayout(<Component {...pageProps} />)}
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </AuthProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
