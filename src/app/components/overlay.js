export default function Overlay() {
  return (
    <>
      <div
        className="position-fixed w-100 h-100 bg-black opacity-25 z-3"
        style={{
          top: 0,
          left: 0,
        }}
      />
    </>
  );
}
