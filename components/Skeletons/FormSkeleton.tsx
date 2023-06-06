import React from 'react';
import Skeleton from 'react-loading-skeleton';

interface Props {
  type: string,
}

const FormSkeleton: React.FC<Props> = ({ type }) => (
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
      className="mt-10 w-full max-2xl flex flex-col gap-7 glassmorphism"
    >
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Your AI Prompt
        </span>

        <Skeleton className='form_textarea' />
      </label>

      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Tag {' '}

          <span className="font-normal">
            (#products, #webdevelopment, #idea)
          </span>
        </span>

        <Skeleton className='form_input' />
      </label>

      <div className="flex-end mx-3 mb-5 gap-4">
        <button
          className="text-gray-500 text-sm"
          aria-disabled
        >
          Cancel
        </button>

        <button
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          type="submit"
          disabled
        >
          {type}
        </button>
      </div>
    </form>
  </section>
);

export default FormSkeleton;
