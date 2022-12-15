import Header from 'components/Header';
import Footer from 'components/Footer';

export default function Layout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="grow">{children}</div>
        <Footer />
      </div>
  );
}
