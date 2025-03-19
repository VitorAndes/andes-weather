import { MapPin } from "lucide-react";
import { InputForm } from "./components/communs/input";
import { WeatherStatistics } from "./components/weatherStatistics";
import { useWeather } from "./hooks/useWeather";

export function App() {
	const { city, forecast, currentWeather, fetchCityData, isLoading } =
		useWeather();

	return (
		<div className="flex flex-col m-auto max-w-[1600px] px-12">
			<div className="flex flex-col m-auto min-h-dvh py-9 w-full overflow-hidden  ">
				<div className="flex flex-col flex-1">
					<div className="flex justify-between flex-1 w-full">
						<div className="flex flex-col gap-3">
							<h1 className="text-primary font-title font-semibold text-6xl">
								{city !== null && currentWeather?.weather[0].main}
							</h1>
							<p className="text-tertiary font-secondary font-medium text-2xl">
								{city !== null && currentWeather?.weather[0].description}
							</p>
						</div>
						<div
							className={`${city ? "flex flex-col gap-3 items-end" : "flex items-center justify-center w-full"}`}
						>
							{city !== null ? (
								<InputForm
									fetchCityData={fetchCityData}
									city
									isLoading={isLoading}
								/>
							) : (
								<div className="flex flex-col gap-5 items-center">
									<h1 className="font-title font-semibold text-5xl text-primary text-center w-[700px]">
										Digite o nome de uma cidade para começar!
									</h1>
									<InputForm
										fetchCityData={fetchCityData}
										isLoading={isLoading}
									/>
								</div>
							)}
							<h1 className="flex items-center gap-2 text-tertiary font-medium text-2xl">
								{city !== null && <MapPin />}
								{city !== null && `${city?.name}, ${city?.state}`}
							</h1>

							<h1 className="text-primary font-title font-semibold text-6xl">
								{city !== null && currentWeather?.main.temp.toFixed(0)}
								{city !== null && "°"}
							</h1>
							<p className="text-tertiary font-secondary font-medium  text-xl">
								{city !== null && currentWeather?.dt
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
					<div className="flex  gap-5 items-center self-center rounded-2xl backdrop-blur-md  py-2 px-3">
						{city !== null && (
							<>
								<WeatherStatistics
									statisticType="Min./Max.:"
									statisticValue={`${currentWeather?.main.temp_min.toFixed(0)}°/${currentWeather?.main.temp_max.toFixed(0)}°`}
								/>
								<WeatherStatistics
									statisticType="Vento:"
									statisticValue={`${currentWeather?.wind.speed} m/s`}
								/>
								<WeatherStatistics
									statisticType="Umidade:"
									statisticValue={`${currentWeather?.main.humidity}%`}
								/>
								<WeatherStatistics
									statisticType="Pressão atmosférica:"
									statisticValue={`${currentWeather?.main.pressure} hPa`}
								/>
							</>
						)}
					</div>
				</div>
			</div>
			<div className="grid grid-cols-4  gap-2 mt-12 w-full">
				{city !== null &&
					forecast?.map(({ dt, weather, main }) => (
						<div
							key={dt}
							className="flex items-center justify-between w-80 h-20 rounded-xl shadow-md shadow-tertiary/25 p-2 bg-secondary/25 backdrop-blur-lg"
						>
							<h3 className="text-primary font-title font-semibold text-2xl">
								{new Date(dt * 1000).toLocaleString("pt-BR", {
									weekday: "short",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</h3>

							<img
								src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
								alt="Ícone do clima"
								className="w-2h-24 h-24"
							/>

							<p className="text-tertiary font-secondary font-medium text-xl">
								{main.temp_min.toFixed(0)}° / {main.temp_max.toFixed(0)}°
							</p>
						</div>
					))}
			</div>
		</div>
	);
}
