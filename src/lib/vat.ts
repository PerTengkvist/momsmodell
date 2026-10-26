export const VAT_RATE_DEFAULT = 0.25

export interface VatAmounts {
  purchaseAExcl: number
  purchaseBExcl: number
  saleDExcl: number
  vatRate: number
}

export const DEFAULT_AMOUNTS: VatAmounts = {
  purchaseAExcl: 8000,
  purchaseBExcl: 4000,
  saleDExcl: 20000,
  vatRate: VAT_RATE_DEFAULT,
}

export function vatOf(excl: number, rate: number): number {
  return Math.round(excl * rate)
}

export function inclOf(excl: number, rate: number): number {
  return excl + vatOf(excl, rate)
}

export interface TaxAgencyBooks {
  /** Moms A.se betalar in till Skatteverket */
  incomeFromA: number
  /** Moms C redovisar som utgående vid omvänd skattskyldighet (B.com) */
  incomeFromReverseCharge: number
  /** Moms från C:s försäljning till D (0 vid export) */
  incomeFromSaleD: number
  /** Summa inkomster */
  totalIncome: number
  /** Avdrag C får för inköp från A */
  expenseDeductionA: number
  /** Avdrag C får för omvänd skattskyldighet B */
  expenseDeductionB: number
  /** Summa utgifter / avdrag */
  totalExpense: number
  /** Netto för Skatteverket: positivt = överskott, negativt = underskott */
  net: number
}

export interface VatBreakdown {
  /** Moms på inköp från A.se (betalas till A) */
  vatFromA: number
  /** Belopp C betalar till A.se (inkl. moms) */
  payToA: number
  /** Moms på inköp från B.com (redovisas till Skatteverket) */
  vatFromB: number
  /** Belopp C betalar till B.com (exkl. moms) */
  payToB: number
  /** Belopp D betalar till C (ingen moms) */
  payFromD: number
  /** Utgående moms på försäljning till D */
  outgoingVatSale: number
  /** Utgående moms via omvänd skattskyldighet (B) */
  outgoingVatReverse: number
  /** Total utgående moms C redovisar */
  outgoingVat: number
  /** Total ingående moms */
  incomingVat: number
  /** Netto mot Skatteverket för C: positivt = C får tillbaka */
  netWithTaxAgency: number
  /** Skatteverkets inkomster och utgifter i exemplet */
  taxAgency: TaxAgencyBooks
}

export function calculateVat(amounts: VatAmounts): VatBreakdown {
  const { purchaseAExcl, purchaseBExcl, saleDExcl, vatRate } = amounts

  const vatFromA = vatOf(purchaseAExcl, vatRate)
  const payToA = inclOf(purchaseAExcl, vatRate)
  const vatFromB = vatOf(purchaseBExcl, vatRate)
  const payToB = purchaseBExcl
  const payFromD = saleDExcl

  const outgoingVatSale = 0
  const outgoingVatReverse = vatFromB
  const outgoingVat = outgoingVatSale + outgoingVatReverse
  const incomingVat = vatFromA + vatFromB
  const netWithTaxAgency = incomingVat - outgoingVat

  const taxAgency: TaxAgencyBooks = {
    incomeFromA: vatFromA,
    incomeFromReverseCharge: vatFromB,
    incomeFromSaleD: outgoingVatSale,
    totalIncome: vatFromA + vatFromB + outgoingVatSale,
    expenseDeductionA: vatFromA,
    expenseDeductionB: vatFromB,
    totalExpense: vatFromA + vatFromB,
    net: vatFromA + vatFromB + outgoingVatSale - (vatFromA + vatFromB),
  }

  return {
    vatFromA,
    payToA,
    vatFromB,
    payToB,
    payFromD,
    outgoingVatSale,
    outgoingVatReverse,
    outgoingVat,
    incomingVat,
    netWithTaxAgency,
    taxAgency,
  }
}

export function formatSek(amount: number): string {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercent(rate: number): string {
  return `${Math.round(rate * 100)} %`
}
