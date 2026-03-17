'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useCalculatorStore } from '@/lib/store';
import { 
  formatINR, 
  CITY_MULTIPLIERS, 
  MaterialTier, 
  BOQItem 
} from '@/lib/budget-engine';
import styles from './calculator.module.css';

const TIER_SPECS = {
  essential: [
    "Commercial Grade BWR Ply (IS:303)",
    "Standard 0.8mm Laminate Finishes",
    "Basic Hardware (Ozone/Ebco)",
    "Asian Paints Tractor Emulsion",
    "Ceramic Tiling (Basic sizes)"
  ],
  premium: [
    "Century Ply / Greenply BWP (IS:710)",
    "Matte/High-Gloss Acrylic Finishes",
    "Soft-Close Hardware (Hettich/Hafele)",
    "Asian Paints Royal Luxe Finishes",
    "Vitrified Tiling (Premium sizes)"
  ],
  luxury: [
    "Full BWP Marine Ply + Charcoal Sheets",
    "PU High-Gloss / Exotic Veneer Finishes",
    "Elite Hardware (Blum/Hafele Premium)",
    "Italian Marble / Large Slabs Integration",
    "Full Automation & Smart Lighting Ready"
  ]
};

const EXCLUSIONS = [
  "Loose Furniture & Decor Items",
  "White Goods (Fridge, TV, etc.)",
  "Kitchen Appliances (Chimney/Hob)",
  "Post-Construction Deep Cleaning",
  "Structural Changes / Civil Demolition",
  "Society Deposits & Permission Fees",
  "Temporary Electrical Supply Costs",
  "Window Treatments (Curtains/Blinds)"
];

