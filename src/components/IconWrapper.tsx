interface Props {
  children: React.ReactNode;
  label: string;
}
const IconWrapper = ({ children, label }: Props) => {
  return (
    <div className="flex flex-col gap-2 ">
      {children}
      <small className="font-semibold text-white text-center">{label}</small>
    </div>
  );
};
export default IconWrapper;
