import {
	useState,
	type ChangeEvent,
	type FormEvent,
	type RefObject,
} from "react";
import type { Transaction } from "../../../types/transaction";
import type { FormValues } from "../../../types/form";
import type { Category } from "../../../types/category";
import type { User } from "../../../types/user";

interface TransactionDialogProps {
	ref: RefObject<HTMLDialogElement | null>;
	transaction?: Transaction;
	categories: Category[];
	users: User[];
	submitCallback: (v: FormValues) => void;
}

const defaultState: FormValues = {
	description: "",
	amount: 0,
	categoryId: 0,
	userId: 0,
	date: "",
};

function getInitialState(transaction?: Transaction): FormValues {
	return transaction
		? {
			description: transaction.description,
			amount: transaction.amount,
			categoryId: transaction.categoryId,
			userId: transaction.userId,
			date: transaction.date.toString(),
		}
		: defaultState;
}

export function TransactionDialog({
	transaction,
	ref,
	submitCallback,
	categories,
	users,
}: TransactionDialogProps) {
	const [{ description, amount, categoryId, userId, date }, setFormValues] =
		useState<FormValues>(getInitialState(transaction));

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		submitCallback({ description, amount, categoryId, userId, date });
		ref.current?.close();
		setFormValues(defaultState);
	};

	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<dialog ref={ref} closedby="any">
			<form onSubmit={onSubmit} className="full-transaction-form">
				<h1>{transaction ? "Edit Transaction" : "Add Transaction"}</h1>
				<input
					name="description"
					placeholder="Description"
					onChange={onChange}
					required
					value={description}
				/>
				<input
					name="amount"
					type="tel"
					placeholder="Amount"
					onChange={onChange}
					required
					value={amount}
				/>
				<select
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
				<select onChange={onChange} name="userId" value={userId} required>
					<option value={0} disabled>
						User
					</option>
					{users.map(({ name, id }) => (
						<option key={id} value={id}>
							{name}
						</option>
					))}
				</select>
				<input type="date" name="date" onChange={onChange} value={date} />
				<button type="submit">Submit</button>
			</form>
		</dialog>
	);
}
