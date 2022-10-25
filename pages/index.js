import Head from "next/head"
// import Image from "next/image";
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"
import { useMoralis } from "react-moralis"

export default function Home() {
    return (
        <div className="p-0 m-0">
            <Head>
                <title>RAFFLE</title>
                <meta
                    name="description"
                    content="Open Decentralized Lottery Blockchain Application"
                />
                <link rel="icon" href="/earth.png" />
            </Head>

            <main className="m-0 p-0">
                <Header />
                <LotteryEntrance />
            </main>
        </div>
    )
}
