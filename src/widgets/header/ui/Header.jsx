import HistoryIcon from '../../../shared/assets/icons/HistoryIcon.svg?react';
import MotorcycleIcon from '../../../shared/assets/icons/MotorcycleIcon.svg?react';
import ProfileIcon from '../../../shared/assets/icons/ProfileIcon.svg?react';
import LogoutIcon from '../../../shared/assets/icons/logoutIcon.svg?react';
import './Header.css';

const Header = () => {
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
    );
};
export default Header;
