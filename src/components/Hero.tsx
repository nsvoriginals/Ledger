import FlickeringGrid from "@/components/ui/flickering-grid";
import { useNavigate } from "react-router-dom";

export function Hero() {
    const navigate = useNavigate();
    return (
        <div className="w-screen h-screen relative bg-[#161B19] flex items-center justify-center py-2  flex-col">
            <FlickeringGrid
                className="absolute inset-0 w-full h-full overflow-hidden" // Change inset-2 to inset-0
                squareSize={4}
                gridGap={6}
                color="#1dd79b"
                maxOpacity={0.2}
                flickerChance={0.1}
                height={1600}
                width={1600}
            />
            <h1 className="text-center text-[100px] w-[90%] font-Poppins text-white relative z-10">
                Track every crypto move, <span className="bg-[#1DD79B] text-black">effortlessly</span>
            </h1>
            <p className="text-center text-1xl text-gray-300 font-Poppins mt-4 w-[70%] relative z-10">
                Get a clear view of your crypto journey with seamless transaction tracking. Every buy, sell, and transfer, all in one place—simple, secure, and precise.
            </p>
            <button onClick={()=>{
                navigate("/transactions")
            }} className="bg-[#1dd79b] mt-8 px-10 py-3 text-black font-Poppins font-1xl rounded-xl relative z-10">
                Track
            </button>
        </div>
    );
}
