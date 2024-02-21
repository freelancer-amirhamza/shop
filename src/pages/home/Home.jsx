

import { useDispatch, useSelector } from 'react-redux'
import Filter from '../../components/filter/Filter'
import Footer from '../../components/footer/Footer'
import HeroSection from '../../components/heroSection/HeroSection'
import Layout from '../../components/layout/Layout'
import ProductCard from '../../components/productCard/ProductCard'
import Testimonial from '../../components/testimonial/Testimonial'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'


const Home = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart );

  const addCart = () =>{
    dispatch(addToCart("shirt"));
  }
  const deleteCart = () => {
    dispatch(deleteFromCart("shirt"));
  }
  
  return (
    <div>
      <Layout>
        <HeroSection/>
        <Filter/>
        <ProductCard/>
        <Testimonial/>
        <Footer/>
      </Layout>
    </div>
  )
}

export default Home