export class ValidationUtils {
  static isValidNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
  }

  static isValidInteger(value: any): boolean {
    return this.isValidNumber(value) && Number.isInteger(value);
  }

  static isInRange(value: number, min: number, max: number): boolean {
    return this.isValidNumber(value) && value >= min && value <= max;
  }

  static isValidUint8(value: any): boolean {
    return this.isValidInteger(value) && this.isInRange(value, 0, 255);
  }

  static isValidUint16(value: any): boolean {
    return this.isValidInteger(value) && this.isInRange(value, 0, 65535);
  }

  static isValidUint32(value: any): boolean {
    return this.isValidInteger(value) && this.isInRange(value, 0, 4294967295);
  }

  static validateEncryptionInput(value: any, type: string): { valid: boolean; error?: string } {
    if (type === 'bool') {
      if (typeof value !== 'boolean') {
        return { valid: false, error: 'Value must be a boolean' };
      }
      return { valid: true };
    }

    if (!this.isValidNumber(value)) {
      return { valid: false, error: 'Value must be a valid number' };
    }

    switch (type) {
      case 'uint8':
        if (!this.isValidUint8(value)) {
          return { valid: false, error: 'Value must be a valid uint8 (0-255)' };
        }
        break;
      case 'uint16':
        if (!this.isValidUint16(value)) {
          return { valid: false, error: 'Value must be a valid uint16 (0-65535)' };
        }
        break;
      case 'uint32':
        if (!this.isValidUint32(value)) {
          return { valid: false, error: 'Value must be a valid uint32 (0-4294967295)' };
        }
        break;
      default:
        return { valid: false, error: `Unknown type: ${type}` };
    }

    return { valid: true };
  }

  static sanitizeNumberInput(input: string): number | null {
    const trimmed = input.trim();
    if (trimmed === '') return null;

    const parsed = Number(trimmed);
    return this.isValidNumber(parsed) ? parsed : null;
  }
}
