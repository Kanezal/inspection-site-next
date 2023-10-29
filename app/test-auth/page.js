'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (session) {
        const { user } = session;

        // Доступ к данным пользователя, указанным в scope
        console.log(user);

        // Отобразить данные пользователя на странице
        return (
            <>
                <p>Welcome, {user.idn} {user.rank} {user.callSign}!</p>
                <p>Avatar: <img src={user.image} alt="Avatar" /></p>
                <button onClick={() => signOut()}>Sign out</button>
            </>
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