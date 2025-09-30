const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <h1>User Layout</h1>
      </header>
      <main>{children}</main>
    </>
  );
};

export default UserLayout;