import HistoryIcon from "../../images/history.svg?react";
import ProfileIcon from "../../images/profileIcon.svg?react";
import NavButton from "./NavButton.jsx";

const NavMenu = () => {
    const navItems = [
        {
            id: "history",
            icon: HistoryIcon
        },
        {
            id: "profile",
            icon: ProfileIcon
        }
    ];
    return (
        <div className="header-nav-menu">
            {navItems.map((item) => (
                <NavButton key={item.id} icon={item.icon} />
            ))}
        </div>
    )
}
export default NavMenu;