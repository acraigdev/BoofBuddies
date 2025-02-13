import { useMutation } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import React from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary';
import { fetchApiClient } from '../sdk/client';
import { SpaceBetween } from './SpaceBetween';
import { Icons } from './Icons';

interface LayoutFrameProps {
  children: ReactNode;
}

export function LayoutFrame({ children }: LayoutFrameProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLogin = matchPath('/', pathname);
  const { mutate: logout } = useMutation({
    mutationFn: async () => await fetchApiClient.logout(),
    onSuccess: () => {
      navigate('/');
    },
  });

  return (
    <ErrorBoundary>
      <div>
        <div className="text-white w-full h-15 bg-blue p-2 flex justify-between">
          <h1 className="text-5xl font-fancy">BoofBuddies</h1>
          {!isLogin && (
            <button className="link inverted" onClick={() => logout()}>
              <SpaceBetween direction="horizontal" size="xs">
                Log out
                <Icons.Logout className="size-5" />
              </SpaceBetween>
            </button>
          )}
        </div>
        <div className="m-6 flex justify-center">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </div>
    </ErrorBoundary>
  );
}
