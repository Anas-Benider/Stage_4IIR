const home = (req, res) => {
    
    res.render('home',{ username: 'anas'})
}

const testSelect = (req,res) => {
    return res.render('partials/frame', {
        partialPath: './multiSelect'})
}

export default {
    home,
    testSelect
}