import clsx from 'clsx';
import { FcGoogle } from 'react-icons/fc'; 
import { Button } from './ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { useState } from 'react';

const Google = ({ 
  text, 
  className, 
  onTap 
}: { 
  text?: string; 
  className?: string; 
  onTap?: () => void; 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleClick = async () => {
    if (onTap) {
      setIsLoading(true);
      try {
        await onTap();
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Button 
      type="button"
      onClick={handleClick}
      className={clsx("w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300", className)}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mr-2"></div>
          "Loading"
        </div>
      ) : (
        <div className="flex items-center">
          <FcGoogle className="w-5 h-5 mr-2" />
          Sign in with Google
        </div>
      )}
    </Button>
  );
};

export default Google;