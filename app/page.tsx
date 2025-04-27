"use client"
import { createClient } from '@supabase/supabase-js';
import React, { useEffect } from 'react';


import Inventory from "@/components/Inventory.tsx";
import Button    from "@/components/Button.tsx";
import Tiles     from "@/components/Tiles.tsx";

import standard_box  from "@/public/standard_box.webp";
import none  from "@/public/none.webp";

export default function Home() {
    
    const _on_user_click = async () => {
	let _text_input = document.getElementById('user-input');
	if (_text_input.value === "") {
	    alert("Input can't be empty! Please, provide an username!");
	    return;
	}
	const supabase = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
	const { data: users } = await supabase.from('users').select();

	const _log_in = () => {
	    setTimeout(() => {
		document.getElementById('black-screen').remove();
		document.getElementById('user').remove();
		// I hate web programming.
		let     _i = document.getElementsByTagName('Tiles');
		let     _d = document.getElementsByClassName('tile-container');
		for(let _k=0; _k < _d.length; _k++) {
		    _d[_k].classList.add('tilep');
		}
	    }, 1200);
	}
	
	const { data, error } = await supabase.from('users').select().eq('username', _text_input.value);
	if (Object.keys(data).length !== 0)
	{
	    let _welcome = `<b>Welcome back, ${_text_input.value}!</b>`;
	    document.getElementById('user').classList.replace('w-[80vh]', 'w-[55vh]');
	    document.getElementById('user').classList.replace('h-[60vh]', 'h-[40vh]');
	    document.getElementById('user').innerHTML = _welcome;
	    _log_in();
	}
	else {
	    const { error } = await supabase.from("users").insert({ id: (Object.keys(users).length + 1), username: _text_input.value, password: _text_input.value }).select();
	    console.log('user created.');
	    
	    let _welcome = `<b>Be welcome, ${_text_input.value}!</b>`;
	    document.getElementById('user').classList.replace('w-[80vh]', 'w-[55vh]');
	    document.getElementById('user').classList.replace('h-[60vh]', 'h-[40vh]');
	    document.getElementById('user').innerHTML = _welcome;
	    _log_in();
	}
    };
    
    return (
	<div className="w-screen h-screen flex items-center justify-center p-2">
	    <div id='black-screen' className={`absolute z-10 w-screen h-screen bg-black`}></div>
	    <div id='user' className={`pop-up absolute z-20 border-10 border-solid border-black w-[80vh] h-[60vh] bg-white rounded-xl flex flex-col justify-center items-center text-xl`} style={{color: 'black'}}>
	        <p id='user-text' className={`w-[80vh] text-center`}>
	            <b>Who are you?</b>
	        </p>
	        <br />
	        <input id='user-input' name="user_name_input" className={`rounded-xl text-center border-5 border-solid border-black-500 hover:border-blue-500 w-[50vh]`} />
	        <br />
	        <Button variant="primary" _on_click={_on_user_click} _id="user-button">Join!</Button>
	    </div>
	    <Inventory />
	    <Tiles />
	</div>
    );
}

