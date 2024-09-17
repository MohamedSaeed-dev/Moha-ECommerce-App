import Categories from "./components/Categories";
import Header from "./components/Header";
import NewArrivals from "./components/NewArrivals";
import Slider from "./components/Slider";
import TopHeader from "./components/TopHeader";
import Trending from "./components/Trending";
import TopRated from "./components/TopRated";
import BottomBar from "./components/BottomBar";
import NewProduct from "./components/NewProduct";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Drawer from "./components/Drawer";
import { useContext } from "react";
import { DataContext } from "./components/DataContext";
import Favourite from "./components/Favourite";


function App() {
  const {drawer} = useContext(DataContext)
  return (
    <>
      <div className="flex flex-col relative">
        <TopHeader />
        <Header />
        <Slider />
        <Categories />
        <div className="p-4 xl:px-80 md:px-24 text-sm flex flex-col md:flex-row items-center gap-6">
          <NewArrivals />
          <Trending />
          <TopRated />
        </div>
        <div className="flex items-center justify-center">
          <BottomBar />
        </div>
        <NewProduct />
        <Drawer>
          {drawer === "cart" ? <Cart /> : <Favourite />}
        </Drawer>
        <Footer />
      </div>
      
    </>
  );
}

export default App;
