import { ConnectButton } from "web3uikit"
import { useMoralis } from "react-moralis"

export default function Header() {
  return (
    <nav className="bg-[#393E46] m-0 p-2">
      <ul class="flex justify-between items-center text-gray-300 font-semibold">
        <li className="flex items-center px-5">
          <img className="w-7 mr-3 border-white border-2 rounded-full" src="/venus.png" />
          <span className="text-[#EEEEEE] text-xl">RAFFLE</span>
        </li>
        <div className="flex justify-between space-x-4 items-center pr-5"> 
          <a className="hover:text-[#00ADB5]" href="https://github.com/subrotokumar/decentralized-lottery">GITHUB REPO</a> 
          <a className="hover:text-[#00ADB5] pr-5" href="https://mumbai.polygonscan.com/address/0x49A0113C34e568a69993dc91D5386B2Eca0fcf49">CONTRACT</a> 
          <ConnectButton />
        </div>
      </ul>
    </nav>
  )
}
