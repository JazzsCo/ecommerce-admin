"use client";

import { FC } from "react";
import { LogOutIcon } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/dist/components";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CurrentUserAvatarProps {
  user: any;
}

const CurrentUserAvatar: FC<CurrentUserAvatarProps> = ({ user }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={user?.picture} />
          <AvatarFallback>
            {user?.given_name?.charAt(0)}
            {user?.family_name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-52 mr-6">
        <div className="flex items-center font-semibold">
          <h2 className="mr-3">user -</h2>
          <h2>
            {user?.given_name}
            {user?.family_name}
          </h2>
        </div>
        <Separator />
        <div className="mt-2">
          <LogoutLink>
            <div className="flex items-center font-semibold">
              <LogOutIcon className="w-4 h-4 mr-3" />
              <h2 className="text-sm">Log out</h2>
            </div>
          </LogoutLink>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CurrentUserAvatar;
