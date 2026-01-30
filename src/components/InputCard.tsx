import React from 'react';
import type { MortgageInput } from '../logic/mortgageCalculations';

interface InputCardProps {
    values: MortgageInput;
    onChange: (field: keyof MortgageInput, value: number | boolean) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let finalValue: number | boolean = type === 'number' ? (parseFloat(value) || 0) : parseFloat(value) || 0;
        onChange(name as keyof MortgageInput, finalValue);
    };

    const handlePercentToggle = () => {
        onChange('downPaymentPercent', !values.downPaymentPercent);
    };

    return (
        <div className="card">
            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>

                {/* Home Price */}
                <div>
                    <label htmlFor="homePrice">Home Price</label>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>$</span>
                        <input
                            id="homePrice"
                            name="homePrice"
                            type="number"
                            value={values.homePrice || ''}
                            onChange={handleChange}
                            placeholder="0"
                            style={{ paddingLeft: '28px', fontSize: '1.25rem', fontWeight: 600 }}
                        />
                    </div>
                </div>

                {/* Down Payment */}
                <div>
                    <label htmlFor="downPayment">Down Payment</label>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                                {values.downPaymentPercent ? '%' : '$'}
                            </span>
                            <input
                                id="downPayment"
                                name="downPayment"
                                type="number"
                                value={values.downPayment || ''}
                                onChange={handleChange}
                                placeholder="0"
                                style={{ paddingLeft: '28px' }}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handlePercentToggle}
                            style={{
                                padding: 'var(--space-2) var(--space-3)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--color-bg-card)',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: 'var(--color-text-secondary)'
                            }}
                        >
                            {values.downPaymentPercent ? '% → $' : '$ → %'}
                        </button>
                    </div>
                </div>

                {/* Interest Rate & Loan Term Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <div>
                        <label htmlFor="interestRate">Interest Rate (%)</label>
                        <input
                            id="interestRate"
                            name="interestRate"
                            type="number"
                            step="0.125"
                            value={values.interestRate || ''}
                            onChange={handleChange}
                            placeholder="6.5"
                        />
                    </div>
                    <div>
                        <label htmlFor="loanTerm">Loan Term</label>
                        <select
                            id="loanTerm"
                            name="loanTerm"
                            value={values.loanTerm}
                            onChange={handleChange}
                        >
                            <option value="30">30 Years</option>
                            <option value="20">20 Years</option>
                            <option value="15">15 Years</option>
                        </select>
                    </div>
                </div>

                {/* Calculate Button */}
                <button className="btn-primary" type="button">
                    Calculate
                </button>

            </div>
        </div>
    );
};
