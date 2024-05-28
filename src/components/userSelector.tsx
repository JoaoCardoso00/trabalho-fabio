"use client"

import { useStore } from "@/store/pix";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ChevronDown, PaperclipIcon } from "lucide-react";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export function UserSelector() {
	const accounts = useStore((state) => state.accounts);
	const currentUser = useStore((state) => state.currentUser);
	const setCurrentUser = useStore((state) => state.setCurrentUser);

	return (
		<Listbox value={currentUser} onChange={setCurrentUser}>
			{({ open }) => (
				<>
					<div className="relative z-50">
						<Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
							<span className="block truncate">{currentUser ? currentUser.name : "Selecione um usuário"}</span>
							<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
								<ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
							</span>
						</Listbox.Button>
						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
								{accounts.map((account) => (
									<Listbox.Option
										key={account.id}
										className={({ active }) =>
											classNames(
												active ? 'text-white bg-indigo-600' : 'text-gray-900',
												'cursor-default select-none relative py-2 pl-3 pr-9'
											)
										}
										value={account}
									>
										{({ selected, active }) => (
											<>
												<span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
													{account.name}
												</span>
												{selected ? (
													<span
														className={classNames(
															active ? 'text-white' : 'text-indigo-600',
															'absolute inset-y-0 right-0 flex items-center pr-4'
														)}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
}
