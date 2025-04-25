import { Loader2, Search } from "lucide-react";
import { useForm } from "react-hook-form";

type InputFormProps = {
	fetchCityData: (cityName: CityFormData) => void;
	city?: boolean;
	isLoading: boolean;
};

export type CityFormData = {
	cityName: string;
};

export function InputForm({ city, fetchCityData, isLoading }: InputFormProps) {
	const {
		register,
		handleSubmit,

		formState: { errors },
	} = useForm<CityFormData>();

	const inputClass =
		"rounded-md shadow-md shadow-tertiary/25 font-secondary bg-primary/80 backdrop-blur-xs p-3 outline-none font-medium focus:rounded-none focus:bg-tertiary/5 focus:text-primary duration-300 transition-all focus:shadow-primary/25 ";

	return (
		<form
			onSubmit={handleSubmit(fetchCityData)}
			className="flex flex-col gap-2"
		>
			<label htmlFor="cityName" className="sr-only">
				Cidade
			</label>
			<div className="flex gap-2">
				<input
					{...register("cityName", {
						required: "O nome da cidade é obrigatório",
						pattern: {
							value: /^[A-Za-zÀ-ÿ\s]+$/i,
							message: "A cidade deve conter apenas letras e espaços",
						},
					})}
					placeholder="Ex: Manaus Amazonas"
					className={`${inputClass} ${city ? "w-full md:w-70" : "md:w-96"} ${errors.cityName && " bg-red-400/70 transition-all"}`}
				/>
				<button
					disabled={isLoading}
					type="submit"
					className="cursor-pointer hover:scale-105 "
				>
					{isLoading ? (
						<Loader2 className="animate-spin transition-all" size={30} />
					) : (
						<Search
							className="text-tertiary hover:text-secondary transition-all "
							size={30}
						/>
					)}
				</button>
			</div>
			{errors.cityName && (
				<span className="text-red-500 text-sm font-secondary font-semibold">
					{errors.cityName.message}
				</span>
			)}
		</form>
	);
}
