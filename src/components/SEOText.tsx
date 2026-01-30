import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            <p>
                This mortgage payment calculator helps you estimate monthly housing costs based on home price,
                down payment, interest rate, and loan term. You can also include property taxes, home insurance,
                and HOA fees for a complete monthly payment overview. Results are estimates only and not
                financial advice. Actual payments may vary by lender and loan terms.
            </p>
        </div>
    );
};
