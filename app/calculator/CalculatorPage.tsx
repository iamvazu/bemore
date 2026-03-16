'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useCalculatorStore } from '@/lib/store';
import { formatINR, CITY_MULTIPLIERS, MaterialTier } from '@/lib/budget-engine';
import styles from './calculator.module.css';

const TIER_SPECS = {
  essential: [
    "Commercial Grade BWR Ply",
    "Standard Laminate Finishes",
    "Basic Hardware (Ozone/Ebco)",
    "Standard Emulsion Paint",
    "Functional Lighting Layout"
  ],
  premium: [
    "Greenply Club / Century Ply (BWP)",
    "Matte/High-Gloss Acrylic Finishes",
    "Soft-Close Hardware (Hettich/Hafele)",
    "Royal / Lustre Wall Finishes",
    "Strategic False Ceiling & Cove Lighting"
  ],
  luxury: [
    "Full BWP Marine Ply + Charcoal Sheets",
    "PU High-Gloss / Exotic Veneer Finishes",
    "Elite Hardware (Blum/Hafele Premium)",
    "Venetian Plaster / Customized Wall Art",
    "Full Automation & Smart Lighting Integration"
  ]
};

const EXCLUSIONS = [
  "Loose Furniture & Decor",
  "White Goods & Kitchen Appliances",
  "Chimney & Hob Installation",
  "Deep Cleaning Services",
  "Structural Changes / Demolition",
  "Society Deposits & Permissions"
];

const BHK_IMAGES: Record<string, string> = {
  '1bhk': '/images/calculator/1bhk.png',
  '2bhk': '/images/calculator/2bhk.png',
  '3bhk': '/images/calculator/3bhk.png',
  '4bhk': '/images/calculator/3bhk.png',
  '5bhk': '/images/calculator/3bhk.png',
  'villa': '/images/calculator/3bhk.png',
};

