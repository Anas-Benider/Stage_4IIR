import { useEffect } from "react";

const EmployeesListing = ({taskId, employees, setter, removeTask}) => {

  console.log('emps', employees);

    const removeEmployeeFromTask = (empId, taskId) => {
        fetch('http://localhost:3000/task/removeEmployee',{
            method:'put',
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                empId,
                taskId
            })
        }).then(res=>{
            const newEmployees = employees.filter(emp => emp.matricule !== empId)
            setter({id: taskId, employees: newEmployees})
            
        }).catch((err)=>{
            console.error(err);
        })
    } 

    //explain: removes the task if it hs no employees
    useEffect(()=>{
        if(employees.length === 0)
        {
          removeTask(taskId)
        }
    },[employees])
    
  return (
    <div
      className="bg-slate-700/75 h-screen w-screen absolute top-0 left-0 flex justify-center items-center"
      id="consultation_employee"
    >
      <div className="w-2/4 px-10 bg-white py-10 rounded-lg ">
        <h1 className="text-xl text-center font-bold mb-5">
          Liste des employés affectés à la tâche
        </h1>
        <div className="overflow-y-auto ">
          <div className="overflow-x-auto">
            <table
              className="table table-zebra text-center"
              id="consult_employees_table"
            >
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Département</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                    employees.map((emp)=>(
                        <tr key={emp.matricule}>
                            <td>{emp.user.lastName}</td>
                            <td>{emp.user.firstName}</td>
                            <td>{emp.departement?.label || '-------'}</td>
                            <td>
                                <button className="btn btn-xs btn-outline btn-error hover:!text-white"
                                    onClick={()=>{removeEmployeeFromTask(emp.matricule, taskId)}}
                                >
                                    Retirer
                                </button>
                            </td>
                        </tr>
                    ))
                }
              </tbody>
            </table>
            <div className="flex justify-center mt-5">
              <button
                className="btn btn-sm btn-wide btn-error btn-outline hover:!text-white"
                onClick={()=>{
                    setter(false)
                }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesListing;
