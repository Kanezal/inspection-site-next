'use client'

import { SessionProvider } from 'next-auth/react'

// export const metadata = {
//     title: 'Inspection',
//     description: 'Создано Trooper',
// }

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <body>
                <main>
                    <SessionProvider>
                        {children}
                    </SessionProvider>
                </main>
            </body>
        </html>
    )
}
