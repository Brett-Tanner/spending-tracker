import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Category } from "../../../types/category";
import { SaveIcon } from "../../shared/Icons/SaveIcon";
import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "../../../api/transactions/createTransaction";
import type { Input } from "../../../types/form";
import type { User } from "../../../types/user";

interface QuickInputProps {
	categories: Category[];
	user: User;
}

export function QuickInput({ categories, user }: QuickInputProps) {
	const [editing, setEditing] = useState(false);
	const [activeInput, setActiveInput] = useState<Input>("description");
	const [{ description, amount, categoryId }, setValues] = useState<
		Record<Input, string>
	>({
		description: "",
		amount: "0",
		categoryId: "",
	});
	const { mutate } = useMutation({
		mutationFn: createTransaction,
		onSuccess: (value) => {
			console.log(value);
		},
	});

	function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	function addTransaction(e: FormEvent) {
		e.preventDefault();

		mutate({ description, amount, categoryId, userId: user.id });
	}

	return (
		<form onSubmit={addTransaction} className="quick-input">
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
						className={activeInput === "categoryId" ? "active" : ""}
						onFocus={() => setActiveInput("categoryId")}
						onChange={onChange}
						name="categoryId"
						value={categoryId}
						required
					>
						<option value="" disabled>
							Category
						</option>
						{categories.map(({ name, id }) => (
							<option key={name} value={id.toString()}>
								{name}
							</option>
						))}
					</select>
					<button
						type="submit"
						aria-label="Save"
						disabled={!description || !amount || !categoryId}
					>
						<SaveIcon />
					</button>
				</>
			)}
		</form>
	);
}
