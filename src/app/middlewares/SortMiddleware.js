module.exports = function SortMiddleware(req, res, next) {
    // monitering when sort enble or disable
    // Default sort by name desc
    res.locals._sort = {
        enable: "false",
        column: "name",
        type: "default",
    }
    // if change URL --> Change res.locals
    //res.locals is used in many views 
    if (req.query.hasOwnProperty('_sort')) {
        res.locals._sort.enable = true,
        res.locals._sort.column = req.query.column;
        res.locals._sort.type = req.query.type;
    }
    next();
}