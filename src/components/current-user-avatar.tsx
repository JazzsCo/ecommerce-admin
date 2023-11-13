"use client";

import { FC } from "react";
import { LogOutIcon } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/dist/components";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface CurrentUserAvatarProps {
  user: any;
}

const CurrentUserAvatar: FC<CurrentUserAvatarProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.picture} />
          <AvatarFallback>
            {user?.given_name?.charAt(0)}
            {user?.family_name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {}}
          className="flex items-center font-semibold"
        >
          <h2 className="mr-3">user -</h2>
          <h2>
            dsds
            {user?.given_name}
            {user?.family_name}
          </h2>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}} className="flex items-center">
          <LogoutLink>
            <div className="flex items-center">
              <LogOutIcon className="w-4 h-4 mr-3" />
              <h2 className="text-sm">Log out</h2>
            </div>
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrentUserAvatar;
