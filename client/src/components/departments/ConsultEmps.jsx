import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const ConsultEmps = ({ empsList, setter, type, setRefetch, allEmps, depId }) => {
  const removeEmpFromDep = (matricule) => {
    fetch("http://localhost:3000/employee/detachFromDep", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matricule }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRefetch(true);
        setter(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [modify, setModify] = useState(false);
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    fetch("http://localhost:3000/deps/changeChef", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newChef: data.newChef, depId: depId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRefetch(true);
        setter(false);
      })
      .catch((err) => {
        console.error(err);
      }
    );
  };

  return (
    <div
      className="bg-slate-700/75 h-screen w-screen absolute top-0 left-0 flex justify-center items-center"
      id="consultation_employee"
    >
      <div className="w-2/4 px-10 bg-white py-10 rounded-lg ">
        <h1 className="text-xl text-center font-bold mb-5">
          {modify
            ? "Modifier le chef du département"
            : type === "chef"
            ? "Chef du département"
            : "Liste des employés affectés au département"}
        </h1>
        {modify ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center"
          >
            <Controller
              control={control}
              name="newChef"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  options={allEmps.map((emp) => ({
                    value: emp.matricule,
                    label: `${emp.user.lastName} ${emp.user.firstName}`,
                  }))}
                  onChange={(selectedOption) => {
                    // Update the value using the selectedOption object
                    onChange(selectedOption.value);
                  }}
                  onBlur={onBlur}
                  isSearchable
                  className="w-3/4"
                  placeholder="Choisir un chef de département"
                />
              )}
            />
            <div className="flex justify-center mt-5 gap-10">
              <button
                className="btn btn-success btn-outline"
                type="submit"
              >
                Modifier
              </button>

              <button
                className={`btn btn-error btn-outline`}
                type="button"
                onClick={() => {
                  setModify(false);
                }}
              >
                Annuler
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="overflow-y-auto ">
              <div className="overflow-x-auto">
                <table
                  className="table table-zebra text-center"
                  id="consult_employees_table"
                >
                  <thead>
                    <tr>
                      <th>Matricule</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {type === "chef"
                      ? empsList.map((emp) => (
                          <tr key={emp.chef.matricule}>
                            <td>{emp.chef.matricule}</td>
                            <td>{emp.chef.user.lastName}</td>
                            <td>{emp.chef.user.firstName}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline hover:btn-warning"
                                onClick={() => setModify(true)}
                              >
                                Modifier
                              </button>
                            </td>
                          </tr>
                        ))
                      : empsList.map((emp) => (
                          <tr key={emp.matricule}>
                            <td>{emp.matricule}</td>
                            <td>{emp.user.lastName}</td>
                            <td>{emp.user.firstName}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline hover:btn-error"
                                onClick={() => {
                                  removeEmpFromDep(emp.matricule);
                                }}
                              >
                                Retirer
                              </button>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        {!modify ? (
          <div className="flex justify-center mt-5 gap-10">
            <button
              className={`btn btn-wide btn-sm btn-error btn-outline`}
              type="button"
              onClick={() => {
                setter(false);
              }}
            >
              Fermer
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ConsultEmps;
