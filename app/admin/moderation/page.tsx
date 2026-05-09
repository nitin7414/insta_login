import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{ token?: string }>;
};

export default async function ModerationPage({ searchParams }: PageProps) {
  const token = (await searchParams)?.token;

  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    redirect("/");
  }

  const signups = await prisma.signupCredential.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      identifier: true,
      type: true,
      displayName: true,
      status: true,
      ipAddress: true,
      userAgent: true,
      createdAt: true,
    },
  });

  return (
    <main className="moderation-shell">
      <div>
        <p className="eyebrow">Admin</p>
        <h1>Moderation queue</h1>
        <p className="intro-left">Review recent submissions without exposing stored password hashes.</p>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Identifier</th>
              <th>Type</th>
              <th>Name</th>
              <th>Status</th>
              <th>IP</th>
              <th>User agent</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {signups.map((signup) => (
              <tr key={signup.id}>
                <td>{signup.identifier}</td>
                <td>{signup.type}</td>
                <td>{signup.displayName ?? "—"}</td>
                <td>{signup.status}</td>
                <td>{signup.ipAddress ?? "—"}</td>
                <td>{signup.userAgent ?? "—"}</td>
                <td>{signup.createdAt.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {signups.length === 0 ? <p className="empty-state">No submissions yet.</p> : null}
      </div>
    </main>
  );
}
