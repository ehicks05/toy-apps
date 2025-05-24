import { MapPin } from 'lucide-react';
import { ExerciseForm } from './WorkoutForm/ExerciseForm';
import { WorkoutForm } from './WorkoutForm/WorkoutForm';
import { type Workout, useWorkouts } from './services/useWorkouts';

export const ExerciseRow = ({
	exercise,
}: { exercise: Workout['lifts'][number] | Workout['cardios'][number] }) => {
	return (
		<div className="flex flex-col gap-2 p-4 bg-neutral-700 rounded">
			<div>{exercise.name}</div>
			{'sets' in exercise && (
				<div>
					{exercise.sets} sets, {exercise.reps} reps, {exercise.weight} lbs
				</div>
			)}
			{'distance' in exercise && (
				<div>
					{exercise.distance} miles, {exercise.speed} mph
				</div>
			)}
			{exercise.notes ? (
				<div>{exercise.notes}</div>
			) : (
				<div className="opacity-50">no notes</div>
			)}
		</div>
	);
};

export const WorkoutRow = ({ workout }: { workout: Workout }) => {
	return (
		<div className="flex flex-col gap-4 items-start p-4 bg-neutral-800 rounded">
			<div className="flex gap-2 justify-between w-full">
				{new Date(workout.date).toLocaleDateString()}
				{workout.location && (
					<span className="flex">
						<MapPin className="text-neutral-400" />
						{workout.location}
					</span>
				)}
			</div>
			<div className="flex flex-wrap gap-4">
				{[...workout.lifts, ...workout.cardios].map((exercise) => (
					<ExerciseRow key={exercise.id} exercise={exercise} />
				))}
				<ExerciseForm workoutId={workout.id} />
			</div>
			{workout.notes}
		</div>
	);
};

export const Workouts = () => {
	const { data } = useWorkouts();

	return (
		<div className="pt-8">
			<div className="text-2xl">Workouts</div>
			<div className="flex flex-col gap-4">
				{data?.workouts.map((workout) => (
					<WorkoutRow key={workout.id} workout={workout} />
				))}
			</div>
			<div className="pb-8" />
			<WorkoutForm />
		</div>
	);
};
