export interface MortgageInput {
    homePrice: number;
    downPayment: number;
    downPaymentPercent: boolean; // true = percentage, false = dollar amount
    interestRate: number; // Annual percentage
    loanTerm: 15 | 20 | 30;
    propertyTax: number; // Annual
    homeInsurance: number; // Annual
    hoa: number; // Monthly
}

export interface MortgageResult {
    loanAmount: number;
    monthlyPrincipalInterest: number;
    monthlyPropertyTax: number;
    monthlyInsurance: number;
    monthlyHOA: number;
    totalMonthlyPayment: number;
    totalInterest: number;
    totalCost: number;
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
    // 1. Calculate down payment amount
    let downPaymentAmount: number;
    if (input.downPaymentPercent) {
        downPaymentAmount = (input.downPayment / 100) * input.homePrice;
    } else {
        downPaymentAmount = input.downPayment;
    }

    // 2. Calculate loan amount
    const loanAmount = Math.max(0, input.homePrice - downPaymentAmount);

    // 3. Calculate monthly principal & interest using amortization formula
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    // Where:
    // M = monthly payment
    // P = principal (loan amount)
    // r = monthly interest rate
    // n = total number of payments

    const monthlyRate = input.interestRate / 100 / 12;
    const numPayments = input.loanTerm * 12;

    let monthlyPrincipalInterest: number;

    if (monthlyRate === 0) {
        // No interest - simple division
        monthlyPrincipalInterest = loanAmount / numPayments;
    } else if (loanAmount === 0) {
        monthlyPrincipalInterest = 0;
    } else {
        const factor = Math.pow(1 + monthlyRate, numPayments);
        monthlyPrincipalInterest = loanAmount * (monthlyRate * factor) / (factor - 1);
    }

    // 4. Calculate monthly escrow amounts
    const monthlyPropertyTax = input.propertyTax / 12;
    const monthlyInsurance = input.homeInsurance / 12;
    const monthlyHOA = input.hoa;

    // 5. Calculate total monthly payment
    const totalMonthlyPayment = monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance + monthlyHOA;

    // 6. Calculate total interest over life of loan
    const totalPaid = monthlyPrincipalInterest * numPayments;
    const totalInterest = totalPaid - loanAmount;

    // 7. Calculate total cost (principal + interest + taxes + insurance + HOA)
    const totalCost = totalPaid + (input.propertyTax * input.loanTerm) + (input.homeInsurance * input.loanTerm) + (input.hoa * 12 * input.loanTerm);

    return {
        loanAmount,
        monthlyPrincipalInterest,
        monthlyPropertyTax,
        monthlyInsurance,
        monthlyHOA,
        totalMonthlyPayment,
        totalInterest,
        totalCost
    };
}
