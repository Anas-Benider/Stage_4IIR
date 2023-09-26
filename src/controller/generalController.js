import jwt from 'jsonwebtoken';
import genService from '../cservices/genService.js';

const home = (req, res) => {
    
    res.render('home',{ username: 'anas'})
}

const testSelect = (req,res) => {
    return res.render('partials/frame', {
        partialPath: './multiSelect'})
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await genService.CheckUser(email, password);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).send({ user,token });
    } catch (err) {
        if(err.status === 404)
            return res.status(404).send({ msg: err.msg });
        else
            return res.status(400).send({ msg: err.message });    
    }
}

export default {
    home,
    testSelect,
    login
}