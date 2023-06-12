'use client';

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { FormType } from '../types/FormType';
import { ROUTE_HOME, ROUTE_PROFILE } from '@utils/constants/routes';

interface Props {
  type: FormType,
  prompt?: string,
  tag?: string,
  submitting: boolean,
  onSubmit: (
    prompt: string,
    tag: string,
  ) => Promise<void>,
}

const Form: React.FC<Props> = ({
  type,
  prompt = '',
  tag = '',
  submitting,
  onSubmit,
}) => {
  const [promptValue, setPromptValue] = useState<string>(prompt);
  const [tagValue, setTagValue] = useState<string>(tag);

  const handlerPrompt = useCallback((
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = event.target.value;

    setPromptValue(text);
  }, []);

  const handlerTag = useCallback((
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const text = event.target.value;

    setTagValue(text);
  }, []);

  const handlerSubmit = useCallback(async(
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (promptValue === prompt && tagValue === tag) {
      alert('You haven`t no changes!');
      return;
    }

    await onSubmit(promptValue, tagValue);

  }, [promptValue, tagValue, prompt, tag, onSubmit]);

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className='head_text text-left'>
        <span className="blue_gradient">
          {`${type} Post`}
        </span>
      </h1>

      <p className="desc text-left max-w-md">
        {
          `${type} and share amaizing prompts with the world,
          and let your imagination run wild with any AI-powered platform.`
        }
      </p>

      <form
        onSubmit={handlerSubmit}
        className="mt-10 w-full max-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            className="form_textarea"
            value={promptValue}
            onChange={handlerPrompt}
            placeholder="Write your prompt here..."
            required
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {' '}

            <span className="font-normal">
              (#products, #webdevelopment, #idea)
            </span>
          </span>

          <input
            className="form_input"
            value={tagValue}
            onChange={handlerTag}
            placeholder="#tag..."
            required
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
            href={
              type === FormType.EDIT
                ? ROUTE_PROFILE
                : ROUTE_HOME
            }
            className="text-gray-500 text-sm"
          >
            Cancel
          </Link>

          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            type="submit"
            disabled={submitting}
          >
            {submitting ? (
              `${type}...`
            ) : (
              type
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
