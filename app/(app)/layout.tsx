import Navbar from '@/components/navbar'


export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            <main className="h-full">
                {children}

            </main>

        </>
    )
}
