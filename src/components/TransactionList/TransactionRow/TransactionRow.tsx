import { shortDate } from "../../../lib/shortDate";
import { toYen } from "../../../lib/toYen";
import type { Transaction } from "../../../types/transaction";

interface TransactionRowProps {
	transaction: Transaction;
}

function onEdit() { }

export function TransactionRow({ transaction }: TransactionRowProps) {
	return (
		<div onClick={onEdit} className="transaction-row">
			<p className="user">{transaction.user[0]}</p>
			<p className="date">{shortDate(transaction.date)}</p>
			<p className="description">{transaction.description}</p>
			<p className="amount">{toYen(transaction.amount)}</p>
		</div>
	);
}
