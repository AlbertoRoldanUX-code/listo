import { ProfileForm } from "@/components/ProfileForm";

export default function PerfilPage() {
  return (
    <>
      <div className="page-head">
        <h1>My profile</h1>
        <p>
          Saved only in this browser. Use it to fill cover letters and apply
          faster to each listing.
        </p>
      </div>
      <ProfileForm />
    </>
  );
}
