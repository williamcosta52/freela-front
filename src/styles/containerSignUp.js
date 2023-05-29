import styled from "styled-components";

export const Container = styled.div`
	margin-top: ${(props) => props.signinStyle === "signin" && "100px"};
	width: 100%;
	height: 120%;
	background-color: ${(props) => props.mode};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	position: relative;
	form {
		margin-top: 50px;
		width: ${(props) => (props.signinStyle === "signin" ? "600px" : "675px")};
		height: ${(props) => (props.signinStyle === "signin" ? "400px" : "700px")};
		background: ${(props) =>
			props.mode === "#1E1C1C" ? "#1E1C1C" : "#fefdfd"};
		box-shadow: ${(props) =>
			props.mode === "#1E1C1C"
				? "0px 4px 4px rgba(255, 255, 255, 0.25)"
				: "0px 4px 4px rgba(0, 0, 0, 0.25)"};
		display: flex;
		border: ${(props) => (props.mode === "#1E1C1C" ? "1px solid #DCDCDC" : "")};
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 20px;
		input {
			width: 354px;
			height: 30px;
			background: #f0e7e7;
			box-shadow: ${(props) =>
				props.mode === "#1E1C1C"
					? "0px 4px 4px rgba(255, 255, 255, 0.25)"
					: "0px 4px 4px rgba(0, 0, 0, 0.25)"};
			margin: 15px 0px;
			border-radius: 5px;
			border: none;
		}
		button {
			width: 259px;
			height: 45px;
			background: #f4e9e9;
			box-shadow: ${(props) =>
				props.mode === "#1E1C1C"
					? "0px 4px 4px rgba(255, 255, 255, 0.25)"
					: "0px 4px 4px rgba(0, 0, 0, 0.25)"};
			margin-top: 10px;
			border-radius: 5px;
			border: none;
		}
		label {
			text-align: start;
			color: ${(props) => (props.mode === "#1E1C1C" ? "#ffffff" : "")};
		}
		a {
			text-decoration: none;
			color: ${(props) => (props.mode === "#1E1C1C" ? "#ffffff" : "blue")};
			margin-top: 25px;
		}
	}
`;
