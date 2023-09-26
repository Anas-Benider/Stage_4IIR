import { useEffect, useState } from "react";
import CreateDep from "../components/departments/CreateDep";
import ConsultEmps from "../components/departments/ConsultEmps";
import { useNavigate } from "react-router-dom";

const Departments = () => {
    const [deps, setDeps] = useState([]);
    const [nonAffectedEmployees, setNonAffectedEmployees] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const [create, showCreate] = useState(false);
    const [consultChef, setConsultChef] = useState(false);
    const [consultEmps, setConsultEmps] = useState(false);
    const [depId, setDepId] = useState(null);
    const [modify, isModify] = useState(false);
    const [refetch, setRefetch] = useState(true);
    useEffect(() => {
        if (refetch === true) {
            fetch("http://localhost:3000/deps", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setDeps(data.departments);
                    setNonAffectedEmployees(data.employees);
                    setAllEmployees(data.allEmployees);
                })
                .catch((err) => {
                    console.error(err);
                });
            setRefetch(false);
        }
    }, [refetch]);

    const deleteDep = (depId) => {
        fetch(`http://localhost:3000/deps`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: depId }),
        })
            .then((res) => res.json())
            .then((data) => {
                setRefetch(true);
            })
            .catch((err) => {
                console.error(err);
            });
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
            <div className="w-full py-10 gap-5 px-10 bg-base-200 h-full flex flex-col justify-center">
                <h1 className="text-center text-4xl text-slate-600 font-bold">
                    Gestionnaire des départements
                </h1>
                <div className="flex col-span-2 py-10 max-h-full flex-col border-2 rounded-3xl bg-base-100 ">
                    <div className="overflow-y-auto">
                        <table className="table table-xs text-center border-2">
                            <thead className="border-2">
                                <tr>
                                    <th>Nom</th>
                                    <th>Chef de département</th>
                                    <th>employés</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="font-bold text-lg">
                                {deps.map((dep) => (
                                    <tr key={dep.id}>
                                        <td>{dep.label}</td>
                                        <td>
                                            <button
                                                className="btn btn-xs btn-outline hover:btn-info"
                                                onClick={() => {
                                                    setConsultChef(
                                                        dep.withChef
                                                    );
                                                    setDepId(dep.id);
                                                }}>
                                                Consulter
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-xs btn-outline hover:btn-info"
                                                onClick={() => {
                                                    setConsultEmps(
                                                        dep.employees
                                                    );
                                                    setDepId(dep.id);
                                                }}>
                                                Consulter
                                            </button>
                                        </td>
                                        <td>
                                            <div className="flex w-full justify-center items-center gap-5">
                                                <button
                                                    className="btn btn-xs btn-outline hover:btn-warning"
                                                    onClick={() => {
                                                        showCreate(true);
                                                        isModify(dep);
                                                    }}>
                                                    Modifier
                                                </button>
                                                <button
                                                    className="btn btn-xs btn-outline hover:btn-error"
                                                    onClick={() => {
                                                        deleteDep(dep.id);
                                                    }}>
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="w-full flex justify-center mt-10">
                            <button
                                className="btn btn-sm btn-wide btn-success btn-outline"
                                onClick={() => showCreate(true)}>
                                Créer un nouveau département
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {create && (
                <CreateDep
                    refetch={setRefetch}
                    setter={showCreate}
                    nonAffectedEmps={nonAffectedEmployees}
                    modify={modify}
                    setModify={isModify}
                />
            )}
            {consultChef !== false && (
                <ConsultEmps
                    empsList={[consultChef]}
                    setter={setConsultChef}
                    type={"chef"}
                    setRefetch={setRefetch}
                    allEmps={allEmployees.filter(
                        (emp) => emp.matricule !== consultChef.chef.matricule
                    )}
                    depId={depId}
                />
            )}
            {consultEmps !== false && (
                <ConsultEmps
                    empsList={consultEmps}
                    setter={setConsultEmps}
                    type={"emps"}
                    setRefetch={setRefetch}
                    depId={depId}
                />
            )}
        </div>
    );
};

export default Departments;
