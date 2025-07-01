"use client";
import { useState, useEffect } from "react";
import type { Strain, Place } from "@/types";

interface StrainFormProps {
  strains: Strain[];
  onAddFavorite: (strain: Strain, consumptionType: string, dispensary: string) => void;
  onCancel: () => void;
}

const CONSUMPTION_TYPES = [
  "Flower",
  "Cartridge", 
  "Edible",
  "Wax",
  "Oil",
  "Other"
];

export default function StrainForm({ strains, onAddFavorite, onCancel }: StrainFormProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStrains, setFilteredStrains] = useState<Strain[]>([]);
  const [selectedStrain, setSelectedStrain] = useState<Strain | null>(null);
  const [consumptionType, setConsumptionType] = useState("");
  const [dispensarySearch, setDispensarySearch] = useState("");
  const [dispensaryResults, setDispensaryResults] = useState<Place[]>([]);
  const [selectedDispensary, setSelectedDispensary] = useState("");
  const [showDispensaryResults, setShowDispensaryResults] = useState(false);
  const [searchingDispensary, setSearchingDispensary] = useState(false);
  const [showStrainInfo, setShowStrainInfo] = useState<Strain | null>(null);

  // Filter strains based on search term
  useEffect(() => {
    const filtered = strains.filter((strain: Strain) =>
      strain.strain_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStrains(filtered.slice(0, 10));
  }, [searchTerm, strains]);

  // Search for dispensaries
  const searchDispensaries = async (query: string) => {
    if (!query.trim()) {
      setDispensaryResults([]);
      setShowDispensaryResults(false);
      return;
    }

    setSearchingDispensary(true);
    try {
      const response = await fetch(`/api/places?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setDispensaryResults(data.results || []);
        setShowDispensaryResults(true);
      }
    } catch (error) {
      console.error("Error searching dispensaries:", error);
    } finally {
      setSearchingDispensary(false);
    }
  };

  // Debounce dispensary search - only search if 3+ characters
  useEffect(() => {
    if (dispensarySearch.length >= 3) {
      const timeoutId = setTimeout(() => {
        searchDispensaries(dispensarySearch);
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setDispensaryResults([]);
      setShowDispensaryResults(false);
    }
  }, [dispensarySearch]);

  const handleSubmit = () => {
    if (selectedStrain) {
      onAddFavorite(selectedStrain, consumptionType, selectedDispensary);
    }
  };

  const handleStrainSelect = (strain: Strain) => {
    setSelectedStrain(strain);
    setSearchTerm(strain.strain_name);
    setFilteredStrains([]);
  };

  const handleDispensarySelect = (place: Place) => {
    setSelectedDispensary(place.name);
    setDispensarySearch(place.name);
    setShowDispensaryResults(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto border border-green-200 dark:border-green-700">
        <h3 className="text-xl font-semibold mb-4 text-green-800">Add New Favorite</h3>
        
        {/* Strain Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Strain *
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a strain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {searchTerm && filteredStrains.length > 0 && !selectedStrain && (
              <div className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredStrains.map((strain: Strain) => (
                  <div
                    key={strain.id}
                    className="p-3 hover:bg-gray-100 border-b last:border-b-0 flex items-center gap-3"
                  >
                    {strain.image_url && (
                      <img src={strain.image_url} alt={strain.strain_name} className="w-12 h-12 object-cover rounded" />
                    )}
                    <div className="flex-1">
                      <div className="font-semibold">{strain.strain_name}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowStrainInfo(strain);
                        }}
                        className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                        title="View strain details"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleStrainSelect(strain)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedStrain && (
            <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-sm text-green-800 font-medium">Selected: {selectedStrain.strain_name}</span>
            </div>
          )}
        </div>

        {/* Consumption Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Consumption Type
          </label>
          <select
            value={consumptionType}
            onChange={(e) => setConsumptionType(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white h-[52px]"
          >
            <option value="">Select consumption type...</option>
            {CONSUMPTION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Dispensary Search */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Dispensary
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a dispensary..."
              value={dispensarySearch}
              onChange={(e) => setDispensarySearch(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {searchingDispensary && (
              <div className="absolute right-3 top-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
              </div>
            )}
            {showDispensaryResults && dispensaryResults.length > 0 && (
              <div className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {dispensaryResults.map((place: Place) => (
                  <div
                    key={place.place_id}
                    onClick={() => handleDispensarySelect(place)}
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                  >
                    <div className="font-semibold">{place.name}</div>
                    <div className="text-sm text-gray-600">{place.formatted_address}</div>
                    {place.rating && (
                      <div className="text-sm text-yellow-600">★ {place.rating}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedStrain}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Add to Favorites
          </button>
        </div>
      </div>

      {/* Strain Info Popup */}
      {showStrainInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{showStrainInfo.strain_name}</h3>
              <button
                onClick={() => setShowStrainInfo(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {showStrainInfo.image_url && (
              <div className="mb-4">
                <img 
                  src={showStrainInfo.image_url} 
                  alt={showStrainInfo.strain_name} 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
            
            {showStrainInfo.description && (
              <div className="text-gray-700">
                <h4 className="font-semibold mb-2">Description:</h4>
                <p className="text-sm leading-relaxed">{showStrainInfo.description}</p>
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  if (showStrainInfo) {
                    handleStrainSelect(showStrainInfo);
                    setShowStrainInfo(null);
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Select This Strain
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 