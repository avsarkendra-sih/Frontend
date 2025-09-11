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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation schemas
const loginSchema = z.object({
  identifier: z.string().min(1, "Email/username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  mobile: z.string().min(10, "Valid mobile number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

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

  // Login form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  // Sign up form
  const {
    register: signUpRegister,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
    reset: resetSignUp
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  });

  // Mock login function
  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockUser = {
      id: "1",
      name: "User Name",
      email: data.identifier.includes('@') ? data.identifier : "user@example.com"
    };
    
    login(mockUser);
    
    // Store in localStorage
    localStorage.setItem('authToken', 'mock-token-123');
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    toast({
      title: t('loginSuccess'),
      description: "Welcome back!",
    });
    
    resetLogin();
    setIsLoading(false);
  };

  // Mock sign up function
  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful signup
    const mockUser = {
      id: "1",
      name: data.fullName,
      email: data.email
    };
    
    login(mockUser);
    
    // Store in localStorage
    localStorage.setItem('authToken', 'mock-token-123');
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    toast({
      title: t('signUpSuccess'),
      description: "Account created successfully!",
    });
    
    resetSignUp();
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
                {t('loginTitle')}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleLoginSubmit(handleLogin)} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">{t('email')}</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Email/Username/Mobile"
                  {...loginRegister('identifier')}
                  className={loginErrors.identifier ? 'border-red-500' : ''}
                />
                {loginErrors.identifier && (
                  <p className="text-sm text-red-500">{loginErrors.identifier.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input
                  id="password"
                  type="password"
                  {...loginRegister('password')}
                  className={loginErrors.password ? 'border-red-500' : ''}
                />
                {loginErrors.password && (
                  <p className="text-sm text-red-500">{loginErrors.password.message}</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? t('signingIn') : t('signIn')}
              </Button>
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
                {t('signUpTitle')}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSignUpSubmit(handleSignUp)} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t('fullName')}</Label>
                <Input
                  id="fullName"
                  type="text"
                  {...signUpRegister('fullName')}
                  className={signUpErrors.fullName ? 'border-red-500' : ''}
                />
                {signUpErrors.fullName && (
                  <p className="text-sm text-red-500">{signUpErrors.fullName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  {...signUpRegister('email')}
                  className={signUpErrors.email ? 'border-red-500' : ''}
                />
                {signUpErrors.email && (
                  <p className="text-sm text-red-500">{signUpErrors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  {...signUpRegister('mobile')}
                  className={signUpErrors.mobile ? 'border-red-500' : ''}
                />
                {signUpErrors.mobile && (
                  <p className="text-sm text-red-500">{signUpErrors.mobile.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signUpPassword">{t('password')}</Label>
                <Input
                  id="signUpPassword"
                  type="password"
                  {...signUpRegister('password')}
                  className={signUpErrors.password ? 'border-red-500' : ''}
                />
                {signUpErrors.password && (
                  <p className="text-sm text-red-500">{signUpErrors.password.message}</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={isLoading}
              >
                {isLoading ? t('creatingAccount') : t('createAccount')}
              </Button>
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthModals;