"use client"

import React, { useEffect, useState } from "react"

function Page() {
    const [collectionDrop, setCollectionDrop] = useState(false)

    return (
        <div>
            <nav className="fixed flex justify-between items-center w-full p-4 bg-black">
                <button>
                    <svg width="86" height="32" viewBox="0 0 86 32" fill="none" className="fill-white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.3014 15.0482C36.8311 12.0771 51.4718 11.505 66.199 11.7542C66.1643 12.16 65.9783 12.1493 65.8214 12.1585C60.4024 12.4764 55.0179 13.1164 49.6407 13.8437C44.8405 14.493 40.0673 15.2878 35.3541 16.4045C31.9131 17.2199 28.5009 18.1477 25.3218 19.7585C24.6307 20.1087 23.9468 20.4761 23.3833 21.0162C22.6281 21.74 22.7221 22.4293 23.6541 22.9173C25.2725 23.7645 27.0456 24.0165 28.8281 24.0308C35.4829 24.0842 42.1383 24.0857 48.7935 24.0891C60.6518 24.0951 72.5101 24.0883 84.3684 24.0878C84.5959 24.0878 84.8326 24.0483 85.0668 24.1948C85.0145 24.4985 84.7538 24.5313 84.5625 24.6183C79.3394 26.994 74.1139 29.3642 68.8895 31.7372C68.4993 31.9145 68.0991 31.9953 67.6661 31.9952C50.5348 31.9914 33.4035 32.017 16.2723 31.9782C12.3677 31.9694 8.45693 31.8203 4.63013 30.8732C3.66922 30.6354 2.74246 30.3193 1.86698 29.8619C-0.158224 28.8037 -0.561232 27.0458 0.782576 25.1978C1.81843 23.7732 3.16831 22.6893 4.599 21.7009C7.73692 19.5331 11.2493 18.1789 14.8505 17.0194C17.2808 16.2369 19.7544 15.6206 22.3014 15.0482Z" />
                        <path d="M18.3133 12.5196C16.167 13.0717 14.0959 13.6751 12.019 14.3071C12.4524 13.5594 13.087 13.0533 13.7254 12.5604C17.3445 9.76592 21.4381 7.8699 25.7009 6.31375C32.1451 3.96128 38.8187 2.53773 45.5946 1.59709C51.0652 0.837639 56.5654 0.433255 62.0974 0.37169C65.4934 0.333904 68.8929 0.361299 72.2857 0.237445C75.2612 0.128815 78.2346 0.16667 81.2087 0.121892C82.1862 0.107174 83.1606 -0.0689778 84.1706 0.0300601C84.1496 0.405662 83.8416 0.42292 83.6375 0.519249C79.7406 2.35805 75.84 4.18874 71.9402 6.0212C71.1773 6.37965 70.3748 6.67333 69.6604 7.11082C68.2216 7.99184 66.6543 8.19057 65.0218 8.19378C62.3508 8.19904 59.6786 8.1748 57.0093 8.25019C52.4944 8.3777 47.9813 8.56042 43.4752 8.90087C40.2572 9.144 37.0417 9.42403 33.8409 9.81652C28.7814 10.4369 23.7441 11.2169 18.7828 12.4203C18.6464 12.4534 18.5072 12.4751 18.3133 12.5196Z" />
                    </svg>
                </button>
                <div className="text-white text-xl" onClick={() => setCollectionDrop(!collectionDrop)}>
                    <div className="flex gap-3 p-2 cursor-pointer hover:bg-white hover:text-black">
                        <span>Collection name1</span>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" className="fill-white" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6 7.5L12 13.5L18 7.5L20 9.5L12 17.5L4 9.5L6 7.5Z" />
                        </svg>
                    </div>
                </div>
                <button className="hover:bg-white rounded-full p-2">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="group fill-white hover:fill-black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.1333 28L17.7333 19.6C17.0667 20.1333 16.3 20.5556 15.4333 20.8667C14.5667 21.1778 13.6444 21.3333 12.6667 21.3333C10.2444 21.3333 8.19467 20.4942 6.51733 18.816C4.84 17.1378 4.00089 15.088 4 12.6667C3.99911 10.2453 4.83822 8.19556 6.51733 6.51733C8.19645 4.83911 10.2462 4 12.6667 4C15.0871 4 17.1373 4.83911 18.8173 6.51733C20.4973 8.19556 21.336 10.2453 21.3333 12.6667C21.3333 13.6444 21.1778 14.5667 20.8667 15.4333C20.5556 16.3 20.1333 17.0667 19.6 17.7333L28 26.1333L26.1333 28ZM12.6667 18.6667C14.3333 18.6667 15.7502 18.0836 16.9173 16.9173C18.0844 15.7511 18.6676 14.3342 18.6667 12.6667C18.6658 10.9991 18.0827 9.58267 16.9173 8.41733C15.752 7.252 14.3351 6.66844 12.6667 6.66667C10.9982 6.66489 9.58178 7.24844 8.41733 8.41733C7.25289 9.58622 6.66933 11.0027 6.66667 12.6667C6.664 14.3307 7.24756 15.7476 8.41733 16.9173C9.58711 18.0871 11.0036 18.6702 12.6667 18.6667Z" />
                    </svg>
                </button>
            </nav>
            <main>
                <div>
                    <img className="w-full h-[calc(100vh-0rem)] bg-gray-400" />
                </div>
                <section className="container mx-auto py-6 px-6 md:px-32 lg:px-48">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="bg-gray-400">
                                <img className="w-full object-cover h-48 md:h-52 lg:h-64 [aspect-ratio:3/4]" />
                                <a target="_blank" className="block bg-black text-white text-center text-lg py-3 w-full cursor-pointer">
                                    Shop now
                                </a>
                            </div>
                            <h3>Product name</h3>
                            <span>123 $</span>
                        </div>
                        <div className="text-center">
                            <div className="bg-gray-400">
                                <img className="w-full object-cover h-48 md:h-52 lg:h-64 [aspect-ratio:3/4]" />
                                <a target="_blank" className="block bg-black text-white text-center text-lg py-3 w-full cursor-pointer">
                                    Shop now
                                </a>
                            </div>
                            <h3>Product name</h3>
                            <span>123 $</span>
                        </div>
                        <div className="text-center">
                            <div className="bg-gray-400">
                                <img className="w-full object-cover h-48 md:h-52 lg:h-64 [aspect-ratio:3/4]" />
                                <a target="_blank" className="block bg-black text-white text-center text-lg py-3 w-full cursor-pointer">
                                    Shop now
                                </a>
                            </div>
                            <h3>Product name</h3>
                            <span>123 $</span>
                        </div>
                        <div className="text-center">
                            <div className="bg-gray-400">
                                <img className="w-full object-cover h-48 md:h-52 lg:h-64 [aspect-ratio:3/4]" />
                                <a target="_blank" className="block bg-black text-white text-center text-lg py-3 w-full cursor-pointer">
                                    Shop now
                                </a>
                            </div>
                            <h3>Product name</h3>
                            <span>123 $</span>
                        </div>
                        <div className="text-center">
                            <div className="bg-gray-400">
                                <img className="w-full object-cover h-48 md:h-52 lg:h-64 [aspect-ratio:3/4]" />
                                <a target="_blank" className="block bg-black text-white text-center text-lg py-3 w-full cursor-pointer">
                                    Shop now
                                </a>
                            </div>
                            <h3>Product name</h3>
                            <span>123 $</span>
                        </div>
                        <div className="text-center">
                            <div className="bg-gray-400">
                                <img className="w-full object-cover h-48 md:h-52 lg:h-64 [aspect-ratio:3/4]" />
                                <a target="_blank" className="block bg-black text-white text-center text-lg py-3 w-full cursor-pointer">
                                    Shop now
                                </a>
                            </div>
                            <h3>Product name</h3>
                            <span>123 $</span>
                        </div>
                        <div className="text-center">
                            <div className="bg-gray-400">
                                <img className="w-full object-cover h-48 md:h-52 lg:h-64 [aspect-ratio:3/4]" />
                                <a target="_blank" className="block bg-black text-white text-center text-lg py-3 w-full cursor-pointer">
                                    Shop now
                                </a>
                            </div>
                            <h3>Product name</h3>
                            <span>123 $</span>
                        </div>
                        <div className="text-center">
                            <div className="bg-gray-400">
                                <img className="w-full object-cover h-48 md:h-52 lg:h-64 [aspect-ratio:3/4]" />
                                <a target="_blank" className="block bg-black text-white text-center text-lg py-3 w-full cursor-pointer">
                                    Shop now
                                </a>
                            </div>
                            <h3>Product name</h3>
                            <span>123 $</span>
                        </div>
                        <div className="text-center">
                            <div className="bg-gray-400">
                                <img className="w-full object-cover h-48 md:h-52 lg:h-64 [aspect-ratio:3/4]" />
                                <a target="_blank" className="block bg-black text-white text-center text-lg py-3 w-full cursor-pointer">
                                    Shop now
                                </a>
                            </div>
                            <h3>Product name</h3>
                            <span>123 $</span>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex justify-between items-center bg-black text-white p-6">
                <span>Copyright © 2025 Etre shop</span>
                <div className="flex gap-3">
                    <span>Contact</span>
                    <a href="">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 17.7383 21.3889 19.2135 20.3012 20.3012C19.2135 21.3889 17.7383 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 6.26174 2.61107 4.78649 3.69878 3.69878C4.78649 2.61107 6.26174 2 7.8 2ZM7.6 4C6.64522 4 5.72955 4.37928 5.05442 5.05442C4.37928 5.72955 4 6.64522 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C17.3548 20 18.2705 19.6207 18.9456 18.9456C19.6207 18.2705 20 17.3548 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z" fill="white" />
                        </svg>
                    </a>
                    <a href="">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5 1C3.93913 1 2.92172 1.42143 2.17157 2.17157C1.42143 2.92172 1 3.93913 1 5V19C1 20.0609 1.42143 21.0783 2.17157 21.8284C2.92172 22.5786 3.93913 23 5 23H19C20.0609 23 21.0783 22.5786 21.8284 21.8284C22.5786 21.0783 23 20.0609 23 19V5C23 3.93913 22.5786 2.92172 21.8284 2.17157C21.0783 1.42143 20.0609 1 19 1H5ZM12 4.84C7.929 4.84 4.5 7.524 4.5 10.977C4.5 14.136 7.377 16.655 10.974 17.057C11.036 17.0621 11.0953 17.0847 11.145 17.122C11.159 17.1319 11.1707 17.1447 11.1793 17.1596C11.188 17.1744 11.1933 17.1909 11.195 17.208C11.2295 17.7128 11.1629 18.2193 10.999 18.698C10.9793 18.7497 10.9725 18.8053 10.9792 18.8602C10.9859 18.9151 11.0059 18.9675 11.0374 19.0129C11.069 19.0583 11.1111 19.0953 11.1601 19.1208C11.2092 19.1463 11.2637 19.1594 11.319 19.159C11.414 19.159 11.523 19.13 11.613 19.103C11.734 19.065 11.8531 19.0213 11.97 18.972C12.24 18.861 12.584 18.7 12.974 18.495C13.754 18.087 14.73 17.497 15.687 16.771C16.642 16.046 17.589 15.176 18.3 14.206C19.01 13.236 19.5 12.142 19.5 10.977C19.5 7.524 16.071 4.84 12 4.84ZM6.716 12.852V9.272H7.739V11.829H9.273V12.852H6.716ZM9.784 9.272V12.852H10.807V9.272H9.784ZM11.148 12.852V9.272H12.307L13.193 10.935V9.273H14.216V12.853H13.056L12.171 11.19V12.852H11.148ZM16.773 9.272H14.557V12.852H16.773V11.83H15.579V11.575H16.773V10.55H15.579V10.294H16.773V9.272Z" fill="white" />
                        </svg>
                    </a>
                </div>
            </footer>
            {collectionDrop && (
                <div className="fixed top-20 left-0 z-50 flex justify-center w-full text-white">
                    <div>
                        <div className="bg-black px-4 py-2 hover:bg-white hover:text-black">
                            Collection name2
                        </div>
                        <div className="bg-black px-4 py-2 hover:bg-white hover:text-black">
                            Collection name3
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default Page
