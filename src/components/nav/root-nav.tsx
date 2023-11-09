import * as React from "react";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/dist/server";

import CurrentUserAvatar from "@/components/current-user-avatar";

const RootNav = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  console.log("USER", user);

  return (
    <nav>
      <div className="flex flex-row justify-end space-x-5">
        {(await isAuthenticated()) ? (
          <CurrentUserAvatar user={user} />
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
