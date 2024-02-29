import FormLogin from "@/components/forms/FormLogin";
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { usuario } = useAppSelector((state) => state.getUserState);

  useEffect(() => {
    const goTo = usuario ? "/" : "/login";
    navigate(goTo);
  }, [navigate, usuario]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="container border border-black m-auto p-10 flex items-center justify-center h-fit w-fit rounded">
        <FormLogin />
      </div>
    </div>
  );
}

export default Login;
