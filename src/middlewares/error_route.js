

const error_route = (req,res,next) =>{
    res.json({
        "oppss":"Aradığınız sayfa bulunamadı!"
    });
}


module.exports = error_route;