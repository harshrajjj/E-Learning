import { Button } from "@/components/ui/button";
import { appStore } from "../app/store.js";
import { useLoginUserMutation } from "@/features/api/authApi"; // Import the API slice for user login
import { Loader2 } from "lucide-react"; // Import the Loader2 icon from lucide-react
// This is a React component that handles user login and registration using Redux Toolkit Query for API calls.
import { toast } from "sonner"; // Import the toast library for displaying notifications

//p79Bb47ITKeNsKMU
import { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRegisterUserMutation } from "@/features/api/authApi";

import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for navigation

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    //iska kam login field se data lena hai
    email: "",
    password: "",
  });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation(); //this is a hook that will be used to register the user

  const[
    loginUser,
    {
    data: loginData,
    error: loginError,
    isLoading: loginIsLoading,
    isSuccess: loginIsSuccess,
  }]=useLoginUserMutation(); //this is a hook that will be used to login the user
  // This is a custom hook that allows you to register a user. It returns an array with the first element being the function to call for registration and the second element being an object with the response data, error, loading state, and success state.


const navigate=useNavigate();
// This is a hook that allows you to navigate programmatically in your application.


  // These are the state variables to hold the input values for login and signup forms.
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target; // Extracts the 'name' and 'value' from the input field that triggered the event.
    if (type === "signup") {
      // If the 'type' is "signup", update the 'signupInput' state.
      setSignupInput({ ...signupInput, [name]: value });
      // This creates a new object by copying the existing 'signupInput' state and updating the field with the 'name' attribute to the new 'value'.
    } else {
      // If the 'type' is not "signup" (assumed to be "login"), update the 'loginInput' state.
      setLoginInput({ ...loginInput, [name]: value });
      // Similarly, this updates the 'loginInput' state for the corresponding field.
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    // This line checks if the 'type' is "signup". If it is, it assigns 'signupInput' to 'inputData'; otherwise, it assigns 'loginInput'.
    const action=type==="signup"?registerUser:loginUser;
    // This line determines which action to take based on the 'type'.
    await action(inputData);
  
  };

  //message display krane ke liye
  useEffect(() => {
    if(registerIsSuccess && registerData){
      toast.success(registerData.message || "Registration successful!");
      // If the registration is successful, display a success message using the toast library.
    }
    if(registerError){
      toast.error(registerError.data.message || "Registration failed!");
      // If there is an error during registration, display an error message using the toast library.
    }
    if(loginIsSuccess && loginData){
      toast.success(loginData.message || "Login successful!");
      // If the login is successful, display a success message using the toast library.
      navigate("/");

    }
    if(loginError){
      toast.error(loginError.data.message || "Login failed!");
      // If there is an error during login, display an error message using the toast library.
    }
  },[loginIsLoading,registerIsLoading,loginData,registerData,loginError,registerError]);
  // This useEffect hook is used to handle side effects based on the loading, success, and error states of the login and registration processes.

  return (
    <div className="flex items-center justify-center h-screen ">
      <Tabs defaultValue="Login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="SignUp">SignUp</TabsTrigger>
          <TabsTrigger value="Login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="SignUp">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name" //name ka kam
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="eg. Prince"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="eg. xyz@gmail.com"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="eg. xyz"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
             {
              registerIsLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </>
              ):
                "Sign Up"
      
             }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup,you'll be logged in
                automatically.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="eg. xyz@gmail.com"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new"> Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="xyz"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button  disabled={loginIsLoading } onClick={() => handleRegistration("login")}>
                {
                loginIsLoading ? (
                  <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                  {/*backgound me loading operation chl rha hai */}
                  </>
                ):"Login"
              }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Login;
