import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SignInFlow } from '../types';
import React, { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SignInCardProps {
	setState: React.Dispatch<React.SetStateAction<SignInFlow>>;
}

export const SignInCard: React.FC<SignInCardProps> = ({ setState }) => {
	const router = useRouter();
	const { signIn } = useAuthActions();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [pending, setPending] = useState(false);
	const [error, setError] = useState('');

	const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setPending(true);

		signIn('password', { email, password, flow: 'signIn' })
			.catch(() => setError('Invalid email or password.'))
			.finally(() => {
				setPending(false);
				router.push('/');
			});
	};

	const onProviderSignIn = (value: 'github' | 'google') => {
		setPending(true);
		signIn(value).finally(() => setPending(false));
	};

	return (
		<Card className="w-full h-full p-8">
			<CardHeader className="px-0 pt-0">
				<CardTitle>Login to continue</CardTitle>
				<CardDescription className="">
					Use your email or another service to continue
				</CardDescription>
			</CardHeader>

			{!!error && (
				<div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
					<TriangleAlert className="size-4" />
					<p>{error}</p>
				</div>
			)}

			<CardContent className="space-y-5 px-0 pb-0">
				<form onSubmit={onPasswordSignIn} action="" className="space-y-2.5">
					<Input
						disabled={false}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Email"
						required
					/>
					<Input
						disabled={false}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						// type="password"
						placeholder="Password"
						required
					/>
					<Button type="submit" className="w-full" size={'lg'} disabled={pending}>
						Continue
					</Button>
				</form>

				<Separator />

				<div className="flex flex-col gap-y-2.5">
					<Button
						type="button"
						size={'lg'}
						disabled={pending}
						onClick={() => onProviderSignIn('google')}
						variant={'outline'}
						className="w-full relative"
					>
						<FcGoogle className="size-5 absolute left-2.5 top-1/2 -translate-y-1/2" />
						Continue with Google
					</Button>
					<Button
						type="button"
						size={'lg'}
						disabled={pending}
						onClick={() => onProviderSignIn('github')}
						variant={'outline'}
						className="w-full relative"
					>
						<FaGithub className="size-5 absolute left-2.5 top-1/2 -translate-y-1/2" />
						Continue with Github
					</Button>
				</div>

				<p className="text-xs text-muted-foreground">
					Don&apos;t have an account?{' '}
					<span
						onClick={() => setState('signUp')}
						className="text-sky-700 hover:underline cursor-pointer"
					>
						Sign up
					</span>
				</p>
			</CardContent>
		</Card>
	);
};
