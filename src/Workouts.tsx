import { type Workout, useWorkouts } from './services/useWorkouts';

const WorkoutRow = ({ workout }: { workout: Workout }) => {
	return <div>{JSON.stringify(workout)}</div>;
};

const WorkoutForm = () => {
	return (
		<div>
			<div>foo</div>
			<div>bar</div>
			<div>
				<label htmlFor="">Name</label>
				<input type="text" />
			</div>
		</div>
	);
};

export const Workouts = () => {
	const { data } = useWorkouts();

	return (
		<div className="pt-8">
			<div className="text-4xl">Workouts</div>
			{data?.workouts.map((workout) => (
				<WorkoutRow key={workout.id} workout={workout} />
			))}
			<WorkoutForm />
		</div>
	);
};
