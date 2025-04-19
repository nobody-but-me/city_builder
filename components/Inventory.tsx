
"use client";

import item_slot from "@/public/item_slot.webp";

export default function Inventory() {
    return (
	<div className="absolute left-0 p-8 origin-top-left grid grid-rows-5 gap-2">
	    <img src={item_slot.src} width={100} height={100} alt="_slot_" style={{imageRendering: 'pixelated'}} />
	    <img src={item_slot.src} width={100} height={100} alt="_slot_" style={{imageRendering: 'pixelated'}} />
	    <img src={item_slot.src} width={100} height={100} alt="_slot_" style={{imageRendering: 'pixelated'}} />
	    <img src={item_slot.src} width={100} height={100} alt="_slot_" style={{imageRendering: 'pixelated'}} />
	    <img src={item_slot.src} width={100} height={100} alt="_slot_" style={{imageRendering: 'pixelated'}} />
	</div>
    )
}
