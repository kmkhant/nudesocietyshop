import "../styles/globals.css";
import "../styles/tabs.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { StateContext } from "../context/StateContext";
import Router from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import "../styles/nprogress.css";
import Script from "next/script";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () =>
	NProgress.start()
);
Router.events.on("routeChangeComplete", () =>
	NProgress.done()
);
Router.events.on("routeChangeError", () =>
	NProgress.done()
);

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<StateContext>
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-X9M2TW92DQ"
				strategy="afterInteractive"
			/>
			<Script
				id="google-analytics"
				strategy="afterInteractive"
			>
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-X9M2TW92DQ');
        `}
			</Script>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</StateContext>
	);
}

export default MyApp;
