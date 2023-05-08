import FooterWaveSvg from "./FooterWave";

const Footer = () => {
  return (
    <footer className="relative">
      <FooterWaveSvg className="w-full h-32" />
      <h3 className="absolute sm:text-lg text-neutral-200 font-semibold text-center inset-x-0 bottom-2 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
        Made with 💖 by group #5
      </h3>
    </footer>
  );
};
export default Footer;
