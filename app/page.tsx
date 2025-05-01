
"use client"
import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';


import Inventory from "@/components/Inventory.tsx";
import Button    from "@/components/Button.tsx";
import Tiles     from "@/components/Tiles.tsx";

import standard_box  from "@/public/standard_box.webp";
import supabase from "@/app/supabase.js";
import none  from "@/public/none.webp";

const _SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const _SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const _supabase = createClient(_SUPABASE_URL, _SUPABASE_KEY);

var _is_login: boolean = false;

export default function Home() {
    const _change_login = () => {
	_is_login = true;
	document.getElementById('user-text').innerHTML = `<b>Log In</b>`;
	document.getElementById('user-button').innerHTML = `Play!`;
    }
    
    const _register_user = async (_username, _password) => {
	const { data, error } = await _supabase.rpc('register_user', {
	    p_username: _username,
	    p_password: _password
	});
	if (error) {
	    throw error;
	}
    };
    const _login_animation = () => {
	document.getElementById('user').classList.replace('w-[80vh]', 'w-[55vh]');
	document.getElementById('user').classList.replace('h-[60vh]', 'h-[40vh]');
	let _welcome = `<b>Let's finally start to play!</b>`;
	document.getElementById('user').innerHTML = _welcome;
	setTimeout(() => {
	    document.getElementById('black-screen').remove();
	    document.getElementById('user').remove();
	    let     _i = document.getElementsByTagName('Tiles');
	    let     _d = document.getElementsByClassName('tile-container');
	    for(let _k=0; _k < _d.length; _k++) {
		_d[_k].classList.add('tilep');
	    }
	}, 1200);
    }
    const _login = async (_username, _password) => {
	const { data, error } = await _supabase.rpc('auth_user', {
	    p_username: _username,
	    p_password: _password
	});
	if (error) {
	    throw error;
	}
	return data;
    };
    
    // Log in logic.
    const _user_button_click = async () => {
	let _user_password = document.getElementById('password-input');
	let _user_username = document.getElementById('user-input');
	if (_user_username.value === "" || _user_password.value === "") {
	    console.error("Credentials inputs can't be empty!");
	    return;
	}
	
	if (_is_login === false) {
	    try {
		await _register_user(_user_username.value, _user_password.value);
		const _auth = await _login(_user_username.value, _user_password.value);
		alert('You are logged! :: ', _auth);
		_login_animation();
	    } catch (err) {
		if (err.message === 'Username have already been taken.') {
		    document.getElementById('user-text').innerHTML = `<b>Sign Up</b><br><b style="color: red;">${err.message}</b>`;
		}
		console.error('Error :: ', err.message);
	    }
	} else {
	    try {
		const _auth = await _login(_user_username.value, _user_password.value);
		alert('You are logged! :: ', _auth);
		_login_animation();
	    } catch(err) {
		console.error('Error :: ', err.message);
	    }
	}
    };
    
    return (
	<div className="w-screen h-screen flex items-center justify-center p-2">
	    <div id='black-screen' className={`absolute z-10 w-screen h-screen bg-black`}></div>
	    <div id='user' className={`pop-up absolute z-20 border-10 border-solid border-black w-[80vh] h-[60vh] bg-white rounded-xl text-xl flex flex-col justify-around items-center`} style={{color: 'black'}}>
	        <div className="flex flex-col justify-center items-center">
	            <p id='user-text' className={`w-[80vh] text-center`}>
	                <b>Sign Up</b>
	            </p>
	            <input id='user-input' name="user_name_input" placeholder="username" className={`rounded-xl text-center border-5 border-solid border-black-500 hover:border-blue-500 w-[65vh] mt-5 mb-1`} />
	            <input id='password-input' name="password_input" placeholder="password" className={`rounded-xl text-center border-5 border-solid border-black-500 hover:border-blue-500 w-[65vh] mb-5 mt-1`} />
	            <Button variant="primary" _on_click={_user_button_click} _id="user-button">Join!</Button>
	        </div>
	        <a className="mt-5 text-sm" onClick={_change_login}>Log-in</a>
	    </div>
	    <Inventory />
	    <Tiles />
	</div>
    );
}

