import { create } from 'zustand';

// Definição dos tipos
interface Account {
	id: number;
	name: string;
	pixKey: string;
	balance: number;
}

interface Transfer {
	fromId: number;
	toId: number;
	amount: number;
	date: Date;
}

interface StoreState {
	accounts: Account[];
	transfers: Transfer[];
	currentUser: Account | null;
	setCurrentUser: (user: Account) => void;
	addAccount: (account: Account) => void;
	listAccounts: () => Account[];
	transfer: (fromId: number, toId: number, amount: number) => void;
	listTransfers: () => Transfer[];
}

// Dados iniciais
const initialAccounts: Account[] = [
	{ id: 1, name: 'Alice', pixKey: 'alice@pix', balance: 1000 },
	{ id: 2, name: 'Bob', pixKey: 'bob@pix', balance: 500 },
	{ id: 3, name: 'Charlie', pixKey: 'charlie@pix', balance: 300 }
];

export const useStore = create<StoreState>((set) => ({
	accounts: initialAccounts,
	transfers: [],
	currentUser: null,

	setCurrentUser: (user: Account) => set({ currentUser: user }),

	addAccount: (account: Account) => set((state) => ({
		accounts: [...state.accounts, account]
	})),

	listAccounts: () => initialAccounts,

	transfer: (fromId: number, toId: number, amount: number) => set((state) => {
		const fromAccount = state.accounts.find(acc => acc.id === fromId);
		const toAccount = state.accounts.find(acc => acc.id === toId);

		if (!fromAccount || !toAccount || fromAccount.balance < amount) {
			return state;
		}

		fromAccount.balance -= amount;
		toAccount.balance += amount;

		const newTransfer: Transfer = {
			fromId,
			toId,
			amount,
			date: new Date()
		};

		return {
			accounts: [...state.accounts],
			transfers: [...state.transfers, newTransfer]
		};
	}),

	listTransfers: () => [],
}));
