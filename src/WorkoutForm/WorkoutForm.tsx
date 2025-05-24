import { id } from '@instantdb/react';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { db } from '../services/instant';

const f = (date: Date) => {
	const m = `0${date.getMonth() + 1}`.slice(-2);
	const d = `0${date.getDate()}`.slice(-2);
	const y = date.getFullYear();
	return `${y}-${m}-${d}`;
};

export const WorkoutForm = () => {
	const { user } = db.useAuth();
	const [isOpen, setIsOpen] = useState(false);

	const [date, setDate] = useState(f(new Date()));
	const [location, setLocation] = useState('');
	const [notes, setNotes] = useState('');

	const handleSubmit = async () => {
		const isValid = date.length > 0;

		if (isValid && user) {
			console.log('submitting...');
			const data = { date, location, notes };
			await db.transact([
				db.tx.workouts[id()].update(data).link({ owner: user.id }),
			]);
			setIsOpen(false);
		}
	};

	if (!isOpen) {
		return (
			<Button variant="secondary" onClick={() => setIsOpen(true)}>
				<Plus />
				Add Workout
			</Button>
		);
	}

	return (
		<div className="grid grid-cols-3 items-center gap-4 p-4 bg-neutral-800 rounded">
			<div className="col-span-full">Add Workout</div>

			<div className="flex items-center gap-2">
				<span className="w-36 text-right">Date</span>
				<Input
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
			</div>
			<div className="flex items-center gap-2">
				<span className="w-36 text-right">Location</span>
				<Input
					type="text"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
				/>
			</div>
			<div className="flex items-center gap-2">
				<span className="w-36 text-right">Notes</span>
				<Input
					type="text"
					value={notes}
					onChange={(e) => setNotes(e.target.value)}
				/>
			</div>

			<div className="col-span-full flex gap-4">
				<Button variant="secondary" className="w-full" onClick={handleSubmit}>
					<Plus />
					Add
				</Button>
				<Button variant="secondary" onClick={() => setIsOpen(false)}>
					<X />
					Cancel
				</Button>
			</div>
		</div>
	);
};
