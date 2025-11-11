import { useState } from "react";
import { Womby } from "../shared/Icons/Womby";
import {
	AddTransactionButton,
	type AddTransactionProps,
} from "./Items/AddTransaction";
import { ThemeToggle } from "./Items/ThemeToggle";

interface BubbleMenuProps extends AddTransactionProps { }

export function BubbleMenu({
	categories,
	users,
	addTransaction,
}: BubbleMenuProps) {
	const [open, setOpen] = useState(false);

	return (
		<>
			{open && (
				<>
					<AddTransactionButton
						categories={categories}
						users={users}
						addTransaction={addTransaction}
					/>
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
