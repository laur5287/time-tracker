import Navbar from '@/components/navbar'
import { ThemeProvider } from "@/components/theme-provider"


export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <ThemeProvider>
                <Navbar />
                <main className="h-full">
                    {children}

                </main>
            </ThemeProvider>

        </>
    )
}
