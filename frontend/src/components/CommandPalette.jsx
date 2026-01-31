import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const boxRef = useRef(null);

  // OPEN (Ctrl + K) & CLOSE (Esc)
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  if (!open) return null;

  const go = (path) => {
    setOpen(false);
    navigate(path);
  };

  const logout = () => {
    localStorage.removeItem("isAuth");
    setOpen(false);
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-32">
      <div
        ref={boxRef}
        className="w-[420px] bg-white rounded-xl shadow-xl p-4 relative"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        <input
          autoFocus
          placeholder="Type a command..."
          className="w-full p-3 border rounded-lg text-sm"
        />

        <div className="mt-3 space-y-2 text-sm">
          <button
            onClick={() => go("/simulation")}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100"
          >
            🧪 Run Simulation
          </button>

          <button
            onClick={() => go("/teachers")}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100"
          >
            👨‍🏫 Go to Teachers
          </button>

          <button
            onClick={() => go("/profile")}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100"
          >
            👤 Admin Profile
          </button>

          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600"
          >
            🚪 Logout
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-3">
          Ctrl + K to open • Esc to close
        </p>
      </div>
    </div>
  );
}

