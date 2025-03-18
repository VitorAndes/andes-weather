import { Search } from "lucide-react";

type InputFormProps = {
	ref: React.Ref<HTMLInputElement>;
	fetchCityData: () => void;
	city?: boolean;
};

export function InputForm({ fetchCityData, ref, city }: InputFormProps) {
	return (
		<div className="flex items-center gap-2">
			<input
				ref={ref}
				// biome-ignore lint/a11y/noAutofocus: <explanation>
				autoFocus
				autoCapitalize="characters"
				placeholder="Nome da cidade"
				className={`${city ? "rounded-md shadow-md shadow-tertiary/25 font-secondary bg-primary/80 backdrop-blur-xs p-3 outline-none font-medium  focus:rounded-none  focus:bg-tertiary/5 focus:text-primary  duration-300 transition-all focus:shadow-primary/25 w-70" : "rounded-md shadow-md shadow-tertiary/25 font-secondary bg-primary/80 backdrop-blur-xs p-3 outline-none font-medium  focus:rounded-none  focus:bg-tertiary/5 focus:text-primary  duration-300 transition-all w-96 focus:shadow-primary/25"}`}
			/>

			<button
				type="button"
				onClick={() => fetchCityData()}
				className="cursor-pointer hover:scale-105 "
			>
				<Search
					className="text-tertiary hover:text-secondary transition-all "
					size={30}
				/>
			</button>
		</div>
	);
}
