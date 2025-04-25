import { MapPin } from "lucide-react";
import { InputForm } from "./components/communs/input";
import { WeatherStatistics } from "./components/weatherStatistics";
import { useWeather } from "./hooks/useWeather";

export function App() {
	const { city, forecast, currentWeather, fetchCityData, isLoading } =
		useWeather();

	return (
		<div className="flex flex-col m-auto max-w-[1600px] px-4 md:px-12">
			{city ? (
				<>
					<div className="flex flex-col m-auto min-h-dvh py-9 w-full overflow-hidden  ">
						<div className="flex flex-col flex-1">
							<div className="mb-5 md:hidden">
								<InputForm
									fetchCityData={fetchCityData}
									city
									isLoading={isLoading}
								/>
							</div>
							<div className="flex justify-between flex-1 w-full">
								<div className="inline-flex flex-col gap-3">
									<h1
										className={`${isLoading && "skeleton"} text-primary text-2xl md:text-6xl font-title font-semibold`}
									>
										{currentWeather?.weather[0].main}
									</h1>
									<p
										className={`${isLoading && "skeleton"} text-tertiary font-secondary font-medium md:text-2xl text-lg`}
									>
										{currentWeather?.weather[0].description}
									</p>
								</div>
								<div className={"flex flex-col gap-3 items-end"}>
									<div className="hidden md:static">
										<InputForm
											fetchCityData={fetchCityData}
											city
											isLoading={isLoading}
										/>
									</div>

									<h1
										className={`${isLoading && "skeleton"} flex items-center gap-2 text-tertiary font-medium md:text-2xl`}
									>
										<MapPin />
										{city?.name}, {city?.state}
									</h1>

									<h1
										className={`${isLoading && "skeleton"} text-primary font-secondary font-semibold md:text-6xl text-2xl`}
									>
										{currentWeather?.main.temp.toFixed(0)}
										{"°"}
									</h1>
									<p
										className={`${isLoading && "skeleton"} text-tertiary font-secondary font-medium  md:text-xl`}
									>
										{currentWeather?.dt
											? new Date(currentWeather?.dt * 1000).toLocaleString(
													"pt-BR",
													{
														weekday: "long",
														hour: "2-digit",
														minute: "2-digit",
													},
												)
											: null}
									</p>
								</div>
							</div>
							<div className="flex flex-col items-start md:flex-row gap-5 md:items-center md:self-center rounded-2xl backdrop-blur-md  py-2 px-3">
								{
									<>
										<WeatherStatistics
											statisticType="Min./Max.:"
											statisticValue={`${currentWeather?.main.temp_min.toFixed(0)}°/${currentWeather?.main.temp_max.toFixed(0)}°`}
											isLoading={isLoading}
										/>
										<WeatherStatistics
											statisticType="Vento:"
											statisticValue={`${currentWeather?.wind.speed} m/s`}
											isLoading={isLoading}
										/>
										<WeatherStatistics
											statisticType="Umidade:"
											statisticValue={`${currentWeather?.main.humidity}%`}
											isLoading={isLoading}
										/>
										<WeatherStatistics
											statisticType="Pressão atmosférica:"
											statisticValue={`${currentWeather?.main.pressure} hPa`}
											isLoading={isLoading}
										/>
									</>
								}
							</div>
						</div>
					</div>

					<div className="grid md:grid-cols-4 gap-4 my-12 w-full">
						{forecast?.map(({ dt, weather, main }) => (
							<div
								key={dt}
								className={`${isLoading && "skeleton"} flex items-center justify-between md:w-80 py-2 rounded-md bg-secondary/25 shadow-xs shadow-background-secondary backdrop-blur-lg px-2 starting:-translate-y-10 translate-y-0 transition-all duration-700`}
							>
								<h3
									className={`${isLoading && "skeleton"} text-primary font-title font-semibold text-2xl`}
								>
									{new Date(dt * 1000).toLocaleString("pt-BR", {
										weekday: "short",
										hour: "2-digit",
										minute: "2-digit",
									})}
								</h3>

								<img
									src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
									alt="Ícone do clima"
									className={`${isLoading ? "size-0" : "w-24 h-24 transition-all"}`}
								/>

								<p
									className={`${isLoading && "skeleton"} text-tertiary font-secondary font-medium text-xl`}
								>
									{main.temp_min.toFixed(0)}° {main.temp_max.toFixed(0)}°
								</p>
							</div>
						))}
					</div>
				</>
			) : (
				<div className="flex flex-col gap-5 items-center justify-center	 min-h-dvh">
					<h1 className="font-title font-semibold text-xl md:text-5xl text-primary text-center md:w-[700px]">
						Digite o nome de uma cidade para começar!
					</h1>
					<InputForm fetchCityData={fetchCityData} isLoading={isLoading} />
				</div>
			)}
		</div>
	);
}
