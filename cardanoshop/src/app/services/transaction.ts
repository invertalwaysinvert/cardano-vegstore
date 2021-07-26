export class Transaction {
    inserted_at?: {
        time: Date
        epoch_number: number
        slot_number: number
    }
    status: string
    amount: Amount
    inputs: [
        {
            id: string, index: number
        }
    ]
    outputs: [
        {
            amount: Amount
            address: String
            assets: [Asset]
        }
    ]
    direction: string
    fee: Amount
    id: string
}

export class Amount {
    quantity: number
    unit: string
}

export class Asset {
    asset_name: string
    quantity: number
    policy_id: string
}
