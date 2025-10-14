import { FormEvent, useState, type ChangeEvent } from "react";
import type { Category } from "../../../types/category";
import { SaveIcon } from "../../shared/Icons/SaveIcon";
import type { FormValues, Input } from "../../../types/form";

interface QuickInputProps {
	categories: Category[];
	addTransaction: (v: FormValues) => void;
}

export function QuickInput({ categories, addTransaction }: QuickInputProps) {
	const [editing, setEditing] = useState(false);
	const [activeInput, setActiveInput] = useState<Input>("description");
	const [{ description, amount, category }, setValues] = useState<
		Record<Input, string>
	>({
		description: "",
		amount: "0",
		category: "",
	});

	function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		addTransaction({ description, amount, category });
		setEditing(false);
		setValues({ description: "", amount: "0", category: "" });
	}

	return (
		<form onSubmit={onSubmit} className="quick-input">
			<input
				className={activeInput === "description" ? "active" : ""}
				name="description"
				onFocus={() => {
					setEditing(true);
					setActiveInput("description");
				}}
				onChange={onChange}
				placeholder={editing ? "Description" : "Add transaction"}
				required
				type="text"
				value={description}
			/>
			{editing && (
				<>
					<input
						className={activeInput === "amount" ? "active" : ""}
						inputMode="numeric"
						placeholder="Amount"
						onFocus={() => setActiveInput("amount")}
						onChange={onChange}
						required
						type="tel"
						min="0"
						name="amount"
						value={amount}
					/>
					<select
						className={activeInput === "category" ? "active" : ""}
						onFocus={() => setActiveInput("category")}
						onChange={onChange}
						name="category"
						value={category}
						required
					>
						<option value="" disabled>
							Category
						</option>
						{categories.map(({ name, id }) => (
							<option key={id} value={name}>
								{name}
							</option>
						))}
					</select>
					<button
						type="submit"
						aria-label="Save"
						disabled={!description || !amount || !category}
					>
						<SaveIcon />
					</button>
				</>
			)}
		</form>
	);
}
