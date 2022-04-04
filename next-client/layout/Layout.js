import Header from './Header/index'
import Footer from './Footer'
import AppMain from './AppMain';
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicBackTop = dynamic(
  () => import('components/base/BackTop/index'),
  {ssr: false}
)

export default function Layout(pageProps) {
  return (
    <>
      <Head>
        <title>玉捷</title>
        <meta name="description" content="前端萌新 | 努力奋斗 | 开源 | 玉捷 | 玉捷code" />
        <meta name="keywords" content="玉捷 | 玉捷code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="images/favicon.ico" />
      </Head>
      <Header />
      <AppMain {...pageProps} />
      <Footer />
      <DynamicBackTop />
    </>
  )
}