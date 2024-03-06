import { useAuth } from "../hooks/useAuth";

const Home = () => {
    const {auth}=useAuth()
    console.log(auth.user)
    return <div>Home</div>;
};

export default Home;
