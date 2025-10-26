export interface RawTransaction {
	amount: number;
	category: string;
	categoryId: number;
	date: number;
	description: string;
	id: number;
	user: string;
	userId: number;
}

export interface Transaction extends Omit<RawTransaction, "date"> {
	date: Date;
}
