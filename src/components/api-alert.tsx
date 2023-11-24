"use client";

import { FC, useState } from "react";
import { Check, Copy, ServerIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  admin: "destructive",
  user: "secondary",
};

const ApiAlert: FC<ApiAlertProps> = ({ title, description, role }) => {
  const [isCopy, setIsCopy] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(description);

    setTimeout(() => {
      setIsCopy(true);
    }, 100);

    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
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
          {isCopy ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
