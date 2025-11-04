
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfileForm() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    address: "",
    gender: "",
  });
  const [loading, setLoading] = useState(true);

  // Load current profile
  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setForm({
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            phoneNumber: data.phoneNumber || "",
            address: data.address || "",
            gender: data.gender || "",
          });
        } else {
          console.error("Failed to fetch profile:", res.status);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [session, status]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Submitting profile data:", form);
    console.log("Session status:", status);
    console.log("Session data:", session);

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    console.log("Profile update response status:", res.status);
    const responseData = await res.json();
    console.log("Profile update response data:", responseData);

    if (res.ok) {
      alert("Profile updated!");
      // Reload profile data after successful update
      window.location.reload();
    } else {
      alert(`Error updating profile: ${responseData.error || 'Unknown error'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-lg">
      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        value={form.firstname}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={form.lastname}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone"
        value={form.phoneNumber}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        name="gender"
        placeholder="Gender"
        value={form.gender}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Save
      </button>
    </form>
  );
}
