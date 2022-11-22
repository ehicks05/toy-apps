interface Props {
  logMessages?: string[];
}

const LogMessages = ({ logMessages }: Props) => {
  if (!logMessages) return null;

  return (
    <div className="bg-sky-900 p-2 text-sm sm:text-base">
      {logMessages.map((o) => (
        <div key={o}>{o}</div>
      ))}
    </div>
  );
};

export default LogMessages;
