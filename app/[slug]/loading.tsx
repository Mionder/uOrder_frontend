export default function Loading() {
  return (
    <main className="bg-white min-h-screen">
      {/* Скелетон категорій */}
      <div className="flex gap-4 p-4 overflow-hidden border-b border-gray-100">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-24 bg-gray-100 rounded-2xl animate-pulse shrink-0" />
        ))}
      </div>

      {/* Скелетон контенту */}
      <div className="p-4 space-y-8 mt-4">
        {[1, 2].map((section) => (
          <div key={section} className="space-y-4">
            <div className="h-8 w-48 bg-gray-100 rounded-lg animate-pulse mb-6" />
            {[1, 2, 3].map((item) => (
              <div key={item} className="w-full h-[147px] bg-gray-50 rounded-4xl animate-pulse border border-gray-100" />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}