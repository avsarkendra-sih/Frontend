import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Google from "./Google";
import { supabase } from "@/lib/supabaseClient";

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
    login,
  } = useAuthStore();

  const { t } = useTranslation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Login ka form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<LoginFormData>();

  // Signup wala form
  const {
    register: signUpRegister,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
    reset: resetSignUp,
  } = useForm<SignUpFormData>();

  const [formData, setFormData] = useState<LoginFormData>({
    identifier: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const [registerFormData, setRegisterFormData] = useState<SignUpFormData>({
    fullName: "",
    email: "",
    dob: "",
    password: "",
    mobile: "",
  });

  const handleRegisterChange = (field: string, value: string) => {
    setRegisterFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);

      const { data: authData, error } = await supabase.auth.signUp({
        email: registerFormData.email,
        password: registerFormData.password,
      });

      if (error) {
        toast({ title: "Registration Failed", description: error.message });
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      localStorage.setItem("authToken", authData.session?.access_token || "");
      // console.log(authData)
      localStorage.setItem("user", JSON.stringify(authData.user));
      const response = await fetch(
        "http://localhost:5000/api/v1/register/signup",
        {
          method: "POST",
          headers: {
            authorization: authData.session.access_token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: registerFormData.fullName,
            email: registerFormData.email,
            password: registerFormData.password,
            dateOfBirth: registerFormData.dob,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.status === 201) {
        toast({ title: t("signUpSuccess"), description: "Welcome!" });
        resetLogin();
        setIsLoading(false);
        closeSignUpModal();
        closeLoginModal();
        return;
      }
      toast({
        title: t("loginSuccess"),
        description: "Error logging you in...",
      });
      resetLogin();
      setIsLoading(false);
      closeLoginModal();
    } catch (error) {
      console.log(error);
    }
  };
  //  Email/Password ka Login
  const handleLogin = async (data: LoginFormData) => {
    try {
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
      const identity = authData.user.identities[0].identity_data;
      login({ id: identity.id, name: identity.name, email: identity.email });
      localStorage.setItem("authToken", authData.session?.access_token || "");
      localStorage.setItem("user", JSON.stringify(authData.user));
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_SERVER_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            Authorization: authData.session.access_token,

            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.identifier,
            password: formData.password,
          }),
        }
      );

      if (response.status === 201) {
        toast({ title: t("loginSuccess"), description: "Welcome back!" });
        resetLogin();
        setIsLoading(false);
        closeLoginModal();
        return;
      }
      toast({
        title: t("loginSuccess"),
        description: "Error logging you in...",
      });
      resetLogin();
      setIsLoading(false);
      closeLoginModal();
    } catch (error) {
      console.log(error);
    }
  };

  // Email/Password se signUp

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      toast({ title: "Google Sign-In Failed", description: error.message });
    } else {
      toast({
        title: "Google Sign-In",
        description: "Redirecting to Google...",
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Login Modal */}
      <Dialog
        open={isLoginModalOpen}
        // onOpenChange={closeLoginModal}>
      >
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

            <form
              onSubmit={handleLoginSubmit(handleLogin)}
              className="space-y-4 mt-4"
            >
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="identifier">{t("email")}</Label>
                <Input
                  name="identifier"
                  id="identifier"
                  type="email"
                  value={formData.identifier}
                  onChange={(e) => handleChange("identifier", e.target.value)}
                  placeholder="Enter your email"
                  className={loginErrors.identifier ? "border-red-500" : ""}
                />
                {loginErrors.identifier && (
                  <p className="text-sm text-red-500">
                    {loginErrors.identifier.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  {...loginRegister("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={loginErrors.password ? "border-red-500" : ""}
                />
                {loginErrors.password && (
                  <p className="text-sm text-red-500">
                    {loginErrors.password.message}
                  </p>
                )}
              </div>

              <Button
                onClick={() => {
                  console.log("button hai ye");
                  handleLogin(formData);
                }}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? t("signingIn") : t("signIn")}
              </Button>

              <Google text="Sign in with Google" onTap={handleGoogleSignIn} />
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Sign Up Modal */}
      <Dialog
        open={isSignUpModalOpen}
        // onOpenChange={closeSignUpModal}>
      >
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

            <form className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  onChange={(e) =>
                    handleRegisterChange("fullName", e.target.value)
                  }
                  value={registerFormData.fullName}
                  type="text"
                  className={signUpErrors.fullName ? "border-red-500" : ""}
                />
                {signUpErrors.fullName && (
                  <p className="text-sm text-red-500">
                    {signUpErrors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  onChange={(e) => handleRegisterChange("dob", e.target.value)}
                  value={registerFormData.dob}
                  className={signUpErrors.dob ? "border-red-500" : ""}
                />
                {signUpErrors.dob && (
                  <p className="text-sm text-red-500">
                    {signUpErrors.dob.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  onChange={(e) =>
                    handleRegisterChange("email", e.target.value)
                  }
                  type="email"
                  value={registerFormData.email}
                  className={signUpErrors.email ? "border-red-500" : ""}
                />
                {signUpErrors.email && (
                  <p className="text-sm text-red-500">
                    {signUpErrors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  onChange={(e) =>
                    handleRegisterChange("password", e.target.value)
                  }
                  value={registerFormData.password}
                  type="password"
                  className={signUpErrors.password ? "border-red-500" : ""}
                />
                {signUpErrors.password && (
                  <p className="text-sm text-red-500">
                    {signUpErrors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  onChange={(e) =>
                    handleRegisterChange("mobile", e.target.value)
                  }
                  value={registerFormData.mobile}
                  className={signUpErrors.mobile ? "border-red-500" : ""}
                />
                {signUpErrors.mobile && (
                  <p className="text-sm text-red-500">
                    {signUpErrors.mobile.message}
                  </p>
                )}
              </div>

              <Button
                onClick={() => {
                  handleRegister();
                }}
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={isLoading}
              >
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
