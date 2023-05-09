import React, { useState } from "react";
import RightMenu from "../right-menu";
import { BurgerMenu, MenuOverlay } from "./styles";

const Burger = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <BurgerMenu open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </BurgerMenu>
      <RightMenu open={open} setOpen={setOpen} />
      <MenuOverlay open={open} onClick={() => setOpen(!open)} />
    </>
  );
};

export default Burger;
