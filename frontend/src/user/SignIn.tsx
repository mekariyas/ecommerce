import LoginSvg from "../assets/admin/dashboardLogin.svg"

import LoginForm from './components/Login-form'
const SignIn = () => {
  return (
    <section className="w-full h-[85vh] md:h-[85vh] flex justify-center items-center overflow-hidden">
          <section className="w-full h-full md:w-[80%] md:h-[80%] md:shadow-2xl md:rounded-2xl flex">
            <img src={LoginSvg} alt="login-image" className="hidden md:block md:w-[50%] h-full object-fit-center rounded-l-2xl" loading="lazy"/>
            <section className="w-full md:w-[50%] h-full">  
              <h1 className="mt-20 w-full h-12 text-center text-blue-950 text-2xl font-extrabold">Welcome Back</h1>
              <LoginForm/>
            </section>  
          </section> 
        </section>
  )
}

export default SignIn