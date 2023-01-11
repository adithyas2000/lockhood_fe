import { incomeSpread } from "./incomeSpread"

export type monthlyIncomeType={
    'income':number,
    'dateFrom':string,
    'dateTo':string,
    'incomeSpread':Array<incomeSpread>
}