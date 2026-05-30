import SearchBar from "./components/SearchBar";
import { prisma } from "@/lib/prisma";

async function getColleges(search: string) {
  return prisma.college.findMany({
    where: {
      name: {
        contains: search,
      },
    },
  });
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const params = await searchParams;
  const search = params.search || "";

  const colleges = await getColleges(search);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        College Discovery Platform
      </h1>

      <SearchBar />

      <div className="mb-6">
        <a
          href="/compare"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Compare Colleges
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {colleges.map((college: any) => (
          <div
            key={college.id}
            className="border p-5 rounded-xl shadow"
          >
            <h2 className="text-xl font-semibold">
              {college.name}
            </h2>

            <p>{college.location}</p>

            <p>Fees: ₹{college.fees}</p>

            <p>Rating: {college.rating}</p>

            <a
              href={`/college/${college.id}`}
              className="text-blue-500"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}