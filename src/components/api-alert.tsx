"use client";

import { FC } from "react";
import { Badge, BadgeProps } from "./ui/badge";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Copy, ServerIcon } from "lucide-react";
import { Button } from "./ui/button";

interface ApiAlertProps {
  title: string;
  description: string;
  role: "admin" | "user";
}

const roleMap: Record<ApiAlertProps["role"], string> = {
  admin: "Admin",
  user: "User",
};

const textMap: Record<ApiAlertProps["role"], BadgeProps["variant"]> = {
  admin: "secondary",
  user: "destructive",
};

const ApiAlert: FC<ApiAlertProps> = ({ title, description, role }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
  };

  return (
    <Alert className="p-2 px-3">
      <div className="flex items-center space-x-3">
        <ServerIcon className="w-4 h-4" />
        <AlertTitle className="mt-1 text-sm font-semibold">{title}</AlertTitle>
        <Badge variant={textMap[role]}>{roleMap[role]}</Badge>
      </div>
      <AlertDescription className="mt-1 w-full flex items-center justify-between">
        <code className="p-1 px-2 rounded text-sm font-semibold bg-muted">
          {description}
        </code>
        <Button type="button" variant="outline" size="icon" onClick={onCopy}>
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
