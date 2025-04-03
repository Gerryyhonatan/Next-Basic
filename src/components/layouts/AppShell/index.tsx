import { useRouter } from "next/router";
import Navbar from "../Navbar"

type PropsType = {
    children: React.ReactNode;
};

const disableNavbar = ["/auth/login", "/auth/register", "/404"];

const AppShell = (props: PropsType) => {
    const {children} = props;
    const {pathname} = useRouter();


    return (
        <div>
            {!disableNavbar.includes(pathname) && <Navbar />}
            {children}
        </div>
    );
};

export default AppShell;