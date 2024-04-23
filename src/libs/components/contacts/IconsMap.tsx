import { FaBitbucket, FaFacebook, FaGithub, FaLinkedin, FaTelegramPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { BsDiscord, BsGitlab, BsReddit, BsWechat, BsWhatsapp } from 'react-icons/bs';
import { IoLogoYoutube } from 'react-icons/io';
import { GrInstagram } from 'react-icons/gr';
import { ImStackoverflow } from 'react-icons/im';
import { SiSlack } from 'react-icons/si';

const icons = {
    linkedIn: <FaLinkedin size='1.3rem'/>,
    gitHub: <FaGithub size='1.3rem'/>,
    twitter: <FaXTwitter size='1.3rem'/>,
    telegram: <FaTelegramPlane size='1.3rem'/>,
    facebook: <FaFacebook size='1.3rem'/>,
    gitLab: <BsGitlab size='1.2rem'/>,
    bitbucket: <FaBitbucket size='1.1rem'/>,
    discord: <BsDiscord size='1.3rem'/>,
    reddit: <BsReddit size='1.3rem'/>,
    youTube: <IoLogoYoutube size='1.3rem'/>,
    instagram: <GrInstagram size='1.2rem'/>,
    stackOverflow: <ImStackoverflow size='1.1rem'/>,
    whatsApp: <BsWhatsapp size='1.2rem'/>,
    weChat: <BsWechat size='1.4rem'/>,
    slack: <SiSlack size='1.1rem'/>,
}
export const IconsMap = new Map(Object.entries(icons));