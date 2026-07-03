import Logo from './Logo.jsx';
import NavMenu from "./NavMenu.jsx";
import LogoutButton from "./LogoutButton.jsx";
import '../../Styles/header.css';
const Header =() =>{
    return (
            <header className="header-container">
                <Logo />
                <div className="header-right-actions">
                    <NavMenu />
                    <LogoutButton />
                </div>
            </header>
    )
}
export default Header;