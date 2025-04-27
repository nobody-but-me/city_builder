
"use client";

import React, { useEffect, useState } from 'react';
import { 
    Inventory, 
    AddItem, 
    RemoveItem, 
    
    GetCurrentBuilding,
    GetCurrentTool, 
    GetBuildings,
    GetItems, 
} from '@/components/Inventory.tsx'

import pine_saplings_tile0 from "@/public/saplings/pine_sapling0.webp";
import pine_saplings_tile1 from "@/public/saplings/pine_sapling1.webp";
import pine_saplings_tile2 from "@/public/saplings/pine_sapling2.webp";

import tree_saplings_tile0 from "@/public/saplings/tree_sapling0.webp";
import tree_saplings_tile1 from "@/public/saplings/tree_sapling1.webp";
import tree_saplings_tile2 from "@/public/saplings/tree_sapling2.webp";

import dry_plowed_land from '@/public/dry_plowed_land.webp';
import wet_plowed_land from '@/public/wet_plowed_land.webp';
import naked_cherry from '@/public/naked_cherry_tile.webp';
import house_preview from '@/public/house_tile.webp';
import cherry from '@/public/cherry_tile.webp';
import house from '@/public/house_tile.webp';
import grass from '@/public/grass_tile.webp';
import pine  from '@/public/pine_tile.webp';
import tree  from '@/public/tree_tile.webp';
import tent  from '@/public/tent_tile.webp';
import rock  from '@/public/rock_tile.webp';
import bush  from "@/public/bush_tile.webp";
import none  from '@/public/none.webp';


