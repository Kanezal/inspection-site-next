export const metadata = {
    title: 'Inspection',
    description: 'Создано Trooper',
}

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <body>
                {children}
            </body>
        </html>
    )
}
