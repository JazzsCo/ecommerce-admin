import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

const DeleteButton = () => {
  return (
    <Button variant="destructive" size="icon">
      <Trash className="w-4 h-4" />
    </Button>
  );
};

export default DeleteButton;
