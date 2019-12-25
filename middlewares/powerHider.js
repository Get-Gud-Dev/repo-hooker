exports.hider = function() {
    return (req,res,next) => {
        res.removeHeader('X-Powered-By')
        next()
    }
}