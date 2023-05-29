import styled from "styled-components";
import logo from "../assets/logo.png";
import { MdOutlineNightlightRound } from "react-icons/md";
import { CiLight } from "react-icons/ci";

function Header({ setMode, mode }) {
	const Icon = mode === "#1E1C1C" ? MdOutlineNightlightRound : CiLight;
	const iconColor = mode === "#1E1C1C" ? "#ffffff" : "#1E1C1C";
	return (
		<HeaderStyled className={mode === "#1E1C1C" ? "dark-mode" : ""}>
			<img src={logo} alt="logo" />
			<Icon
				onClick={() =>
					mode === "#ffffff" ? setMode("#1E1C1C") : setMode("#ffffff")
				}
				style={{
					width: "50px",
					height: "50px",
					marginRight: "40px",
					color: iconColor,
				}}
			/>
		</HeaderStyled>
	);
}
const HeaderStyled = styled.div`
	width: 100%;
	height: 86px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: ${(props) =>
		props.mode === "#1E1C1C" ? "#1E1C1C" : "white"};
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	z-index: 1;
	position: fixed;
	top: 0;
	img {
		width: 295px;
		height: 86px;
		margin-left: 800px;
	}
`;
export default Header;
