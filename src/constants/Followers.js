import { useContext, useEffect, useState } from "react";
import { ClosePost, PostContainer, PostInfos } from "./NewPost";
import tokenContext from "../contexts/token.context";
import axios from "axios";
import styled from "styled-components";

export default function Followers({ mode, setFollowersInfo }) {
	const PORT = process.env.REACT_APP_API_URL;
	const { userInfo } = useContext(tokenContext);
	const [followersInfos, setFollowersInfos] = useState([]);
	useEffect(() => {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		axios
			.get(`${PORT}/followers`, null, config)
			.then((r) => setFollowersInfos(r.data))
			.catch((e) => console.log(e));
	}, []);
	function closeFollow(e) {
		e.preventDefault();
		setFollowersInfo(false);
	}
	return (
		<FollowersDiv>
			<CloseFollowButton onClick={closeFollow} mode={mode}>
				<span>X</span>
			</CloseFollowButton>
			<FollowersProfiles mode={mode}>
				{followersInfos.length === 0 ? (
					<p>Você não tem seguidores</p>
				) : (
					followersInfos.map((s, index) => (
						<Follows key={index} mode={mode}>
							<div>
								<img src={s.imageProfile} />
							</div>
							<div>
								<p>{s.name}</p>
								<p>{s.description}</p>
							</div>
						</Follows>
					))
				)}
			</FollowersProfiles>
		</FollowersDiv>
	);
}

const FollowersDiv = styled.div`
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
const FollowersProfiles = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 600px;
	height: 600px;
	overflow: hidden;
	position: relative;
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
`;
const Follows = styled.div`
	width: 70%;
	height: 100px;
	margin-bottom: 20px;
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
	img {
		width: 50px;
		height: 55px;
		border-radius: 40px;
	}
	p {
		color: ${(props) => (props.mode === "#1E1C1C" ? "white" : "")};
	}
`;
const CloseFollowButton = styled.div`
	position: absolute;
	top: 90px;
	right: 600px;
	border: 1px solid black;
	width: 60px;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50px;
	z-index: 1;
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
