
"use client";

import React, { useEffect, useState } from 'react';
import { Inventory, AddItem } from '@/components/Inventory.tsx';

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
	
	for(let _i = 0; _i < _tiles.length; _i++) {
	    _tiles[_i].onmousedown = () => {
		const _tile = _tiles[_i];
		
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
