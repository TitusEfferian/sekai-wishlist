import dynamic from "next/dynamic";

const LazyAdmin = dynamic(() => import("../../components/Admin"), {
  ssr: false,
});
const Admin = () => {
  return <LazyAdmin />;
};

export default Admin;
