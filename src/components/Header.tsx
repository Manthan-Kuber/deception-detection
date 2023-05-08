import Logo from "./Logo";

const Header = () => {
  return (
    <header className="p-4 text-lg  text-white w-full backdrop-filter backdrop-blur-sm bg-opacity-10 flex gap-4 items-center border-b">
      <Logo className=" w-10  h-10" />
      <span className="block tracking-wider">
        <span className=" text-xl ">D</span>eception{" "}
        <span className=" text-xl ">D</span>etector
      </span>
    </header>
  );
};
export default Header;
