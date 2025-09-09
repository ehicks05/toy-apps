import type { User } from '@instantdb/react';
import { UserIcon } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { db } from '../services/instant';
import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';

export function LoginDialog() {
	const { user } = db.useAuth();

	return (
		<Dialog>
			<DialogTrigger className="p-1 border border-neutral-600 rounded cursor-pointer">
				<UserIcon />
			</DialogTrigger>
			<DialogContent className="bg-neutral-900 text-white">
				{!user && <Login />}
				{user && <LoggedIn user={user} />}
			</DialogContent>
		</Dialog>
	);
}

function Login() {
	const [sentEmail, setSentEmail] = useState('');

	return (
		<div className="flex justify-center items-center min-h-1/4">
			<div className="max-w-sm">
				{!sentEmail ? (
					<EmailStep onSendEmail={setSentEmail} />
				) : (
					<CodeStep sentEmail={sentEmail} />
				)}
			</div>
		</div>
	);
}

export function LoggedIn({ user }: { user: User }) {
	return (
		<div className="flex justify-center items-center min-h-1/4">
			<div className="flex flex-col gap-4 max-w-sm">
				<DialogTitle>Welcome {user.email}!</DialogTitle>
				<DialogDescription>You are currently signed in.</DialogDescription>
				<Button variant="secondary" onClick={() => db.auth.signOut()}>
					Sign out
				</Button>
			</div>
		</div>
	);
}

function EmailStep({ onSendEmail }: { onSendEmail: (email: string) => void }) {
	const [email, setEmail] = useState('');
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSendEmail(email);
		db.auth.sendMagicCode({ email }).catch((err) => {
			alert(`Uh oh :${err.body?.message}`);
			onSendEmail('');
		});
	};

	return (
		<form
			key="email"
			onSubmit={handleSubmit}
			className="flex flex-col space-y-4"
		>
			<DialogTitle className="text-xl font-bold">Let's log you in</DialogTitle>
			<DialogDescription className="text-neutral-400">
				Enter your email, and we'll send you a verification code. We'll create
				an account for you too if you don't already have one.
			</DialogDescription>
			<input
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				type="email"
				className="border border-gray-300 px-3 py-1 w-full"
				placeholder="Enter your email"
				required
				autoFocus
			/>
			<button
				type="submit"
				className="px-3 py-1 bg-blue-600 text-white font-bold hover:bg-blue-700 w-full"
			>
				Send Code
			</button>
		</form>
	);
}

function CodeStep({ sentEmail }: { sentEmail: string }) {
	const [code, setCode] = useState('');
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		db.auth.signInWithMagicCode({ email: sentEmail, code }).catch((err) => {
			setCode('');
			alert(`Uh oh :${err.body?.message}`);
		});
	};

	return (
		<form
			key="code"
			onSubmit={handleSubmit}
			className="flex flex-col space-y-4"
		>
			<DialogTitle className="text-xl font-bold">Enter your code</DialogTitle>
			<DialogDescription className="text-gray-700">
				We sent an email to <strong>{sentEmail}</strong>. Check your email, and
				paste the code you see.
			</DialogDescription>
			<input
				value={code}
				onChange={(e) => setCode(e.target.value)}
				type="text"
				className="border border-gray-300 px-3 py-1 w-full"
				placeholder="123456..."
				required
				autoFocus
			/>
			<button
				type="submit"
				className="px-3 py-1 bg-blue-600 text-white font-bold hover:bg-blue-700 w-full"
			>
				Verify Code
			</button>
		</form>
	);
}
