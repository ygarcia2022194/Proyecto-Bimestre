import Client from '../client/client.js';

export const adminRole = (req, res, next) =>{
    if(!req.admin && !req.client){
        return res.status(500).json({
            msg: "Se desea validar un usuario sin validar token"
        })
    }
    const user = req.admin || req.client;

    if(user && user.role !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg: `${user.nombre} no eres administrador, no tienes acceso a esto`
        });
        next();
    }
}

export const tieneRolAutorizado =(...roles)=>{
    return(req, res, next)=>{
        if(!req.admin && !req.client){
            return res.status(500).json({
                msg: "Se desea validar un usuario sin validar token primero"
            });
        }

        const user = req.admin || req.client;

        if(user && !roles.includes(user.role)){
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles autorizados ${roles.join(",")}`
            })
        }
    }
}