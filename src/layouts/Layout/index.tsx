import type { ReactNode } from "react";
import "./index.css";

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <>
            <header className="header">
                <h1>My Application</h1>
            </header>
            <main className="main">{children}</main>
        </>
    );
};

export default Layout;
