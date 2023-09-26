import { useNavigate } from "react-router-dom";

const AdminHome = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex flex-col py-5">
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
            <div className=" flex-grow flex flex-col gap-4 justify-center items-center">
                <h1 className="font-bold text-2xl text-neutral">
                    Bonjour dans la page d'administration de Speedy Growth Agency
                </h1>
                <p className="font-bold">Veuillez choisir une option:</p>
                <div className="flex justify-center w-full gap-10">
                    <div
                        className="card w-96 bg-neutral text-neutral-content hover:bg-neutral-focus hover:cursor-pointer"
                        onClick={() => {
                            navigate("/admin/emps");
                        }}>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Gestion des employés</h2>
                        </div>
                    </div>
                    <div
                        className="card w-96 bg-neutral text-neutral-content hover:bg-neutral-focus hover:cursor-pointer"
                        onClick={() => {
                            navigate("/admin/deps");
                        }}>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Gestion des départements</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
