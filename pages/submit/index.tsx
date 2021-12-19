import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useUser from "../../hooks/useUser";

const LazySubmit = dynamic(() => import("../../components/Submit"));

const Submit = () => {
  return <LazySubmit />;
};

export default Submit;
