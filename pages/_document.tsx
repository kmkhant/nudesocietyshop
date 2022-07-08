// pages/_document.js
import {
	Html,
	Head,
	Main,
	NextScript,
} from "next/document";

import Script from "next/script";

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap"
					rel="stylesheet"
				/>
				<link rel="apple-touch-icon" href="/logo.png" />
				<link rel="icon" href="/favicon.png" />
			</Head>
			<body>
				<Main />
				<NextScript />
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
			</body>
		</Html>
	);
}
