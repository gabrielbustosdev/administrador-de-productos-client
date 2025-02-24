import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <>
            <header className="bg-slate-800">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-white text-2xl font-bold">Administrador de productos</h1>
                </div>
            </header>

            <main className="mx-auto mt-10 max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-white shadow-md">
                <Outlet />
            </main>
        </>
    )
}
