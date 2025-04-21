
"use client";

import React, { useEffect, useState } from 'react';

import rock_item from "@/public/rock_item.webp";
import wood_item from "@/public/wood_item.webp";

const _MAX_ITEM_AMOUNT: number = 999;


var _items: Array = {
    'wood': 0,
    'rock': 0
};

export function AddItem(_item_: string, _quantity_: number) {
    _items[_item_] += _quantity_;
    let _text = document.getElementById(_item_ + '-text');
    _text.innerHTML = _items[_item_];
    return;
}

export default function Inventory() {
    return (
        <div className={`absolute left-0 top-0 p-8 origin-top-left grid grid-rows-5 gap-2 w-50`}>
    	    <div className={`flex justify-center flex-row items-center gap-3 w-full`}>
                <img
                    src={wood_item.src}
                    height={100}
                    width={100}
                    alt="_rock_item_"
                    className={``}
                    style={{imageRendering: 'pixelated'}}
                />
                <p id='wood-text' className={`w-full`}>
                    {_items['wood']}
                </p>
    	    </div>
    	    <div className={`flex justify-center flex-row items-center gap-3 w-full`}>
                <img
                    src={rock_item.src}
                    height={100}
                    width={100}
                    alt="_rock_item_"
                    className={``}
                    style={{imageRendering: 'pixelated'}}
                />
                <p id='rock-text' className={`w-full`}>
                    {_items['rock']}
                </p>
    	    </div>
        </div>
    )
}
