import FormLogin from "@/components/forms/FormLogin";
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { usuario } = useAppSelector((state) => state.getUserState);

  const goToDashboard = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (usuario) {
      navigate(goToDashboard);
    }
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="container border border-black m-auto p-10 flex items-center justify-center h-fit w-fit rounded">
        <FormLogin />
      </div>
    </div>
  );
}

export default Login;
