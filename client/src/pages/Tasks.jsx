import { useEffect, useState } from "react";

import Form from "../components/tasks/form";
import EmployeesListing from "../components/tasks/EmployeesListing";
const Tasks = () => {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employeesPanel, showEmployeesPanel] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3000/task", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let employees = data.employees.map((emp) => {
          return {
            value: emp.matricule,
            label: emp.user.firstName + " " + emp.user.lastName,
          };
        });
        setEmployees(employees);
        setTasks(data.tasks);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  const removeTask = (id) => {
    fetch('http://localhost:3000/task/delete',{
        method: 'delete',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            taskId:id
        })
    }).then(res=>
        setTasks(prev => prev.filter(task=> task.id!==id))    
    )
    .catch((err)=>{
        console.error(er);
    })
  }

  return (
    <div className="h-screen flex flex-col justify-center mx-10">
      <h1 className="font-bold text-3xl text-center mb-5">
        Gestionnaire des taches
      </h1>
      <div className="grid grid-cols-3 gap-5 w-full place-content-center">
        <Form employees={employees} setTasks={setTasks} />
        <div className="flex col-span-2 py-10 max-h-full flex-col border-2 rounded-3xl bg-base-100 ">
          <h1 className="text-slate-600 font-semibold text-center text-xl mb-7">
            Liste des tâches ajoutées
          </h1>
          <div className="overflow-y-auto">
            <table className="table table-xs text-center">
              <thead>
                <tr>
                  <th>libellé</th>
                  <th>description</th>
                  <th>employés</th>
                  <th>supprimer</th>
                </tr>
              </thead>
              <tbody>{
                tasks.map((task)=>(
                    <tr key={task.id}>
                        <td>{task.label}</td>
                        <td>{task.description}</td>
                        <td>
                            <button className="btn btn-outline btn-xs hover:btn-info hover:!text-white"
                            onClick={()=>showEmployeesPanel(task)}>
                                consulter
                            </button>
                        </td>
                        <td>
                            <button className="btn btn-outline btn-xs hover:btn-error hover:!text-white"
                            onClick={()=>removeTask(task.id)}>
                                supprimer
                            </button>
                        </td>
                    </tr>
                ))
                }</tbody>
            </table>
          </div>
        </div>
      </div>
      {
        employeesPanel !== false &&
        <EmployeesListing taskId={employeesPanel.id} employees={employeesPanel.employees} setter={showEmployeesPanel} removeTask={removeTask}/>
      }
    </div>
  );
};

export default Tasks;
