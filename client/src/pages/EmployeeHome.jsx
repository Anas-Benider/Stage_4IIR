import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const EmployeeHome = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState();
    useEffect(() => {
        const userToken = localStorage.getItem("token");
        if (!userToken) {
            navigate("/");
        } else {
            fetch("http://localhost:3000/employee/getAllData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            })
                .then(async (res) => {
                    const response = await res.json();
                    console.log(response);
                    setUserData(response);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <div className="h-screen p-10 flex flex-col">
            <div className="flex justify-end px-10 mb-5">
                <button
                    className="btn btn-sm btn-outline btn-error hover:!text-white"
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/");
                    }}>
                    <span className="material-icons">Déconnexion</span>
                </button>
            </div>
            <div className="h-full w-full flex justify-center">
                <div className="bg-base-100 w-3/4 gap-3 h-full border-2 rounded-xl flex flex-col items-center py-10">
                    {userData && (
                        <>
                            <h1 className="text-xl text-center font-bold">
                                Bonjour {userData.title} {userData.lastName}{" "}
                                {userData.firstName}
                            </h1>
                            <h2>
                                Vous êtes affecté au département{" "}
                                <span className="font-bold">
                                    {userData.employe.departement.label}
                                </span>
                            </h2>
                            <p>Veuillez trouver vos tâches ci-dessous:</p>
                            <div className="overflow-x-auto border-2 rounded-xl">
                                <table className="table table-lg">
                                    <thead className="text-center">
                                        <tr>
                                            <th>libellé</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {
                                            userData.employe.tasks.map((task)=>(
                                                <tr className="hover">
                                                    <th>{task.label}</th>
                                                    <td>{task.description}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeHome;
