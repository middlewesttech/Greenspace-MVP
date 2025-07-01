"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

interface Strain {
  id: string;
  strain_name: string;
  description?: string;
  image_url?: string;
  updated_at?: string;
}

export default function Home() {
  const { status } = useSession();
  const [strains, setStrains] = useState<Strain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("https://cannlytics.com/api/data/strains")
        .then((res) => res.json())
        .then((data) => {
          setStrains(
            data.data
              .sort((a: Strain, b: Strain) =>
                b.updated_at && a.updated_at
                  ? new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
                  : 0
              )
              .slice(0, 10)
          );
          setLoading(false);
        });
    }
  }, [status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") {
    signIn();
    return <div>Redirecting to sign in...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src="/greenspacelogo.png" alt="GreenSpace Logo" className="w-6 h-6" />
          <h1 className="text-2xl font-bold text-green-800">Welcome to GreenSpace</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your personal cannabis strain tracker. Discover, save, and manage your favorite strains with detailed information and dispensary recommendations.
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-950 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-green-800">Most Recently Added Strains</h2>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-3 text-green-700">Loading strains...</span>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {strains.map((strain) => (
              <div key={strain.id} className="bg-white rounded-lg shadow-sm border border-green-200 p-4 flex gap-4 items-start hover:shadow-md transition-shadow">
                {strain.image_url && (
                  <img src={strain.image_url} alt={strain.strain_name} className="w-16 h-16 object-cover rounded-lg" />
                )}
                <div className="flex-1">
                  <div className="font-semibold text-green-900">{strain.strain_name}</div>
                  <div className="text-sm text-gray-600 mt-1 line-clamp-2">{strain.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="text-center">
        <p className="text-gray-600 mb-4">Ready to start tracking your favorites?</p>
        <a 
          href="/greenspace" 
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <span>Go to My Greenspace</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
