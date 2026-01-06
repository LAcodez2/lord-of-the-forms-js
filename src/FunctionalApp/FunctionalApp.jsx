import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = () => {
  const [userData, setUserData] = useState(null);

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userData} />
      <FunctionalForm onSubmitSuccess={setUserData} />
    </>
  );
};
