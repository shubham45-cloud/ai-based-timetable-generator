export default function AddSubjectModal({ onClose, onAdd }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      name: e.target.subject.value,
    });

    onClose();
  };

  return (
    <Modal onClose={onClose} title="Add Subject">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="subject"
          placeholder="Subject Name"
          className="input"
          required
        />
        <button className="btn-primary w-full">Add Subject</button>
      </form>
    </Modal>
  );
}
