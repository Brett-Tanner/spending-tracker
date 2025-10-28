import { useState } from "react";
import { Womby } from "../shared/Icons/Womby";
import { AddTransaction } from "./Items/AddTransaction";
import { ThemeToggle } from "./Items/ThemeToggle";

export function BubbleMenu() {
	const [open, setOpen] = useState(false);

	return (
		<>
			{open && (
				<>
					<AddTransaction />
					<ThemeToggle />
				</>
			)}

			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="bubble-menu-toggle"
			>
				<Womby />
			</button>
		</>
	);
}
