import type { ReactNode } from 'react';
import { Header } from '../common/Header';
import { BackToTop } from '../common/BackToTop';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs />
      <main className="flex-1">
        {children}
      </main>
      <BackToTop />
    </div>
  );
}

