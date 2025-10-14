import { handleCategories } from "./handlers/categories";
import { handleTransactionList } from "./handlers/transactionList";

export interface Env {
	spending_tracker: D1Database;
}

export default {
	async fetch(request, env) {
		const { pathname } = new URL(request.url);
		const db = env.spending_tracker;

		if (pathname.startsWith("/transactions")) {
			return await handleTransactionList(db);
		}

		if (pathname.startsWith("/categories")) {
			return await handleCategories(db);
		}

		return new Response(null, { status: 404 });
	},
} satisfies ExportedHandler<Env>;
