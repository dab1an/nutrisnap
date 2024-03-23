// src/pages/_document.tsx
import Document, { Head, Html, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Link to the manifest.json */}
          <link rel='manifest' href='/manifest.json' />
          {/* Add any other meta tags or links you need */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
