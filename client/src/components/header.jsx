import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LanguageIcon from '@mui/icons-material/Language';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Avatar from '@mui/material/Avatar';
import Logo from "../logo images/QUORASAMPLELOGO.png"
import "../StyleSheet/Header.css"

{/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */ }
const Header = () => {
    const location = window.location.href;
    return (
        <div className="Header">
            <div className="Header__left">
                <div className="left__logo">
                    <img src={Logo} alt="logo of brand" className='Left__logoimage' />
                </div>
                <div className={`left__Home  ${location === "http://localhost:3000/" ? "current-location" : null}`}>
                    <HomeIcon /><h4>HOME</h4>
                </div>
                <div className={`left__notifications  ${location === "http://localhost:3000/notifications" ? "current-location" : null}`}>
                    <NotificationsIcon /><h4>Notification</h4>
                </div>
            </div>
            <div className="Header__center">
                <input type="text" placeholder='Search' className='center__inputfield' />
                <SearchIcon />
            </div>
            <div className="Header__right">
                <div className="right__user">
                    <Avatar src='' alt='user profile ' />
                </div>
                <LanguageIcon className='right__icon' />
                <button className='right-btn'>Ask your question</button>

            </div>
        </div>


    );
    // return <h1>Header</h1>;


};

export default Header; 