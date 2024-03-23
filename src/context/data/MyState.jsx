
import { useEffect, useState } from 'react'
import MyContext from './myContext'
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';


const MyState = (props) => {
    const [mode, setMode] = useState("light");
    const toggleMode = () => {
        if(mode === "light") {
            setMode("dark");
            document.body.style.backgroundColor = "rgb(17, 24, 39)"
        }
        else{
            setMode('light');
            document.body.style.backgroundColor = "white";
        }
    }
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null, 
        category:null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric"
            }
        )
    });
    
    // Add Products
    const addProduct = async () => {
        if (products.title == null || products.price == null || products.imageUrl ==null ||
        products.category == null || products.description == null  ) {
            return toast.error(" All fields are required ")
        }

        setLoading(false)

        try {
            const productRef = collection(fireDB, "products");
            await addDoc(productRef, products);
            toast.success("Add Product Successfully!");
            setTimeout(() => {
                window.location.href = "/dashboard"
            }, 1000);
            getProductData();
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    const [apiProduct, setApiProduct ] = useState([])
    // console.log(apiProduct)ok

    // get Product from API
    const getProducts = async () => {
        setLoading(true)
        const res = await fetch("https://fakestoreapi.com/products")
        const data = await res.json();
        setApiProduct(data)
        setLoading(false)
    }

    useEffect(() => {
        getProducts()
    }, [])

    const [product, setProduct ] = useState([]);

    

    const getProductData = async () => {

        try{
            const q = query(
                collection(fireDB, "products"),
                orderBy("time")
            );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let productArray = [];
            QuerySnapshot.forEach((doc) => {
                productArray.push({...doc.data(), id: doc.id});
            });
            setProduct(productArray);
            setLoading(false)
        });
        return () => data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductData();
    }, [])

    const editHandle = (item) => {
        setProducts(item)
    }
//   Update Products
    const updateProduct = async () => {
        setLoading(true); 
        try{
            await setDoc(doc(fireDB, "products", products.id), products);
            toast.success("Product Updated successfully");
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1000)
            
            setLoading(false);

        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

// Delete Products

const deleteProduct = async (item) => {
    try {
        await deleteDoc(doc(fireDB, "products", item.id))
        toast.success("Product Deleted successfully")
        getProductData();
        setLoading(false);
    } catch (error) {
        console.log(error)
        setLoading(false);
    }
};

// Get Order 
const [orders, setOrders] = useState([]);

const getOrderData = async () => {
    setLoading(true);
    try {
        const result = await getDocs(collection(fireDB, "orders"));
        const ordersArray = [];
        result.forEach((doc) => {
            ordersArray.push({ id: doc.id, ...doc.data() });
        });
        setOrders(ordersArray);
    } catch (error) {
        console.log(error);
    }
    setLoading(false);
}

const deleteOrder = async (orderId) => {
    setLoading(true);
    try {
        await deleteDoc(doc(fireDB, "orders", orderId));
        setOrders(orders.filter(order => order.id !== orderId));
        console.log("Order deleted successfully");
    } catch (error) {
        console.log(error);
    }
    setLoading(false);
}

useEffect(() => {
    getOrderData();
}, []);


const handleDeleteOrder = async (orderId) => {
    // Call deleteOrder function to delete the order with the specified orderId
    await deleteOrder(orderId);
}

// Delete Order



const [users, setUsers] = useState([]);

const getUserData = async () => {
    setLoading(true)
    try {
        const result = await getDocs(collection(fireDB, "users"))
        const usersArray = [];
        result.forEach((doc) => {
            usersArray.push(doc.data());
            setLoading(false)
        });
        setUsers(usersArray);
        console.log(usersArray)
        setLoading(false);
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}

useEffect(() => {
    getUserData();
}, []);
const deleteUser = async (item) => {
    try {
        await deleteDoc(doc(fireDB, "users", item.id))
        toast.success("Product Deleted successfully")
        getUserData();
        setLoading(false);
    } catch (error) {
        console.log(error)
        setLoading(false);
    }
};

// filter
const [searchKey, setSearchKey] = useState("")
const [filterType, setFilterType] = useState("");
const [filterPrice, setFilterPrice] = useState("");

    return (
    <MyContext.Provider value={{mode, toggleMode, loading, setLoading,
        product, apiProduct, products, setProducts, addProduct, editHandle,
        updateProduct, deleteProduct, users, orders, handleDeleteOrder,  searchKey, setSearchKey,
        filterType, setFilterType, filterPrice, setFilterPrice,deleteUser }} >
        {props.children}
    </MyContext.Provider>
  )
}

export default MyState