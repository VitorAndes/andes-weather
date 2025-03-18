import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { InputForm } from "./components/communs/input";
import { WeatherStatistics } from "./components/weatherStatistics";

type Geocoding = {
	country: string;
	lat: number;
	lon: number;
	name: string;
	state: string;
};

type CurrentWeatherData = {
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];

	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};

	wind: {
		speed: number;
	};

	dt: number; // Timestamp

	timezone: number;
};

type ForecastData = {
	list: {
		dt: number;
		main: { temp_min: number; temp_max: number };
		weather: { icon: string }[];
	}[];
};

export function App() {
	const api_key = import.meta.env.VITE_API_KEY;
	const [city, setCity] = useState<Geocoding | null>(null);
	const [forecast, setForecast] = useState<ForecastData["list"] | null>(null);
	const [currentWeather, setCurrentWeather] =
		useState<CurrentWeatherData | null>(null);
	const inputCityRef = useRef<HTMLInputElement>(null);

	async function fetchCityData() {
		const inputCityValue = inputCityRef.current?.value;

		try {
			const response = await fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=${inputCityValue}&appid=${api_key}`,
			);

			const [data]: [Geocoding] = await response.json();

			setCity(data);
		} catch (error) {
			console.log(error);
		}
	}

	async function fetchCurrentWeatherData() {
		if (!city) return;

		try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${city?.lat}&lon=${city?.lon}&appid=${api_key}&lang=pt_br&units=metric`,
			);

			const data: CurrentWeatherData = await response.json();

			setCurrentWeather(data);
		} catch (error) {}
	}

	async function fetchForecastData() {
		if (!city) return;

		try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${city?.lat}&lon=${city?.lon}&appid=${api_key}&lang=pt_br&units=metric&cnt=8`,
			);

			const data: ForecastData = await response.json();
			setForecast(data.list);
		} catch (error) {
			console.error("Erro ao buscar previsão do tempo:", error);
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchCityData();
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (city) {
			fetchCurrentWeatherData();
			fetchForecastData();
		}
	}, [city]);

	return (
		<div className="flex flex-col m-auto max-w-[1600px] px-12">
			<div className="flex flex-col m-auto min-h-dvh py-9 w-full overflow-hidden  ">
				<div className="flex flex-col flex-1">
					<div className="flex justify-between flex-1 w-full">
						<div className="flex flex-col gap-3">
							<h1 className="text-primary font-title font-semibold text-6xl">
								{currentWeather?.weather[0].main}
							</h1>
							<p className="text-tertiary font-secondary font-medium text-2xl">
								{currentWeather?.weather[0].description}
							</p>
						</div>
						<div
							className={`${city ? "flex flex-col gap-3 items-end" : "flex items-center justify-center w-full"}`}
						>
							{city ? (
								<InputForm
									fetchCityData={fetchCityData}
									ref={inputCityRef}
									city
								/>
							) : (
								<div className="flex flex-col gap-5 items-center">
									<h1 className="font-title font-semibold text-5xl text-primary text-center w-[700px]">
										Digite o nome de uma cidade para começar!
									</h1>
									<InputForm fetchCityData={fetchCityData} ref={inputCityRef} />
								</div>
							)}
							<h1 className="flex items-center gap-2 text-tertiary font-medium text-2xl">
								{city && <MapPin />}
								{city?.name && city?.country && `${city?.name}, ${city?.state}`}
							</h1>

							<h1 className="text-primary font-title font-semibold text-6xl">
								{currentWeather?.main.temp.toFixed(0)}
								{city && "°"}
							</h1>
							<p className="text-tertiary font-secondary font-medium  text-xl">
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
					<div className="flex  gap-5 items-center self-center rounded-2xl backdrop-blur-md  py-2 px-3">
						{city && (
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
				{forecast?.map(({ dt, weather, main }) => (
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
