const { MoonLoader } = require("react-spinners");

export default function Spinner({color="#308cd8"}) {
  return (
    <MoonLoader color={color} size={20} />
  )
}