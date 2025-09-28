export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <h1>Default Layout</h1>
      </header>
      <main>{children}</main>
    </>
  );
};
