import Image from "next/image";
import NoChat from "../Illustration/NoChat"
const EmptyState = () => {
    return ( 
      <div 
        className="
          px-4 
          py-10 
          sm:px-6 
          lg:px-8 
          lg:py-6 
          h-full 
          flex 
          justify-center 
          items-center 
          bg-gray-100
        "
      >
        <div className="text-center items-center flex flex-col">
          < NoChat />

        {/* <Image
          height="250"
          width="250"
          className="mx-auto w-auto"
          src="/images/chatt.png"
          alt="Logo"  /> */}
          <h3 className="mt-2 text-2xl font-semibold text-gray-900">
            Select a chat or start a new conversation
          </h3>
        </div>
      </div>
    );
  }
   
  export default EmptyState;