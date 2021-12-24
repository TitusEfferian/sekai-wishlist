import dynamic from "next/dynamic";

const LazySubmit = dynamic(() => import("../../components/Submit"));

const Submit = () => {
  return <LazySubmit />;
};

export default Submit;
