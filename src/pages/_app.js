import { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import ThemeProvider from "theme";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "theme/createEmotionCache";
import { SnackbarProvider } from "notistack";
import AuthProvider from "feature/auth/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider initialSession={pageProps.initialSession}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </AuthProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
