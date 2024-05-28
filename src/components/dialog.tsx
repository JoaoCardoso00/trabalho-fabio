"use client"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useStore } from "@/store/pix"

export function DialogDemo() {
	const [pixKey, setPixKey] = useState("")
	const [amount, setAmount] = useState<number | string>("")
	const transfer = useStore((state) => state.transfer)
	const accounts = useStore((state) => state.accounts)
	const currentUser = useStore((state) => state.currentUser)

	const handleTransfer = () => {
		if (!currentUser) {
			alert("Selecione um usuário atual primeiro.");
			return;
		}

		const toAccount = accounts.find((acc) => acc.pixKey === pixKey)

		if (toAccount && amount) {
			transfer(currentUser.id, toAccount.id, typeof amount === "string" ? parseFloat(amount) : amount)
			setPixKey("")
			setAmount("")
		} else {
			alert("Verifique as informações e tente novamente.")
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="ml-auto">
					<Button variant="outline" className="bg-indigo-600 text-white">faz o pix papai</Button>
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Pix</DialogTitle>
					<DialogDescription>
						Devia ter jogado no tigrinho
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="pixKey" className="text-right">
							Chave Pix
						</Label>
						<Input
							id="pixKey"
							className="col-span-3"
							value={pixKey}
							onChange={(e) => setPixKey(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="amount" className="text-right">
							Quantidade
						</Label>
						<Input
							id="amount"
							className="col-span-3"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="button" onClick={handleTransfer}>Lança o pix</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
