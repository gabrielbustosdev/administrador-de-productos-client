import { Link, useLoaderData, ActionFunctionArgs } from 'react-router-dom'
import { getProducts, updateProductAvailability } from '../services/ProductService'
import ProductDetails from '../components/ProductDetails'
import type { Product } from '../types'

export async function loader() {
    const products = await getProducts()
    return products
}

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    await updateProductAvailability(+data.id)

    return {}
}

export default function Products() {
    const products = useLoaderData() as Product[];
    
    if (!products) {
        window.location.reload()
        return (
            <div className="fixed top-0 left-0 w-full h-full bg-white/95 flex justify-center items-center z-[1000]">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-5 mx-auto"></div>
                    <p className="text-gray-800 text-lg mb-4">Cargando productos...</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-2xl font-black text-slate-500">Productos</h2>
                <Link
                    to="productos/nuevo"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                >
                    Agregar producto
                </Link>
            </div>
            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <ProductDetails
                                key={product.id}
                                product={product}
                            />
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}
