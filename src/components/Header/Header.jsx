import '../../Styles/header.css';
import MotorcycleIcon from "../../images/motorcycle.svg?react";
import LogoutIcon from "../../images/logoutIcon.svg?react";
import HistoryIcon from "../../images/history.svg?react";
import ProfileIcon from "../../images/profileIcon.svg?react";

const Header =() =>{
    return (
            <header className="header-container">
                <div className="header-logo">
                    <MotorcycleIcon className="logo-img" />
                    <span className="logo-text">LEASING</span>
                </div>
                <div className="header-right-actions">
                    <div className="header-nav-menu">
                        <button className="icon-btn">
                            <HistoryIcon className="icon-img" />
                        </button>
                        <button className="icon-btn">
                            <ProfileIcon className="icon-img" />
                        </button>
                    </div>
                    <button className="logout-btn">
                        <span className="logout-btn-text">Выйти</span>
                        <LogoutIcon className="logout-icon-img" />
                    </button>
                </div>
            </header>
    )
}
export default Header;