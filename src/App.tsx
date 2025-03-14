export function App() {
	return (
		<div className="flex flex-col m-auto min-h-dvh py-9 max-w-[1600px] overflow-hidden ">
			<div className="flex flex-col relative flex-1">
				<div className="flex justify-between flex-1 px-12  w-full">
					<div className=" flex flex-col gap-3">
						<h1 className="text-primary font-title font-semibold text-8xl">
							Chuva
						</h1>
						<p className="text-tertiary font-secondary font-light text-3xl">
							Chuvinha mixuruca
						</p>
					</div>
					<div className="flex flex-col gap-3 text-end">
						<p className="text-tertiary font-secondary font-light text-3xl">
							Cidade,bairro
						</p>
						<h1 className="text-primary font-title font-semibold text-8xl">
							24°
						</h1>
						<p className="text-tertiary font-secondary font-light text-2xl">
							Monday,13:33
						</p>
					</div>
				</div>
				<div className="flex  gap-5 self-center rounded-2xl backdrop-blur-md  py-2 px-3">
					<div className="flex gap-2 items-center">
						<h3 className="text-primary font-title font-semibold text-2xl">
							Max./Min.:{" "}
						</h3>
						<span className="text-tertiary font-secondary font-light text-lg">
							12°/24°
						</span>
					</div>
					<div className="flex gap-2 items-center">
						<h3 className="text-primary font-title font-semibold text-2xl">
							Vento:{" "}
						</h3>
						<span className="text-tertiary font-secondary font-light text-lg">
							14km/h
						</span>
					</div>
					<div className="flex gap-2 items-center">
						<h3 className="text-primary font-title font-semibold text-2xl">
							Umidade:{" "}
						</h3>
						<span className="text-tertiary font-secondary font-light text-lg">
							82%
						</span>
					</div>
					<div className="flex gap-2 items-center">
						<h3 className="text-primary font-title font-semibold text-2xl">
							Índice UV:{" "}
						</h3>
						<span className="text-tertiary font-secondary font-light text-lg">
							3 de 11
						</span>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-2 p-1 mt-12 m-auto px-14 -translate-x-60">
				<div className="flex items-center justify-between w-80 h-20 rounded-xl shadow-md shadow-tertiary/25 p-2 bg-secondary/5 backdrop-blur-lg">
					<h3 className="text-primary font-title font-semibold text-3xl">
						Seg
					</h3>
					<img src="" alt="" />
					<p className="text-tertiary font-secondary font-light text-3xl">
						12°/24°
					</p>
				</div>
				<div className="flex items-center justify-between w-80 h-20 rounded-xl shadow-md shadow-tertiary/25 p-2 bg-secondary/5 backdrop-blur-lg">
					<h3 className="text-primary font-title font-semibold text-3xl">
						Ter
					</h3>
					<img src="" alt="" />
					<p className="text-tertiary font-secondary font-light text-3xl">
						12°/24°
					</p>
				</div>
				<div className="flex items-center justify-between w-80 h-20 rounded-xl shadow-md shadow-tertiary/25 p-2 bg-secondary/5 backdrop-blur-lg">
					<h3 className="text-primary font-title font-semibold text-3xl">
						Qua
					</h3>
					<img src="" alt="" />
					<p className="text-tertiary font-secondary font-light text-3xl">
						12°/24°
					</p>
				</div>
				<div className="flex items-center justify-between w-80 h-20 rounded-xl shadow-md shadow-tertiary/25 p-2 bg-secondary/5 backdrop-blur-lg">
					<h3 className="text-primary font-title font-semibold text-3xl">
						Qui
					</h3>
					<img src="" alt="" />
					<p className="text-tertiary font-secondary font-light text-3xl">
						12°/24°
					</p>
				</div>
				<div className="flex items-center justify-between w-80 h-20 rounded-xl shadow-md shadow-tertiary/25 p-2 bg-secondary/5 backdrop-blur-lg">
					<h3 className="text-primary font-title font-semibold text-3xl">
						Sex
					</h3>
					<img src="" alt="" />
					<p className="text-tertiary font-secondary font-light text-3xl">
						12°/24°
					</p>
				</div>
				<div className="flex items-center justify-between w-80 h-20 rounded-xl shadow-md shadow-tertiary/25 p-2 bg-secondary/5 backdrop-blur-lg">
					<h3 className="text-primary font-title font-semibold text-3xl">
						Sab
					</h3>
					<img src="" alt="" />
					<p className="text-tertiary font-secondary font-light text-3xl">
						12°/24°
					</p>
				</div>
				<div className="flex items-center justify-between w-80 h-20 rounded-xl shadow-md shadow-tertiary/25 p-2 bg-secondary/5 backdrop-blur-lg">
					<h3 className="text-primary font-title font-semibold text-3xl">
						Dom
					</h3>
					<img src="" alt="" />
					<p className="text-tertiary font-secondary font-light text-3xl">
						12°/24°
					</p>
				</div>
			</div>
		</div>
	);
}
