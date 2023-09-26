import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "react-select";

const CreateDep = ({ setter, nonAffectedEmps, refetch, modify, setModify }) => {
  const [nonAffectedEmployees, setNonAffectedEmployees] =
    useState(nonAffectedEmps);
  useEffect(() => {
    console.log(modify);
  }, []);
  const schema = z.object({
    label: z.string(),
    chef: z.string().uuid(),
    employees: z
      .array(
        z.object({
          label: z.string(),
          value: z.string().uuid(),
        })
      )
      .nonempty({ message: "Vous devez choisir au moins un employé" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm({});

  const submit = (data) => {
    console.log('data', data);
    console.log('modify', modify);
    let dataToChange = {};
    if(modify)
    {
      dataToChange={
        depId : modify.id,
        label : data.label !== modify.label ? data.label : undefined,
        chefId: data.chef !== modify.withChef.chef.matricule ? data.chef : undefined,
        emps: data.emps.map(emp=>emp.value)
      }
    }
    fetch(`http://localhost:3000/deps/${modify?'update':'create'}`, {
      method: `${modify?'PATCH':'POST'}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: modify?
        JSON.stringify(dataToChange)
      :
        JSON.stringify({
          label: data.label,
          chef: data.chef,
          employees: data.emps.map((emp) => emp.value),
        }),
    })
      .then((res) => res.json())
      .then((data) => {
        refetch(true);
        setModify(false);
        setter(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div
      className="w-full h-full absolute top-0 left-0 bg-slate-700/40 flex justify-center items-center"
      id="createDepartment"
    >
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center gap-5">
          <h1 className="card-title">Créer un nouveau département</h1>
          <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">
            <div>
              <label htmlFor="label">Intitulé du département</label>
              <input
                type="text"
                {...register("label")}
                defaultValue={modify ? modify.label : ""}
                id="label"
                className="input input-bordered w-full input-sm"
              />
            </div>
            <div>
              <label htmlFor="chef">Chef du département</label>
              <Controller
                control={control}
                name="chef"
                defaultValue={modify ? modify.withChef.chef.matricule : ""}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    options={nonAffectedEmps.map((emp) => ({
                      value: emp.matricule,
                      label: `${emp.user.lastName} ${emp.user.firstName}`,
                    }))}
                    defaultValue={() => {
                      if (!modify) return null;
                      else {
                        return {
                          value: modify.withChef.chef.matricule,
                          label: `${modify.withChef.chef.user.lastName} ${modify.withChef.chef.user.firstName}`,
                        };
                      }
                    }}
                    onChange={(selectedOption) => {
                      // Update the value using the selectedOption object
                      onChange(selectedOption.value);
                      setNonAffectedEmployees(
                        nonAffectedEmps.filter(
                          (emp) => emp.matricule !== selectedOption.value
                        )
                      );
                    }}
                    onBlur={onBlur}
                    isSearchable
                    className="w-full"
                    placeholder="Choisir un chef de département"
                  />
                )}
              />
            </div>
            <div className="w-full">
              <label htmlFor="employees">Employés</label>
              <Controller
                name="emps"
                control={control}
                defaultValue={
                  modify
                    ? modify.employees.map((emp) => ({
                        value: emp.matricule,
                        label: `${emp.user.lastName} ${emp.user.firstName}`,
                      }))
                    : []
                }
                render={({ field }) => (
                  <Select
                    {...field}
                    options={nonAffectedEmployees.map((emp) => ({
                      value: emp.matricule,
                      label: `${emp.user.lastName} ${emp.user.firstName}`,
                    }))}
                    defaultValue={
                      modify
                        ? modify.employees.map((emp) => ({
                            value: emp.matricule,
                            label: `${emp.user.lastName} ${emp.user.firstName}`,
                          }))
                        : []
                    }
                    isMulti
                    isSearchable
                    className="w-full"
                    placeholder="Choisir les employés"
                  />
                )}
              />
            </div>
            <div className="card-actions justify-center gap-5 mt-5">
              <button
                type="reset"
                className="btn btn-outline btn-sm w-32 btn-error"
                onClick={() => {
                  setModify(false);
                  setter(false);
                }}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-outline btn-sm w-32 btn-success"
              >
                {
                  modify?
                  'Modifier'
                  :
                  'Créer'
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDep;
