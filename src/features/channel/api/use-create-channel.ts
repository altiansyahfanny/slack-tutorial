import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useCallback, useMemo, useState } from 'react';
import { Id } from '../../../../convex/_generated/dataModel';
import { useWorkspaceId } from '@/hooks/use-workspace-id';

type Options = {
	onSuccess?: (data: ResponseType) => void;
	onError?: (error: Error) => void;
	onSettled?: () => void;
	throwError?: boolean;
};

type RequestType = {name: string; workspaceId: Id<'workspaces'>};
type ResponseType = Id<'channels'> | null;
type StatusType = 'pending' | 'success' | 'error' | 'settled' | null;

export const useCreateChannel = () => {
	const [data, setData] = useState<ResponseType>(null);
	const [error, setError] = useState<Error | null>(null);

	const [status, setStatus] = useState<StatusType>(null);

	const isPending = useMemo(() => status === 'pending', [status]);
	const isSuccess = useMemo(() => status === 'success', [status]);
	const isError = useMemo(() => status === 'error', [status]);
	const isSettled = useMemo(() => status === 'settled', [status]);

	const mutation = useMutation(api.channels.create);

	const mutate = useCallback(
		async (values: RequestType, options?: Options) => {
			try {
				setData(null);
				setError(null);
				setStatus('pending');

				const response = await mutation(values);
				options?.onSuccess?.(response);
				return response;
			} catch (error) {
				setStatus('error');
				setError(error as Error);

				options?.onError?.(error as Error);
				
				if (options?.throwError) throw error;
			} finally {
				setStatus('settled');
				options?.onSettled?.();
			}
		},
		[mutation]
	);

	return { mutate, data, error, isPending, isSuccess, isError, isSettled };
};
