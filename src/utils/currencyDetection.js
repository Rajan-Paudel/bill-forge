// Currency detection based on browser locale and timezone
const currencyMap = {
  // Major currencies by country/region
  'US': { code: 'USD', symbol: '$', name: 'US Dollar' },
  'GB': { code: 'GBP', symbol: '£', name: 'British Pound' },
  'DE': { code: 'EUR', symbol: '€', name: 'Euro' },
  'FR': { code: 'EUR', symbol: '€', name: 'Euro' },
  'ES': { code: 'EUR', symbol: '€', name: 'Euro' },
  'IT': { code: 'EUR', symbol: '€', name: 'Euro' },
  'NL': { code: 'EUR', symbol: '€', name: 'Euro' },
  'BE': { code: 'EUR', symbol: '€', name: 'Euro' },
  'AT': { code: 'EUR', symbol: '€', name: 'Euro' },
  'PT': { code: 'EUR', symbol: '€', name: 'Euro' },
  'IE': { code: 'EUR', symbol: '€', name: 'Euro' },
  'FI': { code: 'EUR', symbol: '€', name: 'Euro' },
  'GR': { code: 'EUR', symbol: '€', name: 'Euro' },
  'JP': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  'IN': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  'CA': { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  'AU': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  'CH': { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  'CN': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  'KR': { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  'SG': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  'HK': { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  'NO': { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  'SE': { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  'DK': { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  'PL': { code: 'PLN', symbol: 'zł', name: 'Polish Złoty' },
  'CZ': { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  'HU': { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  'RU': { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  'BR': { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  'MX': { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  'ZA': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  'TR': { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  'TH': { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  'MY': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
};

// Fallback currency (Indian Rupee as default)
const DEFAULT_CURRENCY = { code: 'INR', symbol: '₹', name: 'Indian Rupee' };

export const detectCurrencyFromBrowser = () => {
  try {
    // Method 1: Try to get country from browser locale
    if (typeof navigator !== 'undefined' && navigator.language) {
      const locale = navigator.language || (navigator.languages && navigator.languages[0]);
      if (locale && typeof locale === 'string') {
        const parts = locale.split('-');
        if (parts.length > 1) {
          const countryCode = parts[1].toUpperCase();
          if (currencyMap[countryCode]) {
            return currencyMap[countryCode];
          }
        }
      }
    }

    // Method 2: Try to detect from timezone
    if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone && typeof timezone === 'string') {
          // Common timezone to country mappings
          const timezoneCountryMap = {
            'America/New_York': 'US',
            'America/Chicago': 'US',
            'America/Denver': 'US',
            'America/Los_Angeles': 'US',
            'America/Phoenix': 'US',
            'Europe/London': 'GB',
            'Europe/Berlin': 'DE',
            'Europe/Paris': 'FR',
            'Europe/Madrid': 'ES',
            'Europe/Rome': 'IT',
            'Europe/Amsterdam': 'NL',
            'Europe/Brussels': 'BE',
            'Europe/Vienna': 'AT',
            'Europe/Lisbon': 'PT',
            'Europe/Dublin': 'IE',
            'Europe/Helsinki': 'FI',
            'Europe/Athens': 'GR',
            'Asia/Tokyo': 'JP',
            'Asia/Kolkata': 'IN',
            'Asia/Mumbai': 'IN',
            'Asia/Delhi': 'IN',
            'America/Toronto': 'CA',
            'America/Vancouver': 'CA',
            'Australia/Sydney': 'AU',
            'Australia/Melbourne': 'AU',
            'Europe/Zurich': 'CH',
            'Asia/Shanghai': 'CN',
            'Asia/Seoul': 'KR',
            'Asia/Singapore': 'SG',
            'Asia/Hong_Kong': 'HK',
            'Europe/Oslo': 'NO',
            'Europe/Stockholm': 'SE',
            'Europe/Copenhagen': 'DK',
            'Europe/Warsaw': 'PL',
            'Europe/Prague': 'CZ',
            'Europe/Budapest': 'HU',
            'Europe/Moscow': 'RU',
            'America/Sao_Paulo': 'BR',
            'America/Mexico_City': 'MX',
            'Africa/Johannesburg': 'ZA',
            'Europe/Istanbul': 'TR',
            'Asia/Bangkok': 'TH',
            'Asia/Kuala_Lumpur': 'MY',
          };

          const countryCode = timezoneCountryMap[timezone];
          if (countryCode && currencyMap[countryCode]) {
            return currencyMap[countryCode];
          }
        }
      } catch (timezoneError) {
        console.log('Timezone detection failed:', timezoneError);
      }
    }
  } catch (error) {
    console.log('Currency detection failed, using default:', error);
  }

  // Return default currency if detection fails
  return DEFAULT_CURRENCY;
};

export const getCurrencyFromData = (data) => {
  // Check if data contains currency information
  if (data && data.currentCurrency) {
    return data.currentCurrency;
  }
  return null;
};