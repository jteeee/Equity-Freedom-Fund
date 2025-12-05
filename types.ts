export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  content: string;
  isSearch?: boolean;
  groundingSources?: Array<{
    uri: string;
    title: string;
  }>;
}

export interface CalculatorInputs {
  ticker: string;
  stockValue: number;
  costBasis: number;
  stateTaxRate: number;
  holdingPeriod: number;
}

export interface TaxCalculation {
  federalTax: number;
  niitTax: number;
  stateTax: number;
  totalTax: number;
  netAfterSale: number;
  valueInFund: number;
  wealthLost: number;
}