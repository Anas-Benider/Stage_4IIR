import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateEmployee = ({ setter, triggerRefetch, modify }) => {
    const schema = z
        .object({
            title: z.enum(["M", "Mme", "Mlle"]),
            cin: z
                .string()
                .nonempty({ message: "Le CIN est obligatoire" })
                .min(7, {
                    message: "Le CIN doit contenir au moins 7 caractères",
                }),
            firstName: z
                .string()
                .nonempty({ message: "Le nom est obligatoire" }),
            lastName: z
                .string()
                .nonempty({ message: "Le prénom est obligatoire" }),
            email: z
                .string()
                .nonempty({ message: "L'email est obligatoire" })
                .email({ message: "L'email doit être valide" }),
            dateNaissance: z
                .string()
                .nonempty({ message: "La date de naissance est obligatoire" })
                .refine(
                    (val) => {
                        const date = new Date(val);
                        return !isNaN(date.getTime());
                    },
                    { message: "La date de naissance doit être valide" }
                ),
            password: z
                .string()
                .min(6, {
                    message: "Le mot de passe doit au moins avoir 6 caractères",
                })
                .max({
                    message: "Le mot de passe doit avoir au plus 20 caractères",
                })
                .nonempty({ message: "Le mot de passe est obligatoire" }),
            confPassword: z.string().nonempty({
                message: "La confirmation du mot de passe est obligatoire",
            }),
        })
        .refine((data) => data.password === data.confPassword, {
            message: "Les mots de passe ne correspondent pas",
            path: ["confPassword"],
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data) => {
        delete data.confPassword;
        //explain: compares data to send only the diff parts in modification mode
        if (modify) {
            const diff = Object.keys(data).filter(
                (key) => data[key] !== modify.user[key]
            );
            if (diff.length === 0) return setter(false);
            data = diff.reduce((obj, key) => {
                obj[key] = data[key];
                return obj;
            }, {});
            data.matricule = modify.matricule;
        }
        fetch(
            `http://localhost:3000/employee/${modify ? "update" : "create"}`,
            {
                method: `${modify ? "PATCH" : "POST"}`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        )
            .then(async (res) => {
                const response = await res.json();
                console.log(response);
                if (response.code === "P2002") {
                    if (response.meta.target.includes("email"))
                        setError("gen", {
                            message:
                                "Un employé avec le même email existe déjà",
                        });
                    else if (response.meta.target.includes("cin"))
                        setError("gen", {
                            message: "Un employé avec le même cin existe déjà",
                        });
                } else {
                    triggerRefetch(true);
                    setter(false);
                }
            })
            .catch((err) => {
                console.log("error");
                console.error(err);
            });
    };

    return (
        <div className="w-full h-full absolute top-0 left-0 bg-slate-700/40 flex justify-center items-center">
            <div className="card w-1/2 bg-base-100 shadow-xl">
                <div className="card-body items-center text-center gap-5">
                    <h1 className="card-title">
                        {!modify
                            ? "Créer un nouveau employé"
                            : "Modifier un employé"}
                    </h1>
                    {errors.gen ? (
                        <span className="text-xs font-bold text-error">
                            {errors.gen.message}
                        </span>
                    ) : null}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full grid grid-cols-2 justify-around gap-20 mb-5">
                            <div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">
                                            {errors.title ? (
                                                <span className="text-xs font-bold text-error">
                                                    {errors.title.message}
                                                </span>
                                            ) : (
                                                "Titre"
                                            )}
                                        </span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full max-w-xs"
                                        {...register("title")}
                                        defaultValue={
                                            modify ? modify.user.title : ""
                                        }>
                                        <option value="M">M</option>
                                        <option value="Mme">Mme</option>
                                        <option value="Mlle">Mlle</option>
                                    </select>
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">
                                            {errors.lastName ? (
                                                <span className="text-xs font-bold text-error">
                                                    {errors.lastName.message}
                                                </span>
                                            ) : (
                                                "Nom"
                                            )}
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("lastName")}
                                        defaultValue={
                                            modify ? modify.user.lastName : ""
                                        }
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">
                                            {errors.email ? (
                                                <span className="text-xs font-bold text-error">
                                                    {errors.email.message}
                                                </span>
                                            ) : (
                                                "Email"
                                            )}
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("email")}
                                        defaultValue={
                                            modify ? modify.user.email : ""
                                        }
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">
                                            {errors.password ? (
                                                <span className="text-xs font-bold text-error">
                                                    {errors.password.message}
                                                </span>
                                            ) : (
                                                "Mot de passe"
                                            )}
                                        </span>
                                    </label>
                                    <input
                                        type="password"
                                        {...register("password")}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">
                                            {errors.CIN ? (
                                                <span className="text-xs font-bold text-error">
                                                    {errors.CIN.message}
                                                </span>
                                            ) : (
                                                "CIN"
                                            )}
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("cin")}
                                        defaultValue={
                                            modify ? modify.user.cin : ""
                                        }
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">
                                            {errors.lastName ? (
                                                <span className="text-xs font-bold text-error">
                                                    {errors.lastName.message}
                                                </span>
                                            ) : (
                                                "Prénom"
                                            )}
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("firstName")}
                                        defaultValue={
                                            modify ? modify.user.firstName : ""
                                        }
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">
                                            {errors.naiss ? (
                                                <span className="text-xs font-bold text-error">
                                                    {errors.naiss.message}
                                                </span>
                                            ) : (
                                                "Date de naissance"
                                            )}
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("dateNaissance")}
                                        defaultValue={
                                            modify
                                                ? modify.user.dateNaissance
                                                : ""
                                        }
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">
                                            {errors.confPassword ? (
                                                <span className="text-xs font-bold text-error">
                                                    {
                                                        errors.confPassword
                                                            .message
                                                    }
                                                </span>
                                            ) : (
                                                "Confirmer le mot de passe"
                                            )}
                                        </span>
                                    </label>
                                    <input
                                        type="password"
                                        {...register("confPassword")}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-10">
                            <button
                                className="btn w-32 btn-sm btn-outline hover:btn-error"
                                type="button"
                                onClick={() => {
                                    setter(false);
                                }}>
                                Annuler
                            </button>
                            <button className="btn w-32 btn-sm btn-outline hover:btn-success">
                                {modify ? "Modifier" : "Créer"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployee;
