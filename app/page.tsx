"use client"
import { createClient } from '@supabase/supabase-js';
import React, { useEffect } from 'react';


import Inventory from "@/components/Inventory.tsx";
import Button    from "@/components/Button.tsx";
import Tiles     from "@/components/Tiles.tsx";

import standard_box  from "@/public/standard_box.webp";
import none  from "@/public/none.webp";

export default function Home() {
    var _login_state: number = 0;
    var _new_user: bool = false;
    var _username: string = "";
    var _password: string = "";
    
    // maybe this code sucks. If so, sorry for that.
    const _user_input = async () => {
	let user_input = document.getElementById('user-input');
	if (user_input.value === "") {
	    alert("Text input can't be empty!");
	    return;
	}
	
	const supabase = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
	const { data: users } = await supabase.from('users').select();
	let user_button = document.getElementById('user-button');
	let user_text = document.getElementById('user-text');
	let user = document.getElementById('user');
	
	const _log_in = () => {
	    user.classList.replace('w-[80vh]', 'w-[55vh]');
	    user.classList.replace('h-[60vh]', 'h-[40vh]');
	    let _welcome = `<b>Let's finally start to play!</b>`;
	    document.getElementById('user').innerHTML = _welcome;
	    // I hate web programming
	    setTimeout(() => {
		document.getElementById('black-screen').remove();
		user.remove();
		let     _i = document.getElementsByTagName('Tiles');
		let     _d = document.getElementsByClassName('tile-container');
		for(let _k=0; _k < _d.length; _k++) {
		    _d[_k].classList.add('tilep');
		}
	    }, 1200);
	}
	
	if (_login_state === 0) {
	    const { data, error } = await supabase.from('users').select().eq('username', user_input.value);
	    _username = user_input.value;
	    if (Object.keys(data).length === 0) {
		user_text.innerHTML = `<b>Welcome, ${user_input.value}! Since that's your first time here, could you please create a password for your account?</b>`;
		_new_user = true;
	    } else {
		user_text.innerHTML = `<b>Welcome back, ${user_input.value}, could you please provide your password?</b>`;
	    }
	    user.classList.replace('w-[80vh]', 'w-[100vh]');
	    user_button.innerHTML = `Play!`;
	    user_input.value = "";
	    _login_state = 1;
	    return;
	} else {
	    const { data, error } = await supabase.from('users').select().eq('password', user_input.value);
	    if (_new_user === false) {
		if (Object.keys(data).length === 0) {
		    alert("That's not the right password for this user! Try again.");
		    user_input.value = "";
		    return;
		} else {
		    _log_in();
		}
	    } else {
		_password = user_input.value;
		const { error } = await supabase.from("users").insert({ id: (Object.keys(users).length + 1), username: _username, password: _password }).select();
		_log_in();
	    }
	}
    }
    
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
	        <Button variant="primary" _on_click={_user_input} _id="user-button">Join!</Button>
	    </div>
	    <Inventory />
	    <Tiles />
	</div>
    );
}

