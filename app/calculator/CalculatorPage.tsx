'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { useSearchParams } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useCalculatorStore } from '@/lib/store';
import { getLocalities } from '@/lib/localities';
import { formatLakhs } from '@/lib/roi-engine';
import styles from './calculator.module.css';

export default function CalculatorPage() {
  const { 
    inputs, 
    results, 
    selectedLocality,
    setLocality,
    setPropertyType,
    setCurrentValue,
    setInvestmentAmount,
    setDesignTier,
    setAutomationLevel,
    setFinishGrade,
    setMaintenanceTier,
    setProfession,
    toggleModule
  } = useCalculatorStore();

  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [isGated, setIsGated] = useState(true);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const localities = getLocalities();

  // Handle deep links (e.g., /calculator?locality=indiranagar)
  useEffect(() => {
    const localitySlug = searchParams.get('locality');
    if (localitySlug) {
      const match = localities.find(l => l.slug === localitySlug || l.id === localitySlug);
      if (match) setLocality(match.id);
    }
  }, [searchParams, localities, setLocality]);

  // Fetch AI Insights with Debounce
  useEffect(() => {
    const fetchInsight = async () => {
      setIsAiLoading(true);
      try {
        const response = await fetch('/api/ai-insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inputs, results, selectedLocality }),
        });
        const data = await response.json();
        setAiInsight(data.insight);
      } catch (err) {
        console.error('AI Insight Error:', err);
      } finally {
        setIsAiLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchInsight();
    }, 1500); // 1.5s debounce

    return () => clearTimeout(timer);
  }, [
    inputs.localityId, 
    inputs.designTier, 
    inputs.investmentAmount, 
    inputs.modules.acoustic, 
    inputs.modules.wfhZone,
    inputs.currentValue 
  ]);

  const handleWhatsAppShare = () => {
    const text = `I just estimated my home equity with Be More Design Studio! 🏠✨%0A%0AProperty: ${selectedLocality.displayName}%0AProjected Value (5yr): ₹${results.futureValue.toFixed(1)}L%0ARental Yield: ${results.rentalYield.toFixed(1)}%%0A%0ACheck yours here: ${window.location.origin}/calculator`;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };


  const comparisonData = [
    { name: 'Modular', value: results.modularValue5yr, color: 'rgba(255,255,255,0.1)' },
    { name: 'Your Design', value: results.hybridValue5yr, color: '#C4922A' },
    { name: 'Bespoke', value: results.bespokeValue5yr, color: 'rgba(196,146,42,0.4)' },
  ];

  const contributionData = Object.entries(results.contributions)
    .filter(([_, val]) => val > 0)
    .map(([key, val]) => ({
      name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      value: val
    }));

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Add current calculator context
    const leadData = {
      ...data,
      locality: selectedLocality.displayName,
      investment: inputs.investmentAmount,
      calculatedRoi: results.appreciationPercent,
      source: 'Calculator Gated Report'
    };

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
      setIsGated(false);
      setShowLeadModal(false);
    } catch (err) {
      console.error('Lead conversion failed:', err);
      // Still unlock for UX sake in demo
      setIsGated(false);
      setShowLeadModal(false);
    }
  };

  return (
    <main className={styles.page}>
      <Nav />
      
      <section className={styles.calculatorSection}>
        <div className="container">
          <div className={styles.calcHeader}>
            <div className="gold-line" />
            <span className="tag">Proprietary Tool</span>
            <h1 className={styles.title}>Be More Design Equity™</h1>
            <p className={styles.subtitle}>Strategically calculating ROI for Bengaluru homeowners.</p>
          </div>

          <div className={styles.calcGrid}>
            {/* --- INPUT PANEL --- */}
            <div className={styles.inputPanel}>
              <div className={styles.stepper}>
                <div className={`${styles.step} ${step === 1 ? styles.active : ''}`} onClick={() => setStep(1)}>1. Property</div>
                <div className={`${styles.step} ${step === 2 ? styles.active : ''}`} onClick={() => setStep(2)}>2. Design</div>
                <div className={`${styles.step} ${step === 3 ? styles.active : ''}`} onClick={() => setStep(3)}>3. Alpha Modules</div>
              </div>

              <div className={styles.inputContent}>
                {step === 1 && (
                  <div className={styles.stepContent}>
                    <div className={styles.inputGroup}>
                      <label>Locality in Bengaluru</label>
                      <select value={inputs.localityId} onChange={(e) => setLocality(e.target.value)}>
                        {localities.map(l => (
                          <option key={l.id} value={l.id}>{l.displayName}</option>
                        ))}
                      </select>
                      <p className={styles.fieldNote}>{selectedLocality.description}</p>
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Property Type</label>
                      <div className={styles.toggleGroup}>
                        <button 
                          className={inputs.propertyType === 'apartment' ? styles.toggleActive : ''}
                          onClick={() => setPropertyType('apartment')}
                        >Apartment</button>
                        <button 
                          className={inputs.propertyType === 'villa' ? styles.toggleActive : ''}
                          onClick={() => setPropertyType('villa')}
                        >Villa</button>
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Current Market Value: {formatLakhs(inputs.currentValue)}</label>
                      <input 
                        type="range" 
                        min="50" 
                        max="500" 
                        step="5" 
                        value={inputs.currentValue} 
                        onChange={(e) => setCurrentValue(parseInt(e.target.value))}
                      />
                      <div className={styles.sliderLabels}>
                        <span>₹50L</span>
                        <span>₹2.5Cr</span>
                        <span>₹5Cr</span>
                      </div>
                    </div>

                    <button className={styles.nextBtn} onClick={() => setStep(2)}>Next: Design Strategy →</button>
                  </div>
                )}

                {step === 2 && (
                  <div className={styles.stepContent}>
                    <div className={styles.inputGroup}>
                      <label>Investment Amount: {formatLakhs(inputs.investmentAmount)}</label>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        step="1" 
                        value={inputs.investmentAmount} 
                        onChange={(e) => setInvestmentAmount(parseInt(e.target.value))}
                      />
                      <div className={styles.sliderLabels}>
                        <span>₹10L</span>
                        <span>₹50L</span>
                        <span>₹1Cr (Cap)</span>
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Design Tier</label>
                      <div className={styles.cardSelectGrid}>
                        <div 
                          className={`${styles.selectCard} ${inputs.designTier === 'modular' ? styles.selected : ''}`}
                          onClick={() => setDesignTier('modular')}
                        >
                          <strong>Modular</strong>
                          <span>0.85x ROI</span>
                        </div>
                        <div 
                          className={`${styles.selectCard} ${inputs.designTier === 'hybrid' ? styles.selected : ''}`}
                          onClick={() => setDesignTier('hybrid')}
                        >
                          <div className={styles.selectBadge}>Most ROI</div>
                          <strong>Hybrid™</strong>
                          <span>1.20x ROI</span>
                        </div>
                        <div 
                          className={`${styles.selectCard} ${inputs.designTier === 'bespoke' ? styles.selected : ''}`}
                          onClick={() => setDesignTier('bespoke')}
                        >
                          <strong>Bespoke</strong>
                          <span>1.10x ROI</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Finish Grade</label>
                      <select value={inputs.finishGrade} onChange={(e) => setFinishGrade(e.target.value as any)}>
                        <option value="commercial">Commercial (Standard)</option>
                        <option value="premium">Premium (Recommended)</option>
                        <option value="luxury">Luxury (High-End)</option>
                      </select>
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Automation Level</label>
                      <select value={inputs.automationLevel} onChange={(e) => setAutomationLevel(e.target.value as any)}>
                        <option value="none">No Tech</option>
                        <option value="basic">Standard Smart Lighting</option>
                        <option value="intermediate">App-Controlled Ecosystem</option>
                        <option value="full">Full KNX/Control4 Integration</option>
                      </select>
                    </div>

                    <button className={styles.nextBtn} onClick={() => setStep(3)}>Next: Value Add-ons →</button>
                    <button className={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
                  </div>
                )}

                {step === 3 && (
                  <div className={styles.stepContent}>
                    <div className={styles.moduleGrid}>
                      <div 
                        className={`${styles.moduleToggle} ${inputs.modules.acoustic ? styles.toggled : ''}`}
                        onClick={() => toggleModule('acoustic')}
                      >
                        <div className={styles.moduleIcon}>🔇</div>
                        <div>
                          <strong>Acoustic Design</strong>
                          <span>+Quiet Premium</span>
                        </div>
                      </div>
                      <div 
                        className={`${styles.moduleToggle} ${inputs.modules.bespokeKitchen ? styles.toggled : ''}`}
                        onClick={() => toggleModule('bespokeKitchen')}
                      >
                        <div className={styles.moduleIcon}>🍳</div>
                        <div>
                          <strong>Bespoke Kitchen</strong>
                          <span>High Resale Value</span>
                        </div>
                      </div>
                      <div 
                        className={`${styles.moduleToggle} ${inputs.modules.wfhZone ? styles.toggled : ''}`}
                        onClick={() => toggleModule('wfhZone')}
                      >
                        <div className={styles.moduleIcon}>🖥️</div>
                        <div>
                          <strong>WFH Mini-Studio</strong>
                          <span>+Rental Yield</span>
                        </div>
                      </div>
                      <div 
                        className={`${styles.moduleToggle} ${inputs.modules.documentationLocker ? styles.toggled : ''}`}
                        onClick={() => toggleModule('documentationLocker')}
                      >
                        <div className={styles.moduleIcon}>📑</div>
                        <div>
                          <strong>Design Audit</strong>
                          <span>+Liquidity</span>
                        </div>
                      </div>
                    </div>

                    {inputs.modules.wfhZone && (
                      <div className={styles.inputGroup} style={{ marginTop: '1.5rem' }}>
                        <label>Profession (for WFH Yield tuning)</label>
                        <select value={inputs.profession} onChange={(e) => setProfession(e.target.value as any)}>
                          <option value="none">General User</option>
                          <option value="developer">Tech Professional / Developer</option>
                          <option value="creator">Content Creator / Exec</option>
                          <option value="executive">Corporate Leader</option>
                        </select>
                      </div>
                    )}

                    <div className={styles.inputGroup} style={{ marginTop: '1.5rem' }}>
                      <label>Maintenance Preference</label>
                      <select value={inputs.maintenanceTier} onChange={(e) => setMaintenanceTier(e.target.value as any)}>
                        <option value="low">Low (Maximum Resale Charm)</option>
                        <option value="medium">Medium (Standard Lifestyle)</option>
                        <option value="high">High (Luxury Materials)</option>
                      </select>
                    </div>

                    <button className={styles.backBtn} onClick={() => setStep(2)}>← Back</button>
                  </div>
                )}
              </div>
            </div>

            {/* --- RESULTS PANEL --- */}
            <div className={styles.resultsPanel}>
              <div className={styles.resultDisplay}>
                <div className={styles.mainMetrics}>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Appreciated Value (5yr)</span>
                    <span className={styles.metricValue}>{formatLakhs(results.futureValue)}</span>
                    <span className={styles.metricChange}>+{results.appreciationPercent.toFixed(1)}% Uplift</span>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Rental Yield Premium</span>
                    <span className={styles.metricValue}>{results.rentalYield.toFixed(1)}%</span>
                    <span className={styles.metricChange}>+{results.rentalPremium.toFixed(1)}% above market</span>
                  </div>
                </div>

                <div className={styles.chartWrapper}>
                  <h3>Value Comparison (5 Year Projection)</h3>
                  <div style={{ width: '100%', height: 250 }}>
                    <ResponsiveContainer>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                        <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} hide />
                        <Tooltip 
                          contentStyle={{ background: '#1C1710', border: '1px solid #C4922A', color: '#F5EFE0' }} 
                          formatter={(val: number) => [formatLakhs(val), 'Projected Value']}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {comparisonData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className={styles.chartActions}>
                  <button className={styles.shareBtn} onClick={handleWhatsAppShare}>
                    <span>📲</span> Share Estimate on WhatsApp
                  </button>
                </div>

                <div className={styles.aiInsightsMock}>
                  <div className={styles.aiHeader}>
                    <span className={`${styles.aiSparkle} ${isAiLoading ? styles.spinning : ''}`}>✦</span>
                    AI Investment Strategy (Gemini)
                  </div>
                  <div className={`${styles.aiText} ${isAiLoading ? styles.loadingText : ''}`}>
                    {isAiLoading ? (
                      "Analyzing market velocity and design synergy..."
                    ) : aiInsight ? (
                      aiInsight
                    ) : (
                      `Based on current trends in ${selectedLocality.displayName}, your selection of ${inputs.designTier} 
                      tier architecture outperforms standard modular solutions by ${results.hybridAdvantage.toFixed(1)}%.`
                    )}
                  </div>
                </div>

                {isGated && (
                  <div className={styles.gateOverlay}>
                    <div className={styles.gateContent}>
                      <h3>Unlock Market Depth Report</h3>
                      <p>See detailed material lists & locality market trends.</p>
                      <button className="btn btn-primary" onClick={() => setShowLeadModal(true)}>Get Full Breakdown →</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LEAD MODAL --- */}
      {showLeadModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={() => setShowLeadModal(false)}>✕</button>
            <div className="gold-line" />
            <h2>Receive Your Property Audit</h2>
            <p>Enter your details to download the full 12-page Design Equity™ report for {selectedLocality.displayName}.</p>
            <form onSubmit={handleLeadSubmit}>
              <div className={styles.inputGroup}>
                <label>Name</label>
                <input type="text" name="fullName" required placeholder="Full Name" />
              </div>
              <div className={styles.inputGroup}>
                <label>WhatsApp Number</label>
                <input type="tel" name="phone" required placeholder="+91 90000 00000" />
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input type="email" name="email" required placeholder="you@example.com" />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Unlock Results & Get Quote →
              </button>
              <p className={styles.formNote}>*By unlocking, you agree to a professional design consultation.</p>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
