// components
import CustomImage from "~/components/atoms/customImage/CustomImage";
// utils
import TicTacToeImg from "public/tic_tac_toe.png";
import AuthButton from "~/components/molecules/authButton/AuthButton";

function Header() {
  return (
    <header className="mb-10 flex w-full items-center justify-between">
      <CustomImage image={TicTacToeImg} alt="Tic_Tac_Toe_image" />
      <AuthButton />
    </header>
  );
}

export default Header;