'use client';

import axios from "axios";
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { BsGithub, BsGoogle  } from 'react-icons/bs';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";

import Input from "@/app/components/inputs/Input";
import AuthSocialButton from './AuthSocialButton';
import Button from "@/app/components/Button";
import { toast } from "react-hot-toast";

//  posibility of usestate fuctionality to toggle between login and register
type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  //to store and manage data that can change over time
  const [variant, setVariant] = useState<Variant>('LOGIN');
  // to disabble buttons and input after clicking them when is loading
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/conversations')
    }
  }, [session?.status, router]);

  //  login and register toggle fuctionality
  const toggleVariant = useCallback(() => {
    // if variant is login then set variant to register else set variant to login
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);


  // react hook form to handle form validation and submission process when user submits the form
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  // submit handler to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
  
    if (variant === 'REGISTER') {
      // axios post request to register user making HTTP requests in the app
      axios.post('/api/register', data)
      .then(() => signIn('credentials', {
        ...data,
        redirect: false,
      }))
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/conversations')
        }
      })
      .catch(() => toast.error('Something went wrong!'))
      // set loading to false after login
      .finally(() => setIsLoading(false))
    }

    // sign in with credentials and redirect to conversations page
    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          // redirect to conversations page after login success
          router.push('/conversations')
         
        }
      })
      // set loading to false after login
      .finally(() => setIsLoading(false))
    }
  }

  //  social login and register functionality for github and google accounts 
  const socialAction = (action: string) => {
    setIsLoading(true);

    // sign in with social media provider and redirect to conversations page
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/conversations')
        }
      })
      .finally(() => setIsLoading(false));
  } 

  return ( 
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div 
        className="
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10 
        "
      >
        <form 
          className="space-y-6" 
          // handle form submission 
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            // input for name field when user is registering from input component
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name" 
              label="Name"
            />
          )}
          
          <Input 
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email" 
            label="Email address" 
            type="email"
          />
          <Input 
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password" 
            label="Password" 
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {/* login sign if varient for ...  */}
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div 
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton 
              icon={BsGithub} 
              onClick={() => socialAction('github')} 
            />
            <AuthSocialButton 
              icon={BsGoogle} 
              onClick={() => socialAction('google')} 
            />
          </div>
        </div>
        <div 
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {variant === 'LOGIN' ? 'New to Chatl.y?' : 'Already have an account?'} 
          </div>
          <div 
            onClick={toggleVariant} 
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default AuthForm;
