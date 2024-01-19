// components
import CustomImage from "~/components/atoms/customImage/CustomImage";
import AuthButton from "~/components/molecules/authButton/AuthButton";
import Link from "next/link";
// utils
import TicTacToeImg from "public/tic_tac_toe.png";

function Header() {
  return (
    <header className="flex w-full items-center justify-between p-2 lg:transition-all lg:hover:shadow-lg">
      <Link href="/">
        <CustomImage image={TicTacToeImg} alt="Tic_Tac_Toe_image" />
      </Link>
      <AuthButton />
    </header>
  );
}

export default Header;
