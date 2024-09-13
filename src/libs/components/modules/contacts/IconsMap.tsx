import {
	BsDiscord,
	BsGitlab,
	BsReddit,
	BsWechat,
	BsWhatsapp,
} from "react-icons/bs";
import {
	FaBitbucket,
	FaCodepen,
	FaFacebook,
	FaGithub,
	FaLinkedin,
	FaTelegramPlane,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { ImStackoverflow } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";
import { SiSlack } from "react-icons/si";

const icons = {
	linkedIn: (
		<FaLinkedin
			size="1.3rem"
			data-tooltip-id="tooltip"
			data-tooltip-content="linkedIn"
			data-tooltip-offset="0"
		/>
	),
	gitHub: (
		<FaGithub
			data-tooltip-id="tooltip"
			data-tooltip-content="gitHub"
			size="1.3rem"
			data-tooltip-offset="0"
		/>
	),
	twitter: (
		<FaXTwitter
			data-tooltip-id="tooltip"
			data-tooltip-content="twitter"
			size="1.3rem"
			data-tooltip-offset="0"
		/>
	),
	telegram: (
		<FaTelegramPlane
			data-tooltip-id="tooltip"
			data-tooltip-content="telegram"
			size="1.3rem"
			data-tooltip-offset="0"
		/>
	),
	facebook: (
		<FaFacebook
			data-tooltip-id="tooltip"
			data-tooltip-content="facebook"
			size="1.3rem"
			data-tooltip-offset="0"
		/>
	),
	gitLab: (
		<BsGitlab
			data-tooltip-id="tooltip"
			data-tooltip-content="gitLab"
			size="1.2rem"
			data-tooltip-offset="0"
		/>
	),
	bitbucket: (
		<FaBitbucket
			data-tooltip-id="tooltip"
			data-tooltip-content="bitbucket"
			size="1.1rem"
			data-tooltip-offset="0"
		/>
	),
	discord: (
		<BsDiscord
			data-tooltip-id="tooltip"
			data-tooltip-content="discord"
			size="1.3rem"
			data-tooltip-offset="0"
		/>
	),
	codePen: (
		<FaCodepen
			data-tooltip-id="tooltip"
			data-tooltip-content="codePen"
			size="1.3rem"
			data-tooltip-offset="0"
		/>
	),
	reddit: (
		<BsReddit
			data-tooltip-id="tooltip"
			data-tooltip-content="reddit"
			size="1.3rem"
			data-tooltip-offset="0"
		/>
	),
	youTube: (
		<IoLogoYoutube
			data-tooltip-id="tooltip"
			data-tooltip-content="youTube"
			size="1.3rem"
			data-tooltip-offset="0"
		/>
	),
	instagram: (
		<GrInstagram
			data-tooltip-id="tooltip"
			data-tooltip-content="instagram"
			size="1.2rem"
			data-tooltip-offset="0"
		/>
	),
	stackOverflow: (
		<ImStackoverflow
			data-tooltip-id="tooltip"
			data-tooltip-content="stackOverflow"
			size="1.1rem"
			data-tooltip-offset="0"
		/>
	),
	whatsApp: (
		<BsWhatsapp
			data-tooltip-id="tooltip"
			data-tooltip-content="whatsApp"
			size="1.2rem"
			data-tooltip-offset="0"
		/>
	),
	weChat: (
		<BsWechat
			data-tooltip-id="tooltip"
			data-tooltip-content="weChat"
			size="1.4rem"
			data-tooltip-offset="0"
		/>
	),
	slack: (
		<SiSlack
			data-tooltip-id="tooltip"
			data-tooltip-content="slack"
			size="1.1rem"
			data-tooltip-offset="0"
		/>
	),
};
export const IconsMap = new Map(Object.entries(icons));
