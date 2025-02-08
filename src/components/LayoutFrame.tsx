import { useMutation } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import * as auth from '../sdk/auth';

interface LayoutFrameProps {
  children: ReactNode;
}

export function LayoutFrame({ children }: LayoutFrameProps) {
  const { mutate: logout } = useMutation({
    mutationFn: () => auth.logout(),
    onSuccess: a => {
      console.log(a);
    },
  });

  return (
    <div>
      <div className="text-white w-full h-15 bg-blue p-2 flex justify-between">
        <h1 className="text-5xl font-fancy">BoofBuddies</h1>
        <button onClick={() => logout()}>Log out</button>
      </div>
      <div className="m-6 flex justify-center">{children}</div>
    </div>
  );
}