export default function BudgetEstimatorPage() {
  const { 
    inputs, 
    results, 
    setCity,
    setPropertyType,
    setTier,
    setCarpetArea,
    setIncludeCivil,
    updateItemQuantity,
    setScope,
    setKitchenConfig,
    setBathConfig,
    setLocality,
    setProjectType,
    setFloorPlan,
    setPurpose
  } = useCalculatorStore();

  const [step, setStep] = useState(0); // Start at 0 for HomeLane landing
  const [isGated, setIsGated] = useState(true);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initial Location Detection
    const fastDetect = async () => {
      try {
        const ipRes = await fetch('https://ipapi.co/json/');
        const ipData = await ipRes.json();
        if (ipData.city) setCity(ipData.city === 'Bengaluru' ? 'Bangalore' : ipData.city);
      } catch (e) {}
    };
    fastDetect();
  }, [setCity]);

  const detectHighPrecision = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14`);
        const data = await res.json();
        if (data.address) {
          const area = data.address.suburb || data.address.neighbourhood || data.address.residential || data.address.locality || '';
          const city = data.address.city || data.address.town || 'Bangalore';
          setCity(city === 'Bengaluru' ? 'Bangalore' : city);
          setLocality(area);
        }
      }, (err) => console.log("GPS denied"), { timeout: 5000 });
    }
  };

  // AI Insight Fetching
  useEffect(() => {
    if (!mounted) return;
    const fetchInsight = async () => {
      setIsAiLoading(true);
      try {
        const response = await fetch('/api/ai-insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ context: 'budget', inputs, results }),
        });
        const data = await response.json();
        setAiInsight(data.insight);
      } catch (err) {
        setAiInsight(`For a ${inputs.propertyType.toUpperCase()} in ${inputs.city}, the ${results.tierAesthetic.label} profile is highly efficient.`);
      } finally {
        setIsAiLoading(false);
      }
    };

    const timer = setTimeout(fetchInsight, 1500);
    return () => clearTimeout(timer);
  }, [inputs.city, inputs.tier, inputs.propertyType, mounted, inputs.scope]);

  const chartData = useMemo(() => 
    Object.entries(results.roomTotals).map(([name, value]) => ({ name, value })),
    [results.roomTotals]
  );

  const COLORS = ['#C4922A', '#1A1712', '#5C4B38', '#8A8274', '#D4AF37', '#2C1A0A'];

  const handleWhatsAppShare = () => {
    const text = `I just estimated my home interior budget with beMore! 🏠✨%0A%0AProperty: ${inputs.propertyType.toUpperCase()} in ${inputs.city}%0AEstimate: ${formatINR(results.grandTotal)}`;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGated(false);
    setShowLeadModal(false);
  };

  const dynamicStyles = {
    '--dynamic-bg': results.tierAesthetic.bgColor,
    '--dynamic-accent': results.tierAesthetic.accentColor,
  } as React.CSSProperties;

  if (!mounted) return null;

  return (
    <main className={styles.page} style={dynamicStyles}>
      <Nav />
      
      <section className={styles.calculatorSection}>
        <div className="container">
          {/* --- LANDING SCREEN (Step 0) --- */}
          {step === 0 && (
            <div className={styles.stepContent}>
              <div className={styles.calcHeader}>
                <h1>Get an estimate for your Home.</h1>
                <p className={styles.subtitle}>Calculate the cost of doing up your home interiors now with beMore AI.</p>
              </div>
              <div className={styles.landingGrid}>
                <div className={styles.landingCard} onClick={() => { setScope('full'); setStep(1); }}>
                  <div className={styles.landingIcon}>🏠</div>
                  <h3>Full Home Interiors</h3>
                  <p>Get the estimate price for your full home interiors.</p>
                  <button className={styles.nextBtn}>Get Free Estimate</button>
                </div>
                <div className={styles.landingCard} onClick={() => { setScope('kitchen'); setStep(1); }}>
                  <div className={styles.landingIcon}>🍳</div>
                  <h3>Kitchen Only</h3>
                  <p>Get costing for your specialized kitchen interiors.</p>
                  <button className={styles.nextBtn}>Get Free Estimate</button>
                </div>
              </div>
            </div>
          )}

          {step > 0 && (
            <div className={styles.calcGrid}>
              <div className={styles.inputPanel}>
                <div className={styles.stepper}>
                  <div className={`${styles.step} ${step === 1 ? styles.active : ''}`} onClick={() => setStep(1)}>1. Essentials</div>
                  <div className={`${styles.step} ${step === 2 ? styles.active : ''}`} onClick={() => setStep(2)}>2. Floor Plan</div>
                  <div className={`${styles.step} ${step === 3 ? styles.active : ''}`} onClick={() => setStep(3)}>3. Materials</div>
                  <div className={`${styles.step} ${step === 4 ? styles.active : ''}`} onClick={() => setStep(4)}>4. Summary</div>
                </div>

                <div className={styles.inputContent}>
                  {/* --- STEP 1: HOME PREFERENCES (HOMELANE STYLE) --- */}
                  {step === 1 && (
                    <div className={styles.stepContent}>
                      <div className={styles.calcHeader} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.4rem' }}>Get your free estimate in <span style={{ color: '#E41D2C' }}>under 30 seconds!</span></h2>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Share your preferences for an accurate estimate</p>
                        <p style={{ marginTop: '5px', fontSize: '0.75rem', fontWeight: 600 }}>STEP 1 OF 4</p>
                      </div>

                      <div className={styles.step1Layout}>
                        <div className={styles.formArea}>
                          <div className={styles.inputGroup}>
                            <label>City & Locality</label>
                            <div className={styles.splitInput}>
                              <select value={inputs.city} onChange={(e) => setCity(e.target.value as any)}>
                                {Object.keys(CITY_MULTIPLIERS).map(c => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                              <div className={styles.localityWrapper}>
                                <input 
                                  type="text" 
                                  placeholder="Area (e.g. Indiranagar)" 
                                  value={inputs.locality || ''}
                                  onChange={(e) => setLocality(e.target.value)}
                                />
                                <button className={styles.locateBtn} onClick={detectHighPrecision} title="Detect Location">📍</button>
                              </div>
                            </div>
                          </div>

                          <div className={styles.inputGroup}>
                            <label>Your floorplan</label>
                            <div className={styles.pillGrid}>
                              {['1bhk', '2bhk', '3bhk', '4bhk'].map(type => (
                                <button 
                                  key={type}
                                  className={`${styles.pill} ${inputs.propertyType === type ? styles.selected : ''}`}
                                  onClick={() => setPropertyType(type as any)}
                                >
                                  {type.toUpperCase()}
                                </button>
                              ))}
                              <button 
                                className={`${styles.pill} ${inputs.propertyType === 'villa' ? styles.selected : ''}`}
                                onClick={() => setPropertyType('villa')}
                              >
                                VILLA
                              </button>
                            </div>
                          </div>

                          <div className={styles.inputGroup}>
                            <label>Purpose</label>
                            <div className={styles.pillGrid}>
                              {[
                                { id: 'move-in', label: 'Move In' },
                                { id: 'rent-out', label: 'Rent Out' },
                                { id: 'renovate', label: 'Renovate' }
                              ].map(p => (
                                <button 
                                  key={p.id}
                                  className={`${styles.pill} ${inputs.purpose === p.id ? styles.selected : ''}`}
                                  onClick={() => setPurpose(p.id as any)}
                                >
                                  {p.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {inputs.scope === 'full' && (
                            <div className={styles.inputGroup}>
                              <label>Approx. Area: {inputs.carpetArea} sq ft</label>
                              <input 
                                type="range" min="400" max="8000" step="100" 
                                value={inputs.carpetArea} 
                                onChange={(e) => setCarpetArea(parseInt(e.target.value))}
                              />
                            </div>
                          )}
                        </div>

                        <div className={styles.visualArea}>
                          <img 
                            key={inputs.propertyType}
                            src={BHK_IMAGES[inputs.propertyType] || BHK_IMAGES['3bhk']} 
                            alt={`${inputs.propertyType} floorplan`} 
                          />
                          <div className={styles.visualNote}>beMore Design Simulation</div>
                        </div>
                      </div>

                      <div className={styles.navActions}>
                        <button className={styles.backBtn} onClick={() => setStep(0)}>← Back</button>
                        <button className={styles.nextBtn} onClick={() => setStep(2)}>Next: Floor Plan Mapping →</button>
                      </div>
                    </div>
                  )}

                  {/* --- STEP 2: FLOOR PLAN MAPPING --- */}
                  {step === 2 && (
                    <div className={styles.stepContent}>
                      <h4 className={styles.sectionTitle}>Precision Space Mapping</h4>
                      <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>We've auto-populated quantities based on your {inputs.propertyType.toUpperCase()} selection.</p>
                      
                      <div className={styles.itemizedList}>
                        {inputs.items.map(item => (
                          <div key={item.id} className={styles.itemRow}>
                            <div className={styles.itemInfo}>
                              <strong>{item.name}</strong>
                              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{item.room} • {item.unit}</span>
                            </div>
                            <div className={styles.itemControl}>
                              <input 
                                type="number" 
                                value={item.quantity} 
                                onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value) || 0)}
                                style={{ width: '60px', padding: '8px', textAlign: 'center' }}
                              />
                              <span className={styles.unitLabel}>{item.unit}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className={styles.navActions}>
                        <button className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
                        <button className={styles.nextBtn} onClick={() => setStep(3)}>Next: Material Tier →</button>
                      </div>
                    </div>
                  )}

                  {/* --- STEP 3: MATERIALS --- */}
                  {step === 3 && (
                    <div className={styles.stepContent}>
                      <h4 className={styles.sectionTitle}>Select Quality Philosophy</h4>
                      <div className={styles.tierSelection}>
                        {(['essential', 'premium', 'luxury'] as MaterialTier[]).map(t => (
                          <div 
                            key={t}
                            className={`${styles.tierCard} ${inputs.tier === t ? styles.tierSelected : ''}`}
                            onClick={() => setTier(t)}
                          >
                            <div className={styles.tierHeader}>
                              <h3>{t.charAt(0).toUpperCase() + t.slice(1)}</h3>
                            </div>
                            <ul className={styles.tierList}>
                              {TIER_SPECS[t].map((s, i) => <li key={i} style={{ fontSize: '0.8rem', marginBottom: '4px' }}>• {s}</li>)}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className={styles.navActions}>
                        <button className={styles.backBtn} onClick={() => setStep(2)}>← Back</button>
                        <button className={styles.nextBtn} onClick={() => setStep(4)}>Review Estimate →</button>
                      </div>
                    </div>
                  )}

                  {/* --- STEP 4: SUMMARY --- */}
                  {step === 4 && (
                    <div className={styles.stepContent}>
                      <div className={styles.summaryWrap}>
                        <h4 className={styles.sectionTitle}>Project Final Review</h4>
                        <div className={styles.exclusions}>
                          <h5>Standard Exclusions:</h5>
                          <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            {EXCLUSIONS.map((e, i) => <li key={i} style={{ fontSize: '0.75rem' }}>• {e}</li>)}
                          </ul>
                        </div>
                        
                        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Based on your <strong>{inputs.purpose.toUpperCase()}</strong> goal for a <strong>{inputs.propertyType.toUpperCase()}</strong>.
                          </p>
                          <button className={styles.nextBtn} style={{ width: '100%' }} onClick={() => setShowLeadModal(true)}>
                            Unlock Detailed BOQ PDF →
                          </button>
                        </div>
                      </div>
                      <div className={styles.navActions}>
                        <button className={styles.backBtn} onClick={() => setStep(3)}>← Back</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* --- RESULTS PANEL (ALWAYS VISIBLE AFTER LANDING) --- */}
              <div className={styles.resultsPanel}>
                <div className={styles.resultDisplay}>
                  <div className={styles.totalDisplay}>
                    <span className={styles.totalLabel}>Investment Estimate</span>
                    <h2 className={styles.totalValue}>{formatINR(results.grandTotal)}</h2>
                    <p style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '10px' }}>Includes {inputs.designerFeePercent}% fee & 18% GST</p>
                  </div>

                  <div className={styles.aiInsightsMock} style={{ marginTop: '2rem', padding: '15px', background: 'rgba(196,146,42,0.05)', borderRadius: '12px' }}>
                    <div className={styles.aiHeader} style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '8px' }}>
                      ✦ BE-MORE AI INSIGHT
                    </div>
                    <div className={styles.aiText} style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
                      {isAiLoading ? "Syncing benchmarks..." : aiInsight}
                    </div>
                  </div>

                  <div className={styles.chartActions} style={{ marginTop: '1.5rem' }}>
                    <button className={styles.nextBtn} style={{ width: '100%', padding: '12px' }} onClick={handleWhatsAppShare}>
                      Get Quote on WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {showLeadModal && (
        <div className={styles.modalOverlay} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className={styles.modal} style={{ background: '#FFF', padding: '2rem', borderRadius: '1.5rem', maxWidth: '400px', width: '90%', position: 'relative' }}>
            <button style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer' }} onClick={() => setShowLeadModal(false)}>✕</button>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Download BOQ</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Enter your details to receive the precise material breakdown.</p>
            <form onSubmit={handleLeadSubmit}>
              <div className={styles.inputGroup}><label>Name</label><input type="text" required placeholder="John Doe" /></div>
              <div className={styles.inputGroup}><label>WhatsApp</label><input type="tel" required placeholder="+91 90000 00000" /></div>
              <button type="submit" className={styles.nextBtn} style={{ width: '100%', marginTop: '1rem' }}>Get BOQ Now</button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
