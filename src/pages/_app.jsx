import '@/styles/App.sass'
import { AnimatePresence } from 'framer-motion'

import Layout from '@/components/layouts/Layout'
import PopupLayout from '@/components/layouts/PopupLayout'

export default function MyApp({ Component, pageProps, router }) {

  console.log(pageProps)
  return (
      <Component {...pageProps} router={router.asPath}/>
  )
}
