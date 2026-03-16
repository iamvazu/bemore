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
import { useSearchParams } from 'next/navigation';
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
    setFloorPlan
  } = useCalculatorStore();

  const [step, setStep] = useState(1);
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
        setAiInsight(`For a ${inputs.propertyType.toUpperCase()} in ${inputs.city}, the ${results.tierAesthetic.label} profile is highly efficient. We recommend prioritizing ${inputs.tier === 'luxury' ? 'exotic veneers' : 'modular hardware'} to maximize resale equity.`);
      } finally {
        setIsAiLoading(false);
      }
    };

    const timer = setTimeout(fetchInsight, 1500);
    return () => clearTimeout(timer);
  }, [inputs.city, inputs.tier, inputs.propertyType, mounted]);

  const chartData = useMemo(() => 
    Object.entries(results.roomTotals).map(([name, value]) => ({ name, value })),
    [results.roomTotals]
  );

  const COLORS = ['#C4922A', '#1A1712', '#5C4B38', '#8A8274', '#D4AF37', '#2C1A0A'];

  const handleWhatsAppShare = () => {
    const text = `I just estimated my home interior budget with beMore! 🏠✨%0A%0AProperty: ${inputs.propertyType.toUpperCase()} in ${inputs.city}%0ATier: ${inputs.tier.toUpperCase()}%0AEstimate: ${formatINR(results.grandTotal)}%0A%0AGet your BOQ here: ${window.location.origin}/calculator`;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGated(false);
    setShowLeadModal(false);
  };

  const dynamicStyles = {
    '--dynamic-bg': results.tierAesthetic.bgColor,
    '--dynamic-accent': results.tierAesthetic.accentColor,
  } as React.CSSProperties;

  return (
    <main className={styles.page} style={dynamicStyles}>
      <Nav />
      
      {!mounted ? (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="loader" />
        </div>
      ) : (
        <>
          <section className={styles.calculatorSection}>
            <div className="container">
              <div className={styles.calcHeader}>
                <div className="gold-line" />
                <span className="tag">2026 ARCHITECTURAL BENCHMARK</span>
                <h1 className={styles.title}>Budget Estimator™</h1>
                <p className={styles.subtitle}>Calculate the actual cost to build your vision with surgical precision.</p>
              </div>

              <div className={styles.calcGrid}>
                {/* --- INPUT PANEL --- */}
                <div className={styles.inputPanel}>
                  <div className={styles.stepper}>
                    <div className={`${styles.step} ${step === 1 ? styles.active : ''}`} onClick={() => setStep(1)}>1. Context</div>
                    <div className={`${styles.step} ${step === 2 ? styles.active : ''}`} onClick={() => setStep(2)}>2. Floor Plan</div>
                    <div className={`${styles.step} ${step === 3 ? styles.active : ''}`} onClick={() => setStep(3)}>3. Materials</div>
                    <div className={`${styles.step} ${step === 4 ? styles.active : ''}`} onClick={() => setStep(4)}>4. Summary</div>
                  </div>

                  <div className={styles.inputContent}>
                    {step === 1 && (
                      <div className={styles.stepContent}>
                        <div className={styles.inputGroup}>
                          <label>City & Area</label>
                          <div className={styles.splitInput}>
                            <select value={inputs.city} onChange={(e) => setCity(e.target.value as any)}>
                              {Object.keys(CITY_MULTIPLIERS).map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                            <div className={styles.localityWrapper}>
                              <input 
                                type="text" 
                                placeholder="Area Name (e.g. Indiranagar)" 
                                value={inputs.locality || ''}
                                onChange={(e) => setLocality(e.target.value)}
                              />
                              <button 
                                className={styles.locateBtn} 
                                onClick={detectHighPrecision}
                                title="Use Current Location"
                              >
                                📍
                              </button>
                            </div>
                          </div>
                          <p className={styles.fieldNote}>Location Multiplier: {CITY_MULTIPLIERS[inputs.city]}x</p>
                        </div>

                        <div className={styles.inputGroup}>
                          <label>Property Architecture</label>
                          <div className={styles.cardSelectGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                            {[
                              { id: 'apartment', label: 'Apartment' },
                              { id: 'independent-home', label: 'Independent Home' },
                              { id: 'commercial', label: 'Commercial' },
                              { id: 'hospitality', label: 'Hospitality' }
                            ].map(p => (
                              <div 
                                key={p.id}
                                className={`${styles.selectCard} ${inputs.projectType === p.id ? styles.selected : ''}`}
                                onClick={() => setProjectType(p.id as any)}
                              >
                                <strong>{p.label}</strong>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className={styles.inputGroup}>
                          <label>Project Scope</label>
                          <div className={styles.cardSelectGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            {[
                              { id: 'full', label: 'Full Home' },
                              { id: 'kitchen', label: 'Kitchen Only' },
                              { id: 'bathroom', label: 'Bathroom Only' }
                            ].map(s => (
                              <div 
                                key={s.id}
                                className={`${styles.selectCard} ${inputs.scope === s.id ? styles.selected : ''}`}
                                onClick={() => setScope(s.id as any)}
                              >
                                <strong>{s.label}</strong>
                              </div>
                            ))}
                          </div>
                        </div>

                        {inputs.scope === 'full' && (
                          <div className={styles.inputGroup}>
                            <label>No. of Rooms (Configuration)</label>
                            <div className={styles.cardSelectGrid}>
                              {['1bhk', '2bhk', '3bhk', '4bhk', '5bhk', 'villa'].map(type => (
                                <div 
                                  key={type}
                                  className={`${styles.selectCard} ${inputs.propertyType === type ? styles.selected : ''}`}
                                  onClick={() => setPropertyType(type as any)}
                                >
                                  <strong>{type === 'villa' ? 'VILLA' : type.toUpperCase()}</strong>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className={styles.inputGroup}>
                          <label>Upload 2D Floor Plan (Optional)</label>
                          <div className={styles.uploadBox}>
                            <input 
                              type="file" 
                              accept="image/*,.pdf" 
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const url = URL.createObjectURL(file);
                                  setFloorPlan(url);
                                }
                              }} 
                              id="floorPlanUpload"
                              className={styles.fileInput}
                            />
                            <label htmlFor="floorPlanUpload" className={styles.uploadLabel}>
                              {inputs.floorPlan ? '✓ Plan Uploaded' : 'Drag or click to upload 2D Drawing'}
                            </label>
                          </div>
                          <p className={styles.fieldNote}>Upload your builder's drawing for a surgical breakdown.</p>
                        </div>

                        {inputs.scope === 'full' && (
                          <div className={styles.inputGroup}>
                            <label>Approx. Carpet Area: {inputs.carpetArea} sq ft</label>
                            <input 
                              type="range" min="400" max="8000" step="100" 
                              value={inputs.carpetArea} 
                              onChange={(e) => setCarpetArea(parseInt(e.target.value))}
                            />
                          </div>
                        )}

                        <button className={styles.nextBtn} onClick={() => setStep(2)}>
                          {inputs.scope === 'full' ? 'Next: Configure Floor Plan →' : 'Next: Configure Space →'}
                        </button>
                      </div>
                    )}

                    {step === 2 && inputs.scope === 'full' && (
                      <div className={styles.stepContent}>
                        <h4 className={styles.sectionTitle}>Precision Floor Plan Mapping</h4>
                        {inputs.floorPlan && (
                          <div className={styles.planPreview}>
                            <img src={inputs.floorPlan as string} alt="Floor Plan" />
                            <div className={styles.planOverlay}>
                              <span className={styles.aiTag}>✦ AI MAPPING ACTIVE</span>
                            </div>
                          </div>
                        )}
                        <div className={styles.itemizedList}>
                          {inputs.items.map(item => (
                            <div key={item.id} className={styles.itemRow}>
                              <div className={styles.itemInfo}>
                                <strong>{item.name}</strong>
                                <span>{item.room} • {item.unit}</span>
                                <div className={styles.specBadge}>{item.specs[inputs.tier]}</div>
                              </div>
                              <div className={styles.itemControl}>
                                <input 
                                  type="number" 
                                  value={item.quantity} 
                                  onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value) || 0)}
                                />
                                <span className={styles.unitLabel}>{item.unit}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className={styles.toggleGroup} style={{ marginTop: '1.5rem' }}>
                          <div 
                            className={`${styles.moduleToggle} ${inputs.includeCivil ? styles.toggled : ''}`}
                            onClick={() => setIncludeCivil(!inputs.includeCivil)}
                          >
                            <span style={{ fontSize: '1.5rem' }}>🏗️</span>
                            <div>
                              <strong>Include Civil Work</strong>
                              <span>Plumbing, tiling & electrical shifts.</span>
                            </div>
                          </div>
                        </div>

                        <button className={styles.nextBtn} onClick={() => setStep(3)}>Next: Select Material Tier →</button>
                        <button className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
                      </div>
                    )}

                    {step === 2 && inputs.scope === 'kitchen' && (
                      <div className={styles.stepContent}>
                        <h4 className={styles.sectionTitle}>Kitchen Specialized Config</h4>
                        
                        <div className={styles.inputGroup}>
                          <label>Layout Type</label>
                          <div className={styles.cardSelectGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            {['straight', 'l-shape', 'u-shape', 'parallel', 'island'].map(l => (
                              <div 
                                key={l}
                                className={`${styles.selectCard} ${inputs.kitchenLayout === l ? styles.selected : ''}`}
                                onClick={() => setKitchenConfig({ kitchenLayout: l as any })}
                              >
                                <strong>{l.toUpperCase()}</strong>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className={styles.inputGroup}>
                          <label>Countertop</label>
                          <select 
                            value={inputs.kitchenCountertop} 
                            onChange={(e) => setKitchenConfig({ kitchenCountertop: e.target.value as any })}
                          >
                            <option value="granite">Granite (Standard)</option>
                            <option value="quartz">Quartz (Premium)</option>
                            <option value="nano-white">Nano-White (Luxury)</option>
                          </select>
                        </div>

                        <div className={styles.inputGroup}>
                          <label>Hardware</label>
                          <div className={styles.cardSelectGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            {[
                              { id: 'basic', label: 'Manual' },
                              { id: 'soft-close', label: 'Soft-Close' },
                              { id: 'premium-blum', label: 'Blum Elite' }
                            ].map(h => (
                              <div 
                                key={h.id}
                                className={`${styles.selectCard} ${inputs.kitchenHardware === h.id ? styles.selected : ''}`}
                                onClick={() => setKitchenConfig({ kitchenHardware: h.id as any })}
                              >
                                <strong>{h.label}</strong>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className={styles.inputGroup}>
                          <div 
                            className={`${styles.moduleToggle} ${inputs.kitchenAppliances === 'built-in' ? styles.toggled : ''}`}
                            onClick={() => setKitchenConfig({ kitchenAppliances: inputs.kitchenAppliances === 'built-in' ? 'freestanding' : 'built-in' })}
                          >
                            <span style={{ fontSize: '1.5rem' }}>🍳</span>
                            <div>
                              <strong>Built-in Appliances</strong>
                              <span>Integrated Hob & Chimney provision.</span>
                            </div>
                          </div>
                        </div>

                        <button className={styles.nextBtn} onClick={() => setStep(3)}>Next: Select Material Tier →</button>
                        <button className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
                      </div>
                    )}

                    {step === 2 && inputs.scope === 'bathroom' && (
                      <div className={styles.stepContent}>
                        <h4 className={styles.sectionTitle}>Bathroom Specialized Config</h4>
                        
                        <div className={styles.inputGroup}>
                          <label>Tiling & Civil</label>
                          <div className={styles.cardSelectGrid}>
                            {[
                              { id: 'dado', label: 'Dado Height' },
                              { id: 'full-height', label: 'Full Height' }
                            ].map(t => (
                              <div 
                                key={t.id}
                                className={`${styles.selectCard} ${inputs.bathTiling === t.id ? styles.selected : ''}`}
                                onClick={() => setBathConfig({ bathTiling: t.id as any })}
                              >
                                <strong>{t.label}</strong>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className={styles.inputGroup}>
                          <label>Fixtures (CP & Sanitary)</label>
                          <select 
                            value={inputs.bathFixtures} 
                            onChange={(e) => setBathConfig({ bathFixtures: e.target.value as any })}
                          >
                            <option value="standard">Standard (Jaquar/Hindware)</option>
                            <option value="premium">Premium (Grohe/TOTO)</option>
                            <option value="luxury-kohler">Luxury (Kohler/Artize)</option>
                          </select>
                        </div>

                        <div className={styles.inputGroup}>
                          <label>Glass Partition</label>
                          <div className={styles.cardSelectGrid}>
                             {[
                              { id: 'none', label: 'None' },
                              { id: 'fixed', label: 'Fixed Panel' },
                              { id: 'sliding', label: 'Sliding Door' }
                            ].map(p => (
                              <div 
                                key={p.id}
                                className={`${styles.selectCard} ${inputs.bathPartition === p.id ? styles.selected : ''}`}
                                onClick={() => setBathConfig({ bathPartition: p.id as any })}
                              >
                                <strong>{p.label}</strong>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button className={styles.nextBtn} onClick={() => setStep(3)}>Next: Select Material Tier →</button>
                        <button className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
                      </div>
                    )}

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
                              {t === 'premium' && <div className={styles.mostPopular}>Recommended</div>}
                              <div className={styles.tierHeader}>
                                <h3>{t.charAt(0).toUpperCase() + t.slice(1)}</h3>
                              </div>
                              <ul className={styles.tierList}>
                                {TIER_SPECS[t].map((s, i) => <li key={i}>{s}</li>)}
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div className={styles.compareWrapper}>
                           <table className={styles.compareTable}>
                             <thead>
                               <tr><th>Category</th><th>Essential</th><th>Premium</th><th>Luxury</th></tr>
                             </thead>
                             <tbody>
                               <tr><td>Woodwork</td><td>BWR Ply</td><td>BWP Marine</td><td>Full BWP + PU</td></tr>
                               <tr><td>Hardware</td><td>Ozone</td><td>Hettich</td><td>Blum Elite</td></tr>
                               <tr><td>Finishes</td><td>Laminate</td><td>Acrylic/Matte</td><td>Veneer/Leather</td></tr>
                             </tbody>
                           </table>
                        </div>

                        <button className={styles.nextBtn} onClick={() => setStep(4)}>Review Final Estimate →</button>
                        <button className={styles.backBtn} onClick={() => setStep(2)}>← Back</button>
                      </div>
                    )}

                    {step === 4 && (
                      <div className={styles.stepContent}>
                        <div className={styles.summaryWrap}>
                          <h4 className={styles.sectionTitle}>Project Exclusions</h4>
                          <div className={styles.exclusions}>
                            <h5>Not included in this estimate:</h5>
                            <ul>
                              {EXCLUSIONS.map((e, i) => <li key={i}>{e}</li>)}
                            </ul>
                          </div>
                          
                          <div style={{ marginTop: '2rem' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                              This estimate is based on 2026 market benchmarks for <strong>{inputs.locality ? `${inputs.locality}, ` : ''}{inputs.city}</strong>. 
                              The actual BOQ may vary by +/- 10% based on site conditions.
                            </p>
                            <button className={styles.nextBtn} onClick={() => setShowLeadModal(true)}>
                              Unlock Itemized BOQ PDF →
                            </button>
                          </div>
                        </div>
                        <button className={styles.backBtn} onClick={() => setStep(3)}>← Back to Materials</button>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- RESULTS PANEL --- */}
                <div className={styles.resultsPanel}>
                  <div className={styles.resultDisplay}>
                    <div className={styles.totalDisplay}>
                      <span className={styles.totalLabel}>Projected Investment</span>
                      <h2 className={styles.totalValue}>{formatINR(results.grandTotal)}</h2>
                      <p className={styles.gstNote}>Includes {inputs.designerFeePercent}% fee & 18% GST</p>
                    </div>

                    <div className={styles.chartWrapper}>
                      <h4 className={styles.sectionTitle}>Budget by Space</h4>
                      <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height={260}>
                          <PieChart>
                            <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                              {chartData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <RechartsTooltip formatter={(val) => formatINR(val as number)} />
                            <Legend verticalAlign="bottom" height={36}/>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className={styles.aiInsightsMock}>
                      <div className={styles.aiHeader}>
                        <span className={`${styles.aiSparkle} ${isAiLoading ? styles.spinning : ''}`}>✦</span>
                        Expert Design Strategy
                      </div>
                      <div className={`${styles.aiText} ${isAiLoading ? styles.loadingText : ''}`}>
                        {isAiLoading ? "Syncing with supply chain benchmarks..." : aiInsight}
                      </div>
                    </div>

                    <div className={styles.chartActions}>
                      <button className={styles.shareBtn} onClick={handleWhatsAppShare}>
                        Get Full BOQ on WhatsApp
                      </button>
                    </div>

                    {isGated && (
                      <div className={styles.gateOverlay}>
                        <div className={styles.gateContent}>
                          <h3>Unlock the BOQ</h3>
                          <p>Get the precise material brand names and quantities.</p>
                          <button className="btn btn-primary" onClick={() => setShowLeadModal(true)}>Reveal Detail →</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {showLeadModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={() => setShowLeadModal(false)}>✕</button>
                <div className="gold-line" />
                <h2>Expert Quote Ready</h2>
                <p>Register to receive your detailed Bill of Quantities (BOQ) with brand recommendations for {inputs.city}.</p>
                <form onSubmit={handleLeadSubmit}>
                  <div className={styles.inputGroup}><label>Full Name</label><input type="text" required placeholder="John Doe" /></div>
                  <div className={styles.inputGroup}><label>WhatsApp Number</label><input type="tel" required placeholder="+91 90000 00000" /></div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Reveal Detailed Breakdown →
                  </button>
                  <p className={styles.formNote}>*Your privacy is paramount. No spam.</p>
                </form>
              </div>
            </div>
          )}

          <Footer />
        </>
      )}
    </main>
  );
}

