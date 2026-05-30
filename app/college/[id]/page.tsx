import { prisma } from "@/lib/prisma";

async function getCollege(id: string) {
  return prisma.college.findUnique({
    where: {
      id: Number(id),
    },
  });
}

export default async function CollegePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const college = await getCollege(id);

  if (!college) {
    return <div>College not found</div>;
  }

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        {college.name}
      </h1>

      <p className="mt-4 text-lg">
        Location: {college.location}
      </p>

      <p className="mt-2 text-lg">
        Fees: ₹{college.fees}
      </p>

      <p className="mt-2 text-lg">
        Rating: {college.rating}
      </p>

      <p className="mt-4">
        {college.description}
      </p>
    </main>
  );
}