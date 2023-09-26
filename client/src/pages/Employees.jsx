import { useEffect, useState } from "react";
import CreateEmployee from "../components/employees/CreateEmployee";
import DetailsEmployee from "../components/employees/DetailsEmployee";
import { useNavigate } from "react-router-dom";

const Employees = () => {
    const [create, setCreate] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [details, openDetails] = useState(false);
    const [modify, setModify] = useState(false);
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
        fetch("http://localhost:3000/employee/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                const response = await res.json();
                setEmployees(response);
            })
            .catch((err) => {
                console.error(err);
            });
        setRefetch(false);
    }, [refetch]);

    const removeEmp = (matricule) => {
        fetch(`http://localhost:3000/employee/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                matricule
            }),
        })
            .then(async (res) => {
                const response = await res.json();
                console.log(response);
            })
            .catch((err) => {
                console.error(err);
            });
        setRefetch(true);
    };

    const navigate = useNavigate();

    return (
        <div className="h-screen py-10">
            <div className="flex justify-end px-10">
                <button
                    className="btn btn-sm btn-outline btn-error hover:!text-white"
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/");
                    }}>
                    <span className="material-icons">Déconnexion</span>
                </button>
            </div>
            <div className="w-full py-10 gap-5 px-10 bg-base-200 h-full flex flex-col justify-center items-center">
                <h1 className="text-center text-4xl text-slate-600 font-bold">
                    Gestionnaire des employés
                </h1>
                <div className="min-w-2/4 bg-base-100 rounded-xl border-2 border-base-content py-5">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>Matricule</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 &&
                                employees.map((emp) => (
                                    <tr
                                        className="hover"
                                        key={emp.matricule}>
                                        <td>{emp.matricule}</td>
                                        <td>{emp.user.lastName}</td>
                                        <td>{emp.user.firstName}</td>
                                        <td>
                                            <div className="w-full flex justify-center items-center gap-5">
                                                <button
                                                    className="btn w-24 btn-xs btn-outline hover:btn-info"
                                                    onClick={() =>
                                                        openDetails(emp)
                                                    }>
                                                    Détails
                                                </button>
                                                <button
                                                    className="btn w-24 btn-xs btn-outline hover:btn-warning"
                                                    onClick={() =>
                                                        setModify(emp)
                                                    }>
                                                    Modifier
                                                </button>
                                                <button
                                                    className="btn w-24 btn-xs btn-outline hover:btn-error"
                                                    onClick={() => {removeEmp(emp.matricule)}}>
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className="w-full flex justify-center items-center mt-10">
                        <button
                            className="btn btn-sm btn-outline hover:btn-success btn-wide"
                            onClick={() => {
                                setCreate(true);
                            }}>
                            Ajouter un employé
                        </button>
                    </div>
                </div>
            </div>
            {(create || modify)&& <CreateEmployee setter={modify ? setModify : setCreate} triggerRefetch={setRefetch} modify={modify}/>}
            {details && (
                <DetailsEmployee
                    setter={openDetails}
                    employee={details}
                />
            )}
        </div>
    );
};

export default Employees;
