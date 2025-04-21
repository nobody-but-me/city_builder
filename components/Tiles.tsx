
"use client";

import React, { useEffect, useState } from 'react';
import { Inventory, AddItem, RemoveItem, GetCurrentTool, GetItems } from '@/components/Inventory.tsx';

import house_preview from '@/public/house_tile.webp';
import house from '@/public/house_tile.webp';
import grass from '@/public/grass_tile.webp';
import pine  from '@/public/pine_tile.webp';
import tree  from '@/public/tree_tile.webp';
import tent  from '@/public/tent_tile.webp';
import rock  from '@/public/rock_tile.webp';


export default function Tiles() {
    const _MAX_TILE_COLS: string = 'grid-cols-4';
    
    const _standard_tile_animation: string = "tile transform h-38 w-24 hover:transition duration-200 hover:scale-125 flex justify-center items-center";
    const _tiles_map = [
	grass.src, rock.src , pine.src , grass.src,
	tree.src , grass.src, rock.src , tree.src ,
	rock.src , pine.src , grass.src, grass.src,
    ];
    
    // TODO: perhaps there are better ways to do the game loop.
    useEffect(() => {
	var _tiles = document.getElementsByClassName('tile');
	var _items: Dictionary = GetItems();
	
	for(let _i = 0; _i < _tiles.length; _i++) {
	    const _tile = _tiles[_i];
	    let _tmp; 
	    
	    // that's a mess
	    _tiles[_i].onmouseover = () => {
		_tmp = _tile.alt;
		if (GetCurrentTool() === 0) {
		    if (_tile.alt === grass.src) {
			if (_items['wood'] >= 3 && _items['rock'] >= 2) {
			    _tile.src = house.src;
			    _tile.alt = house.src;
			}
		    }
		}
	    }
	    _tiles[_i].onmouseout = () => {
		if (GetCurrentTool() === 0) {
		    if (_tile.alt === house.src) {
			_tile.src = _tmp;
			_tile.alt = _tmp;
		    }
		}
	    }
	    _tiles[_i].onmousedown = () => {
		if (GetCurrentTool() === 1) {
		    switch (_tile.alt) {
			case rock.src:
			    _tile.src = grass.src;
			    _tile.alt = grass.src;
			    AddItem('rock', 1);
			    break;
			case pine.src:
			case tree.src:
			    _tile.src = grass.src;
			    _tile.alt = grass.src;
			    AddItem('wood', 1);
			    break;
		    }
		} 
		else if (GetCurrentTool() === 0) {
		    if (_items['wood'] >= 3 && _items['rock'] >= 2) {
			if (_tmp === grass.src) {
			    _tile.src = house.src;
			    _tile.alt = house.src;
			    RemoveItem('wood', 3);
			    RemoveItem('rock', 2);
			    _tmp = house.src;
			    console.log('built a house');
			}
		    }
		}
	    };
	}
    }, []);
    return (
	<main className={`grid ${_MAX_TILE_COLS} gap-1 flex justify-center items-center`}>
	    {
		_tiles_map.map((_i, _j) => {
		    return (
			<img
		            height={100}
		            width={100}
		                    
		            key={_j}
		            src={_i}
		            alt={_i}
		            
		            className={_standard_tile_animation}
			/>
		    )
		})
	    }
	</main>
    )
}
