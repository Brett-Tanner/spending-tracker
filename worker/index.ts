import { handleCategories } from "./handlers/categories";
import { handleTransactions } from "./handlers/transactions";
import { handleUsers } from "./handlers/users";

export interface Env {
	spending_tracker: D1Database;
}

export default {
	async fetch(request, env) {
		const { pathname } = new URL(request.url);
		const db = env.spending_tracker;

		if (pathname.startsWith("/transactions")) {
			return await handleTransactions({ db, request });
		}

		if (pathname.startsWith("/categories")) {
			return await handleCategories(db);
		}

		if (pathname.startsWith("/users")) {
			return await handleUsers(db);
		}

		return new Response(null, { status: 404 });
	},
} satisfies ExportedHandler<Env>;
