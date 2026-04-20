import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  showToast: (t: Omit<ToastData, 'id'>) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ToastCtx = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastCtx);
}

// ─── Per-type visual tokens ───────────────────────────────────────────────────
const TOKENS: Record<ToastType, { bg: string; border: string; icon: React.ReactNode }> = {
  success: {
    bg: '#F6FFED',
    border: '#52C41A',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
        <circle cx="11" cy="11" r="11" fill="#52C41A" />
        <path d="M6 11l3.5 3.5L16 7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  error: {
    bg: '#FFF2F0',
    border: '#FF4D4F',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
        <circle cx="11" cy="11" r="11" fill="#FF4D4F" />
        <path d="M11 7v4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="11" cy="14.5" r="1" fill="white" />
      </svg>
    ),
  },
  warning: {
    bg: '#FFFBE6',
    border: '#FAAD14',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
        <circle cx="11" cy="11" r="11" fill="#FAAD14" />
        <path d="M11 7v4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="11" cy="14.5" r="1" fill="white" />
      </svg>
    ),
  },
  info: {
    bg: '#E6F4FF',
    border: '#1677FF',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
        <circle cx="11" cy="11" r="11" fill="#1677FF" />
        <path d="M11 10v5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="11" cy="7.5" r="1" fill="white" />
      </svg>
    ),
  },
};

// ─── Single Toast Item ────────────────────────────────────────────────────────
function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastData;
  onRemove: (id: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const raf = useRef<number | null>(null);

  const dismiss = useCallback(() => {
    setVisible(false);
    timerRef.current = setTimeout(() => onRemove(toast.id), 380);
  }, [toast.id, onRemove]);

  useEffect(() => {
    // Trigger enter on next paint
    raf.current = requestAnimationFrame(() => setVisible(true));

    // Auto-dismiss after 3 s
    timerRef.current = setTimeout(dismiss, 3000);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dismiss]);

  const { bg, border, icon } = TOKENS[toast.type];

  return (
    <div
      style={{
        // Slide from right: off-screen → in-view
        transform: visible ? 'translateX(0)' : 'translateX(calc(100% + 32px))',
        opacity: visible ? 1 : 0,
        transition:
          'transform 380ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease',
        willChange: 'transform, opacity',
        width: '380px',
        maxWidth: 'calc(100vw - 32px)',
      }}
    >
      <div
        className="flex items-start gap-[10px] rounded-[6px] pl-[14px] pr-[6px] py-[12px]"
        style={{
          backgroundColor: bg,
          border: `1px solid ${border}`,
          boxShadow:
            '0 6px 20px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
        }}
      >
        {/* Icon */}
        {icon}

        {/* Text */}
        <div className="flex-1 min-w-0 pr-[4px]">
          <p
            className="text-[#262626] mb-[3px]"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              lineHeight: '22px',
            }}
          >
            {toast.title}
          </p>
          {toast.message && (
            <p
              className="text-[#4A5568]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '13px',
                lineHeight: '19px',
              }}
            >
              {toast.message}
            </p>
          )}
        </div>

        {/* Dismiss × */}
        <button
          onClick={dismiss}
          className="shrink-0 w-[32px] h-[32px] flex items-center justify-center rounded hover:bg-black/5 transition-colors"
          aria-label="Dismiss"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M1 1L11 11M11 1L1 11"
              stroke="#5B6570"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Toast Container — fixed top-right ────────────────────────────────────────
function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: ToastData[];
  onRemove: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed z-[9999] flex flex-col gap-[10px]"
      style={{ top: '16px', right: '16px', pointerEvents: 'none' }}
    >
      {toasts.map(t => (
        <div key={t.id} style={{ pointerEvents: 'auto' }}>
          <ToastItem toast={t} onRemove={onRemove} />
        </div>
      ))}
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((t: Omit<ToastData, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts(prev => [...prev, { ...t, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastCtx.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastCtx.Provider>
  );
}
