import { useEffect, useState } from "react"

function ListItems() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchItems = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/items")
            const data = await res.json()
            setItems(Array.isArray(data) ? data : [])
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => { fetchItems() }, [])

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">List Items</h1>
                <button onClick={fetchItems} className="cursor-pointer">Refresh</button>
            </div>

            {loading ? (
                <p>Loading…</p>
            ) : (
                <div className="grid gap-2">
                    {items.map((it) => (
                        <div key={it.id} className="p-3 ring-1 ring-gray-200 rounded-lg">
                            <div className="font-semibold text-end">{it.type}</div>
                            <div className="font-semibold">{it.name}</div>

                            {it.type === "product" && it.price !== "" && it.price != null && (
                                <div className="text-sm">price: {it.price}</div>
                            )}

                            <div className="text-xs text-gray-500">createdAt: {it.createdAt}</div>

                            {Array.isArray(it.images) && it.images.length > 0 && (
                                <div className="mt-2 grid grid-cols-3 gap-2">
                                    {it.images.map((url, idx) => (
                                        <img
                                            key={idx}
                                            src={url?.replace("/upload/", "/upload/f_auto,q_auto,c_fill,w_300,h_300/")}
                                            alt={`${it.name}-${idx}`}
                                            className="w-full h-24 object-cover rounded"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {items.length === 0 && <p className="text-gray-500">No items</p>}
                </div>
            )}
        </div>
    )
}

export default ListItems
