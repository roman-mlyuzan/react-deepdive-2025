import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

interface AddTodoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
}

function AddTodoDialog({ isOpen, onClose, onAdd }: AddTodoDialogProps) {
  const [title, setTitle] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  console.log("AddTodoForm rendered");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (title.trim()) {
        onAdd(title.trim());
        setTitle("");
        onClose();
      }
    },
    [title, onAdd, onClose]
  );

  const handleCancel = useCallback(() => {
    setTitle("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClick = (e: MouseEvent) => {
      if (e.target === dialog) {
        setTitle("");
        onClose();
      }
    };

    dialog.addEventListener("click", handleClick);
    return () => dialog.removeEventListener("click", handleClick);
  }, [onClose]);

  return (
    <dialog ref={dialogRef} onClose={handleCancel} className="add-todo-dialog">
      <div className="dialog-content">
        <h2>Add New Todo</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="todo-title">What needs to be done?</label>
            <input
              id="todo-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter todo title..."
              autoFocus
              required
              minLength={3}
              className="dialog-input"
            />
          </div>

          <div className="dialog-actions">
            <button type="button" onClick={handleCancel} className="btn-cancel">
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={title.trim().length < 3}
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
export default memo(AddTodoDialog);
