import { PageHeader } from "antd";
import { useRouter } from "next/router";
import { useSongDetail } from "../../../pages/[id]";

const Header = () => {
  const { back } = useRouter();
  const { title } = useSongDetail();
  return <PageHeader onBack={back} ghost={false} title={title} />;
};

export default Header;
