async function getColleges() {
  const res = await fetch("http://localhost:3000/api/colleges", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const colleges = await getColleges();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        College Discovery Platform
      </h1>

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

            <p>Location: {college.location}</p>
            <p>Fees: ₹{college.fees}</p>
            <p>Rating: {college.rating}</p>

            <a
              href={`/college/${college.id}`}
              className="text-blue-500 mt-3 inline-block"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}