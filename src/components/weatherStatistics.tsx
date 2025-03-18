type weatherStatisticsProps = {
	statisticType: string;
	statisticValue: string;
};

export function WeatherStatistics({
	statisticType,
	statisticValue,
}: weatherStatisticsProps) {
	return (
		<div className="flex gap-2 items-baseline">
			<h3 className="text-primary font-title font-semibold text-xl">
				{statisticType}
			</h3>
			<span className="text-tertiary font-secondary font-medium text-xl ">
				{statisticValue}
			</span>
		</div>
	);
}
