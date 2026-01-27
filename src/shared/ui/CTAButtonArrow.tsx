export function PrimaryCTAArrow({ text, ...props }) {
    return (
      <button 
        {...props}
        className="
        w-full
        flex
        items-center
        justify-center
        gap-2
        rounded-xl
        py-4
        text-lg
        font-semibold
        bg-gradient-to-r from-violet-500 to-indigo-600
        text-white
        shadow-lg
        hover:shadow-xl
        transition
        ">
        {text}
        <span className="text-xl">→</span>
    </button>
    );
  }
  