"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import StrainForm from "../../components/StrainForm";
import EditStrainForm from "../../components/EditStrainForm";

interface Strain {
  id: string;
  strain_name: string;
  description?: string;
  image_url?: string;
}

interface Favorite {
  _id: string;
  strainId: string;
  strainName: string;
  consumptionType?: string;
  dispensary?: string;
}

export default function Greenspace() {
  const { data: session, status } = useSession();
  const [strains, setStrains] = useState<Strain[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch all strains from API
  useEffect(() => {
    if (status === "authenticated") {
      fetch("https://cannlytics.com/api/data/strains")
        .then((res) => res.json())
        .then((data) => {
          setStrains(data.data);
        });
    }
  }, [status]);

  // Fetch user's favorites
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/favorites")
        .then((res) => res.json())
        .then((data) => setFavorites(data));
    }
  }, [status]);

  // Filter strains based on search term
  // (Remove filteredStrains state and effect if not used in rendering)

  const addFavorite = async (strain: Strain, consumptionType: string, dispensary: string) => {
    const response = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        strainId: strain.id, 
        strainName: strain.strain_name,
        consumptionType,
        dispensary
      }),
    });
    if (response.ok) {
      const newFavorite = await response.json();
      setFavorites([...favorites, { 
        _id: newFavorite.insertedId, 
        strainId: strain.id, 
        strainName: strain.strain_name,
        consumptionType,
        dispensary
      }]);
      setShowForm(false);
    }
  };

  const deleteFavorite = async (id: string) => {
    const response = await fetch(`/api/favorites?id=${id}`, { method: "DELETE" });
    if (response.ok) {
      setFavorites(favorites.filter((fav) => fav._id !== id));
    }
  };

  const updateFavorite = async (id: string, strain: Strain, consumptionType: string, dispensary: string) => {
    const response = await fetch("/api/favorites", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        id, 
        strainId: strain.id, 
        strainName: strain.strain_name,
        consumptionType,
        dispensary
      }),
    });
    if (response.ok) {
      setFavorites(favorites.map((fav) => 
        fav._id === id 
          ? { ...fav, strainId: strain.id, strainName: strain.strain_name, consumptionType, dispensary }
          : fav
      ));
      setEditingId(null);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Please sign in to access My Greenspace.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img src="/greenspacelogo.png" alt="GreenSpace Logo" className="w-6 h-6" />
          <h1 className="text-2xl font-bold text-green-800">My Greenspace</h1>
        </div>
        <p className="text-gray-600">Manage your favorite cannabis strains and preferences</p>
      </div>
      
      {/* Add New Favorite */}
      <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-green-800">Add New Favorite</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            {showForm ? "Cancel" : "Add New"}
          </button>
        </div>
        
        {showForm && (
          <StrainForm
            strains={strains}
            onAddFavorite={addFavorite}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>

      {/* Current Favorites */}
      <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6">
        <h2 className="text-xl font-semibold mb-4 text-green-800">My Favorites</h2>
        {favorites.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-gray-600">No favorites yet. Add some strains above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((favorite) => (
              <div key={favorite._id} className="border border-green-200 rounded-lg p-4 bg-green-50/50 hover:bg-green-50 transition-colors">
                {editingId === favorite._id ? (
                  <EditStrainForm
                    strains={strains}
                    currentFavorite={favorite}
                    onUpdateFavorite={updateFavorite}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-semibold text-lg">{favorite.strainName}</span>
                        {favorite.consumptionType && (
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Consumption:</span> {favorite.consumptionType}
                          </div>
                        )}
                        {favorite.dispensary && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Dispensary:</span> {favorite.dispensary}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingId(favorite._id)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteFavorite(favorite._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 