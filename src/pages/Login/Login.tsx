import React, { useRef, useState } from 'react';
import { LayoutFrame } from '../../components/LayoutFrame';
import { ContentBox } from '../../components/ContentBox';
import { SpaceBetween } from '../../components/SpaceBetween';
import { TextInput } from '../../components/TextInput';
import { login } from '../../sdk/auth';
import { useMutation } from '@tanstack/react-query';
import type { ValidationDelegate } from '../../utils/typeHelpers';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Icons } from '../../components/Icons';

export function Login() {
  const navigate = useNavigate();
  const [searchParams, _setSearchParams] = useSearchParams();
  // TODO clean
  const [name, setName] = useState('Moxxi');
  const [email, setEmail] = useState('moxxi@gmail.com');

  const nameDelegate = useRef<ValidationDelegate>(null);
  const emailDelegate = useRef<ValidationDelegate>(null);

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: () => login(name, email),
    onSuccess: () => {
      navigate('/search');
    },
  });

  const auth = () => {
    const isValid = [
      nameDelegate.current?.validate,
      emailDelegate.current?.validate,
    ].reduce(
      (isValid, validate) =>
        (validate?.({ shouldFocus: isValid }) ?? true) && isValid,
      true,
    );
    if (!isValid) return;
    authenticate();
  };
  return (
    <LayoutFrame>
      <ContentBox>
        <form
          onSubmit={e => {
            e.preventDefault();
            auth();
          }}
        >
          <SpaceBetween size="l">
            <h4>Find your new best friend</h4>
            {searchParams.get('expired') && (
              <SpaceBetween
                direction="horizontal"
                size="xs"
                className="text-red-700"
              >
                <Icons.Error className="size-4" />
                <span className="text-sm">
                  Authorization expired or invalid. Please try again.
                </span>
              </SpaceBetween>
            )}
            <TextInput
              val={name}
              onValChange={setName}
              label="Name"
              validationDelegate={nameDelegate}
              validation={val =>
                Boolean(val !== '' && val?.match(/^[A-Za-z0-9]{1,100}$/))
              }
              validationError={'Enter your name.'}
              placeholder="Moxxi"
            />
            <TextInput
              label="Email"
              val={email}
              onValChange={val => setEmail(val)}
              validationDelegate={emailDelegate}
              validation={val =>
                Boolean(
                  val !== '' && val?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                )
              }
              validationError={'Enter a valid email.'}
              placeholder="moxxi.ryn@gmail.com"
            />
            <button type="submit" className="primary block m-auto">
              Find my match
            </button>
          </SpaceBetween>
        </form>
      </ContentBox>
    </LayoutFrame>
  );
}
