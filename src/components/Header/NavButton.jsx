const NavButton = (props) => {
    const {
        icon: Icon
    }=props;
    return (
        <button className="icon-btn">
            <Icon className="icon-img" />
        </button>
    )
}
export default NavButton;