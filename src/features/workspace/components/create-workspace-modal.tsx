'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useCreateWorkspace } from '../api/use-create-workspace';
import { useCreaateWorkspaceModal } from '../store/use-create-workspace-modal';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const CreateWorkspaceModal = () => {
	const router = useRouter();

	const [open, setOpen] = useCreaateWorkspaceModal();
	const [name, setName] = useState('');

	const { mutate, isPending } = useCreateWorkspace();

	const hanleClose = () => {
		setOpen(false);
		setName('');
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await mutate(
			{ name },
			{
				onSuccess(data) {
					toast.success('Workspace created');
					router.push(`/workspace/${data}`);
					hanleClose();
				},
			}
		);
	};
	return (
		<Dialog open={open} onOpenChange={hanleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new workspace</DialogTitle>
				</DialogHeader>

				<form action="" onSubmit={handleSubmit} className="space-y-4">
					<Input
						value={name}
						disabled={isPending}
						required
						autoFocus
						minLength={3}
						placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
						onChange={(e) => setName(e.target.value)}
					/>

					<div className="flex justify-end">
						<Button type="submit" disabled={isPending}>
							Create
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
