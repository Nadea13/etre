"use client"

import React, { useEffect, useMemo, useRef, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Page() {
    return (
        <Suspense fallback={<div className="h-12" />}>
            <PageInner />
        </Suspense>
    )
}

function PageInner() {
    const [collectionDrop, setCollectionDrop] = useState(false)
    const [products, setItems] = useState([])
    const [collections, setCollections] = useState([])
    const [activeColl, setActiveColl] = useState("")
    const [loading, setLoading] = useState(false)
    const [imgShow, setImgShow] = useState(false)
    const [galleryOpen, setGalleryOpen] = useState(false)
    const [gallery, setGallery] = useState({ items: [], index: 0, title: "" })

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

    const heroSize = (url, w = 600, h = 600) =>
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

    const toArrayImages = (images) => {
        if (!images) return []
        if (typeof images === "string") {
            try { return toArrayImages(JSON.parse(images)) }
            catch { return images.split(",").map(s => s.trim()).filter(Boolean) }
        }
        if (Array.isArray(images)) return images.map(x => typeof x === "string" ? x : x?.url).filter(Boolean)
        if (typeof images === "object") return [images?.url].filter(Boolean)
        return []
    }

    const bigImg = (url, w = 1400, h = 1867) =>
        url?.includes("/upload/")
            ? url.replace("/upload/", `/upload/f_auto,q_auto,c_fit,w_${w},h_${h}/`)
            : url

    const smallThumb = (url, w = 120, h = 160) =>
        url?.includes("/upload/")
            ? url.replace("/upload/", `/upload/f_auto,q_auto,c_fill,w_${w},h_${h}/`)
            : url

    const openGallery = (product) => {
        const items = toArrayImages(product.images).map(u => bigImg(u))
        setGallery({ items, index: 0, title: product?.name || "" })
        setGalleryOpen(true)
    }

    useEffect(() => {
        if (!galleryOpen) return
        const onKey = (e) => {
            if (e.key === "Escape") setGalleryOpen(false)
            if (e.key === "ArrowLeft") setGallery(g => ({ ...g, index: (g.index - 1 + g.items.length) % g.items.length }))
            if (e.key === "ArrowRight") setGallery(g => ({ ...g, index: (g.index + 1) % g.items.length }))
        }
        window.addEventListener("keydown", onKey)
        const prev = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            window.removeEventListener("keydown", onKey)
            document.body.style.overflow = prev
        }
    }, [galleryOpen])

    useEffect(() => {
        if (!imgShow) return
        const onKey = (e) => e.key === "Escape" && setImgShow(false)
        window.addEventListener("keydown", onKey)
        const prev = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            window.removeEventListener("keydown", onKey)
            document.body.style.overflow = prev
        }
    }, [imgShow])

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

    const sameName = (a = "", b = "") =>
        String(a).trim().toLowerCase() === String(b).trim().toLowerCase()

    const inCollection = (item, collName) => {
        if (!collName) return true
        const raw = item?.colls
        if (Array.isArray(raw)) return raw.some(x => sameName(x, collName))
        if (typeof raw === "string") {
            const parts = raw.split(",").map(s => s.trim()).filter(Boolean)
            return parts.some(x => sameName(x, collName))
        }
        return false
    }

    const currentColl =
        activeColl || (collections?.length ? collections[0]?.name : "")

    const filtered = useMemo(() => {
        let list = Array.isArray(products) ? products : []

        if (currentColl) list = list.filter(it => inCollection(it, currentColl))

        const s = q.trim().toLowerCase()
        if (s) {
            list = list.filter(it =>
                [it.name, it.colls, it.type, String(it.price ?? "")]
                    .some(v => String(v || "").toLowerCase().includes(s))
            )
        }
        return list
    }, [products, currentColl, q])

    const colNames = useMemo(
        () => Array.from(new Set((collections || []).map(c => c?.name).filter(Boolean))),
        [collections]
    )

    if (loading) return (
        <div className="absolute top-0 bg-black w-full h-full">
            <div className="flex justify-center items-center h-full">
                <svg viewBox="0 0 605 467" fill="none" className="h-32 animate-pulse" xmlns="http://www.w3.org/2000/svg">
                    <path d="M158.57 106.998C261.882 85.8724 365.982 81.8046 470.698 83.5762C470.451 86.4614 469.128 86.3858 468.013 86.4512C429.481 88.7116 391.196 93.2618 352.962 98.4333C318.831 103.05 284.892 108.701 251.38 116.642C226.913 122.439 202.651 129.036 180.046 140.49C175.133 142.98 170.27 145.592 166.263 149.433C160.894 154.579 161.562 159.48 168.189 162.95C179.696 168.974 192.304 170.765 204.977 170.867C252.296 171.247 299.618 171.257 346.938 171.282C431.255 171.325 515.571 171.276 599.888 171.272C601.506 171.272 603.189 170.992 604.854 172.033C604.482 174.192 602.628 174.426 601.268 175.044C564.13 191.937 526.975 208.79 489.828 225.662C487.053 226.923 484.208 227.498 481.129 227.497C359.32 227.47 237.51 227.651 115.702 227.376C87.9383 227.313 60.1316 226.253 32.9218 219.519C26.0894 217.828 19.4999 215.58 13.2748 212.328C-1.12503 204.804 -3.99055 192.305 5.56438 179.165C12.9297 169.036 22.5278 161.328 32.7004 154.301C55.0121 138.887 79.9866 129.258 105.592 121.014C122.873 115.45 140.46 111.067 158.57 106.998Z" fill="white" />
                    <path d="M130.213 89.0189C114.953 92.9441 100.226 97.2344 85.4595 101.728C88.5407 96.4123 93.0529 92.8131 97.5919 89.3084C123.325 69.439 152.432 55.9577 182.742 44.8929C228.562 28.166 276.014 18.0441 324.193 11.3558C363.091 5.95589 402.199 3.08059 441.534 2.64284C465.68 2.37417 489.852 2.56896 513.976 1.68832C535.133 0.915916 556.275 1.18508 577.421 0.866691C584.372 0.762046 591.3 -0.490456 598.482 0.213737C598.332 2.88439 596.142 3.0071 594.691 3.69204C566.983 16.7665 539.248 29.7833 511.519 42.8128C506.095 45.3614 500.389 47.4496 495.309 50.5603C485.079 56.8247 473.935 58.2378 462.327 58.2606C443.336 58.2979 424.335 58.1256 405.356 58.6616C373.253 59.5683 341.163 60.8675 309.124 63.2882C286.242 65.0169 263.379 67.008 240.62 69.7988C204.645 74.2101 168.829 79.7559 133.552 88.3124C132.582 88.5476 131.593 88.7024 130.213 89.0189Z" fill="white" />
                    <path d="M345.521 422.297C339.358 422.303 333.688 422.478 328.034 422.254C324.165 422.101 322.731 423.448 322.802 427.417C323.003 438.739 322.826 450.068 322.904 461.393C322.923 464.125 322.276 465.993 319.153 465.985C312.668 465.967 306.184 465.912 299.699 465.916C296.324 465.919 295.162 464.324 295.168 460.96C295.242 418.987 295.238 377.014 295.156 335.041C295.149 331.457 296.28 329.967 300.023 329.977C336.832 330.07 373.642 329.985 410.451 330.128C415.922 330.149 421.343 331.312 426.531 333.259C434.013 336.068 439.185 341.195 441.706 348.771C443.652 354.617 445.072 360.617 444.831 366.851C444.48 375.98 445.649 385.14 444.017 394.249C440.96 411.311 432.595 419.01 415.225 420.57C410.813 420.966 406.412 421.488 401.032 422.054C417.109 436.436 432.622 450.312 448.212 464.258C446.325 466.241 444.387 465.986 442.673 466.006C434.18 466.101 425.685 466.03 417.191 466.054C413.18 466.065 409.96 464.718 406.975 461.824C395.019 450.233 382.729 438.987 370.818 427.352C367.092 423.713 363.296 421.716 358.005 422.229C354.045 422.613 350.018 422.3 345.521 422.297ZM322.889 372.73C322.89 380.05 322.954 387.372 322.86 394.691C322.822 397.628 323.931 398.897 326.957 398.89C353.41 398.832 379.865 398.932 406.318 398.792C412.855 398.757 416.569 395.464 417.258 388.803C417.871 382.885 417.684 376.855 417.471 370.889C417.13 361.342 413.772 358.292 404.094 358.287C381.467 358.276 358.84 358.285 336.213 358.301C322.917 358.311 322.917 358.324 322.889 372.73Z" fill="white" />
                    <path d="M141.59 465.186C139.065 465.654 136.922 466.071 134.778 466.074C96.2884 466.117 57.7986 466.116 19.3087 466.108C12.1834 466.106 12.1748 466.072 12.1739 458.888C12.171 436.394 12.205 413.9 12.1417 391.406C12.133 388.305 12.5433 386.559 16.4518 386.578C55.1064 386.771 93.762 386.769 132.417 386.82C139.653 386.829 139.657 386.824 139.674 393.902C139.682 397.235 139.472 400.582 139.714 403.896C140.038 408.345 138.079 409.584 133.831 409.564C104.506 409.425 75.179 409.584 45.8547 409.387C41.0925 409.355 39.2933 410.672 39.5959 415.554C39.9663 421.529 39.8092 427.548 39.6637 433.542C39.5773 437.099 40.9455 438.803 44.5787 438.783C58.074 438.709 71.5696 438.702 85.0651 438.673C103.039 438.635 121.012 438.592 138.986 438.58C140.711 438.579 142.601 438.836 142.584 441.098C142.523 449.048 143.626 457.033 141.59 465.186Z" fill="white" />
                    <path d="M573.52 386.833C578.351 386.834 582.686 386.952 587.011 386.796C590.283 386.679 591.998 387.678 591.855 391.288C591.671 395.945 591.724 400.616 591.834 405.277C591.904 408.237 590.68 409.618 587.706 409.48C586.376 409.419 585.041 409.483 583.709 409.483C555.059 409.481 526.409 409.558 497.76 409.393C493.329 409.367 491.436 410.41 491.734 415.216C492.136 421.688 491.925 428.204 491.819 434.698C491.77 437.716 493.042 438.849 495.994 438.825C514.645 438.671 533.298 438.542 551.95 438.518C565.102 438.501 578.255 438.701 591.407 438.714C594.031 438.716 594.901 439.853 594.871 442.338C594.791 449 594.784 455.664 594.871 462.326C594.905 464.907 593.665 465.947 591.286 466.027C590.121 466.067 588.955 466.097 587.79 466.097C550.146 466.104 512.502 466.108 474.857 466.104C473.026 466.104 471.195 465.982 469.364 465.99C465.85 466.004 464.371 464.411 464.385 460.789C464.475 437.636 464.479 414.483 464.377 391.331C464.36 387.452 466.088 386.682 469.582 386.695C504.062 386.823 538.541 386.808 573.52 386.833Z" fill="white" />
                    <path d="M154.346 341.247C154.408 328.46 153.295 330.05 164.978 330.035C201.291 329.987 237.604 330.011 273.917 330.016C280.761 330.018 280.769 330.039 280.786 336.989C280.797 341.82 280.798 346.651 280.778 351.481C280.751 357.888 280.569 358.101 273.915 358.126C261.922 358.17 249.928 358.137 237.935 358.162C231.789 358.174 231.477 358.447 231.473 364.69C231.449 394.84 231.466 424.99 231.463 455.14C231.463 457.138 231.338 459.139 231.404 461.134C231.525 464.738 229.814 466.184 226.267 466.102C220.774 465.975 215.273 465.991 209.778 466.092C205.646 466.168 204.044 464.631 204.069 460.195C204.251 428.713 204.163 397.23 204.174 365.748C204.178 356.434 204.074 357.836 196.519 358.045C184.368 358.381 172.201 358.056 160.043 358.209C155.704 358.263 154.023 356.509 154.312 352.232C154.547 348.75 154.351 345.239 154.346 341.247Z" fill="white" />
                    <path d="M138.292 330.025C141.468 329.896 142.74 331.162 142.725 333.886C142.689 340.709 142.696 347.532 142.723 354.355C142.734 356.886 141.341 357.935 139.018 358.068C137.69 358.143 136.358 358.182 135.028 358.183C96.4174 358.213 57.8066 358.242 19.1959 358.256C12.1945 358.259 12.188 358.229 12.1733 351.416C12.1624 346.423 12.4607 341.408 12.0899 336.443C11.7187 331.473 13.3232 329.856 18.4914 329.89C53.1067 330.114 87.7241 330.011 122.341 330.014C127.5 330.015 132.659 330.017 138.292 330.025Z" fill="white" />
                    <path d="M464.393 349.121C464.399 344.142 464.56 339.642 464.363 335.157C464.191 331.223 465.836 329.953 469.681 329.978C489.487 330.108 509.293 330.035 529.099 330.04C549.072 330.044 569.045 330.177 589.016 329.976C593.638 329.929 595.199 331.449 594.939 335.998C594.617 341.638 594.646 347.321 594.925 352.966C595.125 357.014 593.384 358.244 589.663 358.157C583.841 358.021 578.013 358.127 572.188 358.133C539.067 358.172 505.947 358.218 472.826 358.247C464.425 358.255 464.425 358.231 464.393 349.121Z" fill="white" />
                    <path d="M75.5741 287.191C82.7708 286.098 87.7084 288.716 92.1707 293.785C97.7741 300.151 104.096 305.882 110.079 311.916C111.226 313.072 112.665 314.04 113.119 315.768C111.65 317.802 109.706 316.547 108.012 316.659C106.852 316.736 105.678 316.583 104.516 316.641C93.9415 317.167 83.2284 318.124 77.4921 306.673C71.2595 308.918 69.7562 316.395 63.35 316.594C55.5 316.838 47.6366 316.652 39.7407 316.652C39.8804 313.722 41.626 312.739 42.8656 311.483C49.0691 305.202 55.5881 299.211 61.5062 292.675C65.3273 288.455 69.5144 286.409 75.5741 287.191Z" fill="white" />
                </svg>
            </div>
        </div>
    )

    return (
        <div className="bg-white">
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
                            aria-expanded={collectionDrop}
                        >
                            <div className="flex gap-3 p-2">
                                <span>{activeColl || activeCollectionObj?.name}</span>
                                <svg
                                    viewBox="0 0 24 25"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`fill-current h-4 md:h-5 lg:h-8 transition-transform duration-500 ${collectionDrop ? "rotate-180" : "rotate-0"
                                        }`}
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6 7.5L12 13.5L18 7.5L20 9.5L12 17.5L4 9.5L6 7.5Z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    className="rounded-full p-2 group cursor-pointer"
                    aria-label="search"
                    aria-pressed={showSearch}
                    title="Search"
                    onClick={() => {
                        setShowSearch(v => !v)
                        setTimeout(() => inputRef.current?.focus(), 0)
                    }}
                >
                    <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 md:h-6 lg:h-8 transition-colors fill-white"
                    >
                        {showSearch ? (
                            <path d="M8.53335 25.3334L6.66669 23.4667L14.1334 16.0001L6.66669 8.53341L8.53335 6.66675L16 14.1334L23.4667 6.66675L25.3334 8.53341L17.8667 16.0001L25.3334 23.4667L23.4667 25.3334L16 17.8667L8.53335 25.3334Z" />
                        ) : (
                            <path d="M26.1333 28L17.7333 19.6C17.0667 20.1333 16.3 20.5556 15.4333 20.8667C14.5667 21.1778 13.6444 21.3333 12.6667 21.3333C10.2444 21.3333 8.19467 20.4942 6.51733 18.816C4.84 17.1378 4.00089 15.088 4 12.6667C3.99911 10.2453 4.83822 8.19556 6.51733 6.51733C8.19645 4.83911 10.2462 4 12.6667 4C15.0871 4 17.1373 4.83911 18.8173 6.51733C20.4973 8.19556 21.336 10.2453 21.3333 12.6667C21.3333 13.6444 21.1778 14.5667 20.8667 15.4333C20.5556 16.3 20.1333 17.0667 19.6 17.7333L28 26.1333L26.1333 28ZM12.6667 18.6667C14.3333 18.6667 15.7502 18.0836 16.9173 16.9173C18.0844 15.7511 18.6676 14.3342 18.6667 12.6667C18.6658 10.9991 18.0827 9.58267 16.9173 8.41733C15.752 7.252 14.3351 6.66844 12.6667 6.66667C10.9982 6.66489 9.58178 7.24844 8.41733 8.41733C7.25289 9.58622 6.66933 11.0027 6.66667 12.6667C6.664 14.3307 7.24756 15.7476 8.41733 16.9173C9.58711 18.0871 11.0036 18.6702 12.6667 18.6667Z" />
                        )}
                    </svg>
                </button>
            </nav>

            <main className="pt-16">
                <div className="relative w-full">
                    {heroImg ? (
                        <>
                            <img
                                src={heroImg}
                                alt={activeCollectionObj?.name || "Collection"}
                                className="block w-full h-auto"
                                loading="lazy"
                                sizes="100vh"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-white text-3xl md:text-5xl font-semibold drop-shadow-lg">
                                    {activeCollectionObj?.name || "Collection"}
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="h-[300px] bg-gradient-to-br from-gray-200 to-gray-300" />
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
                                                    <img
                                                        src={imgSrc}
                                                        alt={it.name}
                                                        onClick={() => openGallery(it)}
                                                        className="absolute inset-0 h-full w-full object-cover cursor-zoom-in"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 bg-gray-300" />
                                                )}
                                            </div>
                                            <a href={it.url} className="block bg-black text-white text-center text-sm py-2 w-full cursor-pointer md:text-lg md:p-3 lg:text-xl">
                                                Shop now
                                            </a>
                                        </div>
                                        <h3 className="mt-2 text-black text-sm md:text-lg lg:text-xl">{it.name}</h3>
                                        {it.price !== "" && it.price != null && <span className="text-black text-sm md:text-lg lg:text-xl">{Number(it.price)} Bath</span>}
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

            <footer className="flex justify-between items-center bg-black text-white p-4 md:p-6">
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
                            <g clipPath="url(#clip0_74_2)">
                                <path d="M25.82 13.1507C26.0372 13.1593 26.2426 13.2517 26.3932 13.4084C26.5437 13.5651 26.6278 13.774 26.6278 13.9914C26.6278 14.2087 26.5437 14.4176 26.3932 14.5743C26.2426 14.731 26.0372 14.8234 25.82 14.832H23.48V16.332H25.82C25.933 16.3275 26.0458 16.3459 26.1516 16.386C26.2573 16.4262 26.3539 16.4873 26.4355 16.5657C26.517 16.6441 26.5819 16.7381 26.6263 16.8422C26.6706 16.9463 26.6935 17.0582 26.6935 17.1714C26.6935 17.2845 26.6706 17.3964 26.6263 17.5005C26.5819 17.6046 26.517 17.6987 26.4355 17.777C26.3539 17.8554 26.2573 17.9165 26.1516 17.9567C26.0458 17.9968 25.933 18.0152 25.82 18.0107H22.6387C22.4168 18.0096 22.2044 17.9209 22.0478 17.7637C21.8911 17.6066 21.803 17.3939 21.8027 17.172V10.8107C21.8027 10.3507 22.1787 9.97069 22.6427 9.97069H25.824C26.0468 9.97123 26.2602 10.0602 26.4174 10.2181C26.5745 10.376 26.6625 10.5899 26.662 10.8127C26.6615 11.0355 26.5725 11.2489 26.4146 11.4061C26.2567 11.5632 26.0428 11.6512 25.82 11.6507H23.48V13.1507H25.82ZM20.68 17.172C20.6789 17.3943 20.5898 17.6072 20.4321 17.7639C20.2744 17.9206 20.061 18.0084 19.8387 18.008C19.707 18.0107 19.5765 17.9818 19.4583 17.9238C19.34 17.8658 19.2373 17.7804 19.1587 17.6747L15.9013 13.252V17.172C15.8867 17.3843 15.792 17.583 15.6365 17.7282C15.4809 17.8734 15.2761 17.9541 15.0633 17.9541C14.8506 17.9541 14.6458 17.8734 14.4902 17.7282C14.3347 17.583 14.24 17.3843 14.2253 17.172V10.8107C14.225 10.5894 14.3124 10.3771 14.4683 10.2201C14.6243 10.0631 14.8361 9.97442 15.0573 9.97336C15.3173 9.97336 15.5573 10.112 15.7173 10.312L19 14.752V10.8107C19 10.3507 19.376 9.97069 19.84 9.97069C20.3 9.97069 20.68 10.3507 20.68 10.8107V17.172ZM13.0253 17.172C13.0252 17.2823 13.0033 17.3915 12.9609 17.4934C12.9185 17.5952 12.8565 17.6877 12.7784 17.7656C12.7002 17.8435 12.6075 17.9052 12.5056 17.9473C12.4036 17.9893 12.2943 18.0109 12.184 18.0107C11.9621 18.0096 11.7497 17.9209 11.5931 17.7637C11.4365 17.6066 11.3483 17.3939 11.348 17.172V10.8107C11.348 10.3507 11.724 9.97069 12.188 9.97069C12.6493 9.97069 13.0253 10.3507 13.0253 10.8107V17.172ZM9.73733 18.0107H6.556C6.33388 18.0093 6.12123 17.9205 5.96404 17.7636C5.80685 17.6067 5.71775 17.3941 5.716 17.172V10.8107C5.716 10.3507 6.096 9.97069 6.556 9.97069C7.02 9.97069 7.396 10.3507 7.396 10.8107V16.332H9.73733C9.95415 16.3407 10.1592 16.4329 10.3096 16.5893C10.4599 16.7458 10.5439 16.9544 10.5439 17.1714C10.5439 17.3883 10.4599 17.5969 10.3096 17.7534C10.1592 17.9098 9.95415 18.0021 9.73733 18.0107ZM32 13.752C32 6.5907 24.82 0.762695 16 0.762695C7.18 0.762695 0 6.5907 0 13.752C0 20.1667 5.69333 25.5414 13.38 26.5627C13.9013 26.672 14.6107 26.9067 14.7907 27.3494C14.9507 27.7507 14.896 28.3707 14.8413 28.7894L14.6227 30.1494C14.5627 30.5507 14.3027 31.7307 16.0213 31.0094C17.7427 30.2907 25.2427 25.572 28.6027 21.7094C30.9013 19.1907 32 16.6107 32 13.752Z" />
                            </g>
                        </svg>
                    </a>
                </div>
            </footer>

            {collectionDrop && (
                <div className="fixed top-17 left-0 right-0 z-50 flex justify-center text-white lg:top-20">
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
            {galleryOpen && (
                <div
                    className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setGalleryOpen(false)}
                >
                    <button
                        aria-label="Close"
                        onClick={() => setGalleryOpen(false)}
                        className="absolute top-3 right-3 md:top-6 md:right-6 rounded-full bg-white/90 text-black p-2 shadow hover:bg-white"
                    >
                        <svg viewBox="0 0 24 24" fill="none" className="fill-black h-6 md:h-8" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" />
                        </svg>
                    </button>
                    <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>

                        <div className="relative w-full aspect-[3/4] md:aspect-[16/10] overflow-hidden">
                            <img
                                src={gallery.items[gallery.index]}
                                alt={`${gallery.title} ${gallery.index + 1}/${gallery.items.length}`}
                                className="absolute inset-0 h-full w-full object-contain"
                                loading="eager"
                            />

                            {gallery.items.length > 1 && (
                                <>
                                    <button
                                        aria-label="Prev"
                                        onClick={() => setGallery(g => ({ ...g, index: (g.index - 1 + g.items.length) % g.items.length }))}
                                        className="absolute left-2 top-1/2 translate-y-1/2 bg-white hover:bg-white text-black rounded-full p-2 grid place-items-center cursor-pointer"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" className="fill-black h-6 md:h-8" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 22L6 12L16 2L17.775 3.775L9.55 12L17.775 20.225L16 22Z" />
                                        </svg>
                                    </button>
                                    <button
                                        aria-label="Next"
                                        onClick={() => setGallery(g => ({ ...g, index: (g.index + 1) % g.items.length }))}
                                        className="absolute right-2 top-1/2 translate-y-1/2 bg-white hover:bg-white text-black rounded-full p-2 grid place-items-center cursor-pointer"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" className="fill-black h-4 h-6 md:h-8" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2L18.025 12L8.025 22Z" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>

                        {gallery.items.length > 1 && (
                            <div className="mt-3 flex gap-2 overflow-x-auto">
                                {gallery.items.map((u, i) => (
                                    <button
                                        key={`${u}-${i}`}
                                        onClick={() => setGallery(g => ({ ...g, index: i }))}
                                        className={`relative shrink-0 w-16 h-20 overflow-hidden ring-2 ${i === gallery.index ? "ring-white" : "ring-transparent"}`}
                                        aria-label={`Thumbnail ${i + 1}`}
                                        title={`Image ${i + 1}`}
                                    >
                                        <img src={smallThumb(u)} alt="" className="absolute inset-0 w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
