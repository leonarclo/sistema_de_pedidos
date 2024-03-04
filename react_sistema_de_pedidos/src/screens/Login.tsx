import FormLogin from "@/components/forms/FormLogin";

function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="container border border-black m-auto p-10 flex items-center justify-center h-fit w-fit rounded">
        <FormLogin />
      </div>
    </div>
  );
}

export default Login;
