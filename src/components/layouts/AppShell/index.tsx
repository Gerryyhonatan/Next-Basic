import Navbar from "../Navbar"

type PropsType = {
    children: React.ReactNode;
};

const AppShell = (props: PropsType) => {
    const {children} = props;
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    );
};

export default AppShell;