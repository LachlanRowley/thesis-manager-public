import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import LandingPage from "./landingPage/page";
import StuAllProjects from "./stuAllProjects/page";
import { useRouter } from "next/navigation";

export default async function Home() {
  return <LandingPage />;
}
