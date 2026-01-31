export default function Profile() {
  const admin = {
    name: "Admin User",
    email: "admin@aitimetable.com",
    role: "Super Admin",
    lastLogin: "28 Jan 2026, 10:15 AM",
  };

  return (
    <div className="p-8 bg-[#F5F7FB] min-h-screen">
      <div className="bg-white max-w-xl rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-6">
          Admin Profile
        </h2>

        <div className="space-y-4 text-sm">
          <ProfileRow label="Name" value={admin.name} />
          <ProfileRow label="Email" value={admin.email} />
          <ProfileRow label="Role" value={admin.role} />
          <ProfileRow label="Last Login" value={admin.lastLogin} />
        </div>

        <button className="btn-primary mt-6 w-full">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

