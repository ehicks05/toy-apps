import { splitShorten } from '../../../utils/utils';

interface Props {
	logMessages?: string[];
}

const LogMessages = ({ logMessages }: Props) => {
	if (!logMessages) return null;

	return (
		<div className="bg-sky-900 p-2 text-sm sm:text-base">
			{logMessages.map((o, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <ok>
				<div key={o + i}>{splitShorten(o)}</div>
			))}
		</div>
	);
};

export default LogMessages;
