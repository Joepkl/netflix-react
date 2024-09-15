/** Vendor */
import { useEffect } from "react";

/** Local */
import NIcon from "@/assets/icons/n_icon.svg";
import EIcon from "@/assets/icons/e_icon.svg";
import TIcon from "@/assets/icons/t_icon.svg";
import FIcon from "@/assets/icons/f_icon.svg";
import LIcon from "@/assets/icons/l_icon.svg";
import IIcon from "@/assets/icons/i_icon.svg";
import XIcon from "@/assets/icons/x_icon.svg";

/** Type */
type LogoAnimationType = {
  startDelayMs?: number;
};

/** Component */
const LogoAnimation = ({ startDelayMs = 500 }: LogoAnimationType) => {
  const startAnimation = () => {
    const icons = document.querySelectorAll("#icons-wrapper img");

    for (let i = 0; i < icons.length; i++) {
      setTimeout(() => {
        icons[i].classList.add("!opacity-100", "!top-0");
      }, i * 100);
    }
  };

  /** Effects */
  useEffect(() => {
    setTimeout(() => {
      startAnimation();
    }, startDelayMs);
  }, [startDelayMs]);

  /** Helpers */
  const renderIcon = (icon: string, classes: string) => {
    return (
      <img
        className={`${classes} transition-all duration-500 ease-in-out opacity-0 relative top-[30px]`}
        src={icon}
        alt="Logo"
      />
    );
  };

  /** Markup */
  return (
    <div className="flex gap-2 justify-center" id="icons-wrapper">
      {renderIcon(NIcon, "h-[72px] w-[31px] md:h-[145px] md:w-[63px]")}
      {renderIcon(EIcon, "h-[67px] w-[28px] md:h-[134px] md:w-[55px]")}
      {renderIcon(TIcon, "h-[64px] w-[30px] md:h-[128px] md:w-[61px]")}
      {renderIcon(FIcon, "h-[63px] w-[28px] md:h-[126px] md:w-[55px]")}
      {renderIcon(LIcon, "h-[67px] w-[27px] md:h-[131px] md:w-[54px]")}
      {renderIcon(IIcon, "h-[67px] w-[15px] md:h-[134px] md:w-[20px]")}
      {renderIcon(XIcon, "h-[72px] w-[36px] md:h-[145px] md:w-[72px]")}
    </div>
  );
};

export { LogoAnimation };
