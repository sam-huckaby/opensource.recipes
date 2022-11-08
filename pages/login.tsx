import { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <div className="w-full h-full bg-white flex justify-center items-center">
      <div className="w-[364px] border border-solid border-black rounded drop-shadow-md bg-white">
        <div className="p-4 text-lg border-b">Header</div>
        <div className="flex flex-col p-4">
          <p className="text-sm">
            We use Beyond Identity to validate your identity and connect you to
            your cookbooks.
          </p>
          <p className="text-sm">(And besides, everyone hates passwords.)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
