import FormLogin from "@/components/forms/FormLogin";
import dixiLogo from "../assets/img/dixi-logo-3d.png";

function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="container border bg-white m-auto p-10 flex flex-col items-center justify-center h-fit w-[500px] rounded shadow-lg">
        <img src={dixiLogo} alt="Dixi Logo" />
        <h1 className="text-lg font-semibold mb-5">Sistema de Pedidos</h1>
        <FormLogin />
      </div>
    </div>
  );
}

export default Login;
