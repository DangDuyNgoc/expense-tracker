/* eslint-disable react/prop-types */
import { X } from "lucide-react";

const Modal = ({ children, isOpen, onClose, title }) => {

  if(!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 max-h-full overflow-y-auto overflow-x-hidden bg-black/20">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>

            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            >
              <X />
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
