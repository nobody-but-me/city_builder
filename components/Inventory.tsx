
"use client";

import React, { useEffect, useState } from 'react';

import item_slot from "@/public/item_slot.webp";
import rock_item from "@/public/rock_item.webp";
import wood_item from "@/public/wood_item.webp";
import hammer from "@/public/hammer_tool.webp";
import shovel from "@/public/shovel_tool.webp";

const _MAX_ITEM_AMOUNT: number = 999;


var _items: Dictionary = {
    'wood': 0,
    'rock': 0
};
var _tools: Array = [
    hammer.src,
    shovel.src
];
var _current_selected_tool: number = 1;

export function GetCurrentTool() {
    return _current_selected_tool;
}

export function AddItem(_item_: string, _quantity_: number) {
    _items[_item_] += _quantity_;
    let _text = document.getElementById(_item_ + '-text');
    _text.innerHTML = _items[_item_];
    return;
}

export default function Inventory() {
    
    useEffect(() => {
	let _tool = document.getElementById('tool');
	_tool.addEventListener('mousedown', () => {
	    if (_current_selected_tool < (_tools.length - 1)) {
		_current_selected_tool += 1;
	    } else {
		_current_selected_tool = 0;
	    }
	    _tool.src = _tools[_current_selected_tool];
	});
    }, []);
    
    return (<>
        <div className={`absolute left-0 top-0 p-8 origin-top-left grid grid-rows-5 gap-2 w-50`}>
    	    <div className={`flex justify-center flex-row items-center gap-3 w-full`}>
                <img
                    src={wood_item.src}
                    height={100}
                    width={100}
                    alt="_rock_item_"
                    className={``}
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
                />
                <p id='rock-text' className={`w-full`}>
                    {_items['rock']}
                </p>
    	    </div>
        </div>
	
        <img
            src={item_slot.src}
            height={115}
            width={115}
            alt="_item_slot_"
            className={`absolute right-0 bottom-0 p-2`}
        />
        <img
            src={_tools[_current_selected_tool]}
            height={115}
            width={115}
            alt="_item_"
	    id='tool'
            className={`absolute right-0 bottom-0 p-2 hover:transition duration-200 hover:scale-125 flex justify-center items-center`}
        />
    </>)
}
