import React from "react";
import ChangeWorkshopForm from "@/components/ChangeWorkshopForm";
import { useSession } from "next-auth/react";

export default function ChangeWorkshopPage() {
  const { data: session } = useSession();
  // const handleChangeWorkshopText = async (text) => {};
  if (!session) {
    return <h2> sorry you do not have authorization for this admin page </h2>;
  } else {
    return <div> ChangeWorkshopPage</div>;
  }
}
