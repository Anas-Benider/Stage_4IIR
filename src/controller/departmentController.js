import departmentService from '../cservices/departmentService.js'
import employeesService from '../cservices/employeesService.js'

const getAll = async (req, res) => {
    
    //gets All deps
    const departments = await departmentService.getAll();
    //gets all employees
    const employees = await employeesService.taskSelectEmployees();
    res.render('partials/frame', { partialPath: '../départements', departments, employeesForChefDepartment: employees ,employees });
    
}

const create = async (req, res) => {

    let { label, chef, chosenEntries: employees } = req.body
    
    if (typeof employees === "string")
    {
        employees = [employees]
    }
    employees = employees.map(employeeId => {
        return {
            matricule: employeeId
        }
    })
    const department = await departmentService.create(label, chef, employees);
    return res.redirect('/deps');

}

const remove = async (req, res) => {
    const {id} =  req.body;
    const department = await departmentService.remove(id);
    return res.redirect('/deps');
}

export default {
    getAll,
    create,
    remove
}