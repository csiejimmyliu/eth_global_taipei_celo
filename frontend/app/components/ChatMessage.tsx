import { UserIcon } from '@heroicons/react/24/solid';
import { CommandLineIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div className={clsx(
      'py-8 px-4 md:px-8',
      role === 'assistant' ? 'bg-gray-50' : 'bg-white'
    )}>
      <div className="max-w-4xl mx-auto flex gap-6">
        <div className="flex-shrink-0 mt-1">
          {role === 'user' ? (
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-gray-500" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <CommandLineIcon className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2 overflow-x-auto">
          <div className="font-medium">
            {role === 'user' ? 'You' : 'Celo Agent'}
          </div>
          <div className="prose prose-sm max-w-none">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
} 