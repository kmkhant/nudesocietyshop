import "../styles/globals.css";
import "../styles/tabs.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { StateContext } from "../context/StateContext";
import Router from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import "../styles/nprogress.css";

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
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</StateContext>
	);
}

export default MyApp;
