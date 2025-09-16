'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Navigation from '@/components/Navigation';
import { Code2, Users, MessageSquare, Bot } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    };

    getUser();
  }, [router, supabase.auth]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const features = [
    {
      name: 'Code Editor',
      description: 'Collaborate in real-time with the built-in code editor',
      icon: Code2,
      href: '/editor',
    },
    {
      name: 'Study Groups',
      description: 'Join or create study groups with peers',
      icon: Users,
      href: '/study-groups',
    },
    {
      name: 'Discussion Forums',
      description: 'Ask questions and share knowledge',
      icon: MessageSquare,
      href: '/discussions',
    },
    {
      name: 'AI Assistant',
      description: 'Get help with your code and studies',
      icon: Bot,
      href: '/ai-assistant',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.user_metadata?.full_name || 'Coder'}!
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={() => router.push(feature.href)}
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {feature.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Recent Activity
              </h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  <li className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Code2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          You created a new project
                        </p>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          You joined the Computer Science study group
                        </p>
                        <p className="text-sm text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
