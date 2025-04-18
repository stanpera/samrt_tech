const Logo = () => {
  return (
    <div
      className="w-45 h-11 bg-cover bg-left"
      style={{
        backgroundImage: "url('/logo_smart_tech.png')",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "flex-start",
      }}
      aria-label="Smart Tech logo"
    ></div>
  );
};

export default Logo;
