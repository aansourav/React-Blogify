import { useAuth } from "../hooks/useAuth";

const Home = () => {
    const { auth } = useAuth();
    return <div>Home</div>;
};

export default Home;
