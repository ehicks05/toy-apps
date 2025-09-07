export function Hootch() {
	document.title = 'Hootch Wrangler';

	return (
		<div className="w-full h-screen">
			<iframe
				title="Hootch Wrangler"
				className="w-full h-full"
				src="/hootch/index.html"
			/>
		</div>
	);
}
