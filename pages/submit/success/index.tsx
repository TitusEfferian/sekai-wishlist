import dynamic from "next/dynamic";

const LazySubmit = dynamic(() => import("../../../components/SubmitSuccess"));

const Submit = () => {
  return <LazySubmit />;
};

export default Submit;
