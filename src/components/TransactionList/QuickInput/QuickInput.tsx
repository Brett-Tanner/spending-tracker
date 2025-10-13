import { useState, type FormEvent } from "react";
import type { Category } from "../../../types/category";
import { SaveIcon } from "../../shared/Icons/SaveIcon";

interface QuickInputProps {
	categories: Category[];
}

function addTransaction(e: FormEvent) {
	e.preventDefault();
}

type Input = "description" | "amount" | "category";

export function QuickInput({ categories }: QuickInputProps) {
	const [editing, setEditing] = useState(false);
	const [activeInput, setActiveInput] = useState<Input>("description");

	return (
		<form onSubmit={addTransaction} className="quick-input">
			<input
				className={activeInput === "description" ? "active" : ""}
				name="description"
				onFocus={() => {
					setEditing(true);
					setActiveInput("description");
				}}
				placeholder={editing ? "Description" : "Add transaction"}
				required
				type="text"
			/>
			{editing && (
				<>
					<input
						className={activeInput === "amount" ? "active" : ""}
						inputMode="numeric"
						placeholder="Amount"
						onFocus={() => setActiveInput("amount")}
						required
						type="tel"
						min="0"
					/>
					<select
						className={activeInput === "category" ? "active" : ""}
						onFocus={() => setActiveInput("category")}
						required
					>
						<option value="" disabled selected>
							Category
						</option>
						{categories.map(({ name }) => (
							<option value={name}>{name}</option>
						))}
					</select>
					<button type="submit" aria-label="Save">
						<SaveIcon />
					</button>
				</>
			)}
		</form>
	);
}
