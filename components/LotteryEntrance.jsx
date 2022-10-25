import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"
import {abi, contractAddress} from "../constants"


export default function LotteryEntrance(){
    const {chainId: chainIdHex, isWeb3Enabled} = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddress ?contractAddress[chainId][0] : null

    const [entranceFee, setEntraceFee] = useState("0")
    const [playerNum, setPlayerNum] = useState("0") 
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification()

    // Contract Call Function
    const { runContractFunction: enterRaffle, data: enterTxResponse, isLoading, isFetching} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        msgValue: entranceFee,
        params: {},
    })

    const {runContractFunction: getEntranceFee} = useWeb3Contract({
        abi:abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const {runContractFunction: getNumberOfPlayers} = useWeb3Contract({
        abi:abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const {runContractFunction: getRecentWinner} = useWeb3Contract({
        abi:abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUIValues(){
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const playerNumFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = (await getRecentWinner()).toString()

        console.log(`Entrance Fee : ${entranceFeeFromCall}`)
        console.log(`No. of Players : ${playerNumFromCall}`)
        console.log(`recent Winner : ${recentWinnerFromCall}`)

        setEntraceFee(entranceFeeFromCall)
        setPlayerNum(playerNumFromCall)
        console.log(walletAddress(recentWinnerFromCall))
        setRecentWinner(walletAddress(recentWinnerFromCall))
    }

    function walletAddress(account){
        return `${account.slice(0, 6)}.....${account.slice(account.length - 6)}`
    }

    useEffect(()=>{
        if(isWeb3Enabled && chainId==80001){
            updateUIValues()
        }
    },[isWeb3Enabled, chainId])

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "🦊",
        })
    }

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)
            updateUIValues()
            handleNewNotification(tx)
        } catch (error) {
            console.log(error)
        }
    }

    return <main>
        {raffleAddress!=null? (   
            <div className="h-full m-20 md:mx-52 lg:mx-80 py-20 rounded-3xl flex flex-col justify-center items-center border-2 shadow-[#222831] shadow-sm font-semibold bg-gray-100 text-gray-600">
                <h1 className="text-3xl p-1 px-2 font-bold rounded border-2 border-violet-500 text-white bg-violet-300 outline-rose-700">DECENTRALIZED LOTTERY</h1>
                <button 
                    onClick={async () =>
                        await enterRaffle({
                            onSuccess: handleSuccess,
                            onError: (error) => console.log(error),
                        })
                    }
                    disabled={isLoading || isFetching} 
                    className="rounded p-2 m-8 max-w-fit  border-2 border-[#F1A661] text-orange-400 hover:text-white hover:bg-[#F1A661]">
                {isFetching || isFetching ? <div className="animate-spin spin-border border-[#F1A661] h-8 w-8 border-b-2 rounded-full"></div> : <div> ENTER RAFFLE</div> }
                </button>

                <h3 className="border-b-2">ENTRANCE FEE : {ethers.utils.formatUnits(entranceFee)} MATRIC</h3>
                <h3>ACTIVE PLAYER : {playerNum}</h3>

                <div className="rounded p-1 px-3 mt-5 border-2 border-x-rose-700 text-rose-700">
                    RECENT WINNER : <span className="text-blue-500">{recentWinner}</span>
                </div>
            </div>
        
        ):(
            <div className="flex justify-center m-20 p-20 rounded-3xl border-2 shadow-[#222831] shadow-sm">
                <ol className="flex flex-col max-w-fit items-center">
                    <li><p className="text-5xl pb-2 animate-bounce">🦊</p></li>
                    <li><p className="text-xl font-bold text-amber-700">CONNECT YOUR WALLET</p></li>
                    <div className="flex flex-col items-center">
                        <li><p className="text-xs font-semibold text-gray-600 animate-pulse">POLYGON MUMBAI</p></li>
                        <li><p className="text-xs font-semibold text-gray-400 animate-pulse">80001</p></li>
                    </div>
                    
                </ol>
            </div>
        )}
    </main>
}