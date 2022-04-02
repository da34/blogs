import Header from './Header/index'
import Footer from './Footer'
import AppMain from './AppMain';
export default function Layout(pageProps) {
  return (
    <>
      <Header />
      <AppMain {...pageProps} />
      <Footer />
    </>
  )
}