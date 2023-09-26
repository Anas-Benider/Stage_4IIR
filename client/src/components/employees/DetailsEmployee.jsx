const DetailsEmployee = ({setter,
    employee}) => {
    return (
        <div className="w-full h-full absolute top-0 left-0 bg-slate-700/40 flex justify-center items-center">
            <div className="card w-1/2 bg-base-100 shadow-xl">
                <div className="card-body items-center text-center gap-5">
                    <h1 className="card-title">Informations supplémentaires</h1>
                    <div className="p-5 bg-base-300 rounded-lg">
                        <h2 className="font-semibold">
                            {employee.user.title}. {employee.user.lastName} {employee.user.firstName}
                        </h2>
                        <div className="grid grid-cols-4 gap-2 mt-3 items-center">
                            <h2 className="font-semibold">Matricule</h2>
                            <h2 className="col-span-3 text-left pl-10">{employee.matricule}</h2>
                        
                            <h2 className="font-semibold">CIN</h2>
                            <h2 className="col-span-3 text-left pl-10">{employee.user.cin}</h2>

                            <h2 className="font-semibold">Email</h2>
                            <h2 className="col-span-3 text-left pl-10">{employee.user.email}</h2>

                            <h2 className="font-semibold">Date de naissance</h2>
                            <h2 className="col-span-3 text-left pl-10">{employee.user.dateNaissance}</h2>

                            <h2 className="font-semibold">Affecté au département</h2>
                            <h2 className="col-span-3 text-left pl-10">{employee.departement?.label || "_ _ _ _ _ _ _ _"}</h2>
                        </div>
                    </div>
                    <button className="btn btn-sm btn-wide btn-outline hover:btn-error"
                        onClick={() => {setter(false)}}
                    >
                        Fermer
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DetailsEmployee;
