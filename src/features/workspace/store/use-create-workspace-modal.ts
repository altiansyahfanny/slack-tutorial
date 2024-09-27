import { atom, useAtom } from 'jotai';

const modalState = atom<boolean>(false);

export const useCreaateWorkspaceModal = () => {
	return useAtom(modalState);
};
