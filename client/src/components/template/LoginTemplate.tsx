import { Button } from "antd"
import '../style.scss'
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginSchema, LoginSchemaType } from "schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { KeyOutlined, UserOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { PATH } from "constant"

export const LoginTemplate = () => {
    const navigate = useNavigate();

    const { handleSubmit, formState: {errors}, register } = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        mode: "onChange"
    })

  const onSubmit: SubmitHandler<LoginSchemaType> = async (value) => { 
    try {
        navigate(PATH.statistic);
        localStorage.setItem("KEY", JSON.stringify(value));
    } catch (error) {
        
    }
   }

  return (
    <form 
        onSubmit={handleSubmit(onSubmit)} className="LoginTemplate h-[60vh] z-20 flex flex-col justify-center items-center">
        <h1 className="text-center text-[#FF6C22] text-[40px] font-bold">LOGIN</h1>
        <div className="flex flex-col items-center mt-6 w-[30%]">
            <div className="flex items-center w-full">
                <UserOutlined className="text-[24px]"/>
                <input type="text" className="w-[100%] p-2 z-30" placeholder="Username" {...register("username")} name="username"/>
            </div>
            <div className="w-full flex justify-start ml-16"><span className="text-red-500 text-left">{errors?.username?.message}</span></div>
            <div className="flex items-center w-full mt-6">
                <KeyOutlined className="text-[24px]" />
                <input type="password" className="w-[100%] p-2 z-30" placeholder="Password" {...register("password")} name="password"/>
            </div>
            <div className="w-full flex justify-start ml-16"><span className="text-red-500 text-left">{errors?.password?.message}</span></div>
        </div>
        <div className="w-[30%] mb-6 mt-4 text-gray-500 text-[14px]">
            <p className="ml-10">
                Vui lòng đăng nhập để thực hiện các chức năng
            </p>
        </div>
        <div className="w-[30%] flex justify-end items-center">
            <Button htmlType="submit" className='z-30 bg-[#FF6C22] font-medium text-white text-[18px] p-4 flex items-center justify-center'>
                Log in
            </Button>
        </div>
    </form>
  )
}

export default LoginTemplate