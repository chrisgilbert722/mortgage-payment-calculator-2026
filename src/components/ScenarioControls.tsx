import React, { useState } from 'react';
import type { MortgageInput } from '../logic/mortgageCalculations';

interface ScenarioControlsProps {
    values: MortgageInput;
    onChange: (field: keyof MortgageInput, value: number | boolean) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const [showExtras, setShowExtras] = useState(
        values.propertyTax > 0 || values.homeInsurance > 0 || values.hoa > 0
    );

    const handleToggleExtras = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setShowExtras(checked);
        if (!checked) {
            onChange('propertyTax', 0);
            onChange('homeInsurance', 0);
            onChange('hoa', 0);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange(name as keyof MortgageInput, parseFloat(value) || 0);
    };

    return (
        <div className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-4)' }}>Taxes, Insurance & HOA</h3>

            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>

                {/* Toggle */}
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer', marginBottom: 0 }}>
                    <input
                        type="checkbox"
                        checked={showExtras}
                        onChange={handleToggleExtras}
                        style={{ width: 'auto' }}
                    />
                    Include taxes, insurance & HOA
                </label>

                {/* Conditional Inputs */}
                {showExtras && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
                        <div>
                            <label htmlFor="propertyTax">Property Tax (Annual)</label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>$</span>
                                <input
                                    id="propertyTax"
                                    name="propertyTax"
                                    type="number"
                                    value={values.propertyTax || ''}
                                    onChange={handleChange}
                                    placeholder="0"
                                    style={{ paddingLeft: '28px' }}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="homeInsurance">Insurance (Annual)</label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>$</span>
                                <input
                                    id="homeInsurance"
                                    name="homeInsurance"
                                    type="number"
                                    value={values.homeInsurance || ''}
                                    onChange={handleChange}
                                    placeholder="0"
                                    style={{ paddingLeft: '28px' }}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="hoa">HOA (Monthly)</label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>$</span>
                                <input
                                    id="hoa"
                                    name="hoa"
                                    type="number"
                                    value={values.hoa || ''}
                                    onChange={handleChange}
                                    placeholder="0"
                                    style={{ paddingLeft: '28px' }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
