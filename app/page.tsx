import Image from "next/image";

import house from "../assets/house_tile.webp";
import grass from "../assets/grass_tile.webp";
import tent  from "../assets/tent_tile.webp";

export default function Home() {
    const _MAX_TILE_COLS: string = 'grid-cols-5';
    
    const _standard_tile_animation: string = "transform h-38 w-24 hover:transition duration-500 hover:scale-125 flex justify-center items-center";
    const _tiles = [
	grass.src, house.src, grass.src, grass.src, grass.src,
	grass.src, grass.src, tent.src , grass.src, tent.src ,
	house.src, grass.src, grass.src, house.src, grass.src,
    ];
    
    return (
	<div className="w-full h-full flex items-center justify-center">
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
	</div>
    );
}

// <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
// <div className="w-full h-full flex items-center justify-center">
//     <main className="grid grid-cols-4 gap-1">
//         // {_tile_map.map((_i, _j) => (
// 	//     <img
// 	//         height={100}
// 	//         width={100}

// 	//         key={_j}
// 	//         src={_i}
// 	//         alt="tile"

// 	//         className={_standard_tile_animation}
// 	//         style={{imageRendering: 'pixelated'}}
// 	//     >
// 	// ))}
//     </main>
// </div>
