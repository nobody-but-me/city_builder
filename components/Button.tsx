


export default function Button({ children, _id, _on_click }) {
    const _styles = "px-4 py-2 rounded-xl font-medium text-center transition duration-200 border-5 border-solid border-black hover:border-blue-500";
    return (
	<button id={_id} onClick={_on_click} className={`${_styles}`}>
	    {children}
	</button>
    );
}
