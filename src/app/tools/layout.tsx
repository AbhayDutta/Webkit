import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Free Tools - WebKit | Website Optimization Utilities',
  description: 'Free website optimization tools including meta tag generator, color picker, image optimizer, and more.',
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
