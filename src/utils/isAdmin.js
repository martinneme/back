// let isAdmin = false;


export const isAutoricated = (req,res,next) =>{
    const {isAdmin} = req.body;
    if(!isAdmin){
     const unAuthorized = {
        errorCode:401,
        description:`${req.url} ${req.method} no autorizado`
     }
     res.status(401).json(unAuthorized);
   
    }else{
     return next(); 
    }
   
}