import { BiError } from "react-icons/bi";
import { useParams } from "react-router";

const Error = () => {
  const params = useParams();
  const invalidPath = params["*"] || "Halaman";

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col gap-2 items-center">
        <BiError fontSize={80} className="text-red-500" />
        <span className="text-2xl font-bold">Error</span>
        
        <h1 className="text-lg font-medium">
          Tidak menemukan page: <code className="bg-gray-100 px-2 py-1 rounded">/{invalidPath}</code>
        </h1>
      </div>
    </div>
  );
};

export default Error;