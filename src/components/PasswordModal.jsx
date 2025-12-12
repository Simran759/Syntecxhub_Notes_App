import React, { useState, useRef, useEffect } from "react";

function PasswordModal({
  mode, 
  onSubmit,
  onCancel,
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (mode === "set") {
      
      if (!password.trim()) {
        setError("Password cannot be empty");
        return;
      }
      if (password.length < 4) {
        setError("Password must be at least 4 characters");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords don't match");
        return;
      }
      onSubmit(password);
    } else {
      if (!password.trim()) {
        setError("Enter password to unlock");
        return;
      }
      onSubmit(password);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">
          {mode === "set" ? "Set Password" : "Enter Password"}
        </h2>
        <p className="modal-subtitle">
          {mode === "set"
            ? "Create a password to protect this note"
            : "This note is locked. Enter password to view."}
        </p>

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            ref={inputRef}
            type="password"
            className="modal-input"
            placeholder={mode === "set" ? "New password" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {mode === "set" && (
            <input
              type="password"
              className="modal-input"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          )}

          {error && <div className="modal-error">{error}</div>}

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              {mode === "set" ? "🔒 Lock" : "✓ Unlock"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordModal;
