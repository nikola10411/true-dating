import Image from "next/image";
import { Link } from "@mui/material";

import { routes } from "../routes";

import logoPink from '../../public/images/logo_pink.svg';
import logoBlack from '../../public/images/logo_black.svg';
import logoWhite from '../../public/images/logo_white.svg';


const logos = {
  pink: logoPink,
  black: logoBlack,
  white: logoWhite,
};


export default function Logo({ color = 'pink' }) {
  return (
    <Link href={routes.home}>
      <Image style={{ width: '100%', cursor: 'pointer', height: 'auto' }} src={logos[color]} alt='App Logo' />
    </Link>
  );
}