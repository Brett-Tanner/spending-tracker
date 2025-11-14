import { shortDate } from "../../../lib/shortDate";
import { toYen } from "../../../lib/toYen";
import type { Transaction } from "../../../types/transaction";

interface TransactionRowProps {
	transaction: Transaction;
	onEdit: (transaction: Transaction) => void;
}

export function TransactionRow({ transaction, onEdit }: TransactionRowProps) {
	return (
		<div onClick={() => onEdit(transaction)} className="transaction-row">
			<p className="user">{transaction.user[0]}</p>
			<p className="date">{shortDate(transaction.date)}</p>
			<p className="description">{transaction.description}</p>
			<p className="amount">{toYen(transaction.amount)}</p>
		</div>
	);
}
