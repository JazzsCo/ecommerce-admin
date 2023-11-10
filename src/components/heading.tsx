import { FC } from "react";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading: FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <h4 className="text-sm text-muted-foreground">{description}</h4>
    </div>
  );
};

export default Heading;
