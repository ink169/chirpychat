import Api from "@/components/Api";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Free Next.js Template for Startup and SaaS",
  description: "This is Contact Page for Startup Nextjs Template",
  // other metadata
};

const ApiPage = () => {
  return (
    <>   
      <Breadcrumb
        pageName="Api Page"
        description="This utility is to check internal API behavior manually."
      />
      <Api />
    </>
  );
};

export default ApiPage;
