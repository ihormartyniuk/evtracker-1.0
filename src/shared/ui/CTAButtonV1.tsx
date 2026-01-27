export function PrimaryCTA({ children, ...props }) {
    return (
      <button
        {...props}
        className="
          w-full
          rounded-xl
          py-4
          text-lg
          font-semibold
          text-white
          bg-gradient-to-r from-orange-500 to-red-500
          shadow-lg
          hover:shadow-xl
          transition
          active:scale-[0.98]
        "
      >
        {children}
      </button>
    );
  }
  