import type { CreateTransactionParams } from "./createTransaction";

interface UpdateTransactionParams extends CreateTransactionParams {
	id: number;
}

export async function updateTransaction({
	id,
	description,
	amount,
	categoryId,
	date,
	userId,
}: UpdateTransactionParams) {
	const response = await fetch("/transactions/", {
		method: "PATCH",
		body: JSON.stringify({
			id,
			description,
			amount,
			categoryId,
			date,
			userId,
		}),
	});

	if (response.status !== 200) throw new Error("Failed to update transaction");

	return await response.json();
}
