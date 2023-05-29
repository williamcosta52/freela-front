import { useContext, useState } from "react";
import styled from "styled-components";
import tokenContext from "../contexts/token.context";
import axios from "axios";

export default function NewPost({ mode, setNewPost }) {
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const { userInfo } = useContext(tokenContext);
	const PORT = process.env.REACT_APP_API_URL;
	function closeNewPost() {
		setNewPost(false);
	}
	function publiPost(e) {
		e.preventDefault();
		const body = {
			image,
			postDescription: description,
		};
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		axios
			.post(`${PORT}/post`, body, config)
			.then((r) => {
				alert(r.data.message);
				setNewPost(false);
			})
			.catch((e) => alert(e));
	}
	return (
		<PostContainer>
			<ClosePost onClick={closeNewPost} mode={mode}>
				<span>X</span>
			</ClosePost>
			<H1Post mode={mode}>
				<h1>Nova Publicação</h1>
			</H1Post>
			<PostInfos mode={mode}>
				<label>Foto</label>
				<input
					value={image}
					required
					onChange={(e) => setImage(e.target.value)}
				/>
				<label>Descrição</label>
				<input
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button onClick={publiPost}>Criar</button>
			</PostInfos>
		</PostContainer>
	);
}

export const PostContainer = styled.div`
	width: 100%;
	height: 100%;
	backdrop-filter: blur(5px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 50px;
`;
const H1Post = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	h1 {
		color: ${(props) => (props.mode === "#1E1C1C" ? "white" : "#1E1C1C")};
		font-size: 40px;
		font-style: oblique;
	}
`;
export const PostInfos = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 900px;
	height: 500px;
	background-color: ${(props) =>
		props.mode === "#1E1C1C" ? "#1E1C1C" : "#fefdfd"};
	border-right: ${(props) =>
		props.mode === "#1E1C1C"
			? "0px 4px 4px rgba(0, 0, 0, 0.25)"
			: "1px solid #dcdcdc"};
	border-top: ${(props) =>
		props.mode === "#1E1C1C"
			? "0px 4px 4px rgba(0, 0, 0, 0.25)"
			: "1px solid #dcdcdc"};
	box-shadow: ${(props) =>
		props.mode === "#1E1C1C"
			? "0px 4px 4px rgba(255, 255, 255, 0.25)"
			: "0px 4px 4px rgba(0, 0, 0, 0.25)"};
	border-radius: 4px;
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
	label {
		color: ${(props) => (props.mode === "#1E1C1C" ? "white" : "#1E1C1C")};
		font-size: 20px;
		font-style: oblique;
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
		cursor: pointer;
		font-size: 20px;
		font-style: oblique;
	}
`;
export const ClosePost = styled.div`
	position: absolute;
	top: 280px;
	right: 530px;
	border: 1px solid black;
	width: 60px;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50px;
	box-shadow: ${(props) =>
		props.mode === "#1E1C1C"
			? "0px 4px 4px rgba(255, 255, 255, 0.25)"
			: "0px 4px 4px rgba(0, 0, 0, 0.25)"};
	cursor: pointer;
	span {
		font-size: 40px;
		color: ${(props) => (props.mode === "#1E1C1C" ? "white" : "")};
	}
`;
