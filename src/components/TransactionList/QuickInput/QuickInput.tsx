import type { FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import type { Category } from "../../../types/category";
import { SaveIcon } from "../../shared/Icons/SaveIcon";
import type { FormValues } from "../../../types/form";

interface QuickInputProps {
	categories: Category[];
	addTransaction: (v: FormValues) => void;
}

const defaultValues: Omit<FormValues, "user" | "date"> = {
	description: "",
	amount: 0,
	categoryId: 0,
};

export function QuickInput({ categories, addTransaction }: QuickInputProps) {
	const [editing, setEditing] = useState(false);
	const [activeInput, setActiveInput] = useState<
		"description" | "amount" | "category"
	>("description");
	const [{ description, amount, categoryId }, setValues] =
		useState<Omit<FormValues, "user" | "date">>(defaultValues);

	function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target;
		const transformedValue =
			name !== "description" ? parseInt(value, 10) : value;
		setValues((prev) => ({ ...prev, [name]: transformedValue }));
	}

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		addTransaction({ description, amount, categoryId });
		setEditing(false);
		setValues(defaultValues);
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
						min={0}
						name="amount"
						value={amount}
					/>
					<select
						className={activeInput === "category" ? "active" : ""}
						onFocus={() => setActiveInput("category")}
						onChange={onChange}
						name="categoryId"
						value={categoryId}
						required
					>
						<option value={0} disabled>
							Category
						</option>
						{categories.map(({ name, id }) => (
							<option key={id} value={id}>
								{name}
							</option>
						))}
					</select>
					<button
						type="submit"
						disabled={!description || !amount || !categoryId}
					>
						<SaveIcon />
					</button>
				</>
			)}
		</form>
	);
}
