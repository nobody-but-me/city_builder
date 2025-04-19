import Image from "next/image";
import Tiles from "@/components/Tiles.tsx"


export default function Home() {
    return (
	<div className="w-full h-full flex items-center justify-center p-16">
	    <Tiles />
	</div>
    );
}

