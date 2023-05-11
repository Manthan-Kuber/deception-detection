import FooterWave from "./FooterWave";

const Footer = () => {
  return (
    <footer className="relative bg-slate-800">
      <FooterWave className="w-full h-32" />
      <h3 className="absolute sm:text-lg text-neutral-200 font-semibold text-center inset-x-0 bottom-2  ">
        Made by group #5
      </h3>
    </footer>
  );
};
export default Footer;
