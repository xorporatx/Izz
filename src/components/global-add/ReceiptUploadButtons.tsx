import { useId, useRef, useState, type ChangeEvent } from "react";
import { Camera, CloudUpload, X } from "../icons";
import { Button } from "../ui/Button";

export interface ReceiptUploadButtonsProps {
  /** Called with the picked file, or `null` when it is removed. */
  onFileChange?: (file: File | null) => void;
}

/**
 * "צלם דוח" / "העלאת קובץ" — the pair of buttons at the top of every tab.
 *
 * The frame's mobile flow opens a camera; a desktop browser has no
 * equivalent capture surface, and the brief is explicit that one should not
 * be faked. Both buttons open the same native file picker instead — "צלם
 * דוח" adds `capture="environment"`, which mobile browsers honour and
 * desktop browsers silently ignore, so the one control degrades correctly
 * rather than forking into a real path and a fake one.
 */
export function ReceiptUploadButtons({ onFileChange }: ReceiptUploadButtonsProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const pick = (capture: boolean) => {
    const input = inputRef.current;
    if (!input) return;
    if (capture) input.setAttribute("capture", "environment");
    else input.removeAttribute("capture");
    input.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.files?.[0] ?? null;
    setFile(next);
    onFileChange?.(next);
  };

  const remove = () => {
    setFile(null);
    onFileChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*,.pdf"
        className="sr-only"
        onChange={handleChange}
      />

      <div className="global-add__receipt-row">
        <Button
          type="button"
          variant="primary"
          icon={<Camera size={16} />}
          onClick={() => pick(true)}
        >
          צלם דוח
        </Button>
        <Button
          type="button"
          variant="secondary"
          icon={<CloudUpload size={16} />}
          onClick={() => pick(false)}
        >
          העלאת קובץ
        </Button>
      </div>

      {file && (
        <p className="global-add__file-chip global-add__file-chip--spaced">
          <span className="global-add__file-chip-name">{file.name}</span>
          <button
            type="button"
            className="global-add__file-chip-remove"
            onClick={remove}
            aria-label="הסרת הקובץ"
          >
            <X size={14} />
          </button>
        </p>
      )}
    </div>
  );
}
