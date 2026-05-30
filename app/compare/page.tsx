import { prisma } from "@/lib/prisma";

async function getColleges() {
  return prisma.college.findMany();
}

export default async function ComparePage() {
  const colleges = await getColleges();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        Compare Colleges
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">Name</th>
              <th className="border p-3">Location</th>
              <th className="border p-3">Fees</th>
              <th className="border p-3">Rating</th>
            </tr>
          </thead>

          <tbody>
            {colleges.map((college) => (
              <tr key={college.id}>
                <td className="border p-3">
                  {college.name}
                </td>

                <td className="border p-3">
                  {college.location}
                </td>

                <td className="border p-3">
                  ₹{college.fees}
                </td>

                <td className="border p-3">
                  {college.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}