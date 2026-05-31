import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Features - WebKit | Comprehensive Website Audit Platform',
  description: 'Discover 40+ automated website audit checks including SEO, performance, security, mobile readiness, and more.',
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
