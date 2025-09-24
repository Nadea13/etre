"use client"

import React from "react"
import InsertProduct from "../components/ins-prod"
import InsertCollection from "../components/ins-coll"
import ListItems from "../components/list-items"

function InsertPage() {
    return (
        <div className="grid grid-cols-2">
            <div>
                <InsertProduct />
                <InsertCollection />
            </div>
            <div>
                <ListItems />
            </div>
        </div>
    )
}

export default InsertPage
