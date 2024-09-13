import React, { type CSSProperties, type ReactNode, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useDispatch } from "react-redux";
import TemplateConstants from "~/constants/template.constants";
import { setTemplate, setThemeColor } from "~/slices/theme.slice";
import {
	loadFromLocalStorage,
	saveToLocalStorage,
} from "~/utils/local-storage.utills";
import styles from "./Carousel.module.scss";

const MAX_VISIBILITY = 3;

interface CardProps {
	title: string;
	src?: string;
	onClick: () => void;
}

const templates = Object.values(TemplateConstants).filter((v) =>
	Number.isNaN(Number(v)),
);

const Card: React.FC<CardProps> = ({ title, src, onClick }) => (
	<button className={styles.card} onClick={onClick} type="button">
		<h5>{title}</h5>
		{src && <img src={src} alt="template" />}
	</button>
);

interface CarouselProps {
	children: ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
	const [active, setActive] = useState<number>(
		loadFromLocalStorage("active") !== undefined
			? loadFromLocalStorage("active")
			: 2,
	);
	const count = React.Children.count(children);

	const getCardContainerStyles = (
		i: number,
	): {
		"--direction": number;
		"--abs-offset": number;
		"--offset": number;
		pointerEvents: string;
		display: string;
		"--active": number;
		opacity: string;
	} => ({
		"--active": i === active ? 1 : 0,
		"--offset": (active - i) / 3,
		"--direction": Math.sign(active - i),
		"--abs-offset": Math.abs(active - i) / 3,
		pointerEvents: active === i ? "auto" : "none",
		opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
		display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
	});

	return (
		<div className={styles.carousel}>
			{active > 0 && (
				<button
					className={`${styles.nav} ${styles.left}`}
					onClick={() => setActive((i) => i - 1)}
					type="button"
				>
					<IoIosArrowDropleft />
				</button>
			)}

			{React.Children.map(children, (child, i) => (
				<div
					className={styles.container}
					style={getCardContainerStyles(i) as CSSProperties}
				>
					{child}
				</div>
			))}
			{active < count - 1 && (
				<button
					className={`${styles.nav} ${styles.right}`}
					onClick={() => setActive((i) => i + 1)}
				>
					<IoIosArrowDropright />
				</button>
			)}
		</div>
	);
};

interface MenuProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Menu: React.FC<MenuProps> = ({ isOpen, setIsOpen }) => {
	const dispatch = useDispatch();

	return (
		<Carousel>
			{templates.map((template, i) => (
				<Card
					onClick={() => {
						setIsOpen(!isOpen);
						saveToLocalStorage("active", i);
						dispatch(setTemplate(template));
						loadFromLocalStorage(template) &&
							dispatch(setThemeColor(loadFromLocalStorage(template)));
					}}
					key={template}
					title={template}
					src={`./templates/${template}.webp`}
				/>
			))}
		</Carousel>
	);
};
export default Menu;
