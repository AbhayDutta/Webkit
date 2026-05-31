import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contact - Shipcheck | Get in Touch',
  description: 'Contact the Shipcheck team for support, sales inquiries, or partnerships. We\'re here to help.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
