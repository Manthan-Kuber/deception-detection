import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="backdrop-filter backdrop-blur-sm bg-black/40 border-t p-4 flex items-center justify-between text-white tracking-wider font-semibold">
      <h3 className=" sm:text-lg  text-center text-white ">Group #5</h3>
      <a
        href="https://github.com/Manthan-Kuber/deception-detection"
        referrerPolicy="no-referrer"
        target="_blank"
        className="flex items-center gap-2 "
      >
        <span>Github </span>
        <AiFillGithub size={16} />
      </a>
    </footer>
  );
};
export default Footer;
