export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-auto">
      <div className="max-w-md mx-auto px-4 py-4">
        <p className="text-sm text-center text-base-content/60">
          © {new Date().getFullYear()} EVTracker. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

