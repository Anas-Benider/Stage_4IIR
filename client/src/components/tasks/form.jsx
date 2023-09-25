import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Form = ({ employees, setTasks }) => {
  const schema = z.object({
    label: z.string().nonempty({ message: "Le libellé est obligatoire" }),
    description: z
      .string()
      .nonempty({ message: "La description est obligatoire" }),
    selectedEmployees: z.array(z.string().uuid().nonempty({ message: "Vous devez affecter au moins un employé" })).nonempty({ message: "Vous devez affecter au moins un employé" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = (data) => {
    console.log(data);
    //explain: calls the api that saves the new task
    fetch('http://localhost:3000/task/create',{
        method:'POST',
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            label: data.label,
            description: data.description,
            selectedEmployees: data.selectedEmployees
        })
    }).then((res)=>res.json())
    .then(data=>{
        //explain: add the new task to the tasks state 
        setTasks(prev=> [...prev, data])
    }).catch((err)=>{
        console.error(err);
    })
  };

  return (
    
      <div className="flex justify-center items-center flex-col border-2 rounded-3xl bg-base-100 py-10 px-10">
        <h1 className="text-slate-600 font-semibold text-center text-2xl mb-7">
          Créer une nouvelle tache
        </h1>
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
          <div className="form-control w-full max-w-xs">
            <label className="label">
                {
                    errors.label?
                    <span className="text-error font-bold text-xs">
                        {errors.label.message}
                    </span>
                    :
                    <span className="label-text">Intitulé de la tâche</span>
                }
            </label>
            <input
              type="text"
              {...register("label")}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control">
            <label className="label">
            {
                    errors.description?
                    <span className="text-error font-bold text-xs">
                        {errors.description.message}
                    </span>
                    :
                    <span className="label-text">Description</span>
                }
            </label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered h-24"
              placeholder="Entrer le texte ici"
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">
            {
                    errors.selectedEmployees?
                    <span className="text-error font-bold text-xs">
                        {errors.selectedEmployees.message}
                    </span>
                    :
                    <span className="label-text">Affecter aux employés</span>
                }
            </label>
            <Controller
              control={control}
              name="selectedEmployees"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  options={employees.map((employee) => ({
                    value: employee.value,
                    label: employee.label,
                  }))}
                  isMulti
                  onChange={(selectedOptions) => {
                    // Extract and set only the values in the state
                    onChange(selectedOptions.map((option) => option.value));
                  }}
                  onBlur={onBlur}
                  value={employees.filter((employee) =>
                    value?.includes(employee.value)
                  )}
                />
              )}
            />
          </div>
          <div className="w-full flex justify-center">
            <button
                className="mt-5 btn btn-outline btn-success btn-wide btn-sm hover:!text-white"
                type="submit"
            >
                Créer
            </button>
          </div>
        </form>
      </div>
      
    
  );
};

export default Form;
