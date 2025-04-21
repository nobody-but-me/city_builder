

import Inventory from "@/components/Inventory.tsx";
import Tiles     from "@/components/Tiles.tsx";


export default function Home() {
    return (
	<div className="w-screen h-screen flex items-center justify-center p-16">
	    <Inventory />
	    <Tiles />
	</div>
    );
}

