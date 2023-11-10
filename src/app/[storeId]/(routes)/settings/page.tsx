import SettingForm from "@/components/form/setting-form";
import React from "react";

export default function SettingsPage() {
  const store = {
    id: "dsds",
    name: "Shoe store",
    userId: "sdksdsl",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div className="p-4 px-6">
      <SettingForm initialData={store} />
    </div>
  );
}
