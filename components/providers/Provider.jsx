'use client'

import { SessionProvider } from "next-auth/react";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

export default function NextAuthProvider({children}) {
  return <SessionProvider>{children}</SessionProvider>
}