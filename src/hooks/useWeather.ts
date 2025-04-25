import { useCallback, useEffect, useState } from "react";
import type { CityFormData } from "../components/communs/input";

const api_key = import.meta.env.VITE_API_KEY;

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

	dt: number;

	timezone: number;
};

type ForecastData = {
	list: {
		dt: number;
		main: { temp_min: number; temp_max: number };
		weather: { icon: string }[];
	}[];
};

type WeatherHookReturn = {
	city: Geocoding | null;
	forecast: ForecastData["list"] | null;
	currentWeather: CurrentWeatherData | null;
	fetchCityData: (data: CityFormData) => Promise<void>;
	isLoading: boolean;
	error: string | null;
};

export function useWeather(): WeatherHookReturn {
	const [city, setCity] = useState<Geocoding | null>(null);
	const [forecast, setForecast] = useState<ForecastData["list"] | null>(null);
	const [currentWeather, setCurrentWeather] =
		useState<CurrentWeatherData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchCityData = useCallback(async ({ cityName }: CityFormData) => {
		if (!cityName) {
			setError("Por favor, digite uma cidade.");
			return;
		}
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${api_key}`,
			);

			if (!response.ok) {
				throw new Error(`Erro na API: ${response.status}`);
			}

			const json: Geocoding[] = await response.json();
			const [data = null] = json;

			if (!data) {
				setError("Cidade não encontrada.");
			} else {
				localStorage.setItem("cityName", JSON.stringify(data));
				setCity(data);
				console.log("Dados:", data);
			}
		} catch (error) {
			console.error("Erro ao buscar cidade:", error);
			setError("Falha ao buscar cidade. Por favor, tente novamente.");
		} finally {
			setIsLoading(false);
		}
	}, []);

	const fetchCurrentWeatherData = useCallback(async () => {
		if (!city) return;

		setIsLoading(true);
		try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${api_key}&lang=pt_br&units=metric`,
			);

			if (!response.ok) {
				throw new Error(`Erro na API: ${response.status}`);
			}

			const data: CurrentWeatherData = await response.json();

			if (!data.weather || !data.main) {
				throw new Error("Dados de clima incompletos");
			}

			setCurrentWeather(data);
		} catch (error) {
			console.error("Erro ao buscar clima atual:", error);
			setError("Falha ao buscar clima atual. Por favor, tente novamente.");
		} finally {
			setIsLoading(false);
		}
	}, [city]);

	const fetchForecastData = useCallback(async () => {
		if (!city) return;

		setIsLoading(true);
		try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${api_key}&lang=pt_br&units=metric&cnt=8`,
			);

			if (!response.ok) {
				throw new Error(`Erro na API: ${response.status}`);
			}

			const data: ForecastData = await response.json();

			if (!data.list || !Array.isArray(data.list)) {
				throw new Error("Dados de previsão incompletos");
			}

			setForecast(data.list);
		} catch (error) {
			console.error("Erro ao buscar previsão do tempo:", error);
			setError(
				"Falha ao buscar previsão do tempo. Por favor, tente novamente.",
			);
		} finally {
			setIsLoading(false);
		}
	}, [city]);

	useEffect(() => {
		if (city) {
			fetchCurrentWeatherData();
			fetchForecastData();
		}
	}, [city, fetchCurrentWeatherData, fetchForecastData]);

	return {
		city,
		forecast,
		currentWeather,
		fetchCityData,
		isLoading,
		error,
	};
}
