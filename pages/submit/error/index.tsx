import dynamic from "next/dynamic";

const SubmitError = dynamic(() => import("../../../components/SubmitError"));
const Error = () => {
  return <SubmitError />;
};

export default Error;
