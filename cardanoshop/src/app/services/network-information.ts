export class NetworkInformation {
    network_tip?: {
        epoch_number: number
        slot_number: number
    }    
    sync_progress?: {
        status:string
    }
    next_epoch?: {
        epoch_start_time: Date
        epoch_number: number
    }
}