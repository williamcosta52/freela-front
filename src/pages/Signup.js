import { useState } from "react";
import Header from "../constants/Header";
import { Container } from "../styles/containerSignUp";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup({ mode, setMode }) {
	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [email, setEmail] = useState("");
	const [biography, setBiography] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const PORT = "http://localhost:5000";
	const navigate = useNavigate();
	function sendSignUp(e) {
		e.preventDefault();
		if (password !== confirmPassword) return alert("As senhas não coincidem");
		const body = {
			name: name,
			imageProfile: image,
			email: email,
			description: biography,
			password: password,
		};
		axios
			.post(`${PORT}/signup`, body)
			.then((r) => {
				alert(r.data.message);
				navigate("/");
			})
			.catch((e) => alert(e.response.data.message));
	}
	return (
		<Container mode={mode}>
			<Header mode={mode} setMode={setMode} />
			<form onSubmit={sendSignUp}>
				<label htmlFor="input1" style={{ marginRight: "320px" }}>
					Nome
				</label>
				<input
					id="input1"
					value={name}
					required
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="input2" style={{ marginRight: "323px" }}>
					Email
				</label>
				<input
					id="input2"
					type="email"
					value={email}
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="input3" style={{ marginRight: "275px" }}>
					Foto de perfil
				</label>
				<input
					id="input3"
					required
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>
				<label htmlFor="input4" style={{ marginRight: "170px" }}>
					Biografia (até 200 caracteres)
				</label>
				<input
					id="input4"
					value={biography}
					required
					onChange={(e) => setBiography(e.target.value)}
				/>
				<label htmlFor="input5" style={{ marginRight: "322px" }}>
					Senha
				</label>
				<input
					id="input5"
					type="password"
					value={password}
					required
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label htmlFor="input6" style={{ marginRight: "247px" }}>
					Confirme a senha
				</label>
				<input
					id="input6"
					type="password"
					value={confirmPassword}
					required
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<button type="submit">CADASTRAR</button>
				<Link to={"/"}>Já tem uma conta? Entre agora</Link>
			</form>
		</Container>
	);
}

export default Signup;
