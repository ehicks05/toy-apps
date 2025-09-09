import { id } from '@instantdb/react';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { db } from '../services/instant';
import { type ExerciseType, TypeDropdown } from './ExerciseType';

export const ExerciseForm = ({ workoutId }: { workoutId: string }) => {
	const { user } = db.useAuth();
	const [isOpen, setIsOpen] = useState(false);

	const [type, setType] = useState<ExerciseType>('lift');
	const [name, setName] = useState('');
	const [notes, setNotes] = useState('');

	const [sets, setSets] = useState(0);
	const [reps, setReps] = useState('');
	const [weight, setWeight] = useState('');

	const [speed, setSpeed] = useState(0);
	const [distance, setDistance] = useState(0);
	const [altitudeGain, setAltitudeGain] = useState(0);

	const handleSubmit = async () => {
		const isValid =
			name.length > 0 &&
			((type === 'lift' && sets > 0 && !!reps) ||
				(type === 'cardio' && (speed > 0 || distance > 0)));

		const exercise =
			type === 'lift'
				? db.tx.lifts[id()].update({
						name,
						notes,
						sets,
						reps,
						weight,
					})
				: db.tx.cardios[id()].update({
						name,
						notes,
						speed,
						distance,
					});

		if (isValid && user) {
			await db.transact([exercise.link({ workout: workoutId })]);
			setIsOpen(false);
		}
	};

	if (!isOpen) {
		return (
			<button
				type="button"
				className="p-4 flex flex-col items-center justify-center rounded outline-dashed cursor-pointer"
				onClick={() => setIsOpen(true)}
			>
				<Plus />
				Add Exercise
			</button>
		);
	}

	return (
		<div className="grid grid-cols-3 items-center gap-4">
			<div className="col-span-full">Add Exercise</div>

			<div className="flex items-center gap-2">
				<span className="w-36 text-right">Type</span>
				<div className="w-full">
					<TypeDropdown type={type} handleClick={setType} />
				</div>
			</div>
			<div className="flex items-center gap-2">
				<span className="w-36 text-right">Name</span>
				<Input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
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

			{type === 'lift' && (
				<>
					<div className="flex items-center gap-2">
						<span className="w-36 text-right">Sets</span>
						<Input
							type="number"
							value={sets}
							onChange={(e) => setSets(Number(e.target.value))}
						/>
					</div>
					<div className="flex items-center gap-2">
						<span className="w-36 text-right">Reps</span>
						<Input
							type="string"
							value={reps}
							onChange={(e) => setReps(e.target.value)}
						/>
					</div>
					<div className="flex items-center gap-2">
						<span className="w-36 text-right">Weight</span>
						<Input
							type="string"
							value={weight}
							onChange={(e) => setWeight(e.target.value)}
						/>
					</div>
				</>
			)}

			{type === 'cardio' && (
				<>
					<div className="flex items-center gap-2">
						<span className="w-36 text-right">Speed</span>
						<Input
							type="number"
							value={speed}
							onChange={(e) => setSpeed(Number(e.target.value))}
						/>
					</div>
					<div className="flex items-center gap-2">
						<span className="w-36 text-right">Distance</span>
						<Input
							type="number"
							value={distance}
							onChange={(e) => setDistance(Number(e.target.value))}
						/>
					</div>
					<div className="flex items-center gap-2">
						<span className="w-36 text-right">Altitude Gain</span>
						<Input
							type="number"
							value={altitudeGain}
							onChange={(e) => setAltitudeGain(Number(e.target.value))}
						/>
					</div>
				</>
			)}

			<div className="col-span-full justify-center flex gap-4">
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
