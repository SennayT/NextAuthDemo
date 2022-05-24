import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";


type Props = AppProps & { session: Session }


function MyApp({Component, pageProps, session}: Props) {
    return <SessionProvider session={session}>
        <Component {...pageProps} />
    </SessionProvider>
}

export default MyApp
