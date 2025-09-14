import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Google from './Google';
import { supabase } from "../../supabaseClient";  

type LoginFormData = {
  identifier: string;
  password: string;
};

type SignUpFormData = {
  fullName: string;
  dob: string;
  email: string;
  password: string;
  mobile: string;
};

const AuthModals = () => {
  const {
    isLoginModalOpen,
    isSignUpModalOpen,
    closeLoginModal,
    closeSignUpModal,
    login
  } = useAuthStore();

  const { t } = useTranslation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Login ka form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin
  } = useForm<LoginFormData>();

  // Signup wala form
  const {
    register: signUpRegister,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
    reset: resetSignUp
  } = useForm<SignUpFormData>();

  //  Email/Password ka Login
  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    const { identifier, password } = data;

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: identifier, 
      password,
    });

    if (error) {
      toast({ title: "Login Failed", description: error.message });
      setIsLoading(false);
      return;
    }

    login(authData.user);
    localStorage.setItem("authToken", authData.session?.access_token || "");
    localStorage.setItem("user", JSON.stringify(authData.user));

    toast({ title: t("loginSuccess"), description: "Welcome back!" });
    resetLogin();
    setIsLoading(false);
    closeLoginModal();
  };

  // Email/Password se signUp
 

  
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });

    if (error) {
      toast({ title: "Google Sign-In Failed", description: error.message });
    } else {
      toast({ title: "Google Sign-In", description: "Redirecting to Google..." });
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Login Modal */}
      <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
        <DialogContent className="sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                {t("loginTitle")}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleLoginSubmit(handleLogin)} className="space-y-4 mt-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="identifier">{t("email")}</Label>
                <Input
                  id="identifier"
                  type="email"
                  placeholder="Enter your email"
                  {...loginRegister("identifier", { required: "Email is required" })}
                  className={loginErrors.identifier ? "border-red-500" : ""}
                />
                {loginErrors.identifier && <p className="text-sm text-red-500">{loginErrors.identifier.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type="password"
                  {...loginRegister("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                  className={loginErrors.password ? "border-red-500" : ""}
                />
                {loginErrors.password && <p className="text-sm text-red-500">{loginErrors.password.message}</p>}
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? t("signingIn") : t("signIn")}
              </Button>

              <Google text="Sign in with Google" onTap={handleGoogleSignIn} />
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Sign Up Modal */}
      <Dialog open={isSignUpModalOpen} onOpenChange={closeSignUpModal}>
        <DialogContent className="sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                {t("signUpTitle")}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSignUpSubmit(handleGoogleSignIn)} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  {...signUpRegister("fullName", { required: "Full name is required" })}
                  className={signUpErrors.fullName ? "border-red-500" : ""}
                />
                {signUpErrors.fullName && <p className="text-sm text-red-500">{signUpErrors.fullName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  {...signUpRegister("dob", { required: "Date of birth is required" })}
                  className={signUpErrors.dob ? "border-red-500" : ""}
                />
                {signUpErrors.dob && <p className="text-sm text-red-500">{signUpErrors.dob.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  {...signUpRegister("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                  })}
                  className={signUpErrors.email ? "border-red-500" : ""}
                />
                {signUpErrors.email && <p className="text-sm text-red-500">{signUpErrors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type="password"
                  {...signUpRegister("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                  className={signUpErrors.password ? "border-red-500" : ""}
                />
                {signUpErrors.password && <p className="text-sm text-red-500">{signUpErrors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  {...signUpRegister("mobile", {
                    required: "Mobile number is required",
                    minLength: { value: 10, message: "Must be 10 digits" },
                  })}
                  className={signUpErrors.mobile ? "border-red-500" : ""}
                />
                {signUpErrors.mobile && <p className="text-sm text-red-500">{signUpErrors.mobile.message}</p>}
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
                {isLoading ? t("creatingAccount") : t("createAccount")}
              </Button>

              <Google text="Sign up with Google" onTap={handleGoogleSignIn} />
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthModals;