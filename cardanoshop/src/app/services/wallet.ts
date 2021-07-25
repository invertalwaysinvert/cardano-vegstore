export class Wallet {
    name: String
    password?: String
    mnemonic?: [String]
    state?: {
        status: string
    }
    balance?: {
        reward?: {
            quantity: number
            unit: string
        }
        total?: {
            quantity: number
            unit: string
        }
        available?: {
            quantity: number
            unit: string
        }
    }
}
