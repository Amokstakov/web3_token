import HeroHome from "../components/HeroHome";

const Home = ({ currentAccount, setAccount }) => {
  console.log(currentAccount);
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <HeroHome currentAccount={currentAccount} setAccount={setAccount} />
    </div>
  );
};

export default Home;
