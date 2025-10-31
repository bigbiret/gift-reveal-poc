import { IGiftService } from './gift.service';
import { Gift, TransferResponse } from '../models/gift.model';
import mockScenarios from '../../mocks/scenarios.json';

export class MockGiftService implements IGiftService {
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getGift(code: string): Promise<Gift> {
    await this.delay(800); // Simulate network delay

    const scenario = (mockScenarios as any)[code] || (mockScenarios as any)['default'];

    if (scenario.error) {
      throw new Error(scenario.error);
    }

    return {
      ...scenario,
      code,
      expiryDate: scenario.expiryDate ? new Date(scenario.expiryDate) : undefined
    };
  }

  async markAsOpened(code: string): Promise<void> {
    await this.delay(300);
    console.log(`[Mock] Gift ${code} marked as opened`);
  }

  getTransferLink(code: string): TransferResponse {
    // For GitHub Pages demo, we'll just show an alert
    return {
      success: true,
      appDeepLink: `#transferred-${code}`,
      fallbackUrl: 'https://apps.apple.com/no/app/mine-gavekort/id123456'
    };
  }
}