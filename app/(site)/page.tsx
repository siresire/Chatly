import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
    return (
        <div 
        className="
          flex 
          min-h-full 
          flex-col 
          justify-center 
          py-12 
          sm:px-6 
          lg:px-8 
          bg-gray-100
        "
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          height="70"
          width="70"
          className="mx-auto w-auto"
          src="/images/chat.png"
          alt="Logo"  />
          <h2 
          className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
          "
          >
            Sign in to Chat.ly
        </h2>
          </div>

          {/* Authform component for authentication */}
          <AuthForm />      
        
      
      </div>
    )
  }
  