export default function AddTeacherModal({ onClose, onAdd }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const teacher = {
      name: e.target.name.value,
      subject: e.target.subject.value,
      cabin: e.target.cabin.value,
      load: "Balanced",
      status: "Available",
    };

    onAdd(teacher);
    onClose();
  };

  return (
    <Modal onClose={onClose} title="Add Teacher">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Teacher Name" className="input" required />
        <input name="subject" placeholder="Subject" className="input" required />
        <input name="cabin" placeholder="Cabin" className="input" required />

        <button className="btn-primary w-full">Add Teacher</button>
      </form>
    </Modal>
  );
}
