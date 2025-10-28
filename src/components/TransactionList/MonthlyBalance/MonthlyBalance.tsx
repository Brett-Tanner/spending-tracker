import { toYen } from "../../../lib/toYen";
import type { Transaction } from "../../../types/transaction";
import { balanceOwed, sumFor } from "./helpers";

interface MonthlyBalanceProps {
	transactions: Transaction[];
}

export function MonthlyBalance({ transactions }: MonthlyBalanceProps) {
	const { user, amount } = balanceOwed(transactions);
	return (
		<header className="monthly-balance">
			<section>
				<h2>Brett</h2>
				<div className="separator" />
				<p>{toYen(sumFor("Brett", transactions))}</p>
			</section>
			<section className="balance">
				{`${user} owes`}
				<br />
				{`${toYen(amount)}`}
			</section>
			<section>
				<h2>Vika</h2>
				<div className="separator" />
				<p>{toYen(sumFor("Vika", transactions))}</p>
			</section>
		</header>
	);
}
