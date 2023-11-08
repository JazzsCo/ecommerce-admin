import * as React from "react";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/dist/server";

const RootNav = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav>
      <div className="flex flex-row justify-end space-x-5">
        {(await isAuthenticated()) ? (
          <div>{JSON.stringify(user)}</div>
        ) : (
          <>
            <LoginLink>Log In</LoginLink>
            <RegisterLink>Sign Up</RegisterLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default RootNav;
