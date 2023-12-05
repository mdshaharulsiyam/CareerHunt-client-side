import { Outlet } from "react-router-dom"
import Header from "../../Shered/Header/Header"
import Footer from "../../Shered/Footer/Footer"
const Root = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Root
