import { Gift, TransferResponse } from '../models/gift.model';
import { MockGiftService } from './mock.service';

export interface IGiftService {
  getGift(code: string): Promise<Gift>;
  markAsOpened(code: string): Promise<void>;
  getTransferLink(code: string): TransferResponse;
}

export function createGiftService(_useMocks: boolean = true): IGiftService {
  // For PoC, always return MockGiftService
  return new MockGiftService();
}