
"use client";

import React, { useEffect, useState } from 'react';

import floppy_disk  from "@/public/floppydisk.webp";

import carrot  from "@/public/plantations/carrot0.webp";

import pine_tile  from "@/public/saplings/pine_sapling0.webp";
import tree_tile  from "@/public/saplings/tree_sapling0.webp";
import house_tile from "@/public/house_tile.webp";
import tent_tile  from "@/public/tent_tile.webp";

import grass_tile from "@/public/grass_tile.webp";
import item_slot from "@/public/item_slot.webp";
import rock_item from "@/public/rock_item.webp";
import wood_item from "@/public/wood_item.webp";

import hammer from "@/public/hammer_tool.webp";
import shovel from "@/public/shovel_tool.webp";
import hoe    from "@/public/hoe_tool.webp";

const _MAX_ITEM_AMOUNT: number = 999;


var _items: Dictionary = {
    'wood': 4,
    'rock': 3
};
var _tools: Array = [
    shovel.src,
    hammer.src,
    hoe.src
];
var _buildings: Array = [
    [house_tile.src, {'wood': 3, 'rock': 2, 'tile': 'none'  }],
    [tent_tile.src , {'wood': 1, 'rock': 1, 'tile': 'none'  }],
    [pine_tile.src , {'wood': 0, 'rock': 0, 'tile': 'none'  }],
    [tree_tile.src , {'wood': 0, 'rock': 0, 'tile': 'none'  }],
    [carrot.src    , {'wood': 0, 'rock': 0, 'tile': 'plowed'}],
]
var _current_selected_tool: number = 0;
var _current_building: number = 1;


export function GetCurrentTool() {
    return _current_selected_tool;
}
export function GetCurrentBuilding() {
    return _current_building;
}
export function GetItems() {
    return _items;
}
export function GetBuildings() {
    return _buildings;
}

export function AddItem(_item_: string, _quantity_: number) {
    _items[_item_] += _quantity_;
    let _text = document.getElementById(_item_ + '-text');
    _text.innerHTML = _items[_item_];
    return;
}
export function RemoveItem(_item_: string, _quantity_: number) {
    _items[_item_] -= _quantity_;
    let _text = document.getElementById(_item_ + '-text');
    _text.innerHTML = _items[_item_];
    return;
}

export default function Inventory() {
    useEffect(() => {
	    let _building = document.querySelectorAll('.building');
	    let _tool = document.getElementById('tool');

	    _tool.addEventListener('mousedown', () => {

	        if (_current_selected_tool < (_tools.length - 1)) {
		        _current_selected_tool += 1;
	        } else {
		        _current_selected_tool = 0;
	        }
	        _tool.src = _tools[_current_selected_tool];
		
		_building.forEach(_b => {
	            if (_current_selected_tool === 1) {
			_b.classList.remove('hidden');
	            } else {
		        _b.classList.add('hidden');
	            }
		});
	    });
	    document.getElementById('bbutton').addEventListener('mousedown', () => {
		    if (_current_building < (_buildings.length - 1)) {
		        _current_building += 1;
		    } else {
		        _current_building = 0;
		    }
		    document.getElementById('bbutton').src = _buildings[_current_building][0];
	    });
    }, []);


    return (<>
        <div className={`absolute left-0 top-0 p-8 origin-top-left grid grid-rows-5 gap-2 w-50`}>
    	    <div className={`flex justify-center flex-row items-center gap-3 w-full`}>
                <img
                    src={wood_item.src}
                    height={100}
                    width={100}
                    alt='_rock_item_'
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
                    alt='_rock_item_'
                    className={``}
                />
                <p id='rock-text' className={`w-full`}>
                    {_items['rock']}
                </p>
    	    </div>
        </div>


        <img
            src={item_slot.src}
            height={100}
            width={100}
            alt='_item_slot_'
            className={`absolute right-0 bottom-0 pointer-events-none select-none`}
       	style={{right: '10px', bottom: '10px'}}
        />
        <img
            src={_tools[_current_selected_tool]}
            height={100}
            width={100}
            alt='_item_'
       	id='tool'
            className={`absolute right-0 bottom-0 hover:transition duration-200 hover:scale-125 flex justify-center items-center select-none`}
       	style={{right: '10px', bottom: '10px'}}
        />
        <img
            src={grass_tile.src}
            height={100}
            width={100}
            alt='_building_'
            className={`building hidden absolute bottom-0 pointer-events-none select-none`}
       	style={{right: '110px', bottom: '10px'}}
        />
        <img
            src={_buildings[_current_building][0]}
            height={100}
            width={100}
            id='bbutton'
            alt='_building_'
            className={`building hidden absolute bottom-0 select-none`}
       	style={{right: '110px', bottom: '10px'}}
        />
	    
	    
        <img
            src={floppy_disk.src}
            height={100}
            width={100}
            alt='floppydisk'
            id='floppydisk'
            className={`absolute right-0 top-0 hover:transition duration-200 hover:scale-125 flex justify-center items-center select-none`}
            style={{right: '10px', bottom: '10px'}}
        />
    </>)
}
