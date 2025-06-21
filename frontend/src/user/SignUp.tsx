import SignUpSvg from "../assets/sign-up.svg" 

import SignUpForm from './components/Signup-form'

const SignUp = () => {
  return (
    <section className="w-full h-[85vh] md:h-[87vh] flex justify-center items-center overflow-hidden">
      <section className="w-full h-full md:w-[80%] md:h-[92%] md:border-blue-950 md:border-[1px] md:rounded-2xl flex">
        <img src={SignUpSvg} alt="login-image" className="hidden md:block md:w-[50%] h-full object-fit-center rounded-l-2xl" loading="lazy"/>
        <section className="w-full md:w-[50%] h-full">  
              <h1 className="mt-4 w-full h-12 text-center text-blue-950 text-2xl font-extrabold">Create Your Account</h1>
              <SignUpForm/>
            </section>
      </section>
    </section>
  )
}

export default SignUp