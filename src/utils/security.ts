/**
 * Security, Input Sanitization & Prompt Injection Guardrails
 * Shields application and LLM inference from prompt injection,
 * malicious HTML/script injections, and payload overflow attacks.
 */

// Known prompt injection and adversarial jailbreak signatures
const ADVERSARIAL_PROMPT_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior)\s+(instructions|directives|prompts)/i,
  /reveal\s+(your\s+)?(system\s+prompt|developer\s+mode|internal\s+instructions)/i,
  /you\s+are\s+now\s+in\s+(developer|unrestricted|jailbreak|dan)\s+mode/i,
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript\s*:/i,
  /eval\s*\(/i,
  /union\s+select/i,
];

export interface SanitizationResult {
  isSafe: boolean;
  sanitizedText: string;
  threatDetected?: string;
}

/**
 * Sanitizes user input before passing into the GenAI prompt context.
 */
export function sanitizeUserInput(input: string, maxLength: number = 800): SanitizationResult {
  if (!input || typeof input !== 'string') {
    return { isSafe: true, sanitizedText: '' };
  }

  // Truncate length to prevent token exhaustion / denial-of-service
  const trimmed = input.trim().slice(0, maxLength);

  // Check against adversarial jailbreak triggers
  for (const pattern of ADVERSARIAL_PROMPT_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        isSafe: false,
        sanitizedText: '[BLOCKED_INPUT: Security guardrail flagged an invalid control instruction]',
        threatDetected: pattern.source,
      };
    }
  }

  // Sanitize HTML special characters to prevent stored/reflected XSS
  const safeText = trimmed
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

  return {
    isSafe: true,
    sanitizedText: safeText,
  };
}

/**
 * Safely unescapes standard punctuation for UI display while keeping HTML tags disarmed.
 */
export function cleanDisplayContent(text: string): string {
  if (!text) return '';
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&');
}
