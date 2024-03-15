import { Route, Routes } from "react-router-dom";
import CreateBlog from "./components/CreateBlog";
import Home from "./components/HomePageSection/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import SingleBlogSection from "./components/profile/post/SingleBlogSection";
import PrivateRoutes from "./routes/PrivateRoutes";
import Author from "./components/profile/Author";

function App() {
    return (
        <>
            <Header />
            <Routes>
                {/* Private Routes */}
                <Route element={<PrivateRoutes />}>
                    <Route path="/createBlog" element={<CreateBlog />} />
                    <Route path="/profile" element={<Profile />} exact />
                </Route>

                {/* Public Routes */}
                <Route path="/" element={<Home />} exact />

                <Route path="/profile/:id" element={<Author />} exact />
                <Route
                    path="/blogs/:blogId"
                    element={<SingleBlogSection />}
                    exact
                />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Not Found Route */}
                <Route path="*" element={<NotFound />} />
                <Route path="/notfound" element={<NotFound />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;
