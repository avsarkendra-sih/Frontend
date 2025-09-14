import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { FormStep } from '../lib/types';
interface StepperProps {
  currentStep: number;
  steps: {
    id: FormStep;
    label: string;
  }[];
}
export function Stepper({
  currentStep,
  steps
}: StepperProps) {
  return <div className="w-full py-4">
      <div className="flex justify-between items-center w-full">
        {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        return <Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <motion.div initial={{
              scale: 0.8,
              opacity: 0
            }} animate={{
              scale: 1,
              opacity: 1
            }} className={cn('relative flex h-10 w-10 items-center justify-center rounded-full border-2', isCompleted ? 'border-primary bg-primary text-white' : isCurrent ? 'border-primary text-primary' : 'border-muted-foreground/30 text-muted-foreground/30')}>
                  {isCompleted ? <CheckIcon className="h-5 w-5" /> : <span>{index + 1}</span>}
                  {isCurrent && <motion.div layoutId="activeStep" className="absolute -inset-1 rounded-full border-2 border-primary" transition={{
                duration: 0.3
              }} />}
                </motion.div>
                <span className={cn('mt-2 text-xs font-medium hidden sm:block', isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground/50')}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && <div className={cn('h-0.5 flex-1 mx-2', index < currentStep ? 'bg-primary' : 'bg-muted-foreground/30')} />}
            </Fragment>;
      })}
      </div>
    </div>;
}