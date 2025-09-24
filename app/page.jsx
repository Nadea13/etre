"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function Page() {
    const [collectionDrop, setCollectionDrop] = useState(false)
    const [products, setItems] = useState([])
    const [collections, setCollections] = useState([])
    const [activeColl, setActiveColl] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const params = useSearchParams()
    const [q, setQ] = useState(params.get("q") || "")
    const [showSearch, setShowSearch] = useState(Boolean(params.get("q")))
    const inputRef = useRef(null)

    useEffect(() => {
        const t = setTimeout(() => {
            const p = new URLSearchParams(window.location.search)
            if (q.trim()) p.set("q", q.trim())
            else p.delete("q")
            router.replace(`?${p.toString()}`, { scroll: false })
        }, 300)
        return () => clearTimeout(t)
    }, [q, router])

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
                e.preventDefault()
                setShowSearch(true)
                setTimeout(() => inputRef.current?.focus(), 0)
            }
            if (e.key === "Escape") {
                setShowSearch(false)
                setQ("")
            }
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    const thumb = (url, w = 400, h = 533) =>
        url?.includes("/upload/")
            ? url.replace("/upload/", `/upload/f_auto,q_auto,c_fill,w_${w},h_${h}/`)
            : url

    const heroSize = (url, w = 1600, h = 600) =>
        url?.includes("/upload/")
            ? url.replace("/upload/", `/upload/f_auto,q_auto,c_fill,w_${w},h_${h}/`)
            : url

    const firstUrl = (images) => {
        if (!images) return ""
        if (typeof images === "string") {
            try { return firstUrl(JSON.parse(images)) } catch {
                const p = images.split(",").map(s => s.trim()).filter(Boolean)
                return p[0] || ""
            }
        }
        if (Array.isArray(images)) {
            const head = images[0]
            return typeof head === "string" ? head : (head?.url || "")
        }
        return images?.url || ""
    }

    useEffect(() => {
        const run = async () => {
            setLoading(true)
            try {
                const r = await fetch("/api/items")
                const data = await r.json()
                const arr = Array.isArray(data) ? data : []
                setItems(arr.filter(x => String(x?.type || "product").toLowerCase() === "product"))
                setCollections(arr.filter(x => String(x?.type || "collection").toLowerCase() === "collection"))
            } catch (e) {
                console.error(e)
                setItems([]); setCollections([])
            } finally {
                setLoading(false)
            }
        }
        run()
    }, [])

    const activeCollectionObj = useMemo(() => {
        if (!collections?.length) return null
        if (!activeColl) return collections[0]
        return collections.find(c => c?.name === activeColl) || collections[0]
    }, [collections, activeColl])

    const heroImg = useMemo(() => heroSize(firstUrl(activeCollectionObj?.images)), [activeCollectionObj])

    const filtered = useMemo(() => {
        let list = Array.isArray(products) ? products : []
        if (activeColl) list = list.filter(it => (it.colls || "") === activeColl)
        const s = q.trim().toLowerCase()
        if (!s) return list
        return list.filter(it =>
            [it.name, it.colls, it.type, String(it.price ?? "")]
                .some(v => String(v || "").toLowerCase().includes(s))
        )
    }, [products, activeColl, q])

    const colNames = useMemo(
        () => Array.from(new Set((collections || []).map(c => c?.name).filter(Boolean))),
        [collections]
    )

    return (
        <div>
            <nav className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-3 w-full p-4 bg-black shadow-md">
                <button aria-label="home" className="shrink-0">
                    <svg viewBox="0 0 86 32" className="fill-white h-4 md:h-6 lg:h-8" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.3014 15.0482C36.8311 12.0771 51.4718 11.505 66.199 11.7542C66.1643 12.16 65.9783 12.1493 65.8214 12.1585C60.4024 12.4764 55.0179 13.1164 49.6407 13.8437C44.8405 14.493 40.0673 15.2878 35.3541 16.4045C31.9131 17.2199 28.5009 18.1477 25.3218 19.7585C24.6307 20.1087 23.9468 20.4761 23.3833 21.0162C22.6281 21.74 22.7221 22.4293 23.6541 22.9173C25.2725 23.7645 27.0456 24.0165 28.8281 24.0308C35.4829 24.0842 42.1383 24.0857 48.7935 24.0891C60.6518 24.0951 72.5101 24.0883 84.3684 24.0878C84.5959 24.0878 84.8326 24.0483 85.0668 24.1948C85.0145 24.4985 84.7538 24.5313 84.5625 24.6183C79.3394 26.994 74.1139 29.3642 68.8895 31.7372C68.4993 31.9145 68.0991 31.9953 67.6661 31.9952C50.5348 31.9914 33.4035 32.017 16.2723 31.9782C12.3677 31.9694 8.45693 31.8203 4.63013 30.8732C3.66922 30.6354 2.74246 30.3193 1.86698 29.8619C-0.158224 28.8037 -0.561232 27.0458 0.782576 25.1978C1.81843 23.7732 3.16831 22.6893 4.599 21.7009C7.73692 19.5331 11.2493 18.1789 14.8505 17.0194C17.2808 16.2369 19.7544 15.6206 22.3014 15.0482Z" />
                        <path d="M18.3133 12.5196C16.167 13.0717 14.0959 13.6751 12.019 14.3071C12.4524 13.5594 13.087 13.0533 13.7254 12.5604C17.3445 9.76592 21.4381 7.8699 25.7009 6.31375C32.1451 3.96128 38.8187 2.53773 45.5946 1.59709C51.0652 0.837639 56.5654 0.433255 62.0974 0.37169C65.4934 0.333904 68.8929 0.361299 72.2857 0.237445C75.2612 0.128815 78.2346 0.16667 81.2087 0.121892C82.1862 0.107174 83.1606 -0.0689778 84.1706 0.0300601C84.1496 0.405662 83.8416 0.42292 83.6375 0.519249C79.7406 2.35805 75.84 4.18874 71.9402 6.0212C71.1773 6.37965 70.3748 6.67333 69.6604 7.11082C68.2216 7.99184 66.6543 8.19057 65.0218 8.19378C62.3508 8.19904 59.6786 8.1748 57.0093 8.25019C52.4944 8.3777 47.9813 8.56042 43.4752 8.90087C40.2572 9.144 37.0417 9.42403 33.8409 9.81652C28.7814 10.4369 23.7441 11.2169 18.7828 12.4203C18.6464 12.4534 18.5072 12.4751 18.3133 12.5196Z" />
                    </svg>
                </button>

                {showSearch ? (
                    <div className="w-96">
                        <input
                            ref={inputRef}
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search products… (name / price / collection)"
                            className="w-full px-4 py-2 bg-white text-black"
                        />
                    </div>
                ) : (
                    <div>
                        <div
                            className="text-white text-sm cursor-pointer md:text-md lg:text-xl"
                            onClick={() => setCollectionDrop(v => !v)}
                        >
                            <div className="flex gap-3 p-2 hover:bg-white hover:text-black">
                                <span>{activeColl || activeCollectionObj?.name}</span>
                                <svg viewBox="0 0 24 25" className="fill-current h-4 md:h-5 lg:h-8" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M6 7.5L12 13.5L18 7.5L20 9.5L12 17.5L4 9.5L6 7.5Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    className="rounded-full p-2 hover:bg-white group"
                    aria-label="search"
                    title="Search"
                    onClick={() => {
                        setShowSearch(v => !v)
                        setTimeout(() => inputRef.current?.focus(), 0)
                    }}
                >
                    <svg viewBox="0 0 32 32" className="fill-white group-hover:fill-black h-4 md:h-6 lg:h-8" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.1333 28L17.7333 19.6C17.0667 20.1333 16.3 20.5556 15.4333 20.8667C14.5667 21.1778 13.6444 21.3333 12.6667 21.3333C10.2444 21.3333 8.19467 20.4942 6.51733 18.816C4.84 17.1378 4.00089 15.088 4 12.6667C3.99911 10.2453 4.83822 8.19556 6.51733 6.51733C8.19645 4.83911 10.2462 4 12.6667 4C15.0871 4 17.1373 4.83911 18.8173 6.51733C20.4973 8.19556 21.336 10.2453 21.3333 12.6667C21.3333 13.6444 21.1778 14.5667 20.8667 15.4333C20.5556 16.3 20.1333 17.0667 19.6 17.7333L28 26.1333L26.1333 28ZM12.6667 18.6667C14.3333 18.6667 15.7502 18.0836 16.9173 16.9173C18.0844 15.7511 18.6676 14.3342 18.6667 12.6667C18.6658 10.9991 18.0827 9.58267 16.9173 8.41733C15.752 7.252 14.3351 6.66844 12.6667 6.66667C10.9982 6.66489 9.58178 7.24844 8.41733 8.41733C7.25289 9.58622 6.66933 11.0027 6.66667 12.6667C6.664 14.3307 7.24756 15.7476 8.41733 16.9173C9.58711 18.0871 11.0036 18.6702 12.6667 18.6667Z" />
                    </svg>
                </button>
            </nav>

            <main className="pt-16">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
                    {heroImg ? (
                        <img
                            src={heroImg}
                            alt={activeCollectionObj?.name || "Collection"}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                            sizes="100vw"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                    )}
                </div>

                <section className="container mx-auto py-6 px-6 md:px-32 lg:px-48">
                    {loading ? (
                        <p className="text-center">Loading…</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filtered.map((it) => {
                                const imgSrc = firstUrl(it.images) ? thumb(firstUrl(it.images)) : ""
                                return (
                                    <div key={it.id} className="text-center">
                                        <div className="bg-gray-100">
                                            <div className="relative w-full aspect-[3/4]">
                                                {imgSrc ? (
                                                    <img src={imgSrc} alt={it.name} className="absolute inset-0 h-full w-full object-cover" />
                                                ) : (
                                                    <div className="absolute inset-0 bg-gray-300" />
                                                )}
                                            </div>
                                            <a href={it.url} className="block bg-black text-white text-center text-sm py-3 w-full cursor-pointer md:text-lg lg:text-xl">
                                                Shop now
                                            </a>
                                        </div>
                                        <h3 className="mt-2 text-sm md:text-lg lg:text-xl">{it.name}</h3>
                                        {it.price !== "" && it.price != null && <span className="text-sm md:text-lg lg:text-xl">{Number(it.price)} Bath</span>}
                                    </div>
                                )
                            })}
                            {filtered.length === 0 && (
                                <div className="col-span-full text-center text-gray-500">
                                    No products{activeColl ? ` in "${activeColl}"` : ""}{q ? ` for "${q}"` : ""}.
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </main>

            <footer className="flex justify-between items-center bg-black text-white p-2 md:p-4 lg:p-6">
                <span className="text-sm md:text-md lg:text-lg">Copyright © 2025 Etre shop</span>
                <div className="flex gap-3 items-center">
                    <span className="text-sm md:text-md lg:text-lg">Contact</span>
                    <a href="#" aria-label="instagram">
                        <svg viewBox="0 0 32 32" fill="none" className="fill-white h-4 md:h-6 lg:h-8" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.4 2.66675H21.6C25.8667 2.66675 29.3334 6.13341 29.3334 10.4001V21.6001C29.3334 23.6511 28.5186 25.6181 27.0683 27.0684C25.618 28.5187 23.651 29.3334 21.6 29.3334H10.4C6.13335 29.3334 2.66669 25.8667 2.66669 21.6001V10.4001C2.66669 8.34907 3.48145 6.38207 4.93173 4.93179C6.38201 3.48151 8.34901 2.66675 10.4 2.66675ZM10.1334 5.33341C8.86031 5.33341 7.63942 5.83913 6.73924 6.7393C5.83907 7.63948 5.33335 8.86037 5.33335 10.1334V21.8667C5.33335 24.5201 7.48002 26.6667 10.1334 26.6667H21.8667C23.1397 26.6667 24.3606 26.161 25.2608 25.2609C26.161 24.3607 26.6667 23.1398 26.6667 21.8667V10.1334C26.6667 7.48008 24.52 5.33341 21.8667 5.33341H10.1334ZM23 7.33341C23.442 7.33341 23.866 7.50901 24.1785 7.82157C24.4911 8.13413 24.6667 8.55805 24.6667 9.00008C24.6667 9.44211 24.4911 9.86603 24.1785 10.1786C23.866 10.4912 23.442 10.6667 23 10.6667C22.558 10.6667 22.1341 10.4912 21.8215 10.1786C21.5089 9.86603 21.3334 9.44211 21.3334 9.00008C21.3334 8.55805 21.5089 8.13413 21.8215 7.82157C22.1341 7.50901 22.558 7.33341 23 7.33341ZM16 9.33341C17.7681 9.33341 19.4638 10.0358 20.7141 11.286C21.9643 12.5363 22.6667 14.232 22.6667 16.0001C22.6667 17.7682 21.9643 19.4639 20.7141 20.7141C19.4638 21.9644 17.7681 22.6667 16 22.6667C14.2319 22.6667 12.5362 21.9644 11.286 20.7141C10.0357 19.4639 9.33335 17.7682 9.33335 16.0001C9.33335 14.232 10.0357 12.5363 11.286 11.286C12.5362 10.0358 14.2319 9.33341 16 9.33341ZM16 12.0001C14.9392 12.0001 13.9217 12.4215 13.1716 13.1717C12.4214 13.9218 12 14.9392 12 16.0001C12 17.0609 12.4214 18.0784 13.1716 18.8285C13.9217 19.5787 14.9392 20.0001 16 20.0001C17.0609 20.0001 18.0783 19.5787 18.8284 18.8285C19.5786 18.0784 20 17.0609 20 16.0001C20 14.9392 19.5786 13.9218 18.8284 13.1717C18.0783 12.4215 17.0609 12.0001 16 12.0001Z" />
                        </svg>
                    </a>
                    <a href="#" aria-label="Line">
                        <svg viewBox="0 0 32 32" fill="none" className="fill-white h-4 md:h-6 lg:h-8" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_74_2)">
                                <path d="M25.82 13.1507C26.0372 13.1593 26.2426 13.2517 26.3932 13.4084C26.5437 13.5651 26.6278 13.774 26.6278 13.9914C26.6278 14.2087 26.5437 14.4176 26.3932 14.5743C26.2426 14.731 26.0372 14.8234 25.82 14.832H23.48V16.332H25.82C25.933 16.3275 26.0458 16.3459 26.1516 16.386C26.2573 16.4262 26.3539 16.4873 26.4355 16.5657C26.517 16.6441 26.5819 16.7381 26.6263 16.8422C26.6706 16.9463 26.6935 17.0582 26.6935 17.1714C26.6935 17.2845 26.6706 17.3964 26.6263 17.5005C26.5819 17.6046 26.517 17.6987 26.4355 17.777C26.3539 17.8554 26.2573 17.9165 26.1516 17.9567C26.0458 17.9968 25.933 18.0152 25.82 18.0107H22.6387C22.4168 18.0096 22.2044 17.9209 22.0478 17.7637C21.8911 17.6066 21.803 17.3939 21.8027 17.172V10.8107C21.8027 10.3507 22.1787 9.97069 22.6427 9.97069H25.824C26.0468 9.97123 26.2602 10.0602 26.4174 10.2181C26.5745 10.376 26.6625 10.5899 26.662 10.8127C26.6615 11.0355 26.5725 11.2489 26.4146 11.4061C26.2567 11.5632 26.0428 11.6512 25.82 11.6507H23.48V13.1507H25.82ZM20.68 17.172C20.6789 17.3943 20.5898 17.6072 20.4321 17.7639C20.2744 17.9206 20.061 18.0084 19.8387 18.008C19.707 18.0107 19.5765 17.9818 19.4583 17.9238C19.34 17.8658 19.2373 17.7804 19.1587 17.6747L15.9013 13.252V17.172C15.8867 17.3843 15.792 17.583 15.6365 17.7282C15.4809 17.8734 15.2761 17.9541 15.0633 17.9541C14.8506 17.9541 14.6458 17.8734 14.4902 17.7282C14.3347 17.583 14.24 17.3843 14.2253 17.172V10.8107C14.225 10.5894 14.3124 10.3771 14.4683 10.2201C14.6243 10.0631 14.8361 9.97442 15.0573 9.97336C15.3173 9.97336 15.5573 10.112 15.7173 10.312L19 14.752V10.8107C19 10.3507 19.376 9.97069 19.84 9.97069C20.3 9.97069 20.68 10.3507 20.68 10.8107V17.172ZM13.0253 17.172C13.0252 17.2823 13.0033 17.3915 12.9609 17.4934C12.9185 17.5952 12.8565 17.6877 12.7784 17.7656C12.7002 17.8435 12.6075 17.9052 12.5056 17.9473C12.4036 17.9893 12.2943 18.0109 12.184 18.0107C11.9621 18.0096 11.7497 17.9209 11.5931 17.7637C11.4365 17.6066 11.3483 17.3939 11.348 17.172V10.8107C11.348 10.3507 11.724 9.97069 12.188 9.97069C12.6493 9.97069 13.0253 10.3507 13.0253 10.8107V17.172ZM9.73733 18.0107H6.556C6.33388 18.0093 6.12123 17.9205 5.96404 17.7636C5.80685 17.6067 5.71775 17.3941 5.716 17.172V10.8107C5.716 10.3507 6.096 9.97069 6.556 9.97069C7.02 9.97069 7.396 10.3507 7.396 10.8107V16.332H9.73733C9.95415 16.3407 10.1592 16.4329 10.3096 16.5893C10.4599 16.7458 10.5439 16.9544 10.5439 17.1714C10.5439 17.3883 10.4599 17.5969 10.3096 17.7534C10.1592 17.9098 9.95415 18.0021 9.73733 18.0107ZM32 13.752C32 6.5907 24.82 0.762695 16 0.762695C7.18 0.762695 0 6.5907 0 13.752C0 20.1667 5.69333 25.5414 13.38 26.5627C13.9013 26.672 14.6107 26.9067 14.7907 27.3494C14.9507 27.7507 14.896 28.3707 14.8413 28.7894L14.6227 30.1494C14.5627 30.5507 14.3027 31.7307 16.0213 31.0094C17.7427 30.2907 25.2427 25.572 28.6027 21.7094C30.9013 19.1907 32 16.6107 32 13.752Z" />
                            </g>
                        </svg>
                    </a>
                </div>
            </footer>

            {collectionDrop && (
                <div className="fixed top-16 left-0 right-0 z-50 flex justify-center text-white">
                    <div className="bg-black overflow-hidden min-w-full md:min-w-[240px] shadow-md">
                        {colNames.map((name) => (
                            <button
                                key={name}
                                onClick={() => { setActiveColl(name); setCollectionDrop(false) }}
                                className="block w-full text-left px-4 py-2 hover:bg-white hover:text-black text-sm md:text-md lg:text-lg"
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page