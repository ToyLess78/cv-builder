import React from 'react';
import styles from './Main.module.css';
import { MonthYearPickerSingle, MonthYearPickerWithRange } from '~/components';
import { FaBitbucket, FaFacebook, FaGithub, FaLinkedin, FaTelegramPlane } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { loadFromLocalStorage, saveToLocalStorage } from '~/utils/local-storage.utills';
import { BsDiscord, BsGitlab, BsReddit, BsWechat, BsWhatsapp } from 'react-icons/bs';
import { IoLogoYoutube } from 'react-icons/io';
import { GrInstagram } from 'react-icons/gr';
import { ImStackoverflow } from 'react-icons/im';
import { SiSlack } from 'react-icons/si';
import { TabPanel, TabView } from 'primereact/tabview';
import { IconsMap } from '~/components/contacts/IconsMap';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { selectContacts } from '~/slices/contactSlice';
import { SpeedDial } from 'primereact/speeddial';
import { MenuItem } from 'primereact/menuitem';


interface IMainProps {
    isOrder?: boolean;
}

const data = [
    {
        id: 'linkedIn',
        link: 'https://www.linkedin.com/',
        isShow: true
    },
    {
        id: 'gitHub',
        link: 'https://github.com/',
        isShow: true
    },
    {
        id: 'twitter',
        link: 'https://twitter.com/',
        isShow: true
    },
    {
        id: 'facebook',
        link: 'https://www.facebook.com/',
        isShow: true
    },
    {
        id: 'telegram',
        link: 'https://t.me/',
        isShow: true
    },
    {
        id: 'gitLab',
        link: 'https://gitlab.com/',
        isShow: false
    },
    {
        id: 'bitbucket',
        link: 'https://bitbucket.org/',
        isShow: false
    },
    {
        id: 'slack',
        link: 'https://slack.com/',
        isShow: false
    },
    {
        id: 'discord',
        link: 'https://discord.com/',
        isShow: false
    },
    {
        id: 'youTube',
        link: 'https://www.youtube.com/',
        isShow: false
    },
    {
        id: 'instagram',
        link: 'https://www.instagram.com/',
        isShow: false
    },
    {
        id: 'stackOverflow',
        link: 'https://stackoverflow.co/',
        isShow: false
    },
    {
        id: 'reddit',
        link: 'https://www.reddit.com/',
        isShow: false
    },
    {
        id: 'whatsApp',
        link: 'https://www.whatsapp.com/',
        isShow: false
    },
    {
        id: 'weChat',
        link: 'https://www.wechat.com/',
        isShow: false
    },

]
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
const iconMap = new Map(Object.entries(icons));

saveToLocalStorage('socialData', data);
const socialData = loadFromLocalStorage('socialData') || data;

export const Main: React.FC<IMainProps> = () => {
    const contactState = useSelector((state: RootState) => selectContacts(state));
    console.log(contactState)
    
    // const router = useRouter();
    const items: MenuItem[] = [
        {
            label: 'Add',
            icon: <SiSlack size='1.1rem'/>,
            command: () => {
                console.log({ severity: 'info', summary: 'Add', detail: 'Data Added' });
            }
        },
        {
            label: 'Update',
            icon: <SiSlack size='1.1rem'/>,
            command: () => {
                console.log({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
            }
        },
        {
            label: 'Delete',
            icon: <SiSlack size='1.1rem'/>,
            command: () => {
                console.log({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
            }
        },
        {
            label: 'Upload',
            icon: <SiSlack size='1.1rem'/>,
            command: () => {
                console.log({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
            }
        },
        {
            label: 'React Website',
            icon: <SiSlack size='1.1rem'/>,
            command: () => {
                console.log({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
            }
        }
    ];
    return (
        <section className={ styles.main } >
            {/*<article>*/}
            {/*    <h1 className='title'>I'm alphardex.</h1>*/}
            {/*    <p className='subtitle'>A CSS Wizard</p>*/}
            {/*</article>*/}
            <MonthYearPickerWithRange/>
            <MonthYearPickerSingle/>
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                {contactState.data?.map(s => (
                        s?.isShow && <a key={s?.id} href={s?.link}>{IconsMap.get(s?.id)}</a>
                    )
                )}
            </div>
            <div className='card-tab'>
                <TabView className={'tab'}>
                    {contactState.data?.map((tab) => {
                        return (
                            tab.isShow && <TabPanel className={tab.isShow ? 'item' : 'disabled'} key={tab.id} header={iconMap.get(tab?.id)}>
                                <p className='m-0'>{tab.link}</p>
                            </TabPanel>
                        );
                    })}
                </TabView>
                <SpeedDial model={ items } direction="right" className={ 'card-menu' }/>
            </div>
            <input type='tel' name='phone'  required onChange={(e) => console.log(e.currentTarget.value)}/>
            <input type='url' name='url' id='url' required />
        </section>

    )
}