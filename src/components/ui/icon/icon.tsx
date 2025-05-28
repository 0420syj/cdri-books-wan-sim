import { IconKey, svgIconMapper } from "./icon-mapper";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: IconKey;
  size?: number;
}

const Icon = ({ icon, size = 24, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={svgIconMapper[icon]?.viewBox}
      {...props}
    >
      {svgIconMapper[icon]?.path}
    </svg>
  );
};

export { Icon };
