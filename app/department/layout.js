'use client'

import { SessionProvider } from 'next-auth/react'
import { useSession, signIn, signOut } from 'next-auth/react'

// export const metadata = {
//     title: 'Inspection',
//     description: 'Создано Trooper',
// }

export default function DepartmentLayout({ children }) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (session) {
        return (
            <div>            
                <button onClick={() => signOut()}>Sign out</button>
                {children}
            </div>
        );
    } else {
        return (
            <div>
                Not authenticated 
                <button onClick={() => signIn()}>Sign in</button>
            </div>
        );
    }
}
