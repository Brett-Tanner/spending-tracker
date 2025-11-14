import { useState } from "react";
import { Womby } from "../shared/Icons/Womby";
import {
	AddTransactionButton,
	type AddTransactionProps,
} from "./Items/AddTransaction";
import { ThemeToggle } from "./Items/ThemeToggle";

interface BubbleMenuProps extends AddTransactionProps { }

export function BubbleMenu({ dialogRef }: BubbleMenuProps) {
	const [open, setOpen] = useState(false);

	return (
		<>
			{open && (
				<>
					<AddTransactionButton dialogRef={dialogRef} />
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
