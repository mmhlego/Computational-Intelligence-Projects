/* eslint-disable react/button-has-type */
import NetworkData from 'main/model/NetworkData';
import { useEffect, useState } from 'react';
import CodeBlock from 'renderer/components/CodeBlock';
import Divider from 'renderer/components/Divider';
import InputField from 'renderer/components/InputField';
import PrimaryButton from 'renderer/components/PrimaryButton';
import LetterImageGenerator from 'renderer/view/LetterImageGenerator';

export default function DataGenerator() {
	const [size, setSize] = useState(10);
	const [minTextSize, setMinTextSize] = useState(20);
	const [maxTextSize, setMaxTextSize] = useState(20);
	const [offsetX, setOffsetX] = useState(0);
	const [offsetY, setOffsetY] = useState(0);
	const [rotation, setRotation] = useState(10);
	const [density, setDensity] = useState(1);
	const [letter, setLetter] = useState('x');
	const [count, setCount] = useState(1);
	const [dataOutputText, setDataOutputText] = useState('[+1]');
	const [dataOutput, setDataOutput] = useState([+1]);
	const [text, setText] = useState(``);

	const [enabled, setEnabled] = useState(false);

	const UpdateText = (newData: object) => {
		setText(
			`const GeneratedData = ${JSON.stringify(
				newData,
				null,
				4
			)}`.replaceAll('"', '')
		);
	};

	useEffect(() => {
		UpdateText({});
	}, []);

	const isJsonString = (str: string) => {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	};

	const ItemsStyle = 'w-5/6 h-10';

	return (
		<div className="w-full h-full grid grid-cols-[49%_1%_50%] overflow-hidden">
			<div className="min-h-full flex flex-col gap-2 items-center">
				<h2 className="text-left">Data Generator</h2>

				<InputField
					label="Size"
					type="number"
					value={size}
					setValue={(newVal) => setSize(Number(newVal))}
					placeholder=""
					max={200}
					min={2}
					className={ItemsStyle}
				/>

				<InputField
					label="Min Text Size"
					type="number"
					value={minTextSize}
					setValue={(newVal) => setMinTextSize(Number(newVal))}
					placeholder=""
					max={2 * size}
					min={1}
					className={ItemsStyle}
				/>

				<InputField
					label="Max Text Size"
					type="number"
					value={maxTextSize}
					setValue={(newVal) => setMaxTextSize(Number(newVal))}
					placeholder=""
					max={2 * size}
					min={1}
					className={ItemsStyle}
				/>

				<InputField
					label="Offset-X"
					type="number"
					value={offsetX}
					setValue={(newVal) => setOffsetX(Number(newVal))}
					placeholder=""
					max={size}
					min={0}
					className={ItemsStyle}
				/>

				<InputField
					label="Offset-Y"
					type="number"
					value={offsetY}
					setValue={(newVal) => setOffsetY(Number(newVal))}
					placeholder=""
					max={size}
					min={0}
					className={ItemsStyle}
				/>

				<InputField
					label="Rotation"
					type="number"
					value={rotation}
					setValue={(newVal) => setRotation(Number(newVal))}
					placeholder=""
					max={180}
					min={0}
					className={ItemsStyle}
				/>

				<InputField
					label="Density"
					type="number"
					value={density}
					setValue={(newVal) => setDensity(Number(newVal))}
					placeholder=""
					max={180}
					min={0}
					className={ItemsStyle}
				/>

				<InputField
					label="Letter"
					type="text"
					value={letter}
					setValue={(newVal) => setLetter(newVal[0])}
					placeholder=""
					max={0}
					min={0}
					className={ItemsStyle}
				/>

				<InputField
					label="Count"
					type="number"
					value={count}
					setValue={(newVal) => setCount(Number(newVal))}
					placeholder=""
					max={100}
					min={1}
					className={ItemsStyle}
				/>

				<InputField
					label="Data Output"
					type="text"
					value={dataOutputText}
					setValue={(newVal) => {
						setDataOutputText(newVal);

						if (isJsonString(newVal)) {
							setDataOutput(JSON.parse(newVal));
						}
					}}
					placeholder=""
					max={100}
					min={1}
					className={ItemsStyle}
				/>

				<div className={`${ItemsStyle} w-5/6 flex gap-2 flex-row`}>
					<PrimaryButton
						text="Generate"
						onClick={() => {
							UpdateText([]);
							setEnabled(true);
						}}
						className="w-1/2"
					/>

					<PrimaryButton
						text="Clear Data"
						onClick={() => UpdateText({})}
						className="w-1/2"
					/>
				</div>

				<div className="w-1/4 aspect-square rounded-md bg-[#ffffff10] overflow-hidden">
					{enabled === true && (
						<LetterImageGenerator
							size={size}
							density={density}
							textSize={{
								min: minTextSize,
								max: maxTextSize,
							}}
							offsetX={offsetX}
							offsetY={offsetY}
							rotation={rotation}
							letter={letter}
							count={count}
							dataOutput={dataOutput}
							setAllData={(allData: NetworkData[]) =>
								UpdateText(allData)
							}
							enabled={enabled}
							disable={() => setEnabled(false)}
						/>
					)}
				</div>
			</div>

			<Divider type="vertical" size="screen" />

			<div className="h-full w-full overflow-y-auto pb-12">
				<CodeBlock language="javascript" text={text} />
			</div>
		</div>
	);
}
