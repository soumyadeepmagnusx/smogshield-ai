import React, { useState } from 'react';
import {
  Users,
  X,
  HeartPulse,
  Save,
} from 'lucide-react';
import { FamilyProfile, HousingType, InsulationLevel, CookingFuel, HeatingType, CommuteMode } from '../types';

interface FamilyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FamilyProfile;
  onSaveProfile: (updated: FamilyProfile) => void;
}

export const FamilyProfileModal: React.FC<FamilyProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<FamilyProfile>(profile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
    >
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl my-8 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Users className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h2 id="profile-modal-title" className="text-base font-bold text-white">
                Household & Family Vulnerability Profile
              </h2>
              <p className="text-[11px] text-slate-400">
                Grounds GenAI advice in your dwelling insulation, commute habits, and medical vulnerabilities.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Section 1: Household Name & Member Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="profile-family-name" className="text-slate-300 font-semibold block mb-1">
                Family / Household Identifier:
              </label>
              <input
                id="profile-family-name"
                type="text"
                required
                value={formData.familyName}
                onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="profile-member-count" className="text-slate-300 font-semibold block mb-1">
                Total Household Members:
              </label>
              <input
                id="profile-member-count"
                type="number"
                min="1"
                max="15"
                value={formData.memberCount}
                onChange={(e) =>
                  setFormData({ ...formData, memberCount: parseInt(e.target.value) || 1 })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Section 2: Health Vulnerabilities Checklist */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5" /> High-Risk Member Toggles (Weightings Applied to Exposure Dose)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                { key: 'hasAsthmaOrRespiratory', label: 'Asthma / COPD / Chronic Bronchitis' },
                { key: 'hasInfantsOrToddlers', label: 'Infants or Toddlers (0-4 years)' },
                { key: 'hasElderlyMembers', label: 'Elderly Household Members (65+)' },
                { key: 'hasCardiovascularCondition', label: 'Cardiovascular / Hypertension Risk' },
                { key: 'hasOutdoorWorkers', label: 'Outdoor / Field Worker Member' },
                { key: 'hasPets', label: 'Household Pets (Dogs/Cats susceptible to PM)' },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center space-x-2 text-slate-300 hover:text-white cursor-pointer select-none p-1.5 rounded hover:bg-slate-900"
                >
                  <input
                    type="checkbox"
                    checked={formData[item.key as keyof FamilyProfile] as boolean}
                    onChange={(e) =>
                      setFormData({ ...formData, [item.key]: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-900"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 3: Housing & Insulation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="profile-housing-type" className="text-slate-300 font-semibold block mb-1">Dwelling Type:</label>
              <select
                id="profile-housing-type"
                value={formData.housingType}
                onChange={(e) =>
                  setFormData({ ...formData, housingType: e.target.value as HousingType })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="APARTMENT_HIGH_RISE">High-Rise Apartment (Floor 5+)</option>
                <option value="APARTMENT_GROUND">Ground Floor / Low-Rise Apartment</option>
                <option value="STANDALONE_HOUSE">Standalone House / Villa</option>
              </select>
            </div>

            <div>
              <label htmlFor="profile-insulation-level" className="text-slate-300 font-semibold block mb-1">
                Window & Sash Insulation:
              </label>
              <select
                id="profile-insulation-level"
                value={formData.insulationLevel}
                onChange={(e) =>
                  setFormData({ ...formData, insulationLevel: e.target.value as InsulationLevel })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="POOR">Poor (Drafty single-pane, unsealed perimeter)</option>
                <option value="MODERATE">Moderate (Standard weatherstripped windows)</option>
                <option value="HERMETIC_WEATHERSTRIPPED">Hermetic (Double-glazed airtight seal)</option>
              </select>
            </div>
          </div>

          {/* Section 4: Heating & Cooking Energy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="profile-cooking-fuel" className="text-slate-300 font-semibold block mb-1">
                Primary Cooking Method:
              </label>
              <select
                id="profile-cooking-fuel"
                value={formData.cookingFuel}
                onChange={(e) =>
                  setFormData({ ...formData, cookingFuel: e.target.value as CookingFuel })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="GAS">Gas / LPG Stovetop (Produces NO2 & ultrafine PM)</option>
                <option value="ELECTRIC_INDUCTION">Electric Induction Cooktop (Zero indoor combustion)</option>
                <option value="BIOMASS_WOOD">Biomass / Chulha / Solid Fuel</option>
              </select>
            </div>

            <div>
              <label htmlFor="profile-heating-type" className="text-slate-300 font-semibold block mb-1">
                Primary Winter Space Heating:
              </label>
              <select
                id="profile-heating-type"
                value={formData.heatingType}
                onChange={(e) =>
                  setFormData({ ...formData, heatingType: e.target.value as HeatingType })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="CENTRAL_GAS">Central Radiator / Gas Furnace</option>
                <option value="ELECTRIC_HEAT_PUMP">Inverter Electric Heat Pump</option>
                <option value="SPACE_HEATER">Ceramic / Oil Space Heater</option>
                <option value="FIREPLACE_WOOD">Wood Fireplace / Stove (High local PM)</option>
              </select>
            </div>
          </div>

          {/* Section 5: Commute Mode & Air Purifiers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="profile-commute-mode" className="text-slate-300 font-semibold block mb-1">
                Daily Commute Mode:
              </label>
              <select
                id="profile-commute-mode"
                value={formData.commuteMode}
                onChange={(e) =>
                  setFormData({ ...formData, commuteMode: e.target.value as CommuteMode })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="GAS_CAR_SOLO">Solo Gasoline/Diesel Car</option>
                <option value="CARPOOL">Carpool / Shared Vehicle</option>
                <option value="PUBLIC_TRANSIT">Public Transit (Metro / Electric Bus)</option>
                <option value="ELECTRIC_VEHICLE">Electric Vehicle (EV)</option>
                <option value="WALK_CYCLE">Walking / Bicycle</option>
              </select>
            </div>

            <div className="flex flex-col justify-center space-y-2 pt-2">
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasDiyAirPurifier}
                  onChange={(e) =>
                    setFormData({ ...formData, hasDiyAirPurifier: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-slate-700 text-emerald-500 bg-slate-900"
                />
                <span>Active DIY Corsi-Rosenthal Box Running</span>
              </label>

              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasCommercialHepa}
                  onChange={(e) =>
                    setFormData({ ...formData, hasCommercialHepa: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-slate-700 text-emerald-500 bg-slate-900"
                />
                <span>Active Commercial HEPA Purifier Running</span>
              </label>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-emerald-950/40 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save & Recalculate Direct Impact</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
