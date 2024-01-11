import { ReactNode } from "react";

const Modal = ({ children, id }: { children: ReactNode; id: string }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        {children}
        <p className="py-4">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
