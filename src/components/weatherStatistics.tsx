type weatherStatisticsProps = {
	statisticType: string;
	statisticValue: string;
	isLoading: boolean;
};

export function WeatherStatistics({
	statisticType,
	statisticValue,
	isLoading,
}: weatherStatisticsProps) {
	return (
		<div className="flex gap-2 items-baseline">
			<h3 className="text-primary font-title font-semibold md:text-xl">
				{statisticType}
			</h3>
			<span
				className={`${isLoading && "skeleton"} text-tertiary font-secondary font-medium md:text-xl`}
			>
				{statisticValue}
			</span>
		</div>
	);
}
