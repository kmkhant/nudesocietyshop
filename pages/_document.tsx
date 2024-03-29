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
			</body>
		</Html>
	);
}
