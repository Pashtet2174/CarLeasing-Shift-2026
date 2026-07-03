import LogoutIcon from '../../images/logoutIcon.svg?react';
const LogoutButton = () => {
    return (
        <button className="logout-btn">
            <span className="logout-btn-text">Выйти</span>
            <LogoutIcon className="logout-icon-img" />
        </button>
    )
}
export default LogoutButton;