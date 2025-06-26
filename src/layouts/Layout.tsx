import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <>
            <header>
                <h1>My Application</h1>
            </header>
            <main>{children}</main>
            <footer>© 2025 My Application</footer>
        </>
    );
};

export default Layout;
