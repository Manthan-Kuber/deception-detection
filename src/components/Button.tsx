interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  children: React.ReactNode;
}
const Button = ({ onClick, disabled, children }: Props) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="text-white text-center font-semibold mx-auto border-rose-500 border mt-4 py-2 px-4 rounded-lg transition-colors hover:border-transparent hover:bg-rose-500 disabled:border-gray-500 disabled:text-gray-500 disabled:hover:bg-transparent disabled:hover:border-gray-500 "
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
