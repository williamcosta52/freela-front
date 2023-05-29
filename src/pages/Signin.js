import { useContext, useState } from "react";
import Header from "../constants/Header";
import { Container } from "../styles/containerSignUp";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import tokenContext from "../contexts/token.context";

function Signin({ mode, setMode }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const signinStyle = "signin";
	const navigate = useNavigate();
	const { setUserInfo } = useContext(tokenContext);
	function login(e) {
		e.preventDefault();
		const PORT = process.env.REACT_APP_API_URL;
		const body = {
			email,
			password,
		};
		axios
			.post(`${PORT}/signin`, body)
			.then((r) => {
				navigate("/profile");
				setUserInfo(r.data);
			})
			.catch((e) => console.log(e));
	}
	return (
		<Container mode={mode} signinStyle={signinStyle}>
			<Header mode={mode} setMode={setMode} />
			<form onSubmit={login}>
				<label htmlFor="input1" style={{ marginRight: "320px" }}>
					Email
				</label>
				<input
					id="input1"
					value={email}
					type="email"
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="input2" style={{ marginRight: "320px" }}>
					Senha
				</label>
				<input
					id="input2"
					type="password"
					value={password}
					required
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">ENTRAR</button>
				<Link to={"/signup"}>Não possui uma conta? Cadastre-se</Link>
			</form>
		</Container>
	);
}

export default Signin;
