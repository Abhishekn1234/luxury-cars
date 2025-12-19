import About from "../../components/Home/About";
import Cars from "../../components/Home/Cars";
import Clients from "../../components/Home/Clients";
import HeroSection from "../../components/Home/Herosection";
import RecentCollection from "../../components/Home/MyCollection";

export default function Home(){
    return(
        <>
        <HeroSection/>
        <About/>
        <RecentCollection/>
        <Clients/>
        <Cars/>
        </>
    )
}