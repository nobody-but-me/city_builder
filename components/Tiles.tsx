"use client";


import house from "@/assets/house_tile.webp";
import grass from "@/assets/grass_tile.webp";
import pine  from "@/assets/pine_tile.webp";
import tree  from "@/assets/tree_tile.webp";
import tent  from "@/assets/tent_tile.webp";
import rock  from "@/assets/rock_tile.webp";


export default function Tiles() {
    const _MAX_TILE_COLS: string = 'grid-cols-4';
    
    const _standard_tile_animation: string = "tile transform h-38 w-24 hover:transition duration-500 hover:scale-125 flex justify-center items-center";
    const _tiles = [
	grass.src, rock.src, pine.src , grass.src,
	tree.src , grass.src, rock.src, tree.src ,
	rock.src, pine.src , grass.src, grass.src,
    ];
    
    return (
	<main className={`grid ${_MAX_TILE_COLS} gap-1`}>
	    {
		_tiles.map((_i, _j) => {
		    return (
			<img
		            height={100}
		            width={100}
		                    
		            key={_j}
		            src={_i}
		            alt="_tile_"
		                    
		            className={_standard_tile_animation}
		            style={{imageRendering: 'pixelated'}}
			/>
		    )
		})
	    }
	</main>
    )
}
