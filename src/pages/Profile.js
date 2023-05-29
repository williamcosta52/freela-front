import { Container } from "../styles/containerSignUp";
import Header from "../constants/Header";
import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import tokenContext from "../contexts/token.context";
import { AiFillHeart } from "react-icons/ai";
import dayjs from "dayjs";
import NewPost from "../constants/NewPost";
import Followers from "../constants/Followers";

function Profile({ mode, setMode }) {
	const [profilesInfo, setProfilesInfo] = useState([]);
	const { userInfo } = useContext(tokenContext);
	const [likeButton, setLikeButton] = useState({});
	const [newPost, setNewPost] = useState(false);
	const [followersInfo, setFollowersInfo] = useState(false);
	const Icon = likeButton ? AiFillHeart : AiOutlineHeart;
	const PORT = process.env.REACT_APP_API_URL;
	useEffect(() => {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		axios
			.get(`${PORT}/infos`, config)
			.then((r) => {
				setProfilesInfo(r.data);
			})
			.catch((e) => console.log(e));
	}, [profilesInfo]);
	function like(id) {
		if (likeButton[id]) {
			setLikeButton((prevLikeButton) => ({
				...prevLikeButton,
				[id]: false,
			}));
		} else {
			setLikeButton((prevLikeButton) => ({
				...prevLikeButton,
				[id]: true,
			}));
		}
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		axios
			.post(`${PORT}/like/${id}`, null, config)
			.then((r) => console.log(r))
			.catch((e) => alert(e));
	}
	function post(e) {
		e.preventDefault();
		setNewPost(true);
	}
	function followers(e) {
		e.preventDefault();
		setFollowersInfo(true);
	}
	function follow(e) {
		e.preventDefault();
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
	}
	return (
		<Container mode={mode}>
			<Header mode={mode} setMode={setMode} />
			<AddButton onClick={post} mode={mode}>
				<span>+</span>
			</AddButton>
			{newPost === true && <NewPost mode={mode} setNewPost={setNewPost} />}
			{followersInfo === true && (
				<Followers mode={mode} setFollowersInfo={setFollowersInfo} />
			)}
			<ProfileDiv mode={mode}>
				<ImageDiv>
					<img src={userInfo.imageProfile} alt="profileImage" />
				</ImageDiv>
				<DescriptionDiv mode={mode}>
					<p>{userInfo.name}</p>
					<p>{userInfo.description}</p>
					<div>
						<button onClick={followers}>Ver seguidores</button>
						<button className="secondButton">Ver quem eu sigo</button>
						<button className="secondButton" onClick={follow}>
							Seguir
						</button>
					</div>
				</DescriptionDiv>
			</ProfileDiv>
			{profilesInfo.length === 0 ? (
				<p>Você não tem publicações</p>
			) : (
				profilesInfo.map((p, index) => (
					<PostDiv key={index} mode={mode}>
						<ImagePubliDiv>
							<img src={p.image} alt="postImage" />
						</ImagePubliDiv>
						<InfosPostDiv mode={mode}>
							<Icon
								mode={mode}
								onClick={() => like(p.id)}
								style={{
									width: "30px",
									height: "40px",
									color: likeButton[p.id]
										? "red"
										: mode === "#1E1C1C" && "white",
									cursor: "pointer",
								}}
							/>
							<p className="likes">{p.likes} pessoas curtiram sua foto</p>
							<p className="date">{`${dayjs(p.postedAt).format(
								"DD/MM/YYYY"
							)} às ${dayjs(p.postedAt).format("HH:mm")}`}</p>
						</InfosPostDiv>
						<DescriptionPubliDiv mode={mode}>
							<p>{p.postDescription}</p>
						</DescriptionPubliDiv>
					</PostDiv>
				))
			)}
		</Container>
	);
}
export default Profile;
const ProfileDiv = styled.div`
	width: 900px;
	height: 210px;
	margin-bottom: 40px;
	background-color: ${(props) =>
		props.mode === "#1E1C1C" ? "#1E1C1C" : "#fefdfd"};
	border-right: ${(props) =>
		props.mode === "#1E1C1C"
			? "0px 4px 4px rgba(0, 0, 0, 0.25)"
			: "1px solid #dcdcdc"};
	box-shadow: ${(props) =>
		props.mode === "#1E1C1C"
			? "0px 4px 4px rgba(255, 255, 255, 0.25)"
			: "0px 4px 4px rgba(0, 0, 0, 0.25)"};
	border-radius: 4px 2px;
	display: flex;
	margin-top: 150px;
`;
const ImageDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		width: 125px;
		height: 120px;
		background: #d9d9d9;
		border-radius: 70px;
		margin-left: 30px;
	}
`;
const DescriptionDiv = styled.div`
	display: flex;
	align-items: start;
	justify-content: center;
	flex-direction: column;
	margin-left: 30px;
	.secondButton {
		margin-left: 20px;
	}
	p {
		font-weight: 400;
		font-size: 25px;
		line-height: 39px;
		color: ${(props) => (props.mode === "#1E1C1C" ? "white" : "#0b0b0b")};
		margin: 5px 0px;
	}
	div {
		button {
			width: 180px;
			height: 25px;
			background: #94b2df;
			border-radius: 5px;
			border: none;
			margin-top: 20px;
			box-shadow: ${(props) =>
				props.mode === "#1E1C1C"
					? "0px 4px 4px rgba(255, 255, 255, 0.25)"
					: "0px 4px 4px rgba(0, 0, 0, 0.25)"};
			cursor: pointer;
			::placeholder {
				font-weight: 400;
				font-size: 32px;
				line-height: 39px;
				text-align: center;
				color: #000000;
			}
		}
	}
`;
const PostDiv = styled.div`
	width: 900px;
	height: 500px;
	margin-bottom: 50px;
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
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const ImagePubliDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		width: 658px;
		height: 402px;
		background: #d9d9d9;
		border: 5px solid #94b2df;
		border-radius: 2px;
		margin-top: 15px;
	}
`;
const InfosPostDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 658px;
	p {
		font-weight: 400;
		font-size: 17px;
		line-height: 29px;
		color: ${(props) => (props.mode === "#1E1C1C" ? "white" : "#0b0b0b")};
	}
	.date {
		font-size: 15px;
	}
	.likes {
		margin-right: 250px;
	}
`;
const DescriptionPubliDiv = styled.div`
	display: flex;
	width: 658px;
	align-items: center;
	justify-content: start;
	p {
		font-style: normal;
		font-weight: 400;
		font-size: 24px;
		line-height: 29px;
		color: ${(props) => (props.mode === "#1E1C1C" ? "white" : "#0b0b0b")};
	}
`;
const AddButton = styled.div`
	position: absolute;
	top: 200px;
	right: 200px;
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
