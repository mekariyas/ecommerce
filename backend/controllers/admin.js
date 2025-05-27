//log in and log out(get request)
//add a new product (post request)
//restock a product(put request)
//delete a product(delete request)

const login  = async (req,res)=>{
    const { email, password } = req.body
    if (!email || !password){
        return res.status(401).json({message:"Missing credentials", success:false})
    }
    try{

    }catch(error){}
}

const addProduct = async(req, res)=>{}

const getProduct  = async(req, res)=>{}

const restockProduct = async(req, res)=>{}

const deleteProduct   = async(req, res)=>{}


const logout = async(req, res)=>{}

