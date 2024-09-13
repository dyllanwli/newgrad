import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import { ClerkProvider } from '@clerk/clerk-react'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

export default function RootLayout() {
    const navigate = useNavigate();

    return (
        <ClerkProvider
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => navigate(to, { replace: true })}
            publishableKey={PUBLISHABLE_KEY}
        >
            <Header />
            <main>
                <Outlet />
            </main>
        </ClerkProvider>
    )
}