const BHK_IMAGES: Record<string, string> = {
  '1bhk': '/images/calculator/1bhk.png',
  '2bhk': '/images/calculator/2bhk.png',
  '3bhk': '/images/calculator/3bhk.png',
  '4bhk': '/images/calculator/3bhk.png',
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
    updateItemQuantity,
    setScope,
    setLocality,
    setFloorPlan,
    setPurpose,
    setKitchenConfig,
    setBathConfig
  } = useCalculatorStore();

  const [step, setStep] = useState(0); 
  const [mounted, setMounted] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    // Suggest city based on IP if possible
    const detectCity = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.city && CITY_MULTIPLIERS[data.city as keyof typeof CITY_MULTIPLIERS]) {
          setCity(data.city as any);
        }
      } catch (e) {}
    };
    detectCity();
  }, [setCity]);

  // AI Insight Fetcher
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
        setAiInsight(null); // Fallback to missing key message
      } finally {
        setIsAiLoading(false);
      }
    };

    const timer = setTimeout(fetchInsight, 2000);
    return () => clearTimeout(timer);
  }, [inputs.city, inputs.tier, inputs.propertyType, inputs.purpose, mounted]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFloorPlan(URL.createObjectURL(file));
      // Simulate AI analysis
      setIsAiLoading(true);
      setTimeout(() => setIsAiLoading(false), 3000);
    }
  };

  const dynamicStyles = {
    '--dynamic-accent': results.tierAesthetic.accentColor,
  } as React.CSSProperties;

  if (!mounted) return null;

  return (
    <main className={styles.page} style={dynamicStyles}>
      <Nav />
      
      <section className={styles.calculatorSection}>
        <div className="container">
          
          {/* --- LANDING / STEP 0 --- */}
          {step === 0 && (
            <div className={styles.stepContent}>
              <div className={styles.calcHeader}>
                <h1 className={styles.title}>Surgical Cost Engineering.</h1>
                <p className={styles.subtitle}>Our proprietary beMore engine calculates precise Bill of Quantities (BOQ) using 2026 Indian market benchmarks.</p>
              </div>
              <div className={styles.landingGrid}>
                <div className={styles.landingCard} onClick={() => { setScope('full'); setStep(1); }}>
                  <div className={styles.landingIcon}>🏢</div>
                  <h3 className={styles.landingTitle}>Full Residence</h3>
                  <p className={styles.landingDesc}>Complete architectural interiors with material itemization.</p>
                  <button className={styles.btnNext}>Get Full Estimate</button>
                </div>
                <div className={styles.landingCard} onClick={() => { setScope('kitchen'); setStep(1); }}>
                  <div className={styles.landingIcon}>🍳</div>
                  <h3 className={styles.landingTitle}>Modular Kitchen</h3>
                  <p className={styles.landingDesc}>Specialized kitchen engineering and finish selection.</p>
                  <button className={styles.btnNext}>Kitchen Only</button>
                </div>
              </div>
            </div>
          )}

          {step > 0 && (
            <div className={styles.calcGrid}>
              
              {/* --- INPUT AREA --- */}
              <div className={styles.inputPanel}>
                <div className={styles.stepper}>
                  {inputs.scope === 'kitchen' ? (
                    <>
                      <div className={`${styles.step} ${step === 1 ? styles.active : ''}`} onClick={() => setStep(1)}>1. Essentials</div>
                      <div className={`${styles.step} ${step === 2 ? styles.active : ''}`} onClick={() => setStep(2)}>2. Kitchen Shape</div>
                      <div className={`${styles.step} ${step === 3 ? styles.active : ''}`} onClick={() => setStep(3)}>3. Materials</div>
                      <div className={`${styles.step} ${step === 4 ? styles.active : ''}`} onClick={() => setStep(4)}>4. Accessories</div>
                      <div className={`${styles.step} ${step === 5 ? styles.active : ''}`} onClick={() => setStep(5)}>5. Summary</div>
                    </>
                  ) : (
                    <>
                      <div className={`${styles.step} ${step === 1 ? styles.active : ''}`} onClick={() => setStep(1)}>1. Essentials</div>
                      <div className={`${styles.step} ${step === 2 ? styles.active : ''}`} onClick={() => setStep(2)}>2. Space Scan</div>
                      <div className={`${styles.step} ${step === 3 ? styles.active : ''}`} onClick={() => setStep(3)}>3. Scope</div>
                      <div className={`${styles.step} ${step === 4 ? styles.active : ''}`} onClick={() => setStep(4)}>4. Quality</div>
                      <div className={`${styles.step} ${step === 5 ? styles.active : ''}`} onClick={() => setStep(5)}>5. Summary</div>
                    </>
                  )}
                </div>

                <div className={styles.inputContent}>
                  
                  {/* INITIAL ESSENTIALS (SHARED OR VARIED) */}
                  {step === 1 && (
                    <div className={styles.stepContent}>
                      <div className={styles.inputGroup}>
                        <label>Design Location</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                          <select value={inputs.city} onChange={(e) => setCity(e.target.value as any)}>
                            {Object.keys(CITY_MULTIPLIERS).map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <input 
                            type="text" placeholder="Locality (e.g. HSR)" 
                            value={inputs.locality} onChange={(e) => setLocality(e.target.value)}
                          />
                        </div>
                      </div>

                      {inputs.scope !== 'kitchen' && (
                        <>
                          <div className={styles.inputGroup}>
                            <label>Property Layout</label>
                            <div className={styles.pillGrid}>
                              {['1bhk', '2bhk', '3bhk', '4bhk', 'villa'].map(type => (
                                <button 
                                  key={type}
                                  className={`${styles.pill} ${inputs.propertyType === type ? styles.selected : ''}`}
                                  onClick={() => setPropertyType(type as any)}
                                >
                                  {type.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className={styles.inputGroup}>
                            <label>Carpet Area: {inputs.carpetArea} sq ft</label>
                            <input 
                              type="range" min="0" max="8000" step="50" 
                              value={inputs.carpetArea} onChange={(e) => setCarpetArea(parseInt(e.target.value))}
                            />
                            <p style={{ fontSize: '0.75rem', marginTop: '5px', color: 'var(--text-muted)' }}>Slide to {inputs.carpetArea === 0 ? 'start' : 'adjust area'}</p>
                          </div>
                        </>
                      )}

                      <div className={styles.navActions}>
                         <button className={styles.btnBack} onClick={() => setStep(0)}>← Home</button>
                         <button className={styles.btnNext} onClick={() => setStep(2)}>{inputs.scope === 'kitchen' ? 'Kitchen Shape →' : 'Space Mapping →'}</button>
                      </div>
                    </div>
                  )}

                  {/* KITCHEN SPECIFIC STEPS */}
                  {inputs.scope === 'kitchen' && (
                    <>
                      {step === 2 && (
                        <div className={styles.stepContent}>
                          <h2 className={styles.itemizedTitle}>Step 2: Kitchen Shape</h2>
                          <div className={styles.kitchenShapeGrid}>
                            {[
                              { 
                                id: 'l-shape', name: 'L-Shape', 
                                svg: (
                                  <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20 20 V80 H100" strokeLinecap="square" />
                                    <path d="M20 20 H35 V65 H100 V80 H20 Z" fill="currentColor" fillOpacity="0.05" />
                                    <line x1="20" y1="40" x2="35" y2="40" />
                                    <line x1="20" y1="60" x2="35" y2="60" />
                                    <line x1="55" y1="65" x2="55" y2="80" />
                                    <line x1="80" y1="65" x2="80" y2="80" />
                                    <text x="50" y="95" fontSize="8" fill="currentColor" opacity="0.5">WALL A + WALL B</text>
                                  </svg>
                                )
                              },
                              { 
                                id: 'u-shape', name: 'U-Shape', 
                                svg: (
                                  <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20 20 V80 H100 V20" strokeLinecap="square" />
                                    <path d="M20 20 H35 V65 H85 V20 H100 V80 H20 Z" fill="currentColor" fillOpacity="0.05" />
                                    <line x1="20" y1="40" x2="35" y2="40" />
                                    <line x1="85" y1="40" x2="100" y2="40" />
                                    <line x1="50" y1="65" x2="50" y2="80" />
                                    <text x="45" y="95" fontSize="8" fill="currentColor" opacity="0.5">TRIPLE WALL</text>
                                  </svg>
                                )
                              },
                              { 
                                id: 'parallel', name: 'Parallel', 
                                svg: (
                                  <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20 20 V80 M100 20 V80" strokeLinecap="square" />
                                    <rect x="20" y="20" width="15" height="60" fill="currentColor" fillOpacity="0.05" />
                                    <rect x="85" y="20" width="15" height="60" fill="currentColor" fillOpacity="0.05" />
                                    <line x1="20" y1="40" x2="35" y2="40" />
                                    <line x1="20" y1="60" x2="35" y2="60" />
                                    <line x1="85" y1="40" x2="100" y2="40" />
                                    <line x1="85" y1="60" x2="100" y2="60" />
                                    <text x="40" y="55" fontSize="8" fill="currentColor" opacity="0.5">PARALLEL</text>
                                  </svg>
                                )
                              },
                              { 
                                id: 'straight', name: 'Straight', 
                                svg: (
                                  <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M10 50 H110" strokeLinecap="square" />
                                    <rect x="10" y="35" width="100" height="15" fill="currentColor" fillOpacity="0.05" />
                                    <line x1="30" y1="35" x2="30" y2="50" />
                                    <line x1="60" y1="35" x2="60" y2="50" />
                                    <line x1="90" y1="35" x2="90" y2="50" />
                                    <text x="40" y="65" fontSize="8" fill="currentColor" opacity="0.5">SINGLE WALL</text>
                                  </svg>
                                )
                              }
                            ].map(layout => (
                              <div 
                                key={layout.id} 
                                className={`${styles.shapeCard} ${inputs.kitchenLayout === layout.id ? styles.shapeSelected : ''}`}
                                onClick={() => setKitchenConfig({ kitchenLayout: layout.id as any })}
                              >
                                <div className={styles.shapeIcon}>{layout.svg}</div>
                                <div className={styles.shapeRadio}>
                                  <div className={styles.radioDot} />
                                  <span>{layout.name}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div style={{ marginTop: '2.5rem' }}>
                            <div className={styles.dimensionRow}>
                              <label>Wall A</label>
                              <div className={styles.dimInputs}>
                                <select value={inputs.kitchenWallAFeet} onChange={(e) => setKitchenConfig({ kitchenWallAFeet: parseInt(e.target.value) })}>
                                  {[...Array(31)].map((_, i) => <option key={i} value={i}>{i} Feet</option>)}
                                </select>
                                <select value={inputs.kitchenWallAInches} onChange={(e) => setKitchenConfig({ kitchenWallAInches: parseInt(e.target.value) })}>
                                  {[...Array(12)].map((_, i) => <option key={i} value={i}>{i} Inch</option>)}
                                </select>
                              </div>
                            </div>
                            <div className={styles.dimensionRow} style={{ marginTop: '1rem' }}>
                              <label>Wall B</label>
                              <div className={styles.dimInputs}>
                                <select value={inputs.kitchenWallBFeet} onChange={(e) => setKitchenConfig({ kitchenWallBFeet: parseInt(e.target.value) })}>
                                  {[...Array(31)].map((_, i) => <option key={i} value={i}>{i} Feet</option>)}
                                </select>
                                <select value={inputs.kitchenWallBInches} onChange={(e) => setKitchenConfig({ kitchenWallBInches: parseInt(e.target.value) })}>
                                  {[...Array(12)].map((_, i) => <option key={i} value={i}>{i} Inch</option>)}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className={styles.navActions}>
                            <button className={styles.btnBack} onClick={() => setStep(1)}>← Back</button>
                            <button className={styles.btnNext} onClick={() => setStep(3)}>Materials →</button>
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className={styles.stepContent}>
                          <div className={styles.inputGroup}>
                            <label>Step 3: Cabinet Material</label>
                            <select value={inputs.kitchenHardware} onChange={(e) => setKitchenConfig({ kitchenHardware: e.target.value as any })}>
                              <option value="basic">Standard BWR Ply (IS:303)</option>
                              <option value="soft-close" selected>BWP Marine Ply (IS:710)</option>
                              <option value="premium-blum">HDHMR Advanced (Moisture Resistant)</option>
                            </select>
                          </div>

                          <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
                            <label>Step 4: Shutter Material & Finish</label>
                            <select value={inputs.kitchenShutter} onChange={(e) => setKitchenConfig({ kitchenShutter: e.target.value as any })}>
                              <option value="laminate">Particle Board Matte Laminate</option>
                              <option value="acrylic">High-Gloss Acrylic</option>
                              <option value="glass-ceramic">Soft-Touch Glass Ceramic</option>
                            </select>
                          </div>

                          <div className={styles.navActions}>
                            <button className={styles.btnBack} onClick={() => setStep(2)}>← Back</button>
                            <button className={styles.btnNext} onClick={() => setStep(4)}>Accessories →</button>
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div className={styles.stepContent}>
                          <div className={styles.accHeader}>
                            <h2 className={styles.itemizedTitle} style={{ marginBottom: 0 }}>Step 6 : Accessories</h2>
                            <div className={styles.accNav}>
                               <span>&lt;</span>
                               <span style={{ color: 'var(--gold)' }}>&gt;</span>
                            </div>
                          </div>
                          <div className={styles.accessoryGrid}>
                            {[
                              { 
                                id: 'detergent_holder', name: 'Detergent holder & bin holder designs', 
                                svg: (
                                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                                    <circle cx="50" cy="50" r="30" strokeOpacity="0.2" />
                                    <rect x="35" y="35" width="30" height="30" rx="2" />
                                    <line x1="35" y1="45" x2="65" y2="45" />
                                    <line x1="35" y1="55" x2="65" y2="55" />
                                    <path d="M45 65 V75 M55 65 V75" strokeWidth="2" strokeLinecap="round" />
                                  </svg>
                                )
                              },
                              { 
                                id: 'detergent_350', name: 'Detergent holder (350mm) designs', 
                                svg: (
                                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                                    <rect x="30" y="20" width="40" height="60" rx="2" />
                                    <line x1="30" y1="40" x2="70" y2="40" />
                                    <line x1="30" y1="60" x2="70" y2="60" />
                                    <circle cx="50" cy="30" r="5" fill="currentColor" fillOpacity="0.1" />
                                  </svg>
                                )
                              },
                              { 
                                id: 'cutlery_tray', name: 'Cutlery cup & saucer thali tray designs', 
                                svg: (
                                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                                    <rect x="20" y="30" width="60" height="40" rx="2" />
                                    <line x1="35" y1="30" x2="35" y2="70" />
                                    <line x1="50" y1="30" x2="50" y2="70" />
                                    <line x1="65" y1="30" x2="65" y2="70" />
                                    <circle cx="27" cy="50" r="3" />
                                    <circle cx="42" cy="50" r="3" />
                                  </svg>
                                )
                              },
                              { 
                                id: 'bottle_pullout', name: 'Bottle pull-out (300mm soft-close)', 
                                svg: (
                                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                                    <rect x="35" y="15" width="30" height="70" rx="1" />
                                    <line x1="35" y1="35" x2="65" y2="35" />
                                    <line x1="35" y1="60" x2="65" y2="60" />
                                    <path d="M40 20 V30 M50 20 V30 M60 20 V30" />
                                    <rect x="40" y="65" width="20" height="15" opacity="0.2" fill="currentColor" />
                                  </svg>
                                )
                              }
                            ].map(acc => (
                              <div key={acc.id} className={styles.accCard}>
                                <div className={styles.accVisual}>{acc.svg}</div>
                                <p>{acc.name}</p>
                                <div className={styles.accCounter}>
                                  <button onClick={() => {
                                    const current = inputs.kitchenAccessories?.[acc.id] || 0;
                                    setKitchenConfig({ kitchenAccessories: { ...inputs.kitchenAccessories, [acc.id]: Math.max(0, current - 1) } });
                                  }}>−</button>
                                  <span>{inputs.kitchenAccessories?.[acc.id] || 0}</span>
                                  <button onClick={() => {
                                    const current = inputs.kitchenAccessories?.[acc.id] || 0;
                                    setKitchenConfig({ kitchenAccessories: { ...inputs.kitchenAccessories, [acc.id]: current + 1 } });
                                  }}>+</button>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className={styles.navActions}>
                            <button className={styles.btnBack} onClick={() => setStep(3)}>← Back</button>
                            <button className={styles.btnNext} onClick={() => setStep(5)}>Summary →</button>
                          </div>
                        </div>
                      )}

                      {step === 5 && (
                        <div className={styles.stepContent}>
                          <h2 className={styles.itemizedTitle}>Kitchen Summary</h2>
                          {/* Reuse existing summary logic but tailored */}
                          <div className={styles.summaryBox}>
                            <div style={{ marginBottom: '20px' }}>
                              <span className={styles.aiTag}>SURGICAL BREAKDOWN</span>
                              <div style={{ marginTop: '10px', fontSize: '1.4rem', fontWeight: 600 }}>Modular Kitchen: {inputs.kitchenLayout?.toUpperCase()}</div>
                              <div style={{ color: 'var(--text-muted)' }}>Dimensions: {inputs.kitchenWallAFeet}'x{inputs.kitchenWallAInches}" + {inputs.kitchenWallBFeet}'x{inputs.kitchenWallBInches}"</div>
                            </div>
                            <button className={styles.btnNext} style={{ width: '100%' }} onClick={() => setShowLeadModal(true)}>
                              Unlock Material Audit (PDF)
                            </button>
                          </div>
                          <div className={styles.navActions}>
                            <button className={styles.btnBack} onClick={() => setStep(4)}>← Back</button>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* FULL SCOPE STEPS (ORIGINAL) */}
                  {inputs.scope === 'full' && (
                    <>
                      {/* STEP 2: FLOOR PLAN AI */}
                      {step === 2 && (
                        <div className={styles.stepContent}>
                          <h2 className={styles.itemizedTitle}>AI Space Mapping</h2>
                          <div className={styles.uploadSection}>
                            <input type="file" accept="image/*" ref={fileInputRef} className={styles.fileInput} onChange={handleFileUpload} />
                            <div className={styles.uploadLabel} onClick={() => fileInputRef.current?.click()}>
                              {inputs.floorPlan ? (
                                <img src={inputs.floorPlan as string} className={styles.planPreview} alt="Uploaded Plan" />
                              ) : (
                                <strong>Drop blueprint here or click to upload</strong>
                              )}
                            </div>
                          </div>
                          <div className={styles.navActions}>
                            <button className={styles.btnBack} onClick={() => setStep(1)}>← Back</button>
                            <button className={styles.btnNext} onClick={() => setStep(3)}>Verify Scope →</button>
                          </div>
                        </div>
                      )}

                      {/* STEP 3: SCOPE REVIEW */}
                      {step === 3 && (
                        <div className={styles.stepContent}>
                          <h2 className={styles.itemizedTitle}>Precision Scope Review</h2>
                          <div className={styles.itemGroup}>
                            {inputs.items.map(item => (
                              <div key={item.id} className={styles.itemRow}>
                                <div className={styles.itemInfo}>
                                  <strong>{item.name}</strong>
                                  <span>{item.room}</span>
                                </div>
                                <div className={styles.itemControl}>
                                  <input type="number" value={item.quantity} onChange={(e) => updateItemQuantity(item.id, parseFloat(e.target.value) || 0)} />
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className={styles.navActions}>
                            <button className={styles.btnBack} onClick={() => setStep(2)}>← Back</button>
                            <button className={styles.btnNext} onClick={() => setStep(4)}>Quality →</button>
                          </div>
                        </div>
                      )}

                      {/* STEP 4: QUALITY */}
                      {step === 4 && (
                        <div className={styles.stepContent}>
                          <h2 className={styles.itemizedTitle}>Select Design Quality</h2>
                          <div className={styles.tierGrid}>
                            {(['essential', 'premium', 'luxury'] as MaterialTier[]).map(t => (
                              <div key={t} className={`${styles.tierCard} ${inputs.tier === t ? styles.tierSelected : ''}`} onClick={() => setTier(t)}>
                                <h3>{t.toUpperCase()}</h3>
                                <ul className={styles.tierList}>
                                  {TIER_SPECS[t].map((s, i) => <li key={i}>{s}</li>)}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className={styles.navActions}>
                            <button className={styles.btnBack} onClick={() => setStep(3)}>← Back</button>
                            <button className={styles.btnNext} onClick={() => setStep(5)}>Final Summary →</button>
                          </div>
                        </div>
                      )}

                      {/* STEP 5: FINAL SUMMARY */}
                      {step === 5 && (
                        <div className={styles.stepContent}>
                          <h2 className={styles.itemizedTitle}>Investment Overview</h2>
                          <div className={styles.summaryBox}>
                            <button className={styles.btnNext} style={{ width: '100%' }} onClick={() => setShowLeadModal(true)}>Unlock Detailed BOQ Breakdown</button>
                          </div>
                          <div className={styles.navActions}>
                            <button className={styles.btnBack} onClick={() => setStep(4)}>← Back</button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* --- RESULTS PANEL (STICKY) --- */}
              <div className={styles.resultDisplay}>
                <span className={styles.totalLabel}>Estimate Overview</span>
                <h2 className={styles.totalValue}>{formatINR(results.grandTotal)}</h2>
                <span className={styles.feeNote}>Includes {inputs.designerFeePercent}% Design Fee + 18% GST</span>

                <div className={styles.aiInsight}>
                  <div className={styles.aiTitle}>✦ BE-MORE AI INSIGHT</div>
                  <div className={styles.aiText}>
                    {isAiLoading ? (
                      <span style={{ opacity: 0.6 }}>Benchmarking costs...</span>
                    ) : aiInsight ? (
                      aiInsight
                    ) : (
                      <div style={{ fontSize: '0.8rem' }}>
                        <p style={{ color: 'var(--gold)', fontWeight: 700 }}>Gemini API key is missing.</p>
                        <p style={{ marginTop: '5px', opacity: 0.8 }}>Add <code>GEMINI_API_KEY</code> to your <code>.env</code> file to enable professional architect insights.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                   <button 
                    className={styles.btnNext} 
                    style={{ width: '100%', background: '#25D366' }}
                    onClick={() => window.open(`https://wa.me/?text=I%20got%20an%20interior%20estimate%20on%20beMore%3A%20${formatINR(results.grandTotal)}`)}
                   >
                     Discuss on WhatsApp
                   </button>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

      {showLeadModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#FFF', padding: '3rem', borderRadius: '2rem', maxWidth: '450px', width: '90%', position: 'relative' }}>
            <button 
              style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
              onClick={() => setShowLeadModal(false)}
            >✕</button>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>Unlock BOQ Audit</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Enter your contact details to download the precise material specifications and price list.</p>
            <form onSubmit={(e) => { e.preventDefault(); setShowLeadModal(false); }}>
              <div className={styles.inputGroup}><label>Name</label><input type="text" required /></div>
              <div className={styles.inputGroup}><label>WhatsApp No.</label><input type="tel" required /></div>
              <button className={styles.btnNext} style={{ width: '100%', marginTop: '1rem' }}>Get BOQ Now</button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
