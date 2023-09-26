import { useForm } from "react-hook-form";
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
const Login = () => {
    
    const schema = z.object({
        email: z.string().email({message: "Email invalide"}).nonempty({ message: "Vous devez entrer un email"}),
        password: z.string().min(6,{message: 'Le mot de passe doit avoir au moins 6 caractères'}).max(20, {message: 'Le mot de passe doit avoir au plus 20  caractères'}).nonempty({ message: "Vous devez entrer un mot de passe"}),
    });

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: zodResolver(schema)
    });

    const navigate = useNavigate(); 
    const submit  = (data) => {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.msg)
            {
                setError("gen", {
                    type: "manual",
                    message: data.msg
                })
            }
            else
            {
                localStorage.setItem('token', data.token);
                if(data.user.admin !== null){
                    // redirect to emps or deps page
                    navigate('/admin/home');
                }
                else if( data.user.employe)
                {
                    if(data.user.employe.chefOf !== null)
                    {
                        // redirect to tasks page
                        navigate('/tasks');
                    }
                    else{
                        // redirect to employee page 
                        navigate('/employee/tasks');
                    }
                }
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="card min-w-1/4 bg-base-300">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">S'authentifier</h2>
                    {
                        errors.gen ? <span className="label-text text-error font-bold">{errors.gen.message}</span> : null
                    }
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="form-control w-full">
                            <label className="label"> 
                            {
                                errors.email ? <span className="label-text-alt text-error">{errors.email.message}</span>
                                :
                                <span className="label-text">Email</span>
                            }
                            </label>
                            <input
                                type="text"
                                placeholder="example@example.com"
                                className="input input-bordered w-full"
                                {...register("email")}
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                            {
                                errors.password ? <span className="label-text-alt text-error">{errors.password.message}</span>
                                :
                                <span className="label-text">Mot de passe</span>
                            }
                            </label>
                            <input
                                type="password"
                                placeholder="* * * * * *"
                                className="input input-bordered w-full"
                                {...register("password")}
                            />
                        </div>
                        <div className="card-actions justify-end mt-5">
                            <button className="btn hover:btn-info btn-outline btn-wide btn-sm rounded-full"
                                type="submit"
                            >
                                Connexion
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