export default function Tiles() {
    const _MAX_TILE_COLS: string = 'grid-cols-6';
    
    const _tiles_map = [
	bush.src  , rock.src, pine.src  , cherry.src, pine.src , bush.src,
	tree.src  , rock.src, cherry.src, tree.src  , bush.src , pine.src,
	rock.src  , pine.src, bush.src  , cherry.src, rock.src , tree.src,
	cherry.src, pine.src, rock.src  , bush.src  , rock.src , tree.src
    ];
    
    // TODO: perhaps there are better ways to do the game loop.
    useEffect(() => {
	const _buildings: Array = GetBuildings();

	var _tiles = document.getElementsByClassName('tile');
	var _current_buildings: number = GetCurrentBuilding();
	var _items: Dictionary = GetItems();

	setInterval(() => {
	    for (let _i = 0; _i < _tiles.length; _i++) {
		if (!_tiles[_i].classList.contains('preview')) {
		    // TODO: find a better way to make this logic.
		    switch (_tiles[_i].alt) {
			    // pine growing;
			case pine_saplings_tile0.src:
			    _tiles[_i].src = pine_saplings_tile1.src;
			    _tiles[_i].alt = pine_saplings_tile1.src;
			    break;
			case pine_saplings_tile1.src:
			    _tiles[_i].src = pine_saplings_tile2.src;
			    _tiles[_i].alt = pine_saplings_tile2.src;
			    break;
			case pine_saplings_tile2.src:
			    _tiles[_i].src = pine.src;
			    _tiles[_i].alt = pine.src;
			    break;

			    // tree growing;
			case tree_saplings_tile0.src:
			    _tiles[_i].src = tree_saplings_tile1.src;
			    _tiles[_i].alt = tree_saplings_tile1.src;
			    break;
			case tree_saplings_tile1.src:
			    _tiles[_i].src = tree_saplings_tile2.src;
			    _tiles[_i].alt = tree_saplings_tile2.src;
			    break;
			case tree_saplings_tile2.src:
			    _tiles[_i].src = tree.src;
			    _tiles[_i].alt = tree.src;
			    break;
		    }
		}
	    }
	}, 5000);

	for(let _i = 0; _i < _tiles.length; _i++) {
	    const _tile = _tiles[_i];
	    let _tmp;

	    let _overlay = _tile.parentElement.querySelector('.overlay');
	    // that's a fucking mess
	    // tile preview when the hammer is selected
	    // PREVIEW ON
	    _tile.parentElement.onmouseover = () => {
		_current_buildings = GetCurrentBuilding();
		_tmp = _overlay.alt;

		if (GetCurrentTool() === 1) {
		    if (_tile.alt === none.src || _tile.alt === dry_plowed_land.src || _tile.alt === wet_plowed_land.src) {
			if (_items['wood'] >= _buildings[_current_buildings][1]['wood'] && _items['rock'] >= _buildings[_current_buildings][1]['rock']) {
			    _overlay.src = _buildings[_current_buildings][0];
			    _overlay.alt = _buildings[_current_buildings][0];

			    _overlay.classList.add('preview');
			}
		    }
		}
	    }
	    // PREVIEW OUT
	    _tile.parentElement.onmouseout = () => {
		if (GetCurrentTool() === 1) {
		    if (_overlay.classList.contains('preview')) {
			_overlay.src = _tmp;
			_overlay.alt = _tmp;

			_overlay.classList.remove('preview');
		    }
		}
	    }
	    // Building and removing tiles// SHOVEL
	    _tile.parentElement.onmousedown = () => {
		let _current_tool: number = GetCurrentTool();
		// SHOVEL
		if (_current_tool === 0) {
		    switch (_tile.alt) {
			case bush.src:
			case naked_cherry.src:
			    _tile.src = none.src;
			    _tile.alt = none.src;
			    break;
			case dry_plowed_land.src:
			    let _overlay = _tile.parentElement.querySelector('.overlay');
			    if (_overlay.src === none.src) {
				_tile.src = none.src;
				_tile.alt = none.src;
				break;
			    }
			case rock.src:
			    _tile.src = none.src;
			    _tile.alt = none.src;
			    AddItem('rock', 2);
			    break;
			case pine.src:
			case tree.src:
			    _tile.src = none.src;
			    _tile.alt = none.src;
			    AddItem('wood', 3);
			    break;
			case cherry.src:
			    _tile.src = naked_cherry.src;
			    _tile.alt = naked_cherry.src;
			    break;
		    }
		}
		// HAMMER
		else if (_current_tool === 1) {
		    if (_items['wood'] >= _buildings[_current_buildings][1]['wood'] && _items['rock'] >= _buildings[_current_buildings][1]['rock']) {
			let _tile_: string = _buildings[_current_buildings][1]['tile'];
			switch (_tile_) {
			    case 'none':
				if (_tile.alt === none.src) {
				    RemoveItem('wood', _buildings[_current_buildings][1]['wood']);
				    RemoveItem('rock', _buildings[_current_buildings][1]['rock']);
				    _tile.src = _buildings[_current_buildings][0];
				    _tile.alt = _buildings[_current_buildings][0];
				    _tmp = none.src;
				    break;
				}
			    case 'plowed':
				if (_tile.alt === dry_plowed_land.src || _tile.alt === wet_plowed_land.src) {
				    if (_buildings[_current_buildings][1]['tile'] === 'plowed') {
					RemoveItem('wood', _buildings[_current_buildings][1]['wood']);
					RemoveItem('rock', _buildings[_current_buildings][1]['rock']);
					let _overlay = _tile.parentElement.querySelector('.overlay');
					_overlay.src = _buildings[_current_buildings][0];
					_overlay.alt = _buildings[_current_buildings][0];
					_tmp = _buildings[_current_buildings][0];
				    }
				}
				break;
			}
		    }
		}
		// HOE
		else if (_current_tool === 2) {
		    if (_tile.alt === none.src) {
			_tile.src = dry_plowed_land.src;
			_tile.alt = dry_plowed_land.src;
			// _tmp = _buildings[_current_buildings][0];
		    }
		}
	    };
	}
    }, []);

    return (
	<main className={`grid ${_MAX_TILE_COLS} gap-1 flex justify-center`}>
	    {
		_tiles_map.map((_i, _j) => {
		    const _columns: number = 6;
		    const _r = Math.floor(_j / _columns);
		    const _c = _j % _columns;

		    const _darker = (_r + _c) % 2 !== 0;
		    return (
			<div key={_j} className={`tile-container min-h-25 min-w-25 relative rounded-x1 rounded-xl hover:transition duration-200 hover:scale-125 select-none hover:ring-4 hover:z-10`} style={{animationDelay: `${_j * 0.1}s`, transform: 'translateY(-100vh)'}}>
			    <img
			        height={100}
			        width={100}
			        
			        src={grass.src}
			        alt={grass.src}
			        
			        className={`grass pointer-events-none absolute bottom-0 min-h-25 min-w-25`}
			        style={{
			            filter: _darker ? 'brightness(100%)' : 'brightness(60%)'
			        }}
			    />
			    <img
			        height={100}
			        width={100}
			        
			        src={_i}
			        alt={_i}
			        
			        className={`tile pointer-events-none absolute bottom-0 min-h-25 min-w-25`}
			    />
			    <img
			        height={100}
			        width={100}
			        
			        src={none.src}
			        alt={none.src}
			        
			        className={`overlay pointer-events-none absolute bottom-0 min-h-25 min-w-25`}
			    />
			</div>
		    )
		})
	    }
	</main>
    )
}
// absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/5
