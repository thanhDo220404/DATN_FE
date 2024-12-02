export default function Overlay({ onClose }) {
  return (
    <>
      <div
        className="position-fixed w-100 h-100 bg-black opacity-25 z-3"
        style={{
          top: 0,
          left: 0,
        }}
        onClick={onClose} // Gọi hàm onClick khi nhấn vào overlay
      />
    </>
  );
}
