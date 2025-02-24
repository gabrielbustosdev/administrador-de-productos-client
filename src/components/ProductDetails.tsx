import { Form, useNavigate, ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom'
import type { Product } from '../types'
import { formatCurrency } from '../utils'
import { deleteProduct } from '../services/ProductService'

type ProductDetailsProps = {
    product: Product
}

export async function action({ params }: ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteProduct(+params.id)
    }
    return redirect('/')
}

export default function ProductDetails({ product }: ProductDetailsProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailability = product.availability ? 'Disponible' : 'No disponible'

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="post">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${product.availability ? 'text-black border-black-300' : 'text-red-600 border-red-600'} 
                        rounded-lg p-2 text-xs uppercase font-bold text-center hover:cursor-pointer w-full
                        border 
                        `}
                    >
                        {isAvailability}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className="rounded-lg bg-indigo-600 text-white w-full
                         p-2 uppercase font-bold text-xs text-center cursor-pointer"
                    >
                        Editar
                    </button>
                    <Form
                        className="w-full"
                        method="post"
                        action={`/productos/${product.id}/eliminar`}
                        onSubmit={(e) => {
                            if (!confirm('¿Estás seguro de querer eliminar este producto?')) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input
                            type="submit"
                            value="Eliminar"
                            className="rounded-lg bg-red-600 text-white w-full
                             p-2 uppercase font-bold text-xs text-center cursor-pointer"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}
