type TransactionStatus = "completed" | "loading" | "error";

export interface RawTransaction {
	amount: number;
	category: string;
	date: number;
	description: string;
	id: number;
	user: string;
}

export interface Transaction extends Omit<RawTransaction, "date"> {
	date: Date;
	status: TransactionStatus;
}